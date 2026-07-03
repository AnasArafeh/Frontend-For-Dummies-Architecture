export interface Device {
  id: string;
  name: string;
  type?: 'sensor' | 'gateway' | 'controller';
  status: 'online' | 'offline' | 'warning';
  batteryLevel?: number;
  lastSeen?: string;
  location?: string;
}

export interface DeviceStats {
  total: number;
  online: number;
  offline: number;
  warnings: number;
  averageBattery: number;
}
