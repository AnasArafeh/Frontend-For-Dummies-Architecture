'use server';

import { fetchProduct } from '@/app/services/products/products.api';
import { mapProductDTOToDomain, mapRelatedProductsDTOToDomain } from './helpers/product-mapper.helper';

export async function getProductShowcaseData() {
  const res = await fetchProduct('B0BSH3KTY6');
  return { ...mapProductDTOToDomain(res), loading: false };
}

export async function getRelatedProductsData() {
  const res = await fetchProduct('B0BSH3KTY6');
  return { relatedProducts: mapRelatedProductsDTOToDomain(res), loading: false };
}
