import type { RelatedProduct } from '../../models/product.models';

export enum RelatedProductsKeys {
  RelatedProducts = 'relatedProducts',
  Loading = 'loading',
  Error = 'error'
}

export const RELATED_PRODUCTS_ACTION = 'RELATED_PRODUCTS_ACTION';

export interface IRelatedProductsAction {
  type: string;
  payload: { key: RelatedProductsKeys; data: unknown };
}

export interface RelatedProductsState {
  relatedProducts: RelatedProduct[];
  loading: boolean;
  error: string | null;
}

export interface IRelatedProductsContext {
  state: RelatedProductsState;
  setRelatedProducts: (products: RelatedProduct[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
