// Angular Page: Section container + layout. No data fetching.
// Purely arranges Sections on the screen.

import { Component } from '@angular/core';
import { BaseBox } from '@/app/theme/components/base-box';
import { DashboardOverviewSection } from './sections/dashboard-overview/dashboard-overview.section';

@Component({
  selector: 'app-device-dashboard-page',
  standalone: true,
  imports: [BaseBox, DashboardOverviewSection],
  templateUrl: './device-dashboard.page.html',
})
export class DeviceDashboardPage {}
