import { Component, Input } from '@angular/core';
import type { RelatedProduct } from '../../../../../../models/product.models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: RelatedProduct;

  getStars(score: number): string {
    return '★'.repeat(Math.round(score));
  }
}
