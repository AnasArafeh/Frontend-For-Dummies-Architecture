// Page: Section container + layout. The module entry point.
// In CSR (React Vite): no API calls, no business logic.
// Purely arranges Sections on the screen.

import { BaseBox } from '@/theme/components/base-box';
import { DashboardOverview } from './sections/dashboard-overview/dashboard-overview.section';

export function DeviceDashboardPage() {
  return (
    <BaseBox>
      <h1>Device Dashboard</h1>
      <DashboardOverview />
    </BaseBox>
  );
}
