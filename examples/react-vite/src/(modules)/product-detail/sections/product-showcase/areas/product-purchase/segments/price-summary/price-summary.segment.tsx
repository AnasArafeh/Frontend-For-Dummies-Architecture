// Segment: Price summary display.
// Part of the ProductPurchaseArea — shows current price, savings, original price.
// Subscribes to context — NO props from parent Area.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { useContext } from 'react';
import { ProductShowcaseContext } from '../../../../../../state-management/product-showcase/product-showcase.reducer';
import './price-summary.segment.scss';

export function PriceSummarySegment() {
  const { state } = useContext(ProductShowcaseContext);
  const { priceInfo } = state;
  if (!priceInfo) return null;

  return (
    <BaseBox>
      <BaseBox className="price-summary-current">
        {priceInfo.currency} {priceInfo.currentPrice.toFixed(2)}
      </BaseBox>
      <BaseBox className="price-summary-original">
        <BaseBox
          component="span"
          className="price-summary-strikethrough"
        >
          {priceInfo.currency} {priceInfo.originalPrice.toFixed(2)}
        </BaseBox>
        <BaseBox
          component="span"
          className="price-summary-savings"
        >
          You save {priceInfo.currency} {(priceInfo.originalPrice - priceInfo.currentPrice).toFixed(2)} ({priceInfo.savingsPercent}%)
        </BaseBox>
      </BaseBox>
    </BaseBox>
  );
}
