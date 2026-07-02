// State models — interfaces for this Section's state.
// Domain models (Device) can live here or in ../../models/ when shared.

export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning';
}
