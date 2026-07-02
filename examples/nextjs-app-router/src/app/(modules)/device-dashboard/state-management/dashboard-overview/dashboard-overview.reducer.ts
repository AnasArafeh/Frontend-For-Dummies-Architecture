'use client';

// Reducer + ContextCreator → exports Context and Provider

import { ContextCreator } from '@/app/state-management/context-creator';
import { DashboardActionType, DashboardOverviewState, DashboardOverviewContext } from './dashboard-overview.models';
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
    case DashboardActionType.UPDATE_DEVICE_STATUS:
      return {
        ...state,
        devices: state.devices.map((d) =>
          d.id === action.payload.id ? { ...d, status: action.payload.status } : d
        ),
      };
    default:
      return state;
  }
}

const { Context, Provider } = ContextCreator<DashboardOverviewState, ReturnType<typeof dashboardActions>>(
  dashboardReducer,
  dashboardActions,
  initialState
);

export const DashboardOverviewContext = Context;
export const DashboardOverviewProvider = Provider;
