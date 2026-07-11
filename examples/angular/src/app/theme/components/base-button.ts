import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-button',
  standalone: true,
  templateUrl: './base-button.html',
  styleUrls: ['./base-button.scss'],
})
export class BaseButton {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}
