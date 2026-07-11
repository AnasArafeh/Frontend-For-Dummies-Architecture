// Static product mock data — used by the API service for demo purposes.
// In a real app, this data comes from the backend.

import type { ProductDTO } from '@/services/products/models/product-response.models';

export const MOCK_PRODUCT: ProductDTO = {
  id: 'B0BSH3KTY6',
  title:
    'ASUS ROG Strix G16 (2025) G614 Gaming Laptop | NVIDIA RTX 5060 8GB | AMD Ryzen 9 8940HX | 16GB RAM | 1TB SSD | 16" 240Hz (2560 x 1600) Display | Win11 Home [G614PM-G161W]',
  brand: 'ASUS',
  store_url: '/stores/ASUS/page/80D209ED-F1B3-471C-9D17-E31E4EE92616',
  images: [
    {
      url: 'https://picsum.photos/seed/laptop-main/600/600',
      alt: 'ASUS ROG Strix G16 Gaming Laptop — Front View',
      thumbnail: 'https://picsum.photos/seed/laptop-main/80/80'
    },
    {
      url: 'https://picsum.photos/seed/laptop-side/600/600',
      alt: 'ASUS ROG Strix G16 — Side View',
      thumbnail: 'https://picsum.photos/seed/laptop-side/80/80'
    },
    {
      url: 'https://picsum.photos/seed/laptop-keyboard/600/600',
      alt: 'ASUS ROG Strix G16 — Keyboard Close-up',
      thumbnail: 'https://picsum.photos/seed/laptop-keyboard/80/80'
    },
    {
      url: 'https://picsum.photos/seed/laptop-ports/600/600',
      alt: 'ASUS ROG Strix G16 — Ports',
      thumbnail: 'https://picsum.photos/seed/laptop-ports/80/80'
    },
    {
      url: 'https://picsum.photos/seed/laptop-screen/600/600',
      alt: 'ASUS ROG Strix G16 — Display',
      thumbnail: 'https://picsum.photos/seed/laptop-screen/80/80'
    }
  ],
  rating_score: 5.0,
  rating_count: 1,
  badges: [
    { label: 'Electronic Payment Only' },
    { label: '15 days Returnable' },
    { label: 'Free Delivery' },
    { label: 'Delivered by Amazon' },
    { label: 'Secure transaction' }
  ],
  specs: [
    { label: 'Brand', value: 'ASUS' },
    { label: 'Model name', value: 'G614PM-G161W' },
    { label: 'Screen size', value: '16 Inches' },
    { label: 'Colour', value: 'Gray' },
    { label: 'Hard disk size', value: '1 TB' },
    { label: 'CPU model', value: 'AMD Ryzen 9 8940HX' },
    { label: 'Installed RAM memory size', value: '16 GB' },
    { label: 'Operating system', value: 'Windows 11 Home' },
    { label: 'Special features', value: 'Backlit Keyboard' },
    { label: 'Graphics card description', value: 'Dedicated' }
  ],
  about: [
    'Power up your play — Powered by a cutting-edge AMD Ryzen 9 8940HX Processor and an NVIDIA GeForce RTX 5060 Laptop GPU with Dynamic Boost.',
    'Designed to Win — Built for Victory. The Republic of Gamers was built by those who love to play. All ROG designs come with gamers in mind.',
    "ROG Intelligent Cooling — Strix G16's chassis and motherboard were both designed to accommodate our high-performance full-width heatsink.",
    'Immersive Display — 16-inch WQXGA (2560x1600) 240Hz display with 100% DCI-P3 color gamut for stunning visuals.'
  ],
  promotions: [
    { code: 'AHBJUL20', description: '20% max AED 100 | Al Hilal MC Credit Cards.', terms: 'Terms apply' },
    { code: 'FABJUL', description: '10% max AED 50 | FAB Mastercard Credit Card.', terms: 'Terms apply' }
  ],
  style_name: 'Standard UAE Version',
  price_current: 6249.6,
  price_original: 6999.0,
  price_savings_percent: 11,
  currency: 'AED',
  delivery_free: true,
  delivery_estimated_date: 'Tomorrow, 10 July',
  delivery_fastest: 'Tomorrow 8 AM – 1 PM',
  delivery_location: 'Dubai',
  stock_status: 'in_stock',
  order_within: '8 hrs 19 mins',
  protection_plans: [
    { id: 'plan-1', name: '1-Year Extended Warranty by Salama Care (E-mail delivery)', price: 486.0 },
    { id: 'plan-2', name: '1-Year Accidental Damage Protection by Salama Care (Email Delivery)', price: 556.0 },
    { id: 'plan-3', name: '2-Year Damage Protection + 1-Year Extended Warranty by Salama Care (Email Delivery)', price: 709.0 }
  ],
  seller_name: 'Amazon.ae',
  seller_ships_from: 'Amazon'
};
