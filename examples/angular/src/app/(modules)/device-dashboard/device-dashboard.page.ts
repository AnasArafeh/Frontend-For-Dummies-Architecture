// Angular Page: Section container + layout. No data fetching.
// Purely arranges Sections on the screen.
// Data fetching happens in the Section's service.

import { Component } from '@angular/core';

@Component({
  selector: 'app-device-dashboard-page',
  standalone: true,
  template: `
    <h1>Device Dashboard</h1>
    <app-dashboard-overview />
  `,
})
export class DeviceDashboardPage {}
