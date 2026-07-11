'use client';

// Delegate Component — passed as a prop to BaseTable.
// BaseTable calls this with row data. NOT directly imported/rendered by any Area.
// This is the FFD delegate pattern: component-as-prop, host provides row context.

import { BaseButton } from '@/theme/components/base-button/base-button';
import type { ProductSpec } from '../../../../../../models/product.models';

interface SpecRowActionsProps {
  row: ProductSpec;
}

export function SpecRowActions({ row }: SpecRowActionsProps) {
  const handleEdit = () => {
    alert(`Edit: ${row.label}`);
  };

  return (
    <BaseButton
      onClick={handleEdit}
      size="xs"
      variant="subtle"
    >
      Edit
    </BaseButton>
  );
}
