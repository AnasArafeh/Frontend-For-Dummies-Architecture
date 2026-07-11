// Delegate Component: Product card in the related items grid.
// Receives product data as PROPS — delegates are the exception to the rule.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseCard } from '@/theme/components/base-card/base-card';
import type { RelatedProduct } from '../../../../../../models/product.models';
import './product-card.component.scss';

interface ProductCardProps {
  product: RelatedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <BaseCard className="product-card">
      <BaseBox className="product-card-image">
        <img
          src={product.imageUrl}
          alt={product.title}
        />
      </BaseBox>
      <BaseBox className="product-card-title">{product.title}</BaseBox>

      <BaseBox className="product-card-rating">
        <BaseBox className="product-card-rating-stars">{'★'.repeat(Math.round(product.rating.score))}</BaseBox>
        <BaseBox className="product-card-rating-count">{product.rating.count}</BaseBox>
      </BaseBox>

      <BaseBox className="product-card-price">
        {product.currency} {product.price.toFixed(2)}
      </BaseBox>

      <BaseBox className="product-card-delivery">{product.delivery}</BaseBox>
      {product.sponsored && <BaseBox className="product-card-sponsored">Sponsored</BaseBox>}
    </BaseCard>
  );
}
