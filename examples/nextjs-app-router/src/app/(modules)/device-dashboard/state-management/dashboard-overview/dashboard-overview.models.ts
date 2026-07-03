// State models — interfaces, action types, and context type for this Section.

import { Device, DeviceStats } from '../../models/device-models';

export const DASHBOARD_ACTION = 'DASHBOARD_ACTION';

export interface IDashboardAction {
  type: string;
  payload: {
    key: keyof DashboardOverviewState;
    data: any;
  };
}

export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

export interface IDashboardContext {
  state: DashboardOverviewState;
  setDevices: (devices: Device[]) => void;
  setStats: (stats: DeviceStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
