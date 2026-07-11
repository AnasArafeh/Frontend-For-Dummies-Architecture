import { Component } from '@angular/core';
import { BaseBox } from '@/app/theme/components/base-box';
import { ProductShowcaseSection } from './sections/product-showcase/product-showcase.section';
import { RelatedProductsSection } from './sections/related-products/related-products.section';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [BaseBox, ProductShowcaseSection, RelatedProductsSection],
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage {}
