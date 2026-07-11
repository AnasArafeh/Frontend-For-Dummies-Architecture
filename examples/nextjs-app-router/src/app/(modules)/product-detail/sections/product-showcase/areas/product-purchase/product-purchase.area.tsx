'use client';

// Area: Business logic for the purchase flow (buy box).
// Complex Area → uses Segments to split into sub-units.
// Subscribes to Section context — NO props from parent.

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseCard } from '@/theme/components/base-card/base-card';
import { ProductShowcaseContext } from '../../../../state-management/product-showcase/product-showcase.reducer';
import { PriceSummarySegment } from './segments/price-summary/price-summary.segment';
import { DeliveryInfoSegment } from './segments/delivery-info/delivery-info.segment';
import { CartActionsSegment } from './segments/cart-actions/cart-actions.segment';
import { ProtectionPlansSegment } from './segments/protection-plans/protection-plans.segment';
import styles from './product-purchase.area.module.scss';

export function ProductPurchaseArea() {
  const { state } = useContext(ProductShowcaseContext);
  const { product, priceInfo, deliveryInfo, sellerInfo } = state;
  if (!product || !priceInfo || !deliveryInfo) return null;

  return (
    <BaseBox>
      <BaseCard className={styles['product-purchase']}>
        <PriceSummarySegment />
        <BaseBox
          component="hr"
          className={styles['product-purchase-divider']}
        />
        <DeliveryInfoSegment />
        <BaseBox
          component="hr"
          className={styles['product-purchase-divider']}
        />
        <CartActionsSegment />

        {sellerInfo && (
          <BaseBox className={styles['product-purchase-seller-info']}>
            <BaseBox
              component="p"
              className={styles['product-purchase-seller-heading']}
            >
              Shipper / Seller
            </BaseBox>
            <BaseBox>Ships from: {sellerInfo.name}</BaseBox>
            <BaseBox>Sold by: {sellerInfo.name}</BaseBox>
          </BaseBox>
        )}

        <BaseBox
          component="hr"
          className={styles['product-purchase-divider']}
        />
        <ProtectionPlansSegment />
        <BaseBox
          component="hr"
          className={styles['product-purchase-divider']}
        />
        <BaseBox
          component="a"
          href="#"
          className={styles['product-purchase-add-to-list']}
        >
          Add to List
        </BaseBox>
      </BaseCard>
    </BaseBox>
  );
}
