// Page: Section container. No business logic, no API calls (CSR).
// Wraps each Section with its own Provider — Page is the wiring layer.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { ProductShowcaseProvider } from './state-management/product-showcase/product-showcase.reducer';
import { RelatedProductsProvider } from './state-management/related-products/related-products.reducer';
import { ProductShowcaseSection } from './sections/product-showcase/product-showcase.section';
import { RelatedProductsSection } from './sections/related-products/related-products.section';
import './product-detail.page.scss';

export function ProductDetailPage() {
  return (
    <BaseBox className="product-detail-page">
      <ProductShowcaseProvider>
        <ProductShowcaseSection />
      </ProductShowcaseProvider>
      <RelatedProductsProvider>
        <RelatedProductsSection />
      </RelatedProductsProvider>
    </BaseBox>
  );
}
