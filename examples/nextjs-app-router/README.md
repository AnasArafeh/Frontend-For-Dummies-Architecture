# FFD Example — Next.js App Router

This is a **pull-ready** example of the FFD architecture implemented with Next.js App Router.

## What this demonstrates

The key difference from React (CSR): the **Page is a server component** that can optionally prefetch data and hydrate Section providers.

| Concept | File | Key Note |
|---|---|---|
| **Page** (server component) | [`device-dashboard.page.tsx`](./src/app/(modules)/device-dashboard/device-dashboard.page.tsx) | `async` — fetches data server-side, passes as `initialData` |
| **Section** (client) | [`dashboard-overview.section.tsx`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/dashboard-overview.section.tsx) | `"use client"` — skips fetch if SSR data present |
| **Reducer + Provider** | [`dashboard-overview.reducer.tsx`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/state-management/dashboard-overview.reducer.tsx) | Accepts `initialData` for SSR hydration |
| **Area** (client) | [`device-table.area.tsx`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/areas/device-table/device-table.area.tsx) | `"use client"` — business logic, API calls |
| **Delegate Component** | [`device-table-actions.delegate.tsx`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/areas/device-table/delegate-components/device-table-actions.delegate.tsx) | Receives row data as props |

## Server → Client data flow

```
Page (server component)
  └─ await fetchDevices()           ← server-side, optional
  └─ <Provider initialData={...}>   ← hydrate client state
       └─ Section ("use client")    ← skips fetch if data present
            └─ Area ("use client")  ← reads from context
```

If the Page skips prefetching, the Section fetches data client-side on mount — same as the React CSR example.

## Quick start

```bash
cd examples/nextjs-app-router
npm install
npm run dev        # Start dev server on :3000
npm run build      # Production build
```

## Key differences from CSR React

- Page files are server components by default (no `"use client"`).
- Sections and Areas must explicitly add `"use client"` — they hold state and logic.
- Next.js `fetch` deduplication: calling the same endpoint in multiple server components = one network request.
- The provider's `initialData` prop is the SSR bridge — server data flows into client state without props.
