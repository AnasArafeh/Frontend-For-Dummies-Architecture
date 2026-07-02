// Delegate Component: Injectable action button for device table rows.
// Receives data via @Input() — delegates are allowed to receive props.

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-device-table-actions',
  standalone: true,
  template: `
    <button (click)="onToggle()">
      {{ status === 'online' ? 'Set Offline' : 'Set Online' }}
    </button>
  `,
})
export class DeviceTableActions {
  @Input() status!: string;
  @Input() deviceId!: string;
  @Output() statusChange = new EventEmitter<{ id: string; status: string }>();

  onToggle(): void {
    const newStatus = this.status === 'online' ? 'offline' : 'online';
    this.statusChange.emit({ id: this.deviceId, status: newStatus });
  }
}
