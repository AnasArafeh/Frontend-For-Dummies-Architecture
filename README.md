# FFD — Frontend For Dummies

> The architecture you can explain to a junior developer in 10 minutes by pointing at the screen.

FFD is a **framework-agnostic** frontend architecture. One rule: **organize your code the way the screen is organized.** Pages have sections. Sections have areas. Your code follows the same tree.

## Why FFD?

| You want... | Try |
|---|---|
| UI component composition only | [Atomic Design](https://atomicdesign.bradfrost.com/) |
| 7 layers, tooling, steep learning curve | [Feature-Sliced Design](https://feature-sliced.design/) |
| Full codebase organization, simple enough to learn in minutes | **FFD** |

**FFD covers what others don't:** API call placement, state management flow, business logic housing, component types, naming conventions, module isolation, PR review confidence — all in one cohesive system.

## The Core Idea

```
You see a Page. It has Sections. Each Section has Areas.
Your code mirrors this tree. Always.

Module
├── Page         → Section container + layout. No business logic.
│   └── Section  → Area container + state provider. "The orchestrator."
│       └── Area → Business logic. "The doer."
```

## Quick Reference

| Rule | Summary |
|---|---|
| **Screen = structure** | Page → Section → Area. Always. |
| **Same-level isolation** | Modules never import from each other. Sections never import from each other. |
| **Duplicate by default** | Duplicate similar code between modules. Share only when proven stable. |
| **Each Page = one module** | The Page is the module boundary. |
| **No props in the chain** | Page→Section→Area communication uses context/store only. Never props. |
| **Section = state owner** | Each Section wraps itself with a provider. Areas subscribe. |
| **Area = business logic** | All feature logic lives in Areas. Areas call their own specific APIs. |
| **One naming convention** | `.page.tsx`, `.section.tsx`, `.area.tsx` — the suffix tells you everything. |

## Files in This Repo

| File | What It Is |
|---|---|
| [FFD-ARCHITECTURE.md](./FFD-ARCHITECTURE.md) | The complete architecture reference. Source of truth. |
| [FFD-ARTICLE.md](./FFD-ARTICLE.md) | Medium-ready article. Copy-paste into Medium. |
| [examples/](./examples/) | Sample implementations in React, Next.js, and Angular. |
| [enforcement/](./enforcement/) | ESLint script to enforce module boundaries. |

## Frameworks

FFD works with any frontend framework. Same architecture, different implementation:

| Framework | State | Page Role | Section Role |
|---|---|---|---|
| **React (Vite)** | Context + useReducer | Section container (no data fetching) | State provider, fetches data |
| **Next.js** | Context + useReducer + SSR hydration | Server component (optional prefetch) | State provider, `"use client"` |
| **Angular** | Services + RxJS BehaviorSubject | Section container (no data fetching) | State provider, fetches data |

## Is FFD For You?

**Yes, if:**
- Your project has multiple features/modules that should be isolated
- You want PR reviewers to have 90-100% confidence in what a change affects
- You've felt the pain of shared components coupling modules together
- You want juniors to understand the architecture without reading a book
- You're building with React, Next.js, Angular, or React Native

**Maybe not, if:**
- You have a single-page app with one feature (but if it grows, apply FFD before it spirals)
- Your team is one person and you'll never onboard anyone

**Adopting incrementally:** FFD works module by module. Move one feature into `(modules)/` at a time. Old code coexists. No full rewrite needed.
- You have an existing architecture that isn't causing problems

## Getting Started

1. Read [FFD-ARCHITECTURE.md](./FFD-ARCHITECTURE.md) (15 minutes)
2. Browse the [examples](./examples/) for your framework
3. Create your first module following the Page → Section → Area structure
4. Set up [ESLint enforcement](./enforcement/) to protect module boundaries
5. Duplicate code between modules. Share only when proven.

## License

MIT
