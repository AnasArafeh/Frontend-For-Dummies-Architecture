// Angular API Service — organized by backend domain inside services/
// In a real app, provide HttpClient via provideHttpClient() in bootstrap.

import { Injectable } from '@angular/core';

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

@Injectable({ providedIn: 'root' })
export class DevicesApiService {
  private baseUrl = '/api/devices';

  fetchDevices(): Promise<DeviceListResponse> {
    return fetch(this.baseUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: DeviceListResponse) => data);
  }

  updateDeviceStatus(id: string, status: string): Promise<void> {
    return fetch(`${this.baseUrl}/${id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
    });
  }
}
