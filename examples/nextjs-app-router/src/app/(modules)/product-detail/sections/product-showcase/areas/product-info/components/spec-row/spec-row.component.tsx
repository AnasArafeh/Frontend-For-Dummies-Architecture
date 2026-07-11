'use client';

// Private Component: Spec table row. Receives label/value as PROPS.

import { BaseBox } from '@/theme/components/base-box/base-box';
import styles from './spec-row.component.module.scss';

interface SpecRowProps {
  label: string;
  value: string;
}

export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <BaseBox className={styles['spec-row']}>
      <BaseBox className={styles['spec-row-label']}>{label}</BaseBox>
      <BaseBox className={styles['spec-row-value']}>{value}</BaseBox>
    </BaseBox>
  );
}
