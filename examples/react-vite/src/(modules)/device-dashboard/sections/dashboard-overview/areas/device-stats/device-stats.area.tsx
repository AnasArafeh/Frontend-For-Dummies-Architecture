// Area: Business logic. Subscribes to Section context — NO props from parent.

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box';
import { DashboardOverviewContext } from '../../../../state-management/dashboard-overview/dashboard-overview.reducer';

export function DeviceStatsArea() {
  const { state } = useContext(DashboardOverviewContext);
  if (!state.stats) return null;

  return (
    <BaseBox>
      <h3>Stats</h3>
      <p>Total: {state.stats.total} | Online: {state.stats.online}</p>
    </BaseBox>
  );
}
