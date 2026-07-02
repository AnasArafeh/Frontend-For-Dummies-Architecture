// Delegate Component: Injectable action button for the device table.
// Each table instance injects different actions via this delegate.
// Receives row data as PROPS from the table host (this IS allowed — delegate rule).

import { Device } from '../../../../models/device.models';
import { BaseButton } from '@/theme/components/base-button';

export interface DeviceTableActionsProps {
  device: Device;
  onStatusChange: (id: string, status: Device['status']) => void;
}

// Default action delegate — toggle online/offline
export function DeviceTableActions({ device, onStatusChange }: DeviceTableActionsProps) {
  return (
    <BaseButton
      onClick={() =>
        onStatusChange(
          device.id,
          device.status === 'online' ? 'offline' : 'online'
        )
      }
    >
      {device.status === 'online' ? 'Set Offline' : 'Set Online'}
    </BaseButton>
  );
}
