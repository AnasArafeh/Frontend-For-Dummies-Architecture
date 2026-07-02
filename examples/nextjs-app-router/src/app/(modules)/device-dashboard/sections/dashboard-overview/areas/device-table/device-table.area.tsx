'use client';

// Area: Business logic for the device table. Can call its own specific APIs.

import { BaseBox } from '@/app/theme/components/base-box';
import { useDashboardOverview } from '../../dashboard-overview.reducer';
import { updateDeviceStatus } from '@/app/services/devices/devices.api';
import { Device } from '../../../../models/device.models';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

export function DeviceTableArea() {
  const { state, actions } = useDashboardOverview();

  const handleStatusChange = (id: string, status: Device['status']) => {
    updateDeviceStatus(id, status)
      .then(() => actions.updateDeviceStatus(id, status))
      .catch((err) => actions.setError(err.message));
  };

  if (state.devices.length === 0) return <BaseBox>No devices found.</BaseBox>;

  return (
    <BaseBox>
      <h3>Devices</h3>
      <table>
        <thead>
          <tr><th>Name</th><th>Type</th><th>Status</th><th>Battery</th><th>Location</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {state.devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td><td>{device.type}</td><td>{device.status}</td>
              <td>{device.batteryLevel}%</td><td>{device.location}</td>
              <td><DeviceTableActions device={device} onStatusChange={handleStatusChange} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseBox>
  );
}
