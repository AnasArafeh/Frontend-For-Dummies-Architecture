// Area: Business logic for the product image gallery.
// Subscribes to Section context — NO props from parent.

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { ProductShowcaseContext } from '../../../../state-management/product-showcase/product-showcase.reducer';
import { ThumbnailSelector } from './components/thumbnail-selector/thumbnail-selector.component';
import type { ProductImage } from '../../../../models/product.models';
import './product-gallery.area.scss';

export function ProductGalleryArea() {
  const { state, selectImage } = useContext(ProductShowcaseContext);
  const { product, selectedImageIndex } = state;
  if (!product) return null;

  const activeImage = product.images[selectedImageIndex];

  const handleSelectImage = (index: number) => () => selectImage(index);

  const renderThumbnail = (img: ProductImage, index: number) => (
    <ThumbnailSelector
      key={index}
      image={img}
      index={index}
      isSelected={selectedImageIndex === index}
      onSelect={handleSelectImage(index)}
    />
  );

  return (
    <BaseBox>
      <BaseBox className="product-gallery-main-image">
        <img
          src={activeImage.url}
          alt={activeImage.alt}
        />
      </BaseBox>
      <BaseBox className="product-gallery-thumbnails">{product.images.map(renderThumbnail)}</BaseBox>
    </BaseBox>
  );
}
