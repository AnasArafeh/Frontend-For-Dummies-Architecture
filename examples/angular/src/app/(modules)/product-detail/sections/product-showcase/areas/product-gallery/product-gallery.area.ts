import { Component, inject } from '@angular/core';
import { ProductShowcaseStateManagement } from '../../../../state-management/product-showcase/product-showcase.state-management';
import { ThumbnailSelectorComponent } from './components/thumbnail-selector/thumbnail-selector.component';

@Component({
  selector: 'app-product-gallery-area',
  standalone: true,
  imports: [ThumbnailSelectorComponent],
  templateUrl: './product-gallery.area.html',
  styleUrls: ['./product-gallery.area.scss'],
})
export class ProductGalleryArea {
  state = inject(ProductShowcaseStateManagement);

  selectImage(index: number): void {
    this.state.selectImage(index);
  }
}
