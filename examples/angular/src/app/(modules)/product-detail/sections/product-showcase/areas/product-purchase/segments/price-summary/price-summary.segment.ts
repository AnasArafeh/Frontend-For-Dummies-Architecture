import { Component, inject } from '@angular/core';
import { ProductShowcaseStateManagement } from '../../../../../../state-management/product-showcase/product-showcase.state-management';

@Component({
  selector: 'app-price-summary-segment',
  standalone: true,
  templateUrl: './price-summary.segment.html',
  styleUrls: ['./price-summary.segment.scss'],
})
export class PriceSummarySegment {
  state = inject(ProductShowcaseStateManagement);
}
