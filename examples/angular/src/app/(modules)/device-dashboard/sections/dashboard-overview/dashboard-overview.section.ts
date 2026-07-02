// Angular Section: Area container + data fetching. "The orchestrator."
// Provides the state service at this level so Areas can inject it.

import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [AsyncPipe, DeviceStatsArea, DeviceTableArea],
  providers: [DashboardOverviewService],
  template: `
    <ng-container *ngIf="service.loading$ | async; else loaded">
      Loading...
    </ng-container>

    <ng-template #loaded>
      <ng-container *ngIf="service.error$ | async as error; else content">
        Error: {{ error }}
      </ng-container>

      <ng-template #content>
        <app-device-stats-area />
        <app-device-table-area />
      </ng-template>
    </ng-template>
  `,
})
export class DashboardOverviewSection implements OnInit {
  constructor(
    public service: DashboardOverviewService,
    private devicesApi: DevicesApiService,
  ) {}

  ngOnInit(): void {
    this.devicesApi
      .fetchDevices()
      .then((res) => {
        const devices = res.devices.map((d) => ({
          id: d.id,
          name: d.name,
          status: d.status,
        }));
        this.service.setDevices(devices);
        this.service.setStats({
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
        });
      })
      .catch((err) => this.service.setError(err.message))
      .finally(() => this.service.setLoading(false));
  }
}
