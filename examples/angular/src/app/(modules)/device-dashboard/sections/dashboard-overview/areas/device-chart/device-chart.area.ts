// Area: Business logic for device distribution chart.

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../dashboard-overview.service';

@Component({
  selector: 'app-device-chart-area',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <ng-container *ngIf="service.stats$ | async as stats">
      <h3>Device Distribution</h3>
      <p>Online: {{ (stats.online / (stats.total || 1) * 100).toFixed(0) }}%</p>
      <p>Offline: {{ (stats.offline / (stats.total || 1) * 100).toFixed(0) }}%</p>
      <p>Warning: {{ (stats.warnings / (stats.total || 1) * 100).toFixed(0) }}%</p>
    </ng-container>
  `,
})
export class DeviceChartArea {}
