import { Component, Input } from '@angular/core';
import { HeaderMainSection } from './sections/header-main/header-main.section';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [HeaderMainSection],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderPage {
  @Input() cartCount = 0;
  @Input() onSearch = (query: string) => {};
}
