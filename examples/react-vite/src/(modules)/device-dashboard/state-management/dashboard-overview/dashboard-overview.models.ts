// State models — interfaces, action types, and context type for this Section.

import { Device, DeviceStats } from '../../models/device-models';

// --- Action Type ---
export const DASHBOARD_ACTION = 'DASHBOARD_ACTION';

// --- Action Interface ---
export interface IDashboardAction {
  type: string;
  payload: {
    key: keyof DashboardOverviewState;
    data: any;
  };
}

// --- State Interface ---
export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

// --- Context Interface ---
export interface IDashboardContext {
  state: DashboardOverviewState;
  setDevices: (devices: Device[]) => void;
  setStats: (stats: DeviceStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
