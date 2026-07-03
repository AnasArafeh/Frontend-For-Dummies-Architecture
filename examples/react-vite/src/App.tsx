// FFD React Vite Example — App Root
// In a real app, this would contain routing, global providers, and layout.
// For this example, we render the DeviceDashboard module directly.

import { DeviceDashboardPage } from './(modules)/device-dashboard/device-dashboard.page';
import { HeaderPage } from './(shared)/header/header';

export function App() {
  return (
    <>
      <HeaderPage activeSection="dashboard" />
      <main>
        <DeviceDashboardPage />
      </main>
    </>
  );
}
