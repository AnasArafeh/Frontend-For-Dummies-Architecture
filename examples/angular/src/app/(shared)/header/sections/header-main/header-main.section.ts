import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LogoArea } from './areas/logo/logo.area';
import { SearchArea } from './areas/search/search.area';
import { NavigationArea } from './areas/navigation/navigation.area';
import { UserMenuArea } from './areas/user-menu/user-menu.area';

@Component({
  selector: 'app-header-main-section',
  standalone: true,
  imports: [LogoArea, SearchArea, NavigationArea, UserMenuArea],
  templateUrl: './header-main.section.html',
  styleUrls: ['./header-main.section.scss'],
})
export class HeaderMainSection {
  @Input() cartCount = 0;
  @Output() onSearch = new EventEmitter<string>();
}
