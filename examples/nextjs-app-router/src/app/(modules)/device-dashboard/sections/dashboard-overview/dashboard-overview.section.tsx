'use client';

// Section: Area container + state provider. "The orchestrator."
// If the Page passed initialData (SSR), this skips the fetch.
// If no initialData (page rendered without prefetch), fetches on mount.

import { useEffect } from 'react';
import { BaseBox } from '@/app/theme/components/base-box';
import { fetchDevices } from '@/app/services/devices/devices.api';
import { Device } from '../../models/device.models';
import { useDashboardOverview } from '../../state-management/dashboard-overview/dashboard-overview.reducer';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';
import { DeviceChartArea } from './areas/device-chart/device-chart.area';

export function DashboardOverview() {
  const { state, actions } = useDashboardOverview();

  useEffect(() => {
    // If data already provided by SSR, skip the fetch
    if (!state.loading || state.devices.length > 0) return;

    actions.setLoading(true);
    fetchDevices()
      .then((response) => {
        const devices: Device[] = response.devices.map((dto) => ({
          id: dto.id, name: dto.name, type: dto.type, status: dto.status,
          batteryLevel: dto.battery_level, lastSeen: dto.last_seen, location: dto.location,
        }));
        actions.setDevices(devices);
        actions.setStats({
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warnings: devices.filter((d) => d.status === 'warning').length,
          averageBattery: devices.reduce((sum, d) => sum + d.batteryLevel, 0) / devices.length,
        });
      })
      .catch((err) => actions.setError(err.message))
      .finally(() => actions.setLoading(false));
  }, []);

  if (state.loading) return <BaseBox>Loading devices...</BaseBox>;
  if (state.error) return <BaseBox>Error: {state.error}</BaseBox>;

  return (
    <BaseBox>
      <DeviceStatsArea />
      <DeviceTableArea />
      <DeviceChartArea />
    </BaseBox>
  );
}
