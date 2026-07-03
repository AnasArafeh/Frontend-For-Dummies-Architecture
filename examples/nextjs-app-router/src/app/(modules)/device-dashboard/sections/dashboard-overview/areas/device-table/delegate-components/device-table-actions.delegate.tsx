'use client';

import { BaseButton } from '@/app/theme/components/base-button';
import type { Device } from '@/app/(modules)/device-dashboard/models/device-models';

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
