# FFD Example — React + Vite

This is a **pull-ready** example of the FFD architecture implemented with React and Vite.

## What this demonstrates

| Concept | File |
|---|---|
| **Page** (Section container, no data fetching) | [`device-dashboard.page.tsx`](./src/(modules)/device-dashboard/device-dashboard.page.tsx) |
| **Section** (state provider, shared API calls) | [`dashboard-overview.section.tsx`](./src//modules)/device-dashboard/sections/dashboard-overview/dashboard-overview.section.tsx) |
| **Area** (business logic, specific API calls) | [`device-table.area.tsx`](./src/(modules)/device-dashboard/sections/dashboard-overview/areas/device-table/device-table.area.tsx) |
| **Delegate Component** (injectable slot) | [`device-table-actions.delegate.tsx`](./src/(modules)/device-dashboard/sections/dashboard-overview/areas/device-table/delegate-components/device-table-actions.delegate.tsx) |
| **State Management** (context + reducer) | [`state-management/dashboard-overview/`](./src/(modules)/device-dashboard/state-management/dashboard-overview/) | At module level — imported by both Page and Section |
| **API Service** | [`devices.api.ts`](./src/services/devices/devices.api.ts) |
| **Theme Component** | [`base-box.tsx`](./src/theme/components/base-box.tsx) |
| **Shared Feature** | [`header.page.tsx`](./src/(shared)/header/header.page.tsx) |

## Architecture rules shown

- **Page**: Purely a Section container. No business logic, no API calls (CSR).
- **Section**: Owns state via Context + useReducer. Fetches shared data. Provides it to Areas.
- **Area**: Subscribes to Section context. Contains business logic. Calls its own specific APIs.
- **Delegate Component**: Injectable action button in a table. Receives row data as **props**.
- **No props in the architectural chain**: Page→Section→Area uses context only.
- **Module isolation**: ESLint `no-restricted-imports` prevents importing sibling modules.

## Quick start

```bash
cd examples/react-vite
npm install
npm run dev        # Start dev server
npm run lint       # Check ESLint rules (FFD module boundaries enforced)
npm run build      # Production build
```

## Key things to note

- The **Section** wraps itself with its own provider: `<DashboardOverviewProvider>`.
- The **Area** uses `useDashboardOverview()` to read state — no props from the Section.
- The **Delegate** (`DeviceTableActions`) receives `device` and `onStatusChange` as props — this is allowed because delegates are injectable.
- Theme components (`BaseBox`) wrap the UI library. No direct `@mantine/core` imports in any module.
- Models are split: `device.models.ts` (domain) in the module, `device-response.models.ts` (API DTOs) next to the API service.
