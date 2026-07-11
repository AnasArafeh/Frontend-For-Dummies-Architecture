# FFD Example — React + Vite (Amazon Product Page)

A production-realistic FFD implementation of an Amazon-style product detail page. Demonstrates the full Page→Section→Area hierarchy with Segments, Section-level state management, a proper Delegate Component (passed as prop), and co-located SCSS.

## Architecture Walkthrough

```
product-detail/
├── product-detail.page.tsx              → Page — wires providers, no business logic
├── product-detail.page.scss
├── models/
│   └── product.models.ts                → Domain models (Product, PriceInfo, etc.)
├── helpers/
│   └── product-mapper.helper.ts         → Pure DTO→domain mapping functions
├── store/
│   ├── product-data.store.ts            → Static product mock data
│   └── related-products-data.store.ts   → Static related-products mock data
├── state-management/
│   ├── product-showcase/                → Section A state (product, price, delivery, plans)
│   │   ├── product-showcase.models.ts      (ProductShowcaseKeys enum, state + context interfaces)
│   │   ├── product-showcase.actions.ts     (8 typed action creators)
│   │   └── product-showcase.reducer.ts     (pure setReducer + Context + Provider)
│   └── related-products/                → Section B state (related items only)
│       ├── related-products.models.ts      (RelatedProductsKeys enum)
│       ├── related-products.actions.ts     (3 action creators)
│       └── related-products.reducer.ts     (pure setReducer + Context + Provider)
└── sections/
    ├── product-showcase/                → Section A
    │   ├── product-showcase.section.tsx    (orchestrator: fetch → map → dispatch)
    │   ├── product-showcase.section.scss
    │   └── areas/
    │       ├── product-gallery/
    │       │   ├── product-gallery.area.tsx   (image thumbnails + main image)
    │       │   ├── product-gallery.area.scss
    │       │   └── components/
    │       │       └── thumbnail-selector/    (private — directly rendered)
    │       ├── product-info/
    │       │   ├── product-info.area.tsx      (title, rating, price, specs, about)
    │       │   ├── product-info.area.scss
    │       │   ├── delegate-components/
    │       │   │   └── spec-row-actions/      (delegate — passed as prop to BaseTable)
    │       │   └── components/
    │       │       └── spec-row/              (private — directly rendered)
    │       └── product-purchase/
    │           ├── product-purchase.area.tsx  (buy box — complex Area uses Segments)
    │           ├── product-purchase.area.scss
    │           └── segments/
    │               ├── cart-actions/          (Add to Cart + Buy Now buttons)
    │               ├── delivery-info/         (delivery date, location, stock)
    │               ├── price-summary/         (current price, savings)
    │               └── protection-plans/      (warranty checkboxes)
    └── related-products/                 → Section B
        ├── related-products.section.tsx      (orchestrator: fetch → map → dispatch)
        ├── related-products.section.scss
        └── areas/
            └── related-items/
                ├── related-items.area.tsx     (product card grid)
                ├── related-items.area.scss
                └── components/
                    └── product-card/          (private — directly rendered)
```

## Key FFD Patterns Demonstrated

### Section-level State Management

Each Section has its own state, wired at the Page level:

```tsx
// Page — wiring layer
export function ProductDetailPage() {
  return (
    <>
      <ProductShowcaseProvider>
        <ProductShowcaseSection />
      </ProductShowcaseProvider>
      <RelatedProductsProvider>
        <RelatedProductsSection />
      </RelatedProductsProvider>
    </>
  );
}
```

The Section does NOT self-wrap — it just consumes context:

```tsx
function ProductShowcaseSection() {
  const { state, setProduct, ... } = useContext(ProductShowcaseContext);
  // hooks → load data → render
}
```

### State Key Enums

Action payload keys are typed via enums — no magic strings:

```typescript
enum ProductShowcaseKeys {
  Product = 'product',
  PriceInfo = 'priceInfo',
  // ...
}

setProduct: (data) => dispatch({
  type: PRODUCT_SHOWCASE_ACTION,
  payload: { key: ProductShowcaseKeys.Product, data },
});
```

### Delegate Component (passed as prop)

`SpecRowActions` is passed TO `BaseTable` as a prop. The table calls it with row data. NOT directly imported or rendered by the Area:

```tsx
<BaseTable
  columns={specColumns}
  rows={product.specs}
  rowKey={(row) => row.label}
  rowActions={SpecRowActions}   // ← delegate passed as prop
/>
```

Compare with private components (`ThumbnailSelector`, `SpecRow`, `ProductCard`) — these are in `components/` and directly rendered in JSX.

### Complex Area → Segments

The buy box Area is split into 4 Segments (PriceSummary, DeliveryInfo, CartActions, ProtectionPlans). Each Segment follows Area rules: subscribes to context, no props from parent.

### DTO Mapping in Helpers

Pure mapping functions live in `helpers/product-mapper.helper.ts`. The Section imports them — mapping never happens inline in useEffect or in the reducer.

### Store Split by Domain

Static data is in `store/`, one file per domain — not one monolithic file.

### Co-located SCSS, No Inline Styles

Every component has its own `.scss` file in the same folder. Zero `style={{}}` anywhere in JSX. Class names are flat kebab-case (no BEM `__`/`--`).

## Data Flow

```
API Service (fetchProduct)
    │
    ▼
Section (product-showcase.section.tsx)
    │  └─ mapProductDTOToDomain(res)   ← DTO→domain in helper
    │  └─ setProduct(), setPriceInfo(), etc.   ← dispatch to reducer
    ▼
Reducer (pure setter — just spreads payload onto state)
    │
    ▼
Areas & Segments
    │  └─ useContext(ProductShowcaseContext)   ← read state directly
    │  └─ Business logic (toggle, select, etc.) → compute new state → dispatch
    ▼
Delegate Components
    └─ Receive data as PROPS from the host component (BaseTable)
```

## Quick Start

```bash
cd examples/react-vite
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production build
```
