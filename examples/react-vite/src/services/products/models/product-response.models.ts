// API response DTOs — lives next to the API, separate from domain models

export interface ProductResponse {
  product: ProductDTO;
  relatedProducts: RelatedProductDTO[];
}

export interface ProductDTO {
  id: string;
  title: string;
  brand: string;
  store_url: string;
  images: ImageDTO[];
  rating_score: number;
  rating_count: number;
  badges: BadgeDTO[];
  specs: SpecDTO[];
  about: string[];
  promotions: PromotionDTO[];
  style_name: string;
  price_current: number;
  price_original: number;
  price_savings_percent: number;
  currency: string;
  delivery_free: boolean;
  delivery_estimated_date: string;
  delivery_fastest: string;
  delivery_location: string;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  order_within: string;
  protection_plans: ProtectionPlanDTO[];
  seller_name: string;
  seller_ships_from: string;
}

export interface ImageDTO {
  url: string;
  alt: string;
  thumbnail: string;
}

export interface BadgeDTO {
  label: string;
  icon?: string;
}

export interface SpecDTO {
  label: string;
  value: string;
}

export interface PromotionDTO {
  code: string;
  description: string;
  terms?: string;
}

export interface ProtectionPlanDTO {
  id: string;
  name: string;
  price: number;
}

export interface RelatedProductDTO {
  id: string;
  title: string;
  image_url: string;
  price: number;
  currency: string;
  rating_score: number;
  rating_count: number;
  sponsored: boolean;
  delivery: string;
}
