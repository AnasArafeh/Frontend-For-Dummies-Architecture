// Area: Business logic for device statistics.
// Injects the Section's state service — NO @Input() from parent.

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../../state-management/dashboard-overview/dashboard-overview.service';

@Component({
  selector: 'app-device-stats-area',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <ng-container *ngIf="service.stats$ | async as stats">
      <h3>Device Overview</h3>
      <p>Total: {{ stats.total }}</p>
      <p>Online: {{ stats.online }}</p>
      <p>Offline: {{ stats.offline }}</p>
      <p>Warnings: {{ stats.warnings }}</p>
      <p>Avg Battery: {{ stats.averageBattery.toFixed(1) }}%</p>
    </ng-container>
  `,
})
export class DeviceStatsArea {
  service = inject(DashboardOverviewService);
}
