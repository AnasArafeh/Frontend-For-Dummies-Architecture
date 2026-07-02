// Reducer + ContextCreator → exports Context and Provider

import { ContextCreator } from '@/state-management/context-creator';
import { DASHBOARD_ACTION, IDashboardAction, DashboardOverviewState } from './dashboard-overview.models';
import { dashboardActions } from './dashboard-overview.actions';

const initialState: DashboardOverviewState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};

const setReducer = (state: DashboardOverviewState, action: IDashboardAction) => ({
  ...state,
  [action.payload.key]: action.payload.data,
});

export function DashboardReducer(state: DashboardOverviewState, action: IDashboardAction): DashboardOverviewState {
  switch (action.type) {
    case DASHBOARD_ACTION:
      return setReducer(state, action);
    default:
      return state;
  }
}

const { Context, Provider } = ContextCreator(DashboardReducer, dashboardActions, initialState);

export const DashboardOverviewContext = Context;
export const DashboardOverviewProvider = Provider;
