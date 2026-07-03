import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverviewProvider } from './state-management/dashboard-overview/dashboard-overview.reducer';
import { DashboardOverview } from './sections/dashboard-overview/dashboard-overview.section';

export default function DeviceDashboardPage() {
  return (
    <BaseBox>
      <BaseBox component="h1">Device Dashboard</BaseBox>
      <DashboardOverviewProvider>
        <DashboardOverview />
      </DashboardOverviewProvider>
    </BaseBox>
  );
}
