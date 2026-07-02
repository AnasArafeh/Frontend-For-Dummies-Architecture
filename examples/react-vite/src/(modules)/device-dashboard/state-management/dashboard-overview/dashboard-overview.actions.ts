// Action creators — (dispatch) => (payload) => dispatch({ type, payload })

import { DashboardActionType, DashboardOverviewState } from './dashboard-overview.models';

interface DashboardAction {
  type: DashboardActionType;
  payload: any;
}

export const dashboardActions = (dispatch: React.Dispatch<DashboardAction>) => ({
  setDevices: (devices: DashboardOverviewState['devices']) =>
    dispatch({ type: DashboardActionType.SET_DEVICES, payload: devices }),

  setStats: (stats: DashboardOverviewState['stats']) =>
    dispatch({ type: DashboardActionType.SET_STATS, payload: stats }),

  setLoading: (loading: boolean) =>
    dispatch({ type: DashboardActionType.SET_LOADING, payload: loading }),

  setError: (error: string | null) =>
    dispatch({ type: DashboardActionType.SET_ERROR, payload: error }),

  updateDeviceStatus: (id: string, status: 'online' | 'offline' | 'warning') =>
    dispatch({ type: DashboardActionType.UPDATE_DEVICE_STATUS, payload: { id, status } }),
});
