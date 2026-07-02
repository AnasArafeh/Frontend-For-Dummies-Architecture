// Area: Business logic. Optional — not rendered in current Section to keep minimal.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-chart-area',
  standalone: true,
  template: `
    <h3>Chart</h3>
    <p>Online: {{ (service.onlineDevices() / (service.totalDevices() || 1) * 100).toFixed(0) }}%</p>
  `,
})
export class DeviceChartArea {
  service = inject(DashboardOverviewService);
}
