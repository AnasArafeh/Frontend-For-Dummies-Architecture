import { Component, inject } from '@angular/core';
import { ProductShowcaseStateManagement } from '../../../../../../state-management/product-showcase/product-showcase.state-management';

@Component({
  selector: 'app-delivery-info-segment',
  standalone: true,
  templateUrl: './delivery-info.segment.html',
  styleUrls: ['./delivery-info.segment.scss'],
})
export class DeliveryInfoSegment {
  state = inject(ProductShowcaseStateManagement);
}
