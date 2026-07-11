'use client';

// Delegate Component: Injected into ProductGalleryArea. Receives data as PROPS.
// Allowed because delegates are the exception to the "no props" rule.

import { BaseBox } from '@/theme/components/base-box/base-box';
import type { ProductImage } from '../../../../../../models/product.models';
import styles from './thumbnail-selector.component.module.scss';

interface ThumbnailSelectorProps {
  image: ProductImage;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function ThumbnailSelector({ image, isSelected, onSelect }: ThumbnailSelectorProps) {
  const borderClass = isSelected ? styles['thumbnail-selected'] : styles['thumbnail-default'];

  return (
    <BaseBox
      component="button"
      onClick={onSelect}
      className={`${styles.thumbnail} ${borderClass}`}
    >
      <img
        src={image.thumbnail}
        alt={image.alt}
        className={styles['thumbnail-image']}
      />
    </BaseBox>
  );
}
