// Angular Area: Business logic for device table.
// Injects the Section's state service — NO @Input() from parent.
// CAN call its own specific APIs (POST operations).

import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { DashboardOverviewService } from '../../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';

@Component({
  selector: 'app-device-table-area',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>Devices</h3>
    <table *ngIf="service.devices$ | async as devices">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Battery</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let device of devices">
          <td>{{ device.name }}</td>
          <td>{{ device.type }}</td>
          <td>{{ device.status }}</td>
          <td>{{ device.batteryLevel }}%</td>
          <td>{{ device.location }}</td>
          <td>
            <button (click)="toggleStatus(device.id, device.status)">
              {{ device.status === 'online' ? 'Set Offline' : 'Set Online' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p *ngIf="(service.devices$ | async)?.length === 0">No devices found.</p>
  `,
})
export class DeviceTableArea {
  service = inject(DashboardOverviewService);
  private devicesApi = inject(DevicesApiService);

  toggleStatus(id: string, currentStatus: string): void {
    const newStatus = currentStatus === 'online' ? 'offline' : 'online';
    // Area calls its own specific API (POST operation)
    this.devicesApi
      .updateDeviceStatus(id, newStatus)
      .then(() => this.service.updateDeviceStatus(id, newStatus as any))
      .catch((err) => this.service.setError(err.message));
  }
}
