// Section: Area container + layout + state provider. "The orchestrator."
// Fetches shared data that multiple Areas need, provides it via context.
// No business logic — that's in Areas.

import { useEffect } from 'react';
import { BaseBox } from '@/theme/components/base-box';
import { fetchDevices } from '@/services/devices/devices.api';
import { Device } from '../../models/device.models';
import { DashboardOverviewProvider, useDashboardOverview } from './state-management/dashboard-overview.reducer';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';
import { DeviceChartArea } from './areas/device-chart/device-chart.area';

function DashboardOverviewInner() {
  const { state, actions } = useDashboardOverview();

  useEffect(() => {
    actions.setLoading(true);
    fetchDevices()
      .then((response) => {
        const devices: Device[] = response.devices.map((dto) => ({
          id: dto.id,
          name: dto.name,
          type: dto.type,
          status: dto.status,
          batteryLevel: dto.battery_level,
          lastSeen: dto.last_seen,
          location: dto.location,
        }));
        actions.setDevices(devices);

        // Compute shared stats (used by stats area + chart area)
        actions.setStats({
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warnings: devices.filter((d) => d.status === 'warning').length,
          averageBattery:
            devices.reduce((sum, d) => sum + d.batteryLevel, 0) /
            devices.length,
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

export function DashboardOverview() {
  return (
    <DashboardOverviewProvider>
      <DashboardOverviewInner />
    </DashboardOverviewProvider>
  );
}
