// Area: Business logic. CAN call its own specific APIs.

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

@Component({
  selector: 'app-device-table-area',
  standalone: true,
  imports: [AsyncPipe, DeviceTableActions],
  template: `
    <h3>Devices</h3>
    <p *ngIf="(service.devices$ | async)?.length === 0">No devices.</p>
    <p *ngFor="let d of service.devices$ | async">
      {{ d.name }} — {{ d.status }}
      <app-device-table-actions
        [device]="d"
        (toggle)="onToggle($event)"
      />
    </p>
  `,
})
export class DeviceTableArea {
  service = inject(DashboardOverviewService);
  private devicesApi = inject(DevicesApiService);

  onToggle(id: string): void {
    this.devicesApi
      .updateDeviceStatus(id, 'toggled')
      .then(() => {
        const devices = this.service.state$.value.devices.map((dev) =>
          dev.id === id ? { ...dev, status: 'offline' as const } : dev,
        );
        this.service.setDevices(devices);
      })
      .catch((err) => this.service.setError(err.message));
  }
}
