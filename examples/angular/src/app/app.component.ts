// App Root — renders the DeviceDashboardPage module.

import { Component } from '@angular/core';
import { DeviceDashboardPage } from './(modules)/device-dashboard/device-dashboard.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DeviceDashboardPage],
  template: `
    <h1>FFD Angular Example</h1>
    <app-device-dashboard-page />
  `,
})
export class AppComponent {}
