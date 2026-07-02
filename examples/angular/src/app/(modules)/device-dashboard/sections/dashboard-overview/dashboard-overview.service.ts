// Angular Section State: Each Section has its own injectable service.
// This is the Angular equivalent of React Context + useReducer.
// Components within this Section inject this service.

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Device {
  id: string;
  name: string;
  type: 'sensor' | 'gateway' | 'controller';
  status: 'online' | 'offline' | 'warning';
  batteryLevel: number;
  lastSeen: string;
  location: string;
}

export interface DeviceStats {
  total: number;
  online: number;
  offline: number;
  warnings: number;
  averageBattery: number;
}

interface DashboardState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};

@Injectable()
export class DashboardOverviewService {
  private state = new BehaviorSubject<DashboardState>(initialState);

  // --- Selectors (equivalent to context reads) ---
  readonly devices$ = this.state.pipe(map((s) => s.devices));
  readonly stats$ = this.state.pipe(map((s) => s.stats));
  readonly loading$ = this.state.pipe(map((s) => s.loading));
  readonly error$ = this.state.pipe(map((s) => s.error));

  // --- Actions (equivalent to dispatch) ---
  setDevices(devices: Device[]): void {
    this.patch({ devices });
  }

  setStats(stats: DeviceStats): void {
    this.patch({ stats });
  }

  setLoading(loading: boolean): void {
    this.patch({ loading });
  }

  setError(error: string | null): void {
    this.patch({ error });
  }

  updateDeviceStatus(id: string, status: Device['status']): void {
    const devices = this.state.value.devices.map((d) =>
      d.id === id ? { ...d, status } : d
    );
    this.patch({ devices });
  }

  private patch(partial: Partial<DashboardState>): void {
    this.state.next({ ...this.state.value, ...partial });
  }
}
