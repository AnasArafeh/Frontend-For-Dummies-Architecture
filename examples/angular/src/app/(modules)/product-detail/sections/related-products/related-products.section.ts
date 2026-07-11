import { Component, OnInit, inject } from '@angular/core';
import { RelatedProductsStateManagement } from '../../state-management/related-products/related-products.state-management';
import { ProductsApiService } from '@/app/services/products/products.api';
import { mapRelatedProductsDTOToDomain } from '../../helpers/product-mapper.helper';
import { RelatedItemsArea } from './areas/related-items/related-items.area';

@Component({
  selector: 'app-related-products-section',
  standalone: true,
  imports: [RelatedItemsArea],
  providers: [RelatedProductsStateManagement],
  templateUrl: './related-products.section.html',
  styleUrls: ['./related-products.section.scss'],
})
export class RelatedProductsSection implements OnInit {
  state = inject(RelatedProductsStateManagement);
  private api = inject(ProductsApiService);

  ngOnInit(): void {
    this.api
      .fetchProduct('B0BSH3KTY6')
      .then((res) => {
        const products = mapRelatedProductsDTOToDomain(res);
        this.state.hydrate(products);
      })
      .catch((err) => this.state.error.set(err.message));
  }
}
