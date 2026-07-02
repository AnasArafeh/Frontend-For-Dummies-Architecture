// Delegate Component: injectable action. Receives data via @Input() — delegates allow props.

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-device-table-actions',
  standalone: true,
  template: `<button (click)="toggle.emit(device.id)">Toggle</button>`,
})
export class DeviceTableActions {
  @Input() device!: { id: string; status: string };
  @Output() toggle = new EventEmitter<string>();
}
