# FFD — Frontend For Dummies Architecture

## What Is FFD?

FFD is a **framework-agnostic** frontend architecture. One rule drives everything:

> **Organize your code the way the screen is organized.**

Look at any page. It has sections. Each section has areas. Your code follows that same tree — always.

FFD sits between [Atomic Design](https://atomicdesign.bradfrost.com/) (UI composition only, says nothing about code organization or business logic) and [Feature-Sliced Design](https://feature-sliced.design/) (7 layers, steep learning curve). It covers the entire codebase — API calls, state management, business logic, component hierarchy — while being explainable in minutes.

---

## Core Philosophy

### 1. The Screen Is the Structure

```
You see a Page. It has Sections. Each Section has Areas.
Your code mirrors this tree. Always.
```

### 2. Same-Level Isolation

Entities on the same level **never** reference each other. You can only import from levels **above** you.

```
Module A  ──X──  Module B     Never
Section X ──X──  Section Y    Never
Area 1    ──X──  Area 2       Never

Module A  ──✓──  shared/      Higher level — allowed
Section   ──✓──  services/    Higher level — allowed
Area      ──✓──  helpers/     Higher level — allowed
```

### 3. Duplicate by Default, Share Cautiously

When two modules need similar code, **duplicate it**. Do not abstract into a shared component without careful consideration.

**Why:**

- **Team skill levels vary.** You cannot trust every developer to handle all shared cases, test every scenario, or update a shared component correctly when new design requirements arrive. A developer's first instinct is to edit the component in front of them — they will not check all references first.

- **Teams change, people leave.** Business context is lost. Workarounds are forgotten. Where the shared component is used, how to split its logic, how to access every page that uses it to verify changes — all of this disappears when the original authors move on.

- **Module A can be redesigned or upgraded to 2.0 without affecting Module B.** With shared code, a redesign for one module forces compromises across all modules. With duplicated code, each module evolves independently.

- **PR reviewers know instantly:** "This change is isolated to one module" or "This change is global — scrutinize it."

**The exception:** Theme components (`theme/components/`) are always shared. They have zero business logic. Logical shared components (`components/`) are shared only when proven stable across modules and the team has explicit ownership.

### 4. Each Page Is a Module

A module is defined by its Page. The Page is the entry point. Everything inside the module folder belongs to that module.

---

## The Hierarchy

```
Module (defined by its Page)
├── Layout (optional)            → Wraps the module. Module-level shell.
├── Page (required)              → Section container + page-level layout. The entry point.
│   └── Section (required)       → Area container + section layout + state provider. "The orchestrator."
│       ├── Delegate Components  → Shared between Areas in this Section
│       ├── Private Components   → Shared between Areas in this Section
│       └── Area (required)       → Core implementation. "The doer."
│           ├── Segment (opt)    → Mini-Area for splitting large Areas
│           ├── Delegate Comp.   → Scoped to this Area (rare)
│           └── Private Comp.    → Scoped to this Area
├── Delegate Components           → Shared between Sections in this Module
└── Private Components            → Shared between Sections in this Module
```

Delegate Components and Private Components can live at **any level**: Module (shared between Sections), Section (shared between Areas), or Area (scoped to that Area, rarely used). Place them at the **lowest level** that covers all consumers.

---

## Layer Responsibilities

### Module

- The feature domain boundary.
- Defined by its Page. Each Page = one Module.
- Contains everything the feature needs: pages, sections, areas, components, helpers, models, state.
- **Cannot reference other modules at the same level.**

### Layout (Optional)

- Wraps the module with a shared shell (sidebar, top bar, module-level navigation).
- Used when multiple pages within a module share the same chrome.
- Does **not** contain business logic or API calls.

### Page (Required)

- **Role:** Section container + page-level layout.
- Arranges Sections within the page skeleton.
- Does **not** contain business logic.
- **SSR frameworks (Next.js):** server component that CAN (optionally) fetch data and hydrate Section providers. Sections still own their data — server-side prefetching is an optimization, not a requirement.
- **CSR frameworks (React, Angular):** purely a Section container + layout. **No API calls.**
- Can be small — one Page with one Section is perfectly normal.

### Section (Required)

- **Role:** Area container + section-level layout + state provider. **"The orchestrator."**
- Arranges Areas within the section skeleton.
- **Owns the state provider** (context + reducer, Redux store, Angular service, etc.) for its Areas.
- Calls **shared/orchestration APIs** — data that multiple Areas need.
- Does **not** contain business logic. (That's in Areas.)
- **Split by business domain:** same business = one Section with multiple Areas. Different businesses = multiple Sections.
- Can be small — one Section with one Area is normal.

### Area (Required)

- **Role:** Core implementation. **"The doer."**
- Implements feature-specific **business logic**.
- Manages local state.
- Handles complex UI interactions.
- **CAN call APIs specific to itself** (POST operations, Area-specific data).
- Receives **NO props** from architectural parents (data flows through context/store only).
- Focused on a **single** functional responsibility.

### Segment (Optional)

- **Role:** Mini-Area for splitting large Areas.
- Groups related fields or interactions when an Area becomes too large (e.g., a complex form).
- Parent Area owns overarching logic and API calls.
- Same rules as Area (no props from parents, context-driven).

---

## Data Flow

### State Management

Each Section **owns its own state**. State is scoped to the Section — different Sections use different state instances. Communication between architectural layers (Page → Section → Area) happens **only** through state — never through props.

FFD does **not** prescribe a specific state library. Any of these work:

| Framework | State Options |
|---|---|
| React | Context + useReducer, Redux, Zustand |
| Angular | Services with RxJS BehaviorSubject, NgRx, Signal Store |
| Next.js | Context + useReducer (same as React, with SSR hydration) |

### The Provider Wrapping Pattern

Each Section wraps itself with its state provider. In SSR frameworks, the Page can pass server-fetched data as initial state:

```tsx
// Next.js (SSR) — Page is a server component, prefetching is optional
export default async function DeviceDashboardPage() {
  const devices = await fetchDevices(); // server-side (optional)

  return (
    <DashboardOverviewProvider initialData={{ devices }}>
      <DashboardOverview />
    </DashboardOverviewProvider>
  );
}
```

```tsx
// React (CSR) — Page is purely a Section container, no data fetching
export default function DeviceDashboardPage() {
  return (
    <DashboardOverviewProvider>
      <DashboardOverview />
    </DashboardOverviewProvider>
  );
}
```

Angular follows the same concept using services injected at the Section component level.

### Data Flow Rules

- **Page → Section:** Through the Section's provider. SSR: initial data via `initialData` prop on the provider. CSR: Section fetches its own data internally.
- **Section → Area:** Through context/store subscription. Area reads from the Section's state.
- **Area → Segment:** Same context/store. Segment reads what the Area reads.
- **No props in the architectural chain. Ever.**

### API Call Placement

| Layer | Can Call APIs? | What Kind? |
|---|---|---|
| Page (SSR — Next.js) | Yes (optional) | Server-side prefetching, hydrates Section providers |
| Page (CSR) | **No** | Section handles all data fetching. Page is only a Section container + layout. |
| Section | Yes | Shared/orchestration APIs — data multiple Areas need |
| Area | Yes | Area-specific APIs — POST operations, data only this Area needs |
| Segment | No | Parent Area handles it |

All API calls go through the services layer (`services/<domain>/<domain>.api.ts` or `services/<domain>/<domain>-api.ts`). Services are organized by backend domain.

### Props Rules

There are only **two** cases where props are allowed:

| Context | Props? | Why? |
|---|---|---|
| **Delegate Components** | Yes | Injectable/callback components. A table cell gets row data as props. A card renderer gets item data as props. The host passes data to the delegate. |
| **Theme & Shared Components** | Yes | Regular reusable components (BaseButton, DataTable). Props are how components work. |
| **Everything else** | **No** | — |

**Specifically forbidden:**
- Page → Section (use provider `initialData`)
- Page → Layout (use provider/context)
- Section → Area (use context/store)
- Area → Segment (use context/store)
- Any architectural chain communication

---

## Module Organization

### Leaf Module (Has a Page)

The standard module. It has a Page, its own sections/areas, and its own resources.

```
(modules)/device-dashboard/
├── device-dashboard.layout.tsx          → (optional) Module-level layout
├── device-dashboard.page.tsx            → Page (required) — Section container
├── sections/
│   └── dashboard-overview/
│       ├── dashboard-overview.section.tsx   → Section — Area container + state provider
│       ├── delegate-components/             → Shared between Areas in this Section
│       ├── components/                      → Shared between Areas in this Section
│       └── areas/
│           ├── device-stats/
│           │   ├── device-stats.area.tsx
│           │   ├── segments/
│           │   │   └── device-chart.segment.tsx  → (optional) Mini-Area
│           │   ├── delegate-components/
│           │   └── components/
│           ├── device-table/
│           │   ├── device-table.area.tsx
│           │   └── delegate-components/
│           └── device-chart/
│               └── device-chart.area.tsx
├── models/                               → Module-specific models
├── helpers/                              → Module-specific utilities
├── store/                                → Module-level constants
├── delegate-components/                  → Module-level delegate components
└── components/                           → Module-level private components
```

### Container Module (No Page, Contains Only Nested Modules)

A module can be a container with **no Page** — it only provides shared layout and resources for its nested child modules.

```
(modules)/devices/
├── devices.layout.tsx               → Shared layout for all nested modules
├── helpers/                         → Shared helpers for nested modules
├── models/                          → Shared models for nested modules
├── store/                           → Shared constants
├── delegate-components/             → Shared delegate components
├── components/                      → Module-level private components
└── (modules)/                       → Nested modules (each HAS a Page)
    ├── device-dashboard/
    │   └── device-dashboard.page.tsx
    ├── device-management/
    │   └── device-management.page.tsx
    └── device-verification/
        └── device-verification.page.tsx
```

**Critical rule:** A module either has a Page (leaf module) **OR** contains `(modules)/` (container module). **Never both.** This prevents "god modules" that mix their own pages with nested sub-modules.

### Nested Module Rules

Module C inside Module A:
- **CAN** use Module A's: helpers, store, models, module-level components, delegate components
- **CANNOT** use Module A's: pages, sections, areas, private components

### Features (Shared Modules)

Features are standalone, self-contained units used across the app (Header, Footer, Navbar). They follow the same Page → Section → Area structure. They receive configuration via **props at the Page boundary** and global data via **global context**.

```
(shared)/header/
├── header.page.tsx                 → Page (entry point, receives boundary props)
├── sections/
│   └── header-main/
│       ├── header-main.section.tsx → Section
│       └── areas/
│           ├── logo/
│           │   └── logo.area.tsx
│           ├── navigation/
│           │   └── navigation.area.tsx
│           └── user-menu/
│               └── user-menu.area.tsx
├── models/
└── components/
```

---

## Component Classification

### 1. Theme Components (`theme/components/`)

**The single source of UI truth.** Every visual element in the application goes through theme components. This is not optional.

**Hard rules:**
- **Never use native HTML elements.** No `<div>`, `<span>`, `<p>`, `<h1>`, `<img>`, `<video>`, `<button>`, `<input>`.
- **Never import directly from the UI library.** No `import { Button } from '@mantine/core'` or `import { MatButton } from '@angular/material/button'`.
- **Always use theme wrappers.** Even a direct wrapper with zero added styles is required.

```tsx
// CORRECT
import { BaseButton } from '@/app/theme/components/base-button';
import { BaseBox } from '@/app/theme/components/base-box';

// WRONG — never do this
import { Button } from '@mantine/core';
<div className="container">...</div>
<img src="/logo.png" />
```

**Why:** Design changes happen in one place. Swapping the UI library means changing theme wrappers, not every component in the app. The theme folder is design's contract with code.

Always shared. Zero business logic. Props: Yes (regular components).

### 2. Shared Components (`components/`)

Logical reusable components. **Shared cautiously, duplicated by default.**
Props: Yes (regular components).

### 3. Private Components

Scoped to a single module. Never leave their defined scope.
Can exist at Module, Section, or Area level.
Props: Yes, within their scope.

### 4. Delegate Components

**Injectable/callback component slots.** The parent provides the shell; the child provides the template.
Examples: table action columns, card renderers, modal content, wizard steps, list item templates.
Can exist at Module, Section, or Area level.
Props: **Yes** — they receive data from wherever they are injected (e.g., a table cell delegate receives row data as props).

---

## Project Root Structure

```
src/
├── (modules)/               → Feature modules (each Page = one module)
│
├── (shared)/                 → Shared features (Header, Footer, Navbar)
│                               Follows same Page → Section → Area structure
│
├── components/               → Shared logical components (share cautiously)
│
├── theme/                    → Theme UI wrappers (always shared, zero business logic)
│   └── components/           → BaseButton, BaseCard, BaseInput, BaseModal, etc.
│
├── services/                 → API communication layer
│   └── <backend-domain>/     → Split by backend domain
│       ├── <domain>.api.ts   → API functions
│       ├── models/           → API request/response models
│       └── enums/            → API-specific enums
│
├── helpers/                  → Global utilities, transformers, formatters, pipes, directives
├── routes/                   → Route/path definitions
├── models/                   → Global generic models (pagination, sorting, filtering)
├── types/                    → TypeScript type overrides (window, library augmentations)
├── store/                    → Global constants and configuration
└── enums/                    → Global enums (only if universally applicable)
```

### When to Use Each Root Folder

| Folder | Purpose | Example |
|---|---|---|
| `(modules)/` | Feature modules | Dashboard, Users, Reports |
| `(shared)/` | Shared features used across the app | Header, Footer, Navbar |
| `components/` | Shared logical components (share cautiously) | DataTable, FileUploader |
| `theme/` | UI wrappers, always shared, zero logic | BaseButton, BaseCard |
| `services/` | API calls, split by backend domain | users.api.ts, orders.api.ts |
| `helpers/` | Global utilities, formatters, transformers | date.helper.ts, currency.helper.ts |
| `routes/` | Route/path definitions | app-routes.ts |
| `models/` | Global generic models used across modules | pagination.models.ts |
| `types/` | TS type overrides and library augmentations | window.d.ts |
| `store/` | Global constants and configuration | app-config.ts |
| `enums/` | Global enums (universally applicable only) | status.enums.ts |

---

## Models, Types, and Enums

### Models

Models can exist at **three levels:**

1. **Root `models/`** — Generic, cross-cutting models used by multiple modules (pagination, sorting, filtering).
2. **Module `models/`** — Models specific to one module.
3. **Service `models/`** — API request/response models, always next to their API definition inside `services/<domain>/models/`.

No `I` prefix on interfaces.

### Types

`types/` is specifically for **TypeScript type overrides:** library augmentations, `window` object extensions, global type patches. **Not** for business models (those go in `models/`).

### Enums

Can exist at multiple levels: root, module, service. **Scoped as close to usage as possible.** Avoid global enums unless universally applicable.

---

## Promotion Rules

When a component is used by multiple consumers, promote it up:

- Used by 2+ Segments → promote to **Area level**
- Used by 2+ Areas → promote to **Section level**
- Used by 2+ Sections → promote to **Module level**
- Used by 2+ Modules → consider `components/` (but **default to duplication**)

---

## Naming Conventions

Every architectural layer file **MUST** end with its layer type. Pick **one** separator (`.` or `-`) and apply it consistently across the **entire** codebase — layers, models, enums, helpers, services, everything. **Never mix.**

### Option A: Dot Convention (Recommended)

| Type | Pattern | Examples |
|---|---|---|
| Page | `<name>.page.tsx` | `device-dashboard.page.tsx` |
| Section | `<name>.section.tsx` | `dashboard-overview.section.tsx` |
| Area | `<name>.area.tsx` | `device-stats.area.tsx` |
| Segment | `<name>.segment.tsx` | `device-chart.segment.tsx` |
| Layout | `<name>.layout.tsx` | `devices.layout.tsx` |
| Model | `<name>.models.ts` | `user.models.ts`, `device.models.ts` |
| Enum | `<name>.enums.ts` | `status.enums.ts`, `tag.enums.ts` |
| API | `<domain>.api.ts` | `users.api.ts`, `orders.api.ts` |
| Helper | `<name>.helper.ts` | `date.helper.ts`, `currency.helper.ts` |

### Option B: Hyphen Convention

| Type | Pattern | Examples |
|---|---|---|
| Page | `<name>-page.tsx` | `device-dashboard-page.tsx` |
| Section | `<name>-section.tsx` | `dashboard-overview-section.tsx` |
| Area | `<name>-area.tsx` | `device-stats-area.tsx` |
| Segment | `<name>-segment.tsx` | `device-chart-segment.tsx` |
| Layout | `<name>-layout.tsx` | `devices-layout.tsx` |
| Model | `<name>-models.ts` | `user-models.ts`, `device-models.ts` |
| Enum | `<name>-enums.ts` | `status-enums.ts`, `tag-enums.ts` |
| API | `<domain>-api.ts` | `users-api.ts`, `orders-api.ts` |
| Helper | `<name>-helper.ts` | `date-helper.ts`, `currency-helper.ts` |

**Folders:** kebab-case. **Index files:** `index.ts` only when re-exporting.

> A reviewer sees `device-stats.area.tsx` and knows immediately: *"This is an Area. Business logic. No props from parents. Can call its own APIs."* No need to memorize folder structure.

---

## Enforcement (ESLint)

Module boundaries are enforced via ESLint `no-restricted-imports`. Each module folder gets a local `.eslintrc.json`:

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [
        "(modules)/dashboard/*",
        "(modules)/users/*",
        "(modules)/reports/*"
      ]
    }]
  }
}
```

This prevents Module A from importing anything from Module B. The `enforcement/generate-eslint-rules.js` script auto-generates these rules by scanning the `(modules)/` directory.

For nested modules, the restriction only applies to **sibling modules** — not to the parent module's shared resources (helpers, models, store, components, delegate-components).

---

## Framework Adaptations

### React (Vite / CRA)

- **Pages:** Regular React components. Section containers — no data fetching.
- **Sections:** Own context + reducer. `"use client"` equivalent (CSR by default). **Fetch their own data** (or receive it via provider `initialData` from SSR Page).
- **Areas:** Subscribe to Section context via `useContext`.
- **State:** Context + `useReducer` (or Redux, Zustand).

### Next.js (App Router)

- **Pages:** Server components by default. **Optionally** call APIs server-side and hydrate Section providers.
- **Sections:** `"use client"` (they hold state).
- **Areas:** `"use client"` (they hold business logic).
- **State:** Context + `useReducer`. Section provider receives server-fetched data as initial state.
- Next.js `fetch` deduplication: calling the same API from multiple server components = one network request.

### Angular

- **Pages:** Smart components with routing. Section containers — no data fetching.
- **Sections:** Services + state. Each Section has its own Angular service for state.
- **Areas:** Components that inject the Section's state service.
- **State:** Services with RxJS `BehaviorSubject` (or NgRx, Signal Store).
- Pipes and directives live in `helpers/`.

---

## What FFD Does NOT Cover

FFD is deliberately scoped to **code organization.** It does not prescribe:

- **Testing** — Teams add `__tests__/` or `*.spec.ts` files where needed. No mandatory structure.
- **Error handling** — Code-level logic, not architecture-level structure.
- **Performance** — Implementation detail, not organization.
- **CI/CD** — Project-specific.

**Empty folders are never required.** If a module doesn't need `helpers/` or `store/`, don't create them.
