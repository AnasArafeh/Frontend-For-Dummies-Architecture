import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseButton } from '@/app/theme/components/base-button';
import { Device } from '@/app/(modules)/device-dashboard/state-management/dashboard-overview/dashboard-overview.models';

@Component({
  selector: 'app-device-table-actions',
  standalone: true,
  imports: [BaseButton],
  templateUrl: './device-table-actions.delegate.html',
})
export class DeviceTableActions {
  @Input() device!: Device;
  @Output() toggle = new EventEmitter<string>();
}
