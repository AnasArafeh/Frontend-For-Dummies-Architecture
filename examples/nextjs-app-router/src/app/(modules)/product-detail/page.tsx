import { getProductShowcaseData, getRelatedProductsData } from './actions';
import { ProductShowcaseProvider } from './state-management/product-showcase/product-showcase.reducer';
import { RelatedProductsProvider } from './state-management/related-products/related-products.reducer';
import { ProductShowcaseSection } from './sections/product-showcase/product-showcase.section';
import { RelatedProductsSection } from './sections/related-products/related-products.section';
import styles from './page.module.scss';

export default async function ProductDetailPage() {
  const [showcaseInitialData, relatedInitialData] = await Promise.all([
    getProductShowcaseData(),
    getRelatedProductsData(),
  ]);

  return (
    <main className={styles.page}>
      <ProductShowcaseProvider initialData={showcaseInitialData}>
        <ProductShowcaseSection />
      </ProductShowcaseProvider>
      <RelatedProductsProvider initialData={relatedInitialData}>
        <RelatedProductsSection />
      </RelatedProductsProvider>
    </main>
  );
}
