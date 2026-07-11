// Segment: Delivery information display.
// Part of the ProductPurchaseArea — shows delivery date, location, stock status.
// Subscribes to context — NO props from parent Area.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { useContext } from 'react';
import { ProductShowcaseContext } from '../../../../../../state-management/product-showcase/product-showcase.reducer';
import './delivery-info.segment.scss';

export function DeliveryInfoSegment() {
  const { state } = useContext(ProductShowcaseContext);
  const { deliveryInfo } = state;
  if (!deliveryInfo) return null;

  const stockClass =
    deliveryInfo.stockStatus === 'in_stock'
      ? 'delivery-info-stock-in-stock'
      : deliveryInfo.stockStatus === 'low_stock'
        ? 'delivery-info-stock-low-stock'
        : 'delivery-info-stock-out-of-stock';

  const stockLabel =
    deliveryInfo.stockStatus === 'in_stock' ? 'In Stock' : deliveryInfo.stockStatus === 'low_stock' ? 'Low Stock' : 'Out of Stock';

  return (
    <BaseBox>
      {deliveryInfo.isFree && <BaseBox className="delivery-info-free">FREE delivery {deliveryInfo.estimatedDate}</BaseBox>}
      <BaseBox className="delivery-info-details">
        Or fastest One-Day delivery {deliveryInfo.fastestOption}. Order within {deliveryInfo.orderWithin}
      </BaseBox>
      <BaseBox className="delivery-info-location">Delivering to {deliveryInfo.location}</BaseBox>
      <BaseBox className={`delivery-info-stock ${stockClass}`}>{stockLabel}</BaseBox>
    </BaseBox>
  );
}
