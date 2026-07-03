'use client';

// Section: Area container + data fetching. "The orchestrator."
// If Page passed initialData (SSR), skips fetch. Otherwise fetches on mount.

import { useContext, useEffect } from 'react';
import { BaseBox } from '@/app/theme/components/base-box';
import { fetchDevices } from '@/app/services/devices/devices.api';
import { DashboardOverviewContext } from '../../state-management/dashboard-overview/dashboard-overview.reducer';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';

export function DashboardOverview() {
  const { state, setDevices, setStats, setLoading, setError } = useContext(DashboardOverviewContext);

  useEffect(() => {
    if (!state.loading || state.devices.length > 0) return; // SSR data present
    setLoading(true);
    fetchDevices()
      .then((res) => {
        const devices = res.devices.map((d) => ({ id: d.id, name: d.name, status: d.status }));
        setDevices(devices);
        setStats({
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warnings: devices.filter((d) => d.status === 'warning').length,
          averageBattery: 0,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (state.loading) return <BaseBox>Loading...</BaseBox>;
  if (state.error) return <BaseBox>Error: {state.error}</BaseBox>;

  return (
    <BaseBox>
      <DeviceStatsArea />
      <DeviceTableArea />
    </BaseBox>
  );
}
