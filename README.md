# FFD — Frontend For Dummies

> [!NOTE]
> **The sample code in this repo is AI-generated.** It demonstrates architectural patterns and structure, but is not guaranteed to be 100% accurate or production-ready. Use it as a reference for the FFD architecture, not as runnable application code.

---

> The architecture you can explain to a junior developer in 10 minutes (maybe more) by pointing at the screen.

FFD is a **framework-agnostic frontend architecture** for structuring React, Next.js, Angular, and React Native applications. One rule drives everything: **organize your code the way the screen is organized.** Pages have sections. Sections have areas. Your code follows the same tree — always.

If you've searched for a scalable frontend project structure, a React folder structure guide, a Next.js architecture pattern, or an alternative to bulletproof-react that works across frameworks — FFD is designed to fill that gap.

---

## Why FFD?

| You want... | Try |
|---|---|
| UI component composition only | [Atomic Design](https://atomicdesign.bradfrost.com/) |
| 7 layers, tooling, steep learning curve | [Feature-Sliced Design](https://feature-sliced.design/) |
| Full codebase organization, simple enough to learn in minutes, framework-agnostic | **FFD** |

FFD covers what others don't: API call placement, state management flow, business logic housing, component types, naming conventions, module isolation, and PR review confidence — all in one cohesive frontend architecture.

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
Module A  ──X──  Module B     Never (same level)
Section X ──X──  Section Y    Never (same level)
Area 1    ──X──  Area 2       Never (same level)

Module    ──✓──  (shared)/    Allowed (higher level)
Module    ──✓──  services/    Allowed (higher level)
Section   ──✓──  helpers/     Allowed (higher level)
Section   ──✓──  components/  Allowed (higher level)
Area      ──✓──  theme/       Allowed (higher level)
Area      ──✓──  services/    Allowed (higher level)
```

### 3. Duplicate by Default, Share With Purpose

FFD doesn't ban sharing. It has dedicated folders for it — `theme/`, `components/`, `helpers/`, and `services/` are all meant to be shared. But for **module-specific code**, the default is duplication over premature abstraction.

Share what's genuinely universal (theme wrappers, API clients, utility functions). Duplicate what's specific to a feature (a dashboard card, a user table). If the same component proves stable across multiple modules over time, promote it to `components/`. But don't start there.

**Why the default matters:**

- **Team skill levels vary.** A developer's first instinct is to edit the component in front of them — not check all 15 places it's used.
- **Teams change, people leave.** Where a shared component is used and how to verify changes lives in people's heads. When they leave, it's gone.
- **Version 2.0 doesn't care about your shared code.** When Module A gets a full redesign, shared components become a negotiation. Duplicated code means you redesign one module and nothing else breaks.
- **PR reviewers know instantly:** "This change is isolated to one module" or "This change is global — scrutinize it."

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

Delegate Components and Private Components can live at **any level**: Module (shared between Sections), Section (shared between Areas), or Area (scoped to that Area). Place them at the **lowest level** that covers all consumers.

---

## Layer Responsibilities

### Module
- The feature domain boundary.
- Defined by its Page. Each Page = one Module.
- Cannot reference other modules at the same level.

### Layout (Optional)
- Wraps the module with a shared shell (sidebar, top bar, module-level navigation).
- Does **not** contain business logic or API calls.

### Page (Required)
- **Role:** Section container + page-level layout.
- Does **not** contain business logic.
- **Next.js (SSR):** server component that can optionally prefetch data and hydrate Section providers. Prefetching is an optimization, not a requirement — Sections still own their data.
- **React, Angular (CSR):** purely a Section container + layout. No API calls.
- Can be small — one Page with one Section is perfectly normal.

### Section (Required)
- **Role:** Area container + section-level layout + state provider. **"The orchestrator."**
- **Owns the state provider** (Context + useReducer, Redux, Zustand, Angular service, etc.).
- Calls **shared/orchestration APIs** — data that multiple Areas need.
- Does **not** contain business logic.
- **Split by business domain:** same business = one Section with multiple Areas. Different businesses = multiple Sections.
- Can be small — one Section with one Area is normal.

### Area (Required)
- **Role:** Core implementation. **"The doer."**
- Implements feature-specific **business logic**.
- **CAN call APIs specific to itself** (POST operations, Area-specific data).
- Receives **NO props** from architectural parents (data flows through context/store only).
- Focused on a **single** functional responsibility.

### Segment (Optional)
- **Role:** Mini-Area for splitting large Areas (e.g., a complex form).
- Parent Area owns overarching logic and API calls.
- Same rules as Area (no props from parents, context-driven).

---

## Data Flow

### State Management

Each Section **owns its own state**. State is scoped to the Section. Communication between architectural layers happens **only** through state — never through props.

FFD does **not** prescribe a specific state library:

| Framework | State Options |
|---|---|
| React | Context + useReducer, Redux, Zustand |
| Angular | Signals + computed |
| Next.js | Context + useReducer (same as React, with SSR hydration) |

### Provider Wrapping Pattern

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

### API Call Placement

| Layer | Can Call APIs? | What Kind? |
|---|---|---|
| Page (Next.js SSR) | Yes (optional) | Server-side prefetching, hydrates Section providers |
| Page (CSR) | **No** | Section handles all data fetching |
| Section | Yes | Shared/orchestration APIs — data multiple Areas need |
| Area | Yes | Area-specific APIs — POST operations, data only this Area needs |
| Segment | No | Parent Area handles it |

### Props Rules

| Context | Props? | Why? |
|---|---|---|
| **Delegate Components** | Yes | Injectable/callback. Table cell gets row data as props. |
| **Theme Components** | Yes | Regular reusable components. Props are how components work. |
| **Shared Components** | Yes | Regular reusable components in `components/`. |
| **Everything else** | **No** | Architectural chain uses context/store only. |

**Forbidden:** Page→Section (use provider initialData), Section→Area (use context/store), Area→Segment (use context/store).

---

## Module Organization

### Leaf Module (Has a Page)

```
(modules)/device-dashboard/
├── device-dashboard.layout.tsx              → (optional) Module-level layout
├── device-dashboard.layout.scss             → (optional) Layout styles, next to layout file
├── device-dashboard.page.tsx                → Page (required) — Section container
├── device-dashboard.page.scss               → (optional) Page styles, next to page file
├── device-dashboard.page.models.ts          → (optional) Page-specific models
├── state-management/                          → Section state (imported by Page + Section)
│   └── dashboard-overview/
│       ├── dashboard-overview.actions.ts
│       └── dashboard-overview.reducer.ts
├── sections/
│   └── dashboard-overview/
│       ├── dashboard-overview.section.tsx       → Section — Area container, consumes state
│       ├── dashboard-overview.section.scss      → (optional) Section styles
│       ├── dashboard-overview.section.models.ts → (optional) Section-specific models
│       ├── delegate-components/
│       ├── components/
│       └── areas/
│           ├── device-stats/
│           │   ├── device-stats.area.tsx
│           │   ├── device-stats.area.scss        → (optional) Area styles
│           │   ├── device-stats.area.models.ts   → (optional) Area-specific models
│           │   ├── segments/
│           │   ├── delegate-components/
│           │   └── components/
│           ├── device-table/
│           │   ├── device-table.area.tsx
│           │   ├── device-table.area.scss
│           │   └── delegate-components/
│           └── device-chart/
│               ├── device-chart.area.tsx
│               └── device-chart.area.scss
├── models/                                   → Module-level shared models
├── helpers/                                  → Module-specific utilities
├── store/                                    → Module-level constants
├── delegate-components/                      → Module-level delegate components
└── components/                               → Module-level private components
```
├── delegate-components/                  → Module-level delegate components
└── components/                           → Module-level private components
```

### Container Module (No Page, Contains Only Nested Modules)

```
(modules)/devices/
├── devices.layout.tsx               → Shared layout for all nested modules
├── helpers/                         → Shared helpers for nested modules
├── models/                          → Shared models for nested modules
├── store/                           → Shared constants
├── delegate-components/
├── components/
└── (modules)/                       → Nested modules (each HAS a Page)
    ├── device-dashboard/
    │   └── device-dashboard.page.tsx
    ├── device-management/
    │   └── device-management.page.tsx
    └── device-verification/
        └── device-verification.page.tsx
```

**Critical rule:** A module either has a Page (leaf module) **OR** contains `(modules)/` (container module). **Never both.**

### Features (Shared Modules)

Features like Header, Footer, and Navbar follow the same Page→Section→Area structure. They receive configuration via **props at the Page boundary** and global data via **global context**.

```
(shared)/header/
├── header.page.tsx                 → Page (entry point, receives boundary props)
├── sections/
│   └── header-main/
│       ├── header-main.section.tsx → Section
│       └── areas/
│           ├── logo/
│           ├── navigation/
│           └── user-menu/
├── models/
└── components/
```

---

## Component Classification

### 1. Theme Components (`theme/components/`)

**The single source of UI truth.** Every visual element goes through theme components.

- **Never use native HTML elements.** No `<div>`, `<span>`, `<button>`, `<img>`.
- **Never import directly from the UI library.** No `import { Button } from '@mantine/core'`.
- **Always use theme wrappers.** Even a direct wrapper with zero added styles is required.

```tsx
// CORRECT
import { BaseButton } from '@/app/theme/components/base-button';
import { BaseBox } from '@/app/theme/components/base-box';

// WRONG — never do this
import { Button } from '@mantine/core';
<div className="container">...</div>
```

**Why:** Design changes happen in one place. Swapping UI libraries means changing theme wrappers, not every component in the app.

### 2. Shared Components (`components/`)

Logical reusable components. Shared cautiously, duplicated by default.

### 3. Private Components

Scoped to a single module. Can exist at Module, Section, or Area level.

### 4. Delegate Components

Injectable/callback component slots. The parent provides the shell; the child provides the template. Receives data as props from wherever it's injected.

---

## Project Root Structure

```
src/
├── (modules)/               → Feature modules (each Page = one module)
├── (shared)/                 → Shared features (Header, Footer, Navbar)
├── components/               → Shared logical components (share cautiously)
├── theme/                    → Theme UI wrappers (always shared, zero business logic)
│   └── components/           → BaseButton, BaseCard, BaseInput, BaseModal, etc.
├── services/                 → API communication layer
│   └── <backend-domain>/     → Split by backend domain
│       ├── <domain>.api.ts   → API functions
│       ├── models/           → API request/response models
│       └── enums/            → API-specific enums
├── helpers/                  → Global utilities, transformers, pipes, directives
├── routes/                   → Route/path definitions
├── models/                   → Global generic models
├── types/                    → TypeScript type overrides (window, library augmentations)
├── store/                    → Global constants and configuration
└── enums/                    → Global enums (only if universally applicable)
```

---

## Models, Types, and Enums

**Models** can exist at three levels: root `models/` (generic, cross-cutting), module `models/` (module-specific), and service `models/` (API request/response, next to the API).

**Types** (`types/`) is for TypeScript type overrides: library augmentations, `window` extensions, global patches. Not for business models.

**Enums** are scoped as close to usage as possible. Root-level only if universally applicable.

---

## Naming Conventions

Every architectural layer file **MUST** end with its layer type. Pick **one** separator (`.` or `-`) and apply it consistently across the **entire** codebase. Never mix.

### Dot Convention (Recommended)

| Type | Pattern | Examples |
|---|---|---|
| Page | `<name>.page.tsx` | `device-dashboard.page.tsx` |
| Section | `<name>.section.tsx` | `dashboard-overview.section.tsx` |
| Area | `<name>.area.tsx` | `device-stats.area.tsx` |
| Segment | `<name>.segment.tsx` | `device-chart.segment.tsx` |
| Layout | `<name>.layout.tsx` | `devices.layout.tsx` |
| Model | `<name>.models.ts` | `user.models.ts`, `device.models.ts` |
| Enum | `<name>.enums.ts` | `status.enums.ts` |
| API | `<domain>.api.ts` | `users.api.ts`, `orders.api.ts` |
| Helper | `<name>.helper.ts` | `date.helper.ts` |

### Hyphen Convention

| Type | Pattern | Examples |
|---|---|---|
| Page | `<name>-page.tsx` | `device-dashboard-page.tsx` |
| Section | `<name>-section.tsx` | `dashboard-overview-section.tsx` |
| Area | `<name>-area.tsx` | `device-stats-area.tsx` |
| Segment | `<name>-segment.tsx` | `device-chart-segment.tsx` |
| Layout | `<name>-layout.tsx` | `devices-layout.tsx` |
| Model | `<name>-models.ts` | `user-models.ts`, `device-models.ts` |
| Enum | `<name>-enums.ts` | `status-enums.ts` |
| API | `<domain>-api.ts` | `users-api.ts`, `orders-api.ts` |
| Helper | `<name>-helper.ts` | `date-helper.ts` |

Folders: kebab-case.

**Co-located files** (styles, page-specific models) sit next to their layer file, sharing the same name prefix:
```
device-dashboard.page.tsx
device-dashboard.page.scss          ← next to page, not in a subfolder
device-dashboard.page.models.ts     ← page-specific models, not in models/
device-stats.area.tsx
device-stats.area.scss              ← next to area, not in a subfolder
```

A reviewer sees `device-stats.area.tsx` and knows instantly: *Area = business logic. No props. Can call APIs.*

---

## Promotion Rules

- Used by 2+ Segments → promote to **Area level**
- Used by 2+ Areas → promote to **Section level**
- Used by 2+ Sections → promote to **Module level**
- Used by 2+ Modules → consider `components/` (but **default to duplication**)

---

## Enforcement (ESLint)

Module boundaries are enforced via ESLint `no-restricted-imports`. Each module gets a local config:

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [
        "(modules)/dashboard/*",
        "(modules)/users/*"
      ]
    }]
  }
}
```

The `enforcement/generate-eslint-rules.js` script auto-generates these rules by scanning `(modules)/`.

---

## How to Adopt

FFD can be adopted **module by module.** No full rewrite needed. Create your first `(modules)/` folder, move one feature at a time, and let old code coexist outside the module structure. Enforce the hierarchy only for new modules. Over time, your codebase transitions without a massive migration.

---

## What FFD Does NOT Cover

FFD is scoped to **code organization.** It does not prescribe testing strategy, error handling patterns, performance optimization, or CI/CD. Add `__tests__/` wherever needed. Empty folders are never required.

---

## Examples

Working sample implementations of one module (Device Dashboard) in three frameworks:

| Framework | Key Demo |
|---|---|
| [React (Vite)](./examples/react-vite/) | Page→Section→Area with Context + useReducer, Delegate Component |
| [Next.js (App Router)](./examples/nextjs-app-router/) | SSR Page with optional server prefetch |
| [Angular](./examples/angular/) | Signals + computed state management |

Each demonstrates the full hierarchy, a Delegate Component (table with injectable action buttons), and both shared and Area-specific API calls.

---

---

*Frontend architecture, React project structure, Next.js folder structure, Angular architecture pattern, scalable frontend design, modular component architecture, frontend code organization, enterprise frontend best practices, framework-agnostic design system, bulletproof-react alternative, clean architecture frontend, frontend for dummies.*

---

## License

MIT
