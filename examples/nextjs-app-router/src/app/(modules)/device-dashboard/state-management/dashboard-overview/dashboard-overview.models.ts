// State models — interfaces, action types, and context type for this Section.

import { Device, DeviceStats } from '../../models/device.models';

export const DASHBOARD_ACTION = 'DASHBOARD_ACTION';

export enum DashboardActionType {
  SET_DEVICES = 'SET_DEVICES',
  SET_STATS = 'SET_STATS',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
  UPDATE_DEVICE_STATUS = 'UPDATE_DEVICE_STATUS',
}

export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardOverviewContext {
  state: DashboardOverviewState;
  setDevices: (devices: Device[]) => void;
  setStats: (stats: DeviceStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateDeviceStatus: (id: string, status: Device['status']) => void;
}
