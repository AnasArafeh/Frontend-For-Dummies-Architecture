export interface ProductResponse {
  product: ProductDTO;
  relatedProducts: RelatedProductDTO[];
}

export interface ProductDTO {
  id: string;
  title: string;
  brand: string;
  store_url: string;
  images: { url: string; alt: string; thumbnail: string }[];
  rating_score: number;
  rating_count: number;
  badges: { label: string; icon?: string }[];
  specs: { label: string; value: string }[];
  about: string[];
  promotions: { code: string; description: string; terms?: string }[];
  style_name: string;
  price_current: number;
  price_original: number;
  price_savings_percent: number;
  currency: string;
  delivery_free: boolean;
  delivery_estimated_date: string;
  delivery_fastest: string;
  delivery_location: string;
  stock_status: string;
  order_within: string;
  protection_plans: { id: string; name: string; price: number }[];
  seller_name: string;
  seller_ships_from: string;
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
