import { RELATED_PRODUCTS_ACTION, RelatedProductsKeys, type IRelatedProductsAction } from './related-products.models';
import type { RelatedProduct } from '../../models/product.models';

export const relatedProductsActions = (dispatch: React.Dispatch<IRelatedProductsAction>) => ({
  setRelatedProducts: (data: RelatedProduct[]) =>
    dispatch({ type: RELATED_PRODUCTS_ACTION, payload: { key: RelatedProductsKeys.RelatedProducts, data } }),

  setLoading: (data: boolean) => dispatch({ type: RELATED_PRODUCTS_ACTION, payload: { key: RelatedProductsKeys.Loading, data } }),

  setError: (data: string | null) => dispatch({ type: RELATED_PRODUCTS_ACTION, payload: { key: RelatedProductsKeys.Error, data } })
});
