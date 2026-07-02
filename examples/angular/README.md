# FFD Example — Angular

This is a **pull-ready** example of the FFD architecture implemented with Angular.

## What this demonstrates

Angular adapts FFD's patterns using its native primitives: services for state, dependency injection for provider scoping, and standalone components.

| Concept | File | Key Note |
|---|---|---|
| **Page** (Section container) | [`device-dashboard.page.ts`](./src/app/(modules)/device-dashboard/device-dashboard.page.ts) | No data fetching. Pure container. |
| **Section Service** (state) | [`dashboard-overview.service.ts`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/dashboard-overview.service.ts) | RxJS `BehaviorSubject`. Scoped at Section level. |
| **Section Component** | [`dashboard-overview.section.ts`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/dashboard-overview.section.ts) | `providers: [DashboardOverviewService]` — new instance per Section. Fetches shared data. |
| **Area** | [`device-table.area.ts`](./src/app/(modules)/device-dashboard/sections/dashboard-overview/areas/device-table/device-table.area.ts) | `inject(DashboardOverviewService)` — subscribes to state. Calls own APIs. |
| **API Service** | [`devices.api.ts`](./src/app/services/devices/devices.api.ts) | `providedIn: 'root'` — singleton, shared across modules. |

## FFD patterns in Angular

| FFD Concept | Angular Implementation |
|---|---|
| Section state provider | `@Injectable()` service in `providers: []` at Section component |
| Area subscribing to state | `inject(SectionService)` + `async` pipe in template |
| No props in chain | No `@Input()` on Areas. All data through injected services. |
| Module isolation | ESLint `no-restricted-imports` prevents importing sibling modules |
| Delegate Components | `@Input()` on the delegate for row data (allowed — delegates take props) |

## Quick start

```bash
cd examples/angular
npm install
npm start          # ng serve
npm run build      # Production build
```
