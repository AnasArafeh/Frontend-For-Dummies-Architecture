// Area: Business logic. Injects Section service — NO @Input() from parent.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-stats-area',
  standalone: true,
  templateUrl: './device-stats.area.html',
})
export class DeviceStatsArea {
  dashboardOverviewStateManagement = inject(DashboardOverviewService);
}
