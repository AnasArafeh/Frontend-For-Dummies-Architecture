// State models — interfaces and state type for this Section.
// Domain models (Device, DeviceStats) go in ../../models/.

import { Device, DeviceStats } from '../../models/device.models';

export interface DashboardState {
  devices: Device[];
  stats: DeviceStats | null;
  loading: boolean;
  error: string | null;
}

export const initialDashboardState: DashboardState = {
  devices: [],
  stats: null,
  loading: true,
  error: null,
};
