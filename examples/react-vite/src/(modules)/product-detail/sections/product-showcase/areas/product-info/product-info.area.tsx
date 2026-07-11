// Area: Business logic for product information display.
// Title, brand, rating, badges, promotions, specs, about section.
// Subscribes to Section context — NO props from parent.
// Uses BaseTable with a delegate component (SpecRowActions) for the specs table.

import { useContext } from 'react';
import { BaseBox } from '@/theme/components/base-box/base-box';
import { BaseButton } from '@/theme/components/base-button/base-button';
import { BaseTable } from '@/theme/components/base-table/base-table';
import { ProductShowcaseContext } from '../../../../state-management/product-showcase/product-showcase.reducer';
import { SpecRowActions } from './delegate-components/spec-row-actions/spec-row-actions.delegate';
import type { ProductBadge, ProductSpec, Promotion } from '../../../../models/product.models';
import './product-info.area.scss';

export function ProductInfoArea() {
  const { state } = useContext(ProductShowcaseContext);
  const { product, priceInfo } = state;
  if (!product || !priceInfo) return null;

  const renderPromo = (promo: Promotion) => (
    <BaseBox
      key={promo.code}
      className="product-info-promo"
    >
      <BaseBox
        component="span"
        className="product-info-promo-tag"
      >
        Savings{' '}
      </BaseBox>
      {promo.description}
      {promo.terms && (
        <BaseBox
          component="a"
          href="#"
          className="product-info-promo-terms"
        >
          Terms
        </BaseBox>
      )}
    </BaseBox>
  );

  const renderBadge = (badge: ProductBadge) => (
    <BaseBox
      key={badge.label}
      className="product-info-badge"
    >
      {badge.label}
    </BaseBox>
  );

  const renderAboutItem = (item: string, i: number) => (
    <BaseBox
      component="li"
      key={i}
      className="product-info-about-item"
    >
      {item}
    </BaseBox>
  );

  const specColumns = [
    { key: 'label', header: 'Specification', render: (row: ProductSpec) => row.label },
    { key: 'value', header: 'Value', render: (row: ProductSpec) => row.value }
  ];

  return (
    <BaseBox>
      <BaseBox
        component="h1"
        className="product-info-title"
      >
        {product.title}
      </BaseBox>

      <BaseBox
        component="a"
        href={product.storeUrl}
        className="product-info-brand-link"
      >
        Visit the {product.brand} Store
      </BaseBox>

      <BaseBox className="product-info-rating">
        <BaseBox className="product-info-stars">{'★'.repeat(Math.round(product.rating.score))}</BaseBox>
        <BaseBox className="product-info-rating-text">
          {product.rating.score} ({product.rating.count} rating{product.rating.count !== 1 ? 's' : ''})
        </BaseBox>
      </BaseBox>

      <BaseBox
        component="hr"
        className="product-info-divider"
      />

      <BaseBox>
        <BaseBox className="product-info-price-current">
          -{priceInfo.savingsPercent}% {priceInfo.currency} {priceInfo.currentPrice.toFixed(2)}
          <BaseBox
            component="span"
            className="product-info-price-savings"
          >
            with {priceInfo.savingsPercent}% savings
          </BaseBox>
        </BaseBox>
        <BaseBox className="product-info-price-list">
          List Price: {priceInfo.currency} {priceInfo.originalPrice.toFixed(2)}
        </BaseBox>
      </BaseBox>

      {product.promotions.length > 0 && <BaseBox>{product.promotions.map(renderPromo)}</BaseBox>}

      <BaseBox className="product-info-installment">
        Buy with 0% installments and pay {priceInfo.currency} {(priceInfo.currentPrice / 12).toFixed(2)} for 12 months with select banks.{' '}
        <BaseButton className="product-info-installment-btn">Payment Plans</BaseButton>
      </BaseBox>

      <BaseBox className="product-info-badges">{product.badges.map(renderBadge)}</BaseBox>

      <BaseBox className="product-info-style">Style: {product.style}</BaseBox>

      {/* Specs table with delegate */}
      <BaseBox className="product-info-specs">
        <BaseBox
          component="h2"
          className="product-info-specs-heading"
        >
          Product Specifications
        </BaseBox>
        <BaseTable
          columns={specColumns}
          rows={product.specs}
          rowKey={row => row.label}
          rowActions={SpecRowActions}
        />
      </BaseBox>

      <BaseBox>
        <BaseBox
          component="h2"
          className="product-info-about-heading"
        >
          About this item
        </BaseBox>
        <BaseBox
          component="ul"
          className="product-info-about-list"
        >
          {product.about.map(renderAboutItem)}
        </BaseBox>
      </BaseBox>
    </BaseBox>
  );
}
