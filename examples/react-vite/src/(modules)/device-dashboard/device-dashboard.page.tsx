// Page: Section container. No business logic, no API calls (CSR).
// Imports Provider from state-management to wrap the Section.

import { BaseBox } from '@/theme/components/base-box';
import { DashboardOverviewProvider } from './state-management/dashboard-overview/dashboard-overview.reducer';
import { DashboardOverview } from './sections/dashboard-overview/dashboard-overview.section';

export function DeviceDashboardPage() {
  return (
    <BaseBox>
      <BaseBox component="h1">Device Dashboard</BaseBox>
      <DashboardOverviewProvider>
        <DashboardOverview />
      </DashboardOverviewProvider>
    </BaseBox>
  );
}
