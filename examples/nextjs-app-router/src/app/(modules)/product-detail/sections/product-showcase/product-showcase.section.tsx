'use client';

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { ProductShowcaseContext } from '../../state-management/product-showcase/product-showcase.reducer';
import { ProductGalleryArea } from './areas/product-gallery/product-gallery.area';
import { ProductInfoArea } from './areas/product-info/product-info.area';
import { ProductPurchaseArea } from './areas/product-purchase/product-purchase.area';
import styles from './product-showcase.section.module.scss';

export function ProductShowcaseSection() {
  const { state } = useContext(ProductShowcaseContext);

  return (
    <BaseBox className={styles['product-showcase']}>
      <ProductGalleryArea />
      <ProductInfoArea />
      <ProductPurchaseArea />
    </BaseBox>
  );
}
