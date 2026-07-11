import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-card',
  standalone: true,
  template: '<div [class]="className"><ng-content /></div>',
  styleUrls: ['./base-card.scss'],
})
export class BaseCard {
  @Input() className = '';
}
