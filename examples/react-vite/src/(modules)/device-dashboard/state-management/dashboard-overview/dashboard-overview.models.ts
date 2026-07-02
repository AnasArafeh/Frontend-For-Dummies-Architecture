// State models — interfaces, action types, and context type for this Section.
// Only state-related types live here. Domain models (Device, DeviceStats) go in ../models/.

import { Device, DeviceStats } from '../../models/device.models';

// --- Action Type Constant ---
export const DASHBOARD_ACTION = 'DASHBOARD_ACTION';

// --- Action Types Enum ---
export enum DashboardActionType {
  SET_DEVICES = 'SET_DEVICES',
  SET_STATS = 'SET_STATS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  UPDATE_DEVICE_STATUS = 'UPDATE_DEVICE_STATUS',
}

// --- State Interface ---
export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

// --- Context Interface ---
export interface DashboardOverviewContext {
  state: DashboardOverviewState;
  setDevices: (devices: Device[]) => void;
  setStats: (stats: DeviceStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateDeviceStatus: (id: string, status: Device['status']) => void;
}
