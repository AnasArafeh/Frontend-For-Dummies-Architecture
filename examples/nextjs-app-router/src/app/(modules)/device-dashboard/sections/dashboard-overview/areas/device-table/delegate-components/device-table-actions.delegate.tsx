'use client';

// Delegate Component: Injectable action button for device table rows.
// Receives row data as PROPS from the table host — delegates allow props.

import { Device } from '../../../../../models/device.models';
import { BaseButton } from '@/app/theme/components/base-button';

export interface DeviceTableActionsProps {
  device: Device;
  onStatusChange: (id: string, status: Device['status']) => void;
}

export function DeviceTableActions({ device, onStatusChange }: DeviceTableActionsProps) {
  return (
    <BaseButton
      onClick={() =>
        onStatusChange(device.id, device.status === 'online' ? 'offline' : 'online')
      }
    >
      {device.status === 'online' ? 'Set Offline' : 'Set Online'}
    </BaseButton>
  );
}
