// Shared Feature: Header — follows Page→Section→Area structure.
// Receives configuration via @Input() at the Page boundary.

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-page',
  standalone: true,
  template: `
    <header>
      <nav>FFD Angular Example — {{ activeSection }}</nav>
    </header>
  `,
})
export class HeaderPage {
  @Input() activeSection = 'home';
  @Input() showSearch = true;
}
