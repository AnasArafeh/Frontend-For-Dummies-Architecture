import { Component } from '@angular/core';
import { BaseButton } from '@/app/theme/components/base-button';

@Component({
  selector: 'app-cart-actions-segment',
  standalone: true,
  imports: [BaseButton],
  templateUrl: './cart-actions.segment.html',
  styleUrls: ['./cart-actions.segment.scss'],
})
export class CartActionsSegment {}
