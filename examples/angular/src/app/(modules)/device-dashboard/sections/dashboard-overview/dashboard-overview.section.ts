// Angular Section: Area container + data fetching. "The orchestrator."
// Provides the state service at this level so child Areas can inject it.

import { Component, OnInit } from '@angular/core';
import { DashboardOverviewService } from '../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';
import { DeviceStatsArea } from './areas/device-stats/device-stats.area';
import { DeviceTableArea } from './areas/device-table/device-table.area';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [DeviceStatsArea, DeviceTableArea],
  providers: [DashboardOverviewService],
  template: `
    @if (service.loading()) {
      Loading...
    } @else if (service.error()) {
      Error: {{ service.error() }}
    } @else {
      <app-device-stats-area />
      <app-device-table-area />
    }
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
        this.service.setDevices(
          res.devices.map((d) => ({ id: d.id, name: d.name, status: d.status })),
        );
      })
      .catch((err) => this.service.setError(err.message))
      .finally(() => this.service.setLoading(false));
  }
}
