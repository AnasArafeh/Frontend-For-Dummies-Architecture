// Area: Business logic. CAN call its own specific APIs.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

@Component({
  selector: 'app-device-table-area',
  standalone: true,
  imports: [DeviceTableActions],
  template: `
    <h3>Devices</h3>
    @if (service.devices().length === 0) {
      <p>No devices.</p>
    } @else {
      @for (d of service.devices(); track d.id) {
        <p>
          {{ d.name }} — {{ d.status }}
          <app-device-table-actions
            [device]="d"
            (toggle)="onToggle($event)"
          />
        </p>
      }
    }
  `,
})
export class DeviceTableArea {
  service = inject(DashboardOverviewService);
  private devicesApi = inject(DevicesApiService);

  onToggle(id: string): void {
    this.devicesApi
      .updateDeviceStatus(id, 'toggled')
      .then(() => {
        this.service.setDevices(
          this.service.devices().map((dev) =>
            dev.id === id ? { ...dev, status: 'offline' as const } : dev,
          ),
        );
      })
      .catch((err) => this.service.setError(err.message));
  }
}
