// Section-level state: reducer + context + provider
// ONE Section = ONE state instance. Different Sections = different state.

import React, { createContext, useContext, useReducer } from 'react';
import { Device, DeviceStats } from '../../models/device.models';
import {
  DashboardAction,
  DASHBOARD_ACTIONS,
  dashboardActions,
} from './dashboard-overview.actions';

// --- State Interface ---
export interface DashboardOverviewState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

// --- Initial State ---
const initialState: DashboardOverviewState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};

// --- Reducer ---
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
          d.id === action.payload.id
            ? { ...d, status: action.payload.status }
            : d
        ),
      };
    default:
      return state;
  }
}

// --- Context ---
interface DashboardContextValue {
  state: DashboardOverviewState;
  actions: ReturnType<typeof dashboardActions>;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

// --- Provider ---
// Accepts optional initialData for SSR hydration (Next.js).
// In CSR, Section fetches its own data after mount.

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

// --- Hook (used by Areas) ---
export function useDashboardOverview() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error(
      'useDashboardOverview must be used within DashboardOverviewProvider'
    );
  }
  return ctx;
}
