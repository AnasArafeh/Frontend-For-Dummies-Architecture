import { Component } from '@angular/core';

@Component({
  selector: 'app-base-box',
  standalone: true,
  template: '<ng-content />',
  styleUrls: ['./base-box.scss'],
})
export class BaseBox {}
