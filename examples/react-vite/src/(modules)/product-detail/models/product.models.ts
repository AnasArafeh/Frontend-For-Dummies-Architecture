// Domain models — shared across Areas in this module

export interface Product {
  id: string;
  title: string;
  brand: string;
  storeUrl: string;
  images: ProductImage[];
  rating: ProductRating;
  badges: ProductBadge[];
  specs: ProductSpec[];
  about: string[];
  promotions: Promotion[];
  style: string;
}

export interface ProductImage {
  url: string;
  alt: string;
  thumbnail: string;
}

export interface ProductRating {
  score: number; // 0–5
  count: number;
}

export interface ProductBadge {
  label: string;
  icon?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Promotion {
  code: string;
  description: string;
  terms?: string;
}

export interface PriceInfo {
  currentPrice: number;
  originalPrice: number;
  savingsPercent: number;
  currency: string;
}

export interface DeliveryInfo {
  isFree: boolean;
  estimatedDate: string;
  fastestOption: string;
  location: string;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  orderWithin: string;
}

export interface ProtectionPlan {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

export interface SellerInfo {
  name: string;
  shipsFrom: string;
}

export interface RelatedProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  currency: string;
  rating: ProductRating;
  sponsored: boolean;
  delivery: string;
}
