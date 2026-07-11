import { Injectable } from '@angular/core';
import type { ProductResponse } from './models/product-response.models';
import { MOCK_PRODUCT } from '@/app/(modules)/product-detail/store/product-data.store';
import { MOCK_RELATED_PRODUCTS } from '@/app/(modules)/product-detail/store/related-products-data.store';

// Mock API service. In the real world this calls HttpClient.
// Kept as a .then()-based Promise so consumers chain with .then()/.catch().
@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  fetchProduct(_id: string): Promise<ProductResponse> {
    // Simulate network delay.
    return new Promise((resolve) =>
      setTimeout(() => resolve({ product: MOCK_PRODUCT, relatedProducts: MOCK_RELATED_PRODUCTS }), 600)
    );
  }
}
