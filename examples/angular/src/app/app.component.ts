// App Root — renders the DeviceDashboardPage module.

import { Component } from '@angular/core';
import { BaseBox } from './theme/components/base-box';
import { DeviceDashboardPage } from './(modules)/device-dashboard/device-dashboard.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BaseBox, DeviceDashboardPage],
  template: `
    <app-base-box>FFD Angular Example</app-base-box>
    <app-device-dashboard-page />
  `,
})
export class AppComponent {}
