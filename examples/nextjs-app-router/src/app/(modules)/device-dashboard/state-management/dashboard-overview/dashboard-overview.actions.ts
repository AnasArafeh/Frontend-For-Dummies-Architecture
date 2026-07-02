// Action creators — each wraps data in { key, data } payload.

import { DASHBOARD_ACTION, IDashboardAction, DashboardOverviewState } from './dashboard-overview.models';

export const dashboardActions = (dispatch: React.Dispatch<IDashboardAction>) => ({
  setDevices: (data: DashboardOverviewState['devices']) =>
    dispatch({ type: DASHBOARD_ACTION, payload: { key: 'devices', data } }),

  setStats: (data: DashboardOverviewState['stats']) =>
    dispatch({ type: DASHBOARD_ACTION, payload: { key: 'stats', data } }),

  setLoading: (data: DashboardOverviewState['loading']) =>
    dispatch({ type: DASHBOARD_ACTION, payload: { key: 'loading', data } }),

  setError: (data: DashboardOverviewState['error']) =>
    dispatch({ type: DASHBOARD_ACTION, payload: { key: 'error', data } }),
});
