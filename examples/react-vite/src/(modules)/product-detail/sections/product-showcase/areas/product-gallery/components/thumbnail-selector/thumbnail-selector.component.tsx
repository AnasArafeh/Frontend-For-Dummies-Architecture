// Delegate Component: Injected into ProductGalleryArea. Receives data as PROPS.
// Allowed because delegates are the exception to the "no props" rule.

import { BaseBox } from '@/theme/components/base-box/base-box';
import type { ProductImage } from '../../../../../../models/product.models';
import './thumbnail-selector.component.scss';

interface ThumbnailSelectorProps {
  image: ProductImage;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ThumbnailSelector({ image, isSelected, onSelect }: ThumbnailSelectorProps) {
  const borderClass = isSelected ? 'thumbnail-selected' : 'thumbnail-default';

  return (
    <BaseBox
      component="button"
      onClick={onSelect}
      className={`thumbnail ${borderClass}`}
    >
      <img
        src={image.thumbnail}
        alt={image.alt}
        className="thumbnail-image"
      />
    </BaseBox>
  );
}
