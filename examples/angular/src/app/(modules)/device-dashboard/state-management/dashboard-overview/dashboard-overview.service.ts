// Section state service — Angular signal-based state (Angular 17+).
// Each Section provides its own instance via component `providers: []`.
// Areas inject this service to read/write state. No @Input() needed.

import { Injectable, signal, computed } from '@angular/core';
import { DashboardState, initialDashboardState } from './dashboard-overview.models';

@Injectable()
export class DashboardOverviewService {
  private state = signal<DashboardState>(initialDashboardState);

  readonly devices = computed(() => this.state().devices);
  readonly stats = computed(() => this.state().stats);
  readonly loading = computed(() => this.state().loading);
  readonly error = computed(() => this.state().error);

  setDevices(data: DashboardState['devices']): void {
    this.state.update((s) => ({ ...s, devices: data }));
  }

  setStats(data: DashboardState['stats']): void {
    this.state.update((s) => ({ ...s, stats: data }));
  }

  setLoading(data: DashboardState['loading']): void {
    this.state.update((s) => ({ ...s, loading: data }));
  }

  setError(data: DashboardState['error']): void {
    this.state.update((s) => ({ ...s, error: data }));
  }

  // Direct state access for Areas that need the full state
  getState(): DashboardState {
    return this.state();
  }
}
