// Area: Business logic. CAN call its own specific APIs.

import { Component, inject } from '@angular/core';
import { DashboardOverviewService } from '../../../../state-management/dashboard-overview/dashboard-overview.service';
import { DevicesApiService } from '@/app/services/devices/devices.api';
import { DeviceTableActions } from './delegate-components/device-table-actions.delegate';

@Component({
  selector: 'app-device-table-area',
  standalone: true,
  imports: [DeviceTableActions],
  templateUrl: './device-table.area.html',
})
export class DeviceTableArea {
  dashboardOverviewStateManagement = inject(DashboardOverviewService);
  private devicesApi = inject(DevicesApiService);

  onToggle(id: string): void {
    this.devicesApi
      .updateDeviceStatus(id, 'toggled')
      .then(() => {
        this.dashboardOverviewStateManagement.devices.set(
          this.dashboardOverviewStateManagement.devices().map((dev) =>
            dev.id === id ? { ...dev, status: 'offline' as const } : dev,
          ),
        );
      })
      .catch((err) => this.dashboardOverviewStateManagement.error.set(err.message));
  }
}
