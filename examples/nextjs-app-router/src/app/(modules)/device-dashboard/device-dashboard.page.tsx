// Next.js Page: Server Component (no "use client").
// OPTIONALLY fetches data server-side and hydrates the Section provider.
// Sections still own their data — prefetching is an optimization.
// Next.js fetch deduplication: calling the same endpoint in multiple
// server components = one network request.

import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverview } from './sections/dashboard-overview/dashboard-overview.section';
import { DashboardOverviewProvider } from './state-management/dashboard-overview/dashboard-overview.reducer';
import { fetchDevices } from '@/app/services/devices/devices.api';

export default async function DeviceDashboardPage() {
  // Optional server-side prefetch
  const response = await fetchDevices();

  const initialData = {
    devices: response.devices.map((dto) => ({
      id: dto.id,
      name: dto.name,
      type: dto.type,
      status: dto.status,
      batteryLevel: dto.battery_level,
      lastSeen: dto.last_seen,
      location: dto.location,
    })),
    loading: false,
    stats: {
      total: response.total,
      online: response.devices.filter((d) => d.status === 'online').length,
      offline: response.devices.filter((d) => d.status === 'offline').length,
      warnings: response.devices.filter((d) => d.status === 'warning').length,
      averageBattery:
        response.devices.reduce((sum, d) => sum + d.battery_level, 0) /
        (response.devices.length || 1),
    },
  };

  return (
    <BaseBox>
      <h1>Device Dashboard</h1>
      {/* Hydrate the Section provider with server-fetched data */}
      <DashboardOverviewProvider initialData={initialData}>
        <DashboardOverview />
      </DashboardOverviewProvider>
    </BaseBox>
  );
}
