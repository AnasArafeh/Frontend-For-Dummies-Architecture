// State models for Product Showcase Section
import type { Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo } from '../../models/product.models';

export enum ProductShowcaseKeys {
  Product = 'product',
  PriceInfo = 'priceInfo',
  DeliveryInfo = 'deliveryInfo',
  SellerInfo = 'sellerInfo',
  ProtectionPlans = 'protectionPlans',
  SelectedImageIndex = 'selectedImageIndex',
  Loading = 'loading',
  Error = 'error'
}

export const PRODUCT_SHOWCASE_ACTION = 'PRODUCT_SHOWCASE_ACTION';

export interface IProductShowcaseAction {
  type: string;
  payload: { key: ProductShowcaseKeys; data: unknown };
}

export interface ProductShowcaseState {
  product: Product | null;
  priceInfo: PriceInfo | null;
  deliveryInfo: DeliveryInfo | null;
  sellerInfo: SellerInfo | null;
  protectionPlans: ProtectionPlan[];
  selectedImageIndex: number;
  loading: boolean;
  error: string | null;
}

export interface IProductShowcaseContext {
  state: ProductShowcaseState;
  setProduct: (product: Product) => void;
  setPriceInfo: (priceInfo: PriceInfo) => void;
  setDeliveryInfo: (deliveryInfo: DeliveryInfo) => void;
  setSellerInfo: (sellerInfo: SellerInfo) => void;
  setProtectionPlans: (plans: ProtectionPlan[]) => void;
  selectImage: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
