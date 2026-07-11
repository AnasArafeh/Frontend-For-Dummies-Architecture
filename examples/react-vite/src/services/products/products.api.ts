// API Service — organized by backend domain.
// Mock implementation — imports static data from the module's store.

import type { ProductResponse } from './models/product-response.models';
import { MOCK_PRODUCT } from '@/(modules)/product-detail/store/product-data.store';
import { MOCK_RELATED_PRODUCTS } from '@/(modules)/product-detail/store/related-products-data.store';

export function fetchProduct(_productId: string): Promise<ProductResponse> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        product: MOCK_PRODUCT,
        relatedProducts: MOCK_RELATED_PRODUCTS
      });
    }, 800);
  });
}
