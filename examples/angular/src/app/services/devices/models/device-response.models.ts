// API response models — lives next to the API service

export interface DeviceListResponse {
  devices: DeviceDTO[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DeviceDTO {
  id: string;
  name: string;
  type: 'sensor' | 'gateway' | 'controller';
  status: 'online' | 'offline' | 'warning';
  battery_level: number;
  last_seen: string;
  location: string;
}
