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
      <BaseBox component="h3">Device Distribution</BaseBox>
      <BaseBox component="p">Online: {((state.stats.online / total) * 100).toFixed(0)}%</BaseBox>
      <BaseBox component="p">Offline: {((state.stats.offline / total) * 100).toFixed(0)}%</BaseBox>
      <BaseBox component="p">Warning: {((state.stats.warnings / total) * 100).toFixed(0)}%</BaseBox>
    </BaseBox>
  );
}
