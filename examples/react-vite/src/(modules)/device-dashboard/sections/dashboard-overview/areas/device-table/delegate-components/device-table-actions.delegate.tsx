import { BaseButton } from '@/theme/components/base-button';
import type { Device } from '@/(modules)/device-dashboard/models/device-models';

interface DeviceTableActionsProps {
  device: Device;
  onToggle: (id: string) => void;
}

export function DeviceTableActions({ device, onToggle }: DeviceTableActionsProps) {
  return <BaseButton onClick={() => onToggle(device.id)}>Toggle</BaseButton>;
}
