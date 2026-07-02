// Angular Page: Section container + layout. No data fetching.
// Purely arranges Sections on the screen.

import { Component } from '@angular/core';
import { DashboardOverviewSection } from './sections/dashboard-overview/dashboard-overview.section';

@Component({
  selector: 'app-device-dashboard-page',
  standalone: true,
  imports: [DashboardOverviewSection],
  template: `
    <h1>Device Dashboard</h1>
    <app-dashboard-overview />
  `,
})
export class DeviceDashboardPage {}
