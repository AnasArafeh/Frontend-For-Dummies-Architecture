'use client';

// Private Component: Product card in the related items grid.
// Receives product data as PROPS — delegates are the exception to the rule.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseCard } from '@/theme/components/base-card/base-card';
import type { RelatedProduct } from '../../../../../../models/product.models';
import styles from './product-card.component.module.scss';

interface ProductCardProps {
  product: RelatedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <BaseCard className={styles['product-card']}>
      <BaseBox className={styles['product-card-image']}>
        <img
          src={product.imageUrl}
          alt={product.title}
        />
      </BaseBox>
      <BaseBox className={styles['product-card-title']}>{product.title}</BaseBox>

      <BaseBox className={styles['product-card-rating']}>
        <BaseBox className={styles['product-card-rating-stars']}>{'★'.repeat(Math.round(product.rating.score))}</BaseBox>
        <BaseBox className={styles['product-card-rating-count']}>{product.rating.count}</BaseBox>
      </BaseBox>

      <BaseBox className={styles['product-card-price']}>
        {product.currency} {product.price.toFixed(2)}
      </BaseBox>

      <BaseBox className={styles['product-card-delivery']}>{product.delivery}</BaseBox>
      {product.sponsored && <BaseBox className={styles['product-card-sponsored']}>Sponsored</BaseBox>}
    </BaseCard>
  );
}
