// Area: Business logic. Optional — not rendered in current Section to keep minimal.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-chart-area',
  standalone: true,
  templateUrl: './device-chart.area.html',
})
export class DeviceChartArea {
  dashboardOverviewStateManagement = inject(DashboardOverviewService);
}
