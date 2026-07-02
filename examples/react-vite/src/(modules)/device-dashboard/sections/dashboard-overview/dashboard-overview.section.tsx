// Section: Area container + data fetching. "The orchestrator."
// Imports Context to read state, fetches shared API data on mount.

import { useContext, useEffect } from 'react';
import { BaseBox } from '@/theme/components/base-box';
import { fetchDevices } from '@/services/devices/devices.api';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';
import { DashboardOverviewContext } from '../../state-management/dashboard-overview/dashboard-overview.reducer';

export function DashboardOverview() {
  const { state, setDevices, setStats, setLoading, setError } = useContext(DashboardOverviewContext);

  useEffect(() => {
    setLoading(true);
    fetchDevices()
      .then((res) => {
        const devices = res.devices.map((d) => ({ id: d.id, name: d.name, status: d.status }));
        setDevices(devices);
        setStats({ total: devices.length, online: devices.filter((d) => d.status === 'online').length });
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
