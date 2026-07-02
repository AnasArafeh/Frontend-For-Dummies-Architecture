import { DeviceListResponse, DeviceDTO } from './models/device-response.models';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/devices';

export function fetchDevices(): Promise<DeviceListResponse> {
  return fetch(BASE_URL, { next: { revalidate: 60 } })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: DeviceListResponse) => data);
}

export function fetchDeviceById(id: string): Promise<DeviceDTO> {
  return fetch(`${BASE_URL}/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: DeviceDTO) => data);
}

export function updateDeviceStatus(
  id: string,
  status: string
): Promise<void> {
  return fetch(`${BASE_URL}/${id}/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });
}
