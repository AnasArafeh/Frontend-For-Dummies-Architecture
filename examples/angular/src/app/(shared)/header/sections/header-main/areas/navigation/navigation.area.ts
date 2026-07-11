import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-area',
  standalone: true,
  templateUrl: './navigation.area.html',
  styleUrls: ['./navigation.area.scss'],
})
export class NavigationArea {
  @Input() cartCount = 0;
}
