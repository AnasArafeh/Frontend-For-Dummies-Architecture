import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { ProductImage } from '../../../../../../models/product.models';

@Component({
  selector: 'app-thumbnail-selector',
  standalone: true,
  templateUrl: './thumbnail-selector.component.html',
  styleUrls: ['./thumbnail-selector.component.scss'],
})
export class ThumbnailSelectorComponent {
  @Input() image!: ProductImage;
  @Input() index = 0;
  @Input() isSelected = false;
  @Output() onSelect = new EventEmitter<number>();
}
