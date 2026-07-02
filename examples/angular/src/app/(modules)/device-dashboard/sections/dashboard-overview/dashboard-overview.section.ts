// Angular Section: Area container + provides the state service at this level.
// Each Section has its own service instance (provided in component providers).
// Fetches shared data that multiple Areas need.

import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from './dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [AsyncPipe],
  // Section-level provider — a new instance for this Section only
  providers: [DashboardOverviewService],
  template: `
    <ng-container *ngIf="service.loading$ | async; else loaded">
      Loading devices...
    </ng-container>

    <ng-template #loaded>
      <ng-container *ngIf="service.error$ | async as error; else content">
        Error: {{ error }}
      </ng-container>

      <ng-template #content>
        <app-device-stats-area />
        <app-device-table-area />
        <app-device-chart-area />
      </ng-template>
    </ng-template>
  `,
})
export class DashboardOverviewSection implements OnInit {
  constructor(
    public service: DashboardOverviewService,
    private devicesApi: DevicesApiService
  ) {}

  ngOnInit(): void {
    this.devicesApi
      .fetchDevices()
      .then((response) => {
        const devices = response.devices.map((dto) => ({
          id: dto.id,
          name: dto.name,
          type: dto.type,
          status: dto.status,
          batteryLevel: dto.battery_level,
          lastSeen: dto.last_seen,
          location: dto.location,
        }));
        this.service.setDevices(devices);
        this.service.setStats({
          total: devices.length,
          online: devices.filter((d) => d.status === 'online').length,
          offline: devices.filter((d) => d.status === 'offline').length,
          warnings: devices.filter((d) => d.status === 'warning').length,
          averageBattery:
            devices.reduce((sum, d) => sum + d.batteryLevel, 0) /
            (devices.length || 1),
        });
      })
      .catch((err) => this.service.setError(err.message))
      .finally(() => this.service.setLoading(false));
  }
}
