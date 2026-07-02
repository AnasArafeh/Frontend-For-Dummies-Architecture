// Area: Business logic for displaying the device table.
// Uses a Delegate Component for row actions — the table provides the shell,
// the delegate provides the action button template.
// CAN call its own specific APIs (e.g., updating a device status).

import { BaseBox } from '@/theme/components/base-box';
import { useDashboardOverview } from '../../../state-management/dashboard-overview/dashboard-overview.reducer';
import { updateDeviceStatus } from '@/services/devices/devices.api';
import { Device } from '../../../../models/device.models';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

export function DeviceTableArea() {
  const { state, actions } = useDashboardOverview();

  const handleStatusChange = (id: string, status: Device['status']) => {
    // Area calls its own specific API (POST operation)
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
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Battery</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.devices.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.type}</td>
              <td>{device.status}</td>
              <td>{device.batteryLevel}%</td>
              <td>{device.location}</td>
              <td>
                {/* Delegate Component — receives row data as props */}
                <DeviceTableActions
                  device={device}
                  onStatusChange={handleStatusChange}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseBox>
  );
}
