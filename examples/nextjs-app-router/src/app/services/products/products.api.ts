'use server';

import { MOCK_PRODUCT } from '@/app/(modules)/product-detail/store/product-data.store';
import { MOCK_RELATED_PRODUCTS } from '@/app/(modules)/product-detail/store/related-products-data.store';

export async function fetchProduct(productId: string) {
  await new Promise(r => setTimeout(r, 800));
  return { product: MOCK_PRODUCT, relatedProducts: MOCK_RELATED_PRODUCTS };
}
