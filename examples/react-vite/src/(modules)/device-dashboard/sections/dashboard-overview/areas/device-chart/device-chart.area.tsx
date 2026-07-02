// Area: Business logic for the device distribution chart.
// Subscribes to Section context for shared stats data.

import { BaseBox } from '@/theme/components/base-box';
import { useDashboardOverview } from '../../../state-management/dashboard-overview/dashboard-overview.reducer';

export function DeviceChartArea() {
  const { state } = useDashboardOverview();

  if (!state.stats) return null;

  const total = state.stats.total || 1; // avoid div by zero

  return (
    <BaseBox>
      <h3>Device Distribution</h3>
      <p>Online: {((state.stats.online / total) * 100).toFixed(0)}%</p>
      <p>Offline: {((state.stats.offline / total) * 100).toFixed(0)}%</p>
      <p>Warning: {((state.stats.warnings / total) * 100).toFixed(0)}%</p>
    </BaseBox>
  );
}
