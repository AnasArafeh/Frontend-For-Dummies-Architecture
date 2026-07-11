import type { RelatedProductDTO } from '@/app/services/products/models/product-response.models';

export const MOCK_RELATED_PRODUCTS: RelatedProductDTO[] = [
  {
    id: 'rel-1',
    title: 'acer Predator GM7 4TB M.2 NVMe SSD PCIe 4.0 — Read speed up to 7400 MB/s',
    image_url: 'https://picsum.photos/seed/ssd/200/200',
    price: 2779.0,
    currency: 'AED',
    rating_score: 4.8,
    rating_count: 2273,
    sponsored: true,
    delivery: 'FREE delivery Tomorrow, 10 Jul'
  },
  {
    id: 'rel-2',
    title: 'HP OmniBook 3 Laptop Next Gen AI 15-FN0005NE | 15.6" FHD | AMD Ryzen AI 7-350 | 24GB DDR5 RAM | 1TB SSD',
    image_url: 'https://picsum.photos/seed/hp-laptop/200/200',
    price: 3599.0,
    currency: 'AED',
    rating_score: 5.0,
    rating_count: 1,
    sponsored: true,
    delivery: 'FREE delivery'
  },
  {
    id: 'rel-3',
    title: 'Anker PowerConf C200 2K Mac Webcam with AI-Noise Canceling Microphones',
    image_url: 'https://picsum.photos/seed/webcam/200/200',
    price: 299.0,
    currency: 'AED',
    rating_score: 4.5,
    rating_count: 9102,
    sponsored: true,
    delivery: 'FREE delivery'
  },
  {
    id: 'rel-4',
    title: 'Logitech G Pro X Superlight 2 Wireless Gaming Mouse — Lightweight, LIGHTFORCE Hybrid Switches',
    image_url: 'https://picsum.photos/seed/mouse/200/200',
    price: 459.0,
    currency: 'AED',
    rating_score: 4.7,
    rating_count: 3412,
    sponsored: false,
    delivery: 'FREE delivery Tomorrow'
  },
  {
    id: 'rel-5',
    title: 'Razer BlackShark V2 Pro Wireless Gaming Headset — THX Spatial Audio',
    image_url: 'https://picsum.photos/seed/headset/200/200',
    price: 649.0,
    currency: 'AED',
    rating_score: 4.6,
    rating_count: 1890,
    sponsored: false,
    delivery: 'FREE delivery'
  }
];
