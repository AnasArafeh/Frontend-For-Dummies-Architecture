import type { Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo } from '../../models/product.models';

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
