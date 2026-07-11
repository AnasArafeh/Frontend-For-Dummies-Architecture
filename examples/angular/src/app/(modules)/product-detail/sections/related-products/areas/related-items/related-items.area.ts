import { Component, inject } from '@angular/core';
import { RelatedProductsStateManagement } from '../../../../state-management/related-products/related-products.state-management';
import { ProductCardComponent } from './components/product-card/product-card.component';

@Component({
  selector: 'app-related-items-area',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './related-items.area.html',
  styleUrls: ['./related-items.area.scss'],
})
export class RelatedItemsArea {
  state = inject(RelatedProductsStateManagement);
}
