// Area: Business logic. CAN call its own specific APIs (e.g., POST).

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box';
import { updateDeviceStatus } from '@/services/devices/devices.api';
import { DashboardOverviewContext } from '../../../../state-management/dashboard-overview/dashboard-overview.reducer';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

export function DeviceTableArea() {
  const { state, setError, setDevices } = useContext(DashboardOverviewContext);

  if (state.devices.length === 0) return <BaseBox>No devices.</BaseBox>;

  return (
    <BaseBox>
      <h3>Devices</h3>
      {state.devices.map((d) => (
        <p key={d.id}>
          {d.name} — {d.status}{' '}
          <DeviceTableActions device={d} onToggle={(id) => {
            updateDeviceStatus(id, 'toggled')
              .then(() => setDevices(state.devices.map((dev) => dev.id === id ? { ...dev, status: 'offline' as const } : dev)))
              .catch((err) => setError(err.message));
          }} />
        </p>
      ))}
    </BaseBox>
  );
}
