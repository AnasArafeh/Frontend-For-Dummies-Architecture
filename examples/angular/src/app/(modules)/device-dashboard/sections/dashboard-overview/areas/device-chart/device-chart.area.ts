// Area: Business logic. Kept as optional — not rendered in the current Section to keep minimal.
// Shows that Areas can be added/removed without affecting other Areas.

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-chart-area',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Chart</h3>
    <p *ngIf="service.stats$ | async as stats">
      Online: {{ (stats.online / (stats.total || 1) * 100).toFixed(0) }}%
    </p>
  `,
})
export class DeviceChartArea {
  service = inject(DashboardOverviewService);
}
