import { Component, inject } from '@angular/core';
import { BaseCard } from '@/app/theme/components/base-card';
import { ProductShowcaseStateManagement } from '../../../../state-management/product-showcase/product-showcase.state-management';
import { PriceSummarySegment } from './segments/price-summary/price-summary.segment';
import { DeliveryInfoSegment } from './segments/delivery-info/delivery-info.segment';
import { CartActionsSegment } from './segments/cart-actions/cart-actions.segment';
import { ProtectionPlansSegment } from './segments/protection-plans/protection-plans.segment';

@Component({
  selector: 'app-product-purchase-area',
  standalone: true,
  imports: [BaseCard, PriceSummarySegment, DeliveryInfoSegment, CartActionsSegment, ProtectionPlansSegment],
  templateUrl: './product-purchase.area.html',
  styleUrls: ['./product-purchase.area.scss'],
})
export class ProductPurchaseArea {
  state = inject(ProductShowcaseStateManagement);
}
