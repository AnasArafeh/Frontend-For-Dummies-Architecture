'use client';

// Area: Business logic. Subscribes to context — no props from parent.

import { useContext } from 'react';
import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverviewContext } from '../../../../state-management/dashboard-overview/dashboard-overview.reducer';

export function DeviceStatsArea() {
  const { state } = useContext(DashboardOverviewContext);
  if (!state.stats) return null;

  return (
    <BaseBox>
      <BaseBox component="h3">Stats</BaseBox>
      <BaseBox component="p">Total: {state.stats.total} | Online: {state.stats.online}</BaseBox>
    </BaseBox>
  );
}
