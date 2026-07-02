// Theme wrapper — single source of UI truth.
// Even a direct wrapper enforces control from one place.
// In Angular, theme components can wrap native elements or third-party components.

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-box',
  standalone: true,
  template: '<ng-content />',
  styles: [':host { display: block; }'],
})
export class BaseBox {
  @Input() component?: string; // semantic HTML tag if needed
}
