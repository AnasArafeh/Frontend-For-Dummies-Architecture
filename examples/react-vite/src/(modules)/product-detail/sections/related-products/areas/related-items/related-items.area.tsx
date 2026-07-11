// Area: Business logic for related products display.
// Subscribes to Section context — NO props from parent.

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { RelatedProductsContext } from '../../../../state-management/related-products/related-products.reducer';
import { ProductCard } from './components/product-card/product-card.component';
import './related-items.area.scss';

export function RelatedItemsArea() {
  const { state } = useContext(RelatedProductsContext);

  return (
    <BaseBox className="related-items">
      {state.relatedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </BaseBox>
  );
}
