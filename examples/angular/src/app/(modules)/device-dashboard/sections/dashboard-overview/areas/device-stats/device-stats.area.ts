// Area: Business logic. Injects Section service — NO @Input() from parent.

import { Component, inject } from '@angular/core';
import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverviewStateManagement } from '../../../../state-management/dashboard-overview/dashboard-overview.state-management';

@Component({
  selector: 'app-device-stats-area',
  standalone: true,
  imports: [BaseBox],
  templateUrl: './device-stats.area.html',
})
export class DeviceStatsArea {
  dashboardOverviewStateManagement = inject(DashboardOverviewStateManagement);
}
