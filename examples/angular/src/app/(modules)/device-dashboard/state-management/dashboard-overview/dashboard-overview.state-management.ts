// Section state — Angular signals, simple and flat.
// Each Section provides its own instance via component `providers: []`.
// Areas inject this service to read/write state. No @Input() needed.

import { Injectable, signal, computed } from '@angular/core';
import { Device } from './dashboard-overview.models';

@Injectable()
export class DashboardOverviewStateManagement {
  devices = signal<Device[]>([]);
  totalDevices = computed(() => this.devices().length);
  onlineDevices = computed(() => this.devices().filter((d) => d.status === 'online').length);

  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  reset(): void {
    this.devices.set([]);
    this.loading.set(true);
    this.error.set(null);
  }
}
