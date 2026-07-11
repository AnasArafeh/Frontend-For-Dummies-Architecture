import { PRODUCT_SHOWCASE_ACTION, ProductShowcaseKeys, type IProductShowcaseAction } from './product-showcase.models';
import type { Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo } from '../../models/product.models';

export const productShowcaseActions = (dispatch: React.Dispatch<IProductShowcaseAction>) => ({
  setProduct: (data: Product) => dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.Product, data } }),

  setPriceInfo: (data: PriceInfo) => dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.PriceInfo, data } }),

  setDeliveryInfo: (data: DeliveryInfo) =>
    dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.DeliveryInfo, data } }),

  setSellerInfo: (data: SellerInfo) => dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.SellerInfo, data } }),

  setProtectionPlans: (data: ProtectionPlan[]) =>
    dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.ProtectionPlans, data } }),

  selectImage: (data: number) =>
    dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.SelectedImageIndex, data } }),

  setLoading: (data: boolean) => dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.Loading, data } }),

  setError: (data: string | null) => dispatch({ type: PRODUCT_SHOWCASE_ACTION, payload: { key: ProductShowcaseKeys.Error, data } })
});
