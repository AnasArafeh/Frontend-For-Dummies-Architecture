'use client';

// Segment: Cart action buttons (Add to Cart, Buy Now).
// Part of the ProductPurchaseArea — contains the primary purchase CTAs.
// Subscribes to context — NO props from parent Area.

import { useContext, useState } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseButton } from '@/theme/components/base-button/base-button';
import { ProductShowcaseContext } from '../../../../../../state-management/product-showcase/product-showcase.reducer';
import styles from './cart-actions.segment.module.scss';

export function CartActionsSegment() {
  const { state } = useContext(ProductShowcaseContext);
  const { product } = state;
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    alert('Buy Now clicked');
  };

  if (!product) return null;

  const cartBtnClass = `${styles['cart-actions-add-to-cart']}${addedToCart ? ` ${styles['cart-actions-add-to-cart-added']}` : ''}`;

  return (
    <BaseBox className={styles['cart-actions']}>
      <BaseButton
        onClick={handleAddToCart}
        className={cartBtnClass}
      >
        {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
      </BaseButton>
      <BaseButton
        onClick={handleBuyNow}
        className={styles['cart-actions-buy-now']}
      >
        Buy Now
      </BaseButton>
    </BaseBox>
  );
}
