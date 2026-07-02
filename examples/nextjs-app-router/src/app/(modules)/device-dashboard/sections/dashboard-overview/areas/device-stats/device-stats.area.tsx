'use client';

// Area: Business logic for device statistics.
// Subscribes to Section context — NO props from parent.

import { BaseBox } from '@/app/theme/components/base-box';
import { useDashboardOverview } from '../../dashboard-overview.reducer';

export function DeviceStatsArea() {
  const { state } = useDashboardOverview();
  if (!state.stats) return null;

  return (
    <BaseBox>
      <h3>Device Overview</h3>
      <p>Total: {state.stats.total}</p>
      <p>Online: {state.stats.online}</p>
      <p>Offline: {state.stats.offline}</p>
      <p>Warnings: {state.stats.warnings}</p>
      <p>Avg Battery: {state.stats.averageBattery.toFixed(1)}%</p>
    </BaseBox>
  );
}
