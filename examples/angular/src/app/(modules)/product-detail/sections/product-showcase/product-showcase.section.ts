import { Component, OnInit, inject } from '@angular/core';
import { ProductShowcaseStateManagement } from '../../state-management/product-showcase/product-showcase.state-management';
import { ProductsApiService } from '@/app/services/products/products.api';
import { mapProductDTOToDomain } from '../../helpers/product-mapper.helper';
import { ProductGalleryArea } from './areas/product-gallery/product-gallery.area';
import { ProductInfoArea } from './areas/product-info/product-info.area';
import { ProductPurchaseArea } from './areas/product-purchase/product-purchase.area';

@Component({
  selector: 'app-product-showcase-section',
  standalone: true,
  imports: [ProductGalleryArea, ProductInfoArea, ProductPurchaseArea],
  providers: [ProductShowcaseStateManagement],
  templateUrl: './product-showcase.section.html',
  styleUrls: ['./product-showcase.section.scss'],
})
export class ProductShowcaseSection implements OnInit {
  state = inject(ProductShowcaseStateManagement);
  private api = inject(ProductsApiService);

  ngOnInit(): void {
    this.api
      .fetchProduct('B0BSH3KTY6')
      .then((res) => {
        const { product, priceInfo, deliveryInfo, protectionPlans, sellerInfo } = mapProductDTOToDomain(res);
        this.state.hydrate({ product, priceInfo, deliveryInfo, protectionPlans, sellerInfo });
      })
      .catch((err) => this.state.error.set(err.message));
  }
}
