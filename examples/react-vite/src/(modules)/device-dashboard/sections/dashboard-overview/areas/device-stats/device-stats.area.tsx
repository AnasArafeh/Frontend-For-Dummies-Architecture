// Area: Business logic for displaying device statistics.
// Subscribes to Section context — NO props from parent.
// Can make its own API calls if needed.

import { BaseBox } from '@/theme/components/base-box';
import { useDashboardOverview } from '../state-management/dashboard-overview.reducer';

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
