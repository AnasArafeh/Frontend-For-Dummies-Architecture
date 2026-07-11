// Section: Area container + data fetching. "The orchestrator."
// State is provided by ProductShowcaseProvider (wired in the Page).
// Fetches product data from the API, delegates mapping to helpers,
// and distributes state to Areas via context. No business logic.

import { useContext, useEffect } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { fetchProduct } from '@/services/products/products.api';
import { ProductShowcaseContext } from '../../state-management/product-showcase/product-showcase.reducer';
import { ProductGalleryArea } from './areas/product-gallery/product-gallery.area';
import { ProductInfoArea } from './areas/product-info/product-info.area';
import { ProductPurchaseArea } from './areas/product-purchase/product-purchase.area';
import { mapProductDTOToDomain } from '../../helpers/product-mapper.helper';
import './product-showcase.section.scss';

export function ProductShowcaseSection() {
  const { state, setProduct, setPriceInfo, setDeliveryInfo, setProtectionPlans, setSellerInfo, setLoading, setError } =
    useContext(ProductShowcaseContext);

  useEffect(() => {
    setLoading(true);
    loadProductData();
  }, []);

  const loadProductData = () =>
    fetchProduct('B0BSH3KTY6')
      .then(res => {
        const { product, priceInfo, deliveryInfo, protectionPlans, sellerInfo } = mapProductDTOToDomain(res);
        setProduct(product);
        setPriceInfo(priceInfo);
        setDeliveryInfo(deliveryInfo);
        setProtectionPlans(protectionPlans);
        setSellerInfo(sellerInfo);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));

  if (state.loading) return <BaseBox className="product-showcase-loading">Loading product...</BaseBox>;
  if (state.error) return <BaseBox className="product-showcase-error">Error: {state.error}</BaseBox>;

  return (
    <BaseBox className="product-showcase">
      <ProductGalleryArea />
      <ProductInfoArea />
      <ProductPurchaseArea />
    </BaseBox>
  );
}
