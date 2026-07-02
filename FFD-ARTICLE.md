# Frontend For Dummies: The Architecture Every Team Should Steal

**By Anas Arafeh**

---

Every frontend team I've worked with eventually hits the same wall. The app grows. Five modules become twenty. Three developers become fifteen. And suddenly, nobody knows what can break when they change a component.

"Why did editing the user profile card break the checkout flow?"

"Which modules does this shared table component affect?"

"Is this developer even supposed to be touching the dashboard module?"

If you've asked any of these questions, your architecture failed you. Not because your developers are bad. Because your architecture never told them where things go.

I've spent years refining a solution. I call it **FFD — Frontend For Dummies.** Not because it's for dummies. Because it's simple enough that anyone can understand it by looking at a screen.

---

## The One Rule

> **Organize your code the way the screen is organized.**

Open your app. Look at any page.

You see sections. Each section has areas — a chart area, a table area, a form area. Some sections share a similar business domain. Some don't. The screen already tells you the hierarchy.

FFD says: **your code should mirror what the user sees.**

```
Module
├── Page         → The screen the user is looking at
│   └── Section  → A distinct region of the page
│       └── Area → A functional unit within that region
```

That's it. That's the whole thing. Everything else is rules about what each layer can and cannot do.

---

## The Three Layers

### Page — "The Container"

The Page is the entry point. It arranges Sections on the screen. It does **nothing** else.

- No business logic.
- No API calls (in CSR frameworks).
- No state management.

Think of it as the table of contents for a screen. *"Here goes the overview section. Here goes the table section. Here goes the chart section."*

In Next.js, the Page can optionally prefetch data server-side and pass it down. But Sections still own their data — prefetching is just an optimization.

### Section — "The Orchestrator"

The Section arranges Areas. It **owns the state** for everything below it. Each Section wraps itself with a state provider (Context, Redux, Angular service — pick your poison).

The Section calls APIs that multiple Areas share. If three Areas need device data, the Section fetches it once and distributes it through its provider.

No business logic lives here. Business logic is for Areas.

### Area — "The Doer"

The Area is where the real work happens. Business logic. Complex interactions. Local state. API calls specific to this Area — like submitting a form or fetching auto-complete suggestions.

Areas never receive props from their parent Section. They subscribe to the Section's context. This forces a clean, testable boundary: wrap an Area in its provider with mock data, and you can test it in isolation.

When an Area gets too large, split it into **Segments** — mini-Areas that group related interactions. A 30-field form becomes three Segments of 10 fields each. The Area still owns the submission logic.

---

## The Rules That Make It Work

### 1. Same-Level Isolation

```
Module A  ──X──  Module B     Never
Section X ──X──  Section Y    Never
Area 1    ──X──  Area 2       Never

Module A  ──✓──  shared/      Allowed (higher level)
Area      ──✓──  helpers/     Allowed (higher level)
```

Entities on the same level **never reference each other.** A module cannot import from another module. A section cannot import from another section. You can only reach **up** — to shared resources, helpers, services, and theme components.

This single rule changes everything about code review. When you see a PR touch files inside `(modules)/dashboard/`, you know with **near certainty** that only the Dashboard module is affected.

### 2. Duplicate by Default

When two modules need a similar component, **duplicate it.** Don't abstract it.

This is the most controversial rule. Every architecture preaches reuse. FFD preaches isolation.

Here's why:

**Teams have varied skill levels.** You cannot trust every developer to handle shared components correctly. When asked to add a feature, a developer's first instinct is to edit the component in front of them — not check all 15 places it's used.

**Teams change, people leave.** Where a shared component is used, how to split its logic, which pages to visit to verify changes — all of this lives in people's heads. When they leave, it's gone. And the next developer ships a bug because they didn't know Module X used the same component in a slightly different way.

**Version 2.0 doesn't care about your shared code.** When Module A gets a full redesign, every shared component it uses becomes a negotiation. "We can't change this button — Module B, C, and D use it too." With duplicated code, you redesign Module A and nothing else breaks.

The exception is **theme components** — BaseButton, BaseCard, BaseInput. These are always shared. They have zero business logic. They're pure UI wrappers around your component library.

### 3. No Props in the Architectural Chain

```
Page → Section   ❌ No props (use provider initialData)
Section → Area   ❌ No props (use context/store)
Area → Segment   ❌ No props (use context/store)

Delegate Comp    ✅ Props (they're injectable)
Theme Comp       ✅ Props (they're regular components)
```

This rule exists because **if you give developers the option to use props between layers, they will.** And suddenly you have two competing patterns: props here, context there, nobody knows which to use when. One rule. No exceptions. State flows through context — always.

### 4. Each File Screams Its Role

Every file ends with its layer type:

```
device-dashboard.page.tsx
dashboard-overview.section.tsx
device-stats.area.tsx
device-chart.segment.tsx
user.models.ts
status.enums.ts
users.api.ts
```

A reviewer sees `device-stats.area.tsx` and knows instantly: *"Area = business logic. No props from parents. Can call its own APIs. Test with a context wrapper."*

---

## The Project Structure

```
src/
├── (modules)/              → Feature modules. Each Page = one module.
│   └── device-dashboard/
│       ├── device-dashboard.page.tsx
│       ├── sections/
│       │   └── dashboard-overview/
│       │       ├── dashboard-overview.section.tsx
│       │       └── areas/
│       │           ├── device-stats/
│       │           │   └── device-stats.area.tsx
│       │           └── device-table/
│       │               └── device-table.area.tsx
│       ├── models/
│       ├── helpers/
│       └── components/
│
├── (shared)/               → Shared features (Header, Footer)
├── theme/components/       → UI wrappers (BaseButton, BaseCard)
├── components/             → Shared components (share cautiously)
├── services/               → API layer, split by backend domain
├── helpers/                → Global utilities
├── models/                 → Global generic models
├── types/                  → TS type overrides
└── store/                  → Global constants
```

---

## Does This Actually Work?

I've used this architecture (and earlier versions of it) across:

- **React** with Context + useReducer
- **Next.js** with server components and SSR hydration
- **Angular** with services and RxJS
- **React Native** for mobile apps

The framework changes. The architecture doesn't. Each framework has its own idiomatic way to implement state and providers. FFD doesn't care which one you use.

---

## When NOT to Use FFD

If you have a single-page app with one feature and you're the only developer — you don't need this. Any structure works at that scale.

If your existing architecture isn't causing problems — don't change it. Architecture migrations are expensive. FFD is for teams that have already hit the wall.

---

## What FFD Doesn't Cover

FFD is scoped to **code organization.** It deliberately does not prescribe:

- Testing strategy (add `__tests__/` wherever you need it)
- Error handling patterns (code logic, not architecture)
- Performance optimization (implementation detail)
- CI/CD (project-specific)

The architecture tells you **where things go.** How you implement what's inside is up to you.

---

## Try It

The complete architecture reference, working examples in React, Next.js, and Angular, and ESLint enforcement scripts are all on GitHub:

**[github.com/your-org/frontend-for-dummies](https://github.com)**

Read the full architecture doc (15 minutes), browse the examples for your framework, create your first module following the Page → Section → Area structure, and set up ESLint enforcement to protect module boundaries.

Your team will thank you. Your PR reviewers will thank you. And the developer who joins two years from now and instantly understands where everything goes — they'll thank you most of all.

---

*If you found this useful, share it with your team. The best architecture is the one everyone on your team actually follows.*
