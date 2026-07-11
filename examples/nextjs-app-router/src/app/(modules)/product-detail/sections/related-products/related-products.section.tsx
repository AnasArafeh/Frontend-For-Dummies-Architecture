'use client';

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { RelatedProductsContext } from '../../state-management/related-products/related-products.reducer';
import { RelatedItemsArea } from './areas/related-items/related-items.area';
import styles from './related-products.section.module.scss';

export function RelatedProductsSection() {
  const { state } = useContext(RelatedProductsContext);

  if (state.relatedProducts.length === 0) return null;

  return (
    <BaseBox className={styles['related-products']}>
      <BaseBox component="h2" className={styles['related-products-heading']}>
        Products related to this item
        <BaseBox component="span" className={styles['related-products-sponsored-label']}>
          Sponsored
        </BaseBox>
      </BaseBox>
      <RelatedItemsArea />
    </BaseBox>
  );
}
