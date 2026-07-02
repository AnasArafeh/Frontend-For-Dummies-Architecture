'use client';

// Section-level state: reducer + context + provider
// "use client" because this holds state. The Section and Areas are client components.
// The Page (server component) can optionally pass initialData for SSR hydration.

import React, { createContext, useContext, useReducer } from 'react';
import { Device, DeviceStats } from '../../models/device.models';
import { DashboardAction, DASHBOARD_ACTIONS, dashboardActions } from './dashboard-overview.actions';

export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardOverviewState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};

function dashboardReducer(
  state: DashboardOverviewState,
  action: DashboardAction
): DashboardOverviewState {
  switch (action.type) {
    case DASHBOARD_ACTIONS.SET_DEVICES:
      return { ...state, devices: action.payload };
    case DASHBOARD_ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    case DASHBOARD_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case DASHBOARD_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    case DASHBOARD_ACTIONS.UPDATE_DEVICE_STATUS:
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

const DashboardContext = createContext<{
  state: DashboardOverviewState;
  actions: ReturnType<typeof dashboardActions>;
} | null>(null);

// Provider accepts optional initialData for SSR hydration.
// When the Page prefetches data server-side, it passes it here.
// When skipped, the Section fetches data client-side on mount.
export function DashboardOverviewProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: Partial<DashboardOverviewState>;
}) {
  const mergedInitial = { ...initialState, ...initialData };
  const [state, dispatch] = useReducer(dashboardReducer, mergedInitial);
  const actions = dashboardActions(dispatch);

  return (
    <DashboardContext.Provider value={{ state, actions }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardOverview() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboardOverview must be used within DashboardOverviewProvider');
  }
  return ctx;
}
