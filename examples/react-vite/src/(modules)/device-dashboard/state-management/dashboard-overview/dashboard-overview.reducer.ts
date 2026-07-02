// Reducer + ContextCreator → exports Context and Provider

import { ContextCreator } from '@/state-management/context-creator';
import { DashboardActionType, DashboardOverviewState } from './dashboard-overview.models';
import { dashboardActions } from './dashboard-overview.actions';

const initialState: DashboardOverviewState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};

function dashboardReducer(state: DashboardOverviewState, action: { type: DashboardActionType; payload: any }): DashboardOverviewState {
  switch (action.type) {
    case DashboardActionType.SET_DEVICES:
      return { ...state, devices: action.payload };
    case DashboardActionType.SET_STATS:
      return { ...state, stats: action.payload };
    case DashboardActionType.SET_LOADING:
      return { ...state, loading: action.payload };
    case DashboardActionType.SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

const { Context, Provider } = ContextCreator(dashboardReducer, dashboardActions, initialState);

export const DashboardOverviewContext = Context;
export const DashboardOverviewProvider = Provider;
