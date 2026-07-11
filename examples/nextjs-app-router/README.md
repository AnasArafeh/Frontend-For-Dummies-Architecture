# FFD Example — Next.js App Router

Pull-ready example of the FFD architecture implemented with Next.js 15 App Router, React 19, and Mantine 8. Demonstrates a product detail page with mock data, server-side rendering, and the full Page → Section → Area → Segment → Component hierarchy.

## Quick start

```bash
cd examples/nextjs-app-router
npm install
npm run dev        # → http://localhost:3000 → redirects to /product-detail
npm run build      # Production build
```

## Project structure

```
src/
  state-management/
    context-creator.tsx                    # Global ContextCreator utility
  theme/components/
    base-box/                              # Polymorphic wrapper (div, a, ul, span, etc.)
    base-button/                           # Mantine Button pass-through
    base-card/                             # Mantine Paper with defaults
    base-table/                            # Generic table with delegate pattern
  app/
    layout.tsx                             # Root layout — MantineProvider
    page.tsx                               # Redirects / → /product-detail
    state-management/
      context-creator.tsx                  # Duplicate of src/state-management/ (for @/app imports)
    services/products/
      models/product-response.models.ts    # API DTO interfaces (snake_case)
      products.api.ts                      # Mock API — fetchProduct(id) with 800ms simulated delay
    (modules)/product-detail/
      page.tsx                             # Server component — fetches data, wraps Providers
      page.module.scss
      actions.ts                           # Server Actions — getProductShowcaseData(), getRelatedProductsData()
      models/
        product.models.ts                  # Domain interfaces (camelCase)
      helpers/
        product-mapper.helper.ts           # DTO → domain pure mappers
      store/
        product-data.store.ts              # Mock product DTO
        related-products-data.store.ts     # Mock related products DTOs
      state-management/
        product-showcase/                  # State for product gallery + info + purchase
          product-showcase.models.ts       # State interface, action key enum, action type
          product-showcase.actions.ts      # Action creators (dispatch → setProduct, selectImage, etc.)
          product-showcase.reducer.ts      # Reducer + ContextCreator → Context + Provider + useProductShowcase()
        related-products/                  # State for related products section
          related-products.models.ts
          related-products.actions.ts
          related-products.reducer.ts
      sections/
        product-showcase/                  # Main product display (3-column grid)
          product-showcase.section.tsx     # 'use client' — reads context, arranges Areas
          product-showcase.section.module.scss
          areas/
            product-gallery/               # Image viewer + thumbnail strip
              components/thumbnail-selector/  # Prop-driven thumbnail button
            product-info/                  # Title, brand, rating, price, specs, about
              components/spec-row/
              delegate-components/spec-row-actions/  # Injected into BaseTable
            product-purchase/              # Buy box — price summary, delivery, cart, protection plans
              segments/
                price-summary/             # Current price, savings, original price
                delivery-info/             # Free delivery, estimated date, stock status
                cart-actions/              # Add to Cart / Buy Now buttons
                protection-plans/          # Checkbox-selected warranty plans
        related-products/                  # "Products related to this item"
          related-products.section.tsx
          related-products.section.module.scss
          areas/related-items/
            components/product-card/       # Prop-driven product card
    (shared)/header/                       # Shared header (placeholder structure)
```

**52 files** — 30 `.tsx`, 12 `.scss`, 6 `.ts`, 4 `.gitkeep`.

## Architecture: Page → Section → Area → Segment → Component

The FFD hierarchy enforces a strict separation of responsibilities:

| Level | Role | Data | Directive |
|-------|------|------|-----------|
| **Page** | Data fetching, provider wrapping | Server Actions | Server component (default) |
| **Section** | Layout grid, orchestrating Areas | Context | `'use client'` |
| **Area** | Feature-level business logic | Context | `'use client'` |
| **Segment** | Sub-unit inside a complex Area | Context | `'use client'` |
| **Component** | Reusable leaf UI | Props (exception) | `'use client'` |
| **Delegate Component** | Injected into theme components | Props from host | `'use client'` |

Key rules:
- Areas, Segments, and Components **never** receive props from their parent Section/Area — they self-subscribe to context.
- Only leaf Components and Delegates receive props.
- Business logic lives in Areas/Segments, never in Pages or Sections.

### Concrete example: product-detail

```
page.tsx (server component)
  ├─ await Promise.all([getProductShowcaseData(), getRelatedProductsData()])
  ├─ <ProductShowcaseProvider initialData={...}>
  │    └─ ProductShowcaseSection ('use client', reads ProductShowcaseContext)
  │         ├─ ProductGalleryArea     → reads context, renders images + thumbnails
  │         │    └─ ThumbnailSelector  → props: image, index, isSelected, onSelect
  │         ├─ ProductInfoArea        → reads context, renders title/rating/specs/about
  │         │    ├─ SpecRow           → props: label, value
  │         │    └─ SpecRowActions    → delegate: receives { row } in BaseTable
  │         └─ ProductPurchaseArea    → reads context, renders buy box
  │              ├─ PriceSummarySegment
  │              ├─ DeliveryInfoSegment
  │              ├─ CartActionsSegment
  │              └─ ProtectionPlansSegment  → local state for checkbox toggle
  └─ <RelatedProductsProvider initialData={...}>
       └─ RelatedProductsSection ('use client', reads RelatedProductsContext)
            └─ RelatedItemsArea
                 └─ ProductCard       → props: product
```

