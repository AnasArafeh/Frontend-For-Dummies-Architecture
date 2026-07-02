// Section-level state: actions and action creators

import { Device, DeviceStats } from '../../models/device.models';

export const DASHBOARD_ACTIONS = {
  SET_DEVICES: 'SET_DEVICES',
  SET_STATS: 'SET_STATS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  UPDATE_DEVICE_STATUS: 'UPDATE_DEVICE_STATUS',
} as const;

export type DashboardAction =
  | { type: typeof DASHBOARD_ACTIONS.SET_DEVICES; payload: Device[] }
  | { type: typeof DASHBOARD_ACTIONS.SET_STATS; payload: DeviceStats }
  | { type: typeof DASHBOARD_ACTIONS.SET_LOADING; payload: boolean }
  | { type: typeof DASHBOARD_ACTIONS.SET_ERROR; payload: string | null }
  | {
      type: typeof DASHBOARD_ACTIONS.UPDATE_DEVICE_STATUS;
      payload: { id: string; status: Device['status'] };
    };

export const dashboardActions = (dispatch: React.Dispatch<DashboardAction>) => ({
  setDevices: (devices: Device[]) =>
    dispatch({ type: DASHBOARD_ACTIONS.SET_DEVICES, payload: devices }),
  setStats: (stats: DeviceStats) =>
    dispatch({ type: DASHBOARD_ACTIONS.SET_STATS, payload: stats }),
  setLoading: (loading: boolean) =>
    dispatch({ type: DASHBOARD_ACTIONS.SET_LOADING, payload: loading }),
  setError: (error: string | null) =>
    dispatch({ type: DASHBOARD_ACTIONS.SET_ERROR, payload: error }),
  updateDeviceStatus: (id: string, status: Device['status']) =>
    dispatch({ type: DASHBOARD_ACTIONS.UPDATE_DEVICE_STATUS, payload: { id, status } }),
});
