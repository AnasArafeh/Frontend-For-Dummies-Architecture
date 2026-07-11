'use client';

// Segment: Protection plans / warranty selection.
// Part of the ProductPurchaseArea — shows warranty checkboxes.
// Subscribes to context — NO props from parent Area.
// Toggle logic lives here (business logic belongs in Areas/Segments per FFD).

import type { ProtectionPlan } from '../../../../../../models/product.models';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { useContext } from 'react';
import { ProductShowcaseContext } from '../../../../../../state-management/product-showcase/product-showcase.reducer';
import styles from './protection-plans.segment.module.scss';

export function ProtectionPlansSegment() {
  const { state, setProtectionPlans } = useContext(ProductShowcaseContext);
  const { protectionPlans } = state;

  const handleTogglePlan = (planId: string) => {
    const updated = protectionPlans.map(plan => (plan.id === planId ? { ...plan, selected: !plan.selected } : plan));
    setProtectionPlans(updated);
  };

  const renderPlan = (plan: ProtectionPlan) => (
    <BaseBox
      key={plan.id}
      className={styles['protection-plans-row']}
    >
      <BaseBox
        component="input"
        type="checkbox"
        checked={plan.selected}
        onChange={() => handleTogglePlan(plan.id)}
        className={styles['protection-plans-checkbox']}
        id={plan.id}
      />
      <BaseBox
        component="label"
        htmlFor={plan.id}
        className={styles['protection-plans-label']}
      >
        {plan.name} for AED {plan.price.toFixed(2)}
      </BaseBox>
    </BaseBox>
  );

  if (protectionPlans.length === 0) return null;

  return (
    <BaseBox>
      <BaseBox
        component="h4"
        className={styles['protection-plans-heading']}
      >
        Add a Protection Plan:
      </BaseBox>
      {protectionPlans.map(renderPlan)}
    </BaseBox>
  );
}
