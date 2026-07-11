import type { RelatedProduct } from '../../models/product.models';

export interface RelatedProductsState {
  relatedProducts: RelatedProduct[];
  loading: boolean;
  error: string | null;
}
