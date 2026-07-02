// Delegate Component: injectable action. Receives row data as props (allowed).

import { Device } from '../../../../models/device.models';
import { BaseButton } from '@/theme/components/base-button';

export function DeviceTableActions({ device, onToggle }: { device: Device; onToggle: (id: string) => void }) {
  return <BaseButton onClick={() => onToggle(device.id)}>Toggle</BaseButton>;
}
