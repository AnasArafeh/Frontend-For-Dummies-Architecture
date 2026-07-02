// Area: Business logic. Injects Section service — NO @Input() from parent.

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-stats-area',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Stats</h3>
    <p *ngIf="service.stats$ | async as stats">
      Total: {{ stats.total }} | Online: {{ stats.online }}
    </p>
  `,
})
export class DeviceStatsArea {
  service = inject(DashboardOverviewService);
}