## Data flow: Server → Client

```
Server (page.tsx)
  │
  ├─ getProductShowcaseData()
  │    └─ fetchProduct(id) → 800ms delay → mock DTO
  │         └─ mapProductDTOToDomain(dto) → camelCase domain models
  │              └─ { product, priceInfo, deliveryInfo, protectionPlans, sellerInfo, loading: false }
  │
  ├─ getRelatedProductsData()
  │    └─ fetchProduct(id) → same API call (deduplicated by Next.js)
  │         └─ mapRelatedProductsDTOToDomain(dto) → RelatedProduct[]
  │              └─ { relatedProducts: [...], loading: false }
  │
  └─ <Provider initialData={...}>        ← SSR bridge: data flows into client state
       └─ Client components read via useContext()
```

## State management: ContextCreator pattern

A generic `ContextCreator` utility creates Context + Provider from a reducer, actions factory, and initial state:

```typescript
// 3-file pattern per state slice:
//   <name>.models.ts   — State interface, action key enum, action interface, context interface
//   <name>.actions.ts  — (dispatch) => ({ setField: (data) => dispatch({...}) })
//   <name>.reducer.ts  — Reducer + ContextCreator call → exports Context, Provider, useXxx()

const { Context, Provider } = ContextCreator(reducer, actions, initialState);
export { Context as ProductShowcaseContext, Provider as ProductShowcaseProvider };
```

The Provider accepts an optional `initialData` prop for SSR hydration. It's shallow-merged with the default initial state: `{ ...initialState, ...initialData }`.

Two state slices exist in this example:
- **ProductShowcaseState** — `product`, `priceInfo`, `deliveryInfo`, `sellerInfo`, `protectionPlans`, `selectedImageIndex`, `loading`, `error`
- **RelatedProductsState** — `relatedProducts[]`, `loading`, `error`

## Data layer: DTO → Domain mapping

```
API Response (snake_case DTO)
  │
  ├─ product-response.models.ts    ← ProductResponse, ProductDTO, RelatedProductDTO
  │
  ├─ product-mapper.helper.ts      ← Pure functions: DTO → camelCase domain models
  │    mapProductDTOToDomain()     → Product, PriceInfo, DeliveryInfo, ProtectionPlan, SellerInfo
  │    mapRelatedProductsDTOToDomain() → RelatedProduct[]
  │
  └─ product.models.ts             ← Domain interfaces (camelCase)
```

Mock data stores provide typed DTOs. In production, the `products.api.ts` would call a real API instead.

## Theme components

Four Base* wrappers around Mantine primitives — never import `@mantine/core` directly:

| Component | Wraps | Notes |
|-----------|-------|-------|
| `BaseBox` | `Box` | Polymorphic — `component="ul"`, `component="a"`, etc. |
| `BaseButton` | `Button` | Pass-through with typed `onClick` and `type` |
| `BaseCard` | `Paper` | Default shadow, radius, padding, border |
| `BaseTable` | `<table>` | Columns + rows + delegate pattern for row actions |

### Delegate pattern (BaseTable)

```typescript
// spec-row-actions.delegate.tsx
export function SpecRowActions({ row }: { row: ProductSpec }) {
  return <BaseButton>Edit</BaseButton>;
}

// product-info.area.tsx
<BaseTable columns={specColumns} rows={product.specs} rowKey={r => r.label} rowActions={SpecRowActions} />
```

The delegate receives `{ row }` from the host component. This keeps action logic decoupled from the table implementation.

## File naming conventions

| Suffix | Purpose |
|--------|---------|
| `*.section.tsx` | Section-level component |
| `*.area.tsx` | Area-level component |
| `*.segment.tsx` | Sub-area segment |
| `*.component.tsx` | Leaf reusable component |
| `*.delegate.tsx` | Delegate component (injected via props) |
| `*.models.ts` | Interfaces, types, enums |
| `*.actions.ts` | Server actions or state action creators |
| `*.reducer.ts` | Reducer + Context + Provider + use hook |
| `*.helper.ts` | Pure utility functions |
| `*.store.ts` | Static/mock data |
| `*.api.ts` | API client |
| `*.module.scss` | SCSS module (co-located with component) |

## Key differences from CSR React

- **Page is a server component** — can `await` data directly, no `useEffect` for initial fetch.
- **Sections and Areas must have `'use client'`** — they hold interactivity and state.
- **Server Actions bridge server ↔ client** — `'use server'` functions are importable from both.
- **The Provider's `initialData` is the SSR bridge** — server data hydrates client state without prop drilling.
- **Next.js deduplicates `fetch`** — the same endpoint called from multiple server components = one network request.
- **No `loading.tsx` or Suspense boundaries used** — the page renders when data is ready. Sections guard against null data internally.
