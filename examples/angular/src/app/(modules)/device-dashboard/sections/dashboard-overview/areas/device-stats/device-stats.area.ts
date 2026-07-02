// Area: Business logic. Injects Section service — NO @Input() from parent.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-stats-area',
  standalone: true,
  template: `
    <h3>Stats</h3>
    <p>Total: {{ service.totalDevices() }} | Online: {{ service.onlineDevices() }}</p>
  `,
})
export class DeviceStatsArea {
  service = inject(DashboardOverviewService);
}
