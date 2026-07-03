'use client';

// Area: Business logic for device distribution chart.

import { BaseBox } from '@/app/theme/components/base-box';
import { useDashboardOverview } from '../../../../state-management/dashboard-overview/dashboard-overview.reducer';

export function DeviceChartArea() {
  const { state } = useDashboardOverview();
  if (!state.stats) return null;

  const total = state.stats.total || 1;

  return (
    <BaseBox>
      <BaseBox component="h3">Device Distribution</BaseBox>
      <BaseBox component="p">Online: {((state.stats.online / total) * 100).toFixed(0)}%</BaseBox>
      <BaseBox component="p">Offline: {((state.stats.offline / total) * 100).toFixed(0)}%</BaseBox>
      <BaseBox component="p">Warning: {((state.stats.warnings / total) * 100).toFixed(0)}%</BaseBox>
    </BaseBox>
  );
}
