// Product mapper helpers — pure functions for DTO → domain transformation.
// Extracted from Sections to keep them lean and focused on orchestration.

import type { Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo, RelatedProduct } from '../models/product.models';
import type { ProductResponse } from '@/app/services/products/models/product-response.models';

export function mapProductDTOToDomain(res: ProductResponse) {
  const p = res.product;

  const product: Product = {
    id: p.id,
    title: p.title,
    brand: p.brand,
    storeUrl: p.store_url,
    images: p.images.map(img => ({ url: img.url, alt: img.alt, thumbnail: img.thumbnail })),
    rating: { score: p.rating_score, count: p.rating_count },
    badges: p.badges.map(b => ({ label: b.label, icon: b.icon })),
    specs: p.specs.map(s => ({ label: s.label, value: s.value })),
    about: p.about,
    promotions: p.promotions.map(pr => ({ code: pr.code, description: pr.description, terms: pr.terms })),
    style: p.style_name
  };

  const priceInfo: PriceInfo = {
    currentPrice: p.price_current,
    originalPrice: p.price_original,
    savingsPercent: p.price_savings_percent,
    currency: p.currency
  };

  const deliveryInfo: DeliveryInfo = {
    isFree: p.delivery_free,
    estimatedDate: p.delivery_estimated_date,
    fastestOption: p.delivery_fastest,
    location: p.delivery_location,
    stockStatus: p.stock_status as DeliveryInfo['stockStatus'],
    orderWithin: p.order_within
  };

  const protectionPlans: ProtectionPlan[] = p.protection_plans.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    selected: false
  }));

  const sellerInfo: SellerInfo = {
    name: p.seller_name,
    shipsFrom: p.seller_ships_from
  };

  return { product, priceInfo, deliveryInfo, protectionPlans, sellerInfo };
}

export function mapRelatedProductsDTOToDomain(res: ProductResponse): RelatedProduct[] {
  return res.relatedProducts.map(rp => ({
    id: rp.id,
    title: rp.title,
    imageUrl: rp.image_url,
    price: rp.price,
    currency: rp.currency,
    rating: { score: rp.rating_score, count: rp.rating_count },
    sponsored: rp.sponsored,
    delivery: rp.delivery
  }));
}
