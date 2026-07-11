import { Component, inject } from '@angular/core';
import { BaseButton } from '@/app/theme/components/base-button';
import { BaseTable } from '@/app/theme/components/base-table';
import { ProductShowcaseStateManagement } from '../../../../state-management/product-showcase/product-showcase.state-management';
import { SpecRowActions } from './delegate-components/spec-row-actions/spec-row-actions.delegate';
import type { ProductSpec } from '../../../../models/product.models';

@Component({
  selector: 'app-product-info-area',
  standalone: true,
  imports: [BaseButton, BaseTable, SpecRowActions],
  templateUrl: './product-info.area.html',
  styleUrls: ['./product-info.area.scss'],
})
export class ProductInfoArea {
  state = inject(ProductShowcaseStateManagement);

  specColumns = [
    { key: 'label', header: 'Specification', render: (row: ProductSpec) => row.label },
    { key: 'value', header: 'Value', render: (row: ProductSpec) => row.value },
  ];

  specRowKey = (row: ProductSpec) => row.label;
  specRowActions = SpecRowActions;

  getStars(score: number): string {
    return '★'.repeat(Math.round(score));
  }
}
