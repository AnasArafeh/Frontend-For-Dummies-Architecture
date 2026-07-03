import { Component } from '@angular/core';

@Component({
  selector: 'app-base-button',
  standalone: true,
  template: '<button><ng-content /></button>',
  styleUrls: ['./base-button.scss'],
})
export class BaseButton {}
