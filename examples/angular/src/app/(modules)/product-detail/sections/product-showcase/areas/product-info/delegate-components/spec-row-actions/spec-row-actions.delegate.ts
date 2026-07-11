import { Component, Input } from '@angular/core';
import { BaseButton } from '@/app/theme/components/base-button';
import type { ProductSpec } from '../../../../../../models/product.models';

@Component({
  selector: 'app-spec-row-actions',
  standalone: true,
  imports: [BaseButton],
  template: '<app-base-button>Edit</app-base-button>',
})
export class SpecRowActions {
  @Input() row!: ProductSpec;
}
