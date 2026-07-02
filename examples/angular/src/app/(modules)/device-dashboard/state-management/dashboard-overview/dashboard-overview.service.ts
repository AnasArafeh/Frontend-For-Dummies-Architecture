// Section state service — Angular equivalent of React Context + useReducer.
// Each Section provides its own instance via component `providers: []`.
// Areas inject this service to read/write state. No @Input() needed.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DashboardState, initialDashboardState } from './dashboard-overview.models';

@Injectable()
export class DashboardOverviewService {
  private state = new BehaviorSubject<DashboardState>(initialDashboardState);

  readonly state$: Observable<DashboardState> = this.state.asObservable();
  readonly devices$ = this.state.pipe(map((s) => s.devices));
  readonly stats$ = this.state.pipe(map((s) => s.stats));
  readonly loading$ = this.state.pipe(map((s) => s.loading));
  readonly error$ = this.state.pipe(map((s) => s.error));

  // Key/value patch — same pattern as React reducer
  private patch(partial: Partial<DashboardState>): void {
    this.state.next({ ...this.state.value, ...partial });
  }

  setDevices(data: DashboardState['devices']): void {
    this.patch({ devices: data });
  }

  setStats(data: DashboardState['stats']): void {
    this.patch({ stats: data });
  }

  setLoading(data: DashboardState['loading']): void {
    this.patch({ loading: data });
  }

  setError(data: DashboardState['error']): void {
    this.patch({ error: data });
  }
}
