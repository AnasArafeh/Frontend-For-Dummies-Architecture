import { ContextCreator } from '@/state-management/context-creator';
import { PRODUCT_SHOWCASE_ACTION, type IProductShowcaseAction, type ProductShowcaseState } from './product-showcase.models';
import { productShowcaseActions } from './product-showcase.actions';

const initialState: ProductShowcaseState = {
  product: null,
  priceInfo: null,
  deliveryInfo: null,
  sellerInfo: null,
  protectionPlans: [],
  selectedImageIndex: 0,
  loading: true,
  error: null
};

const setReducer = (state: ProductShowcaseState, action: IProductShowcaseAction) => ({
  ...state,
  [action.payload.key]: action.payload.data
});

export function productShowcaseReducer(state: ProductShowcaseState, action: IProductShowcaseAction): ProductShowcaseState {
  return action.type === PRODUCT_SHOWCASE_ACTION ? setReducer(state, action) : state;
}

const { Context, Provider } = ContextCreator(productShowcaseReducer, productShowcaseActions, initialState);

export const ProductShowcaseContext = Context;
export const ProductShowcaseProvider = Provider;
