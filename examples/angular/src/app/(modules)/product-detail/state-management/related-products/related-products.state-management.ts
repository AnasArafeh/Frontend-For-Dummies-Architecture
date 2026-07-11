import { Injectable, signal } from '@angular/core';
import type { RelatedProduct } from '../../models/product.models';

@Injectable()
export class RelatedProductsStateManagement {
  relatedProducts = signal<RelatedProduct[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  hydrate(products: RelatedProduct[]): void {
    this.relatedProducts.set(products);
    this.loading.set(false);
  }
}
