import { Injectable, signal } from '@angular/core';
import type { Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo } from '../../models/product.models';

@Injectable()
export class ProductShowcaseStateManagement {
  product = signal<Product | null>(null);
  priceInfo = signal<PriceInfo | null>(null);
  deliveryInfo = signal<DeliveryInfo | null>(null);
  sellerInfo = signal<SellerInfo | null>(null);
  protectionPlans = signal<ProtectionPlan[]>([]);
  selectedImageIndex = signal(0);
  loading = signal(true);
  error = signal<string | null>(null);

  hydrate(data: {
    product: Product;
    priceInfo: PriceInfo;
    deliveryInfo: DeliveryInfo;
    protectionPlans: ProtectionPlan[];
    sellerInfo: SellerInfo;
  }): void {
    this.product.set(data.product);
    this.priceInfo.set(data.priceInfo);
    this.deliveryInfo.set(data.deliveryInfo);
    this.protectionPlans.set(data.protectionPlans);
    this.sellerInfo.set(data.sellerInfo);
    this.loading.set(false);
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }
}
