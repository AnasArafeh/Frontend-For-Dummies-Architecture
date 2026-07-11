// Private Component: Spec table row. Receives label/value as PROPS.

import { BaseBox } from '@/theme/components/base-box/base-box';
import './spec-row.component.scss';

interface SpecRowProps {
  label: string;
  value: string;
}

export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <BaseBox className="spec-row">
      <BaseBox className="spec-row-label">{label}</BaseBox>
      <BaseBox className="spec-row-value">{value}</BaseBox>
    </BaseBox>
  );
}
