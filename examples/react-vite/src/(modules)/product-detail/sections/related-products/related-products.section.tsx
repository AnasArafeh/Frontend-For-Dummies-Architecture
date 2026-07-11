// Section: Related products. "The orchestrator."
// State is provided by RelatedProductsProvider (wired in the Page).
// Separate business domain → separate Section with own state.

import { useContext, useEffect } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { fetchProduct } from '@/services/products/products.api';
import { RelatedProductsContext } from '../../state-management/related-products/related-products.reducer';
import { RelatedItemsArea } from './areas/related-items/related-items.area';
import { mapRelatedProductsDTOToDomain } from '../../helpers/product-mapper.helper';
import './related-products.section.scss';

export function RelatedProductsSection() {
  const { state, setRelatedProducts, setError } = useContext(RelatedProductsContext);

  useEffect(() => {
    loadRelatedProducts();
  }, []);

  const loadRelatedProducts = () =>
    fetchProduct('B0BSH3KTY6')
      .then(res => {
        setRelatedProducts(mapRelatedProductsDTOToDomain(res));
      })
      .catch(err => setError(err.message));

  if (state.relatedProducts.length === 0) return null;

  return (
    <BaseBox className="related-products">
      <BaseBox
        component="h2"
        className="related-products-heading"
      >
        Products related to this item
        <BaseBox
          component="span"
          className="related-products-sponsored-label"
        >
          Sponsored
        </BaseBox>
      </BaseBox>
      <RelatedItemsArea />
    </BaseBox>
  );
}
