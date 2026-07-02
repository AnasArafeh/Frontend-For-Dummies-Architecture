// Next.js Page: Server Component (no "use client"). Optional server prefetch.
// Imports Provider from state-management to wrap the Section.

import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverviewProvider } from './state-management/dashboard-overview/dashboard-overview.reducer';
import { DashboardOverview } from './sections/dashboard-overview/dashboard-overview.section';
import { fetchDevices } from '@/app/services/devices/devices.api';

export default async function DeviceDashboardPage() {
  // Optional SSR prefetch — hydrate provider with server data
  const response = await fetchDevices();
  const devices = response.devices.map((d) => ({ id: d.id, name: d.name, status: d.status }));

  return (
    <BaseBox>
      <h1>Device Dashboard</h1>
      <DashboardOverviewProvider
        initialData={{
          devices,
          loading: false,
          stats: { total: devices.length, online: devices.filter((d) => d.status === 'online').length },
        }}
      >
        <DashboardOverview />
      </DashboardOverviewProvider>
    </BaseBox>
  );
}
