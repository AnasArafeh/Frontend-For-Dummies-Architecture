# FFD Example — Angular

Pull-ready example of the FFD architecture implemented with Angular standalone components, signals, and zoneless change detection. Demonstrates a product detail page matching the React and Next.js examples.

## Quick start

```bash
cd examples/angular
npm install
npm start          # ng serve — http://localhost:4200
npm run build      # Production build
```

## Project structure

```
src/app/
  app.component.ts                          # Root — renders Header + ProductDetailPage
  services/products/
    models/product-response.models.ts       # API DTO interfaces (snake_case)
    products.api.ts                         # Mock API — fetchProduct(id) with 800ms delay
  theme/components/
    base-box/                               # Wrapper component with <ng-content>
    base-button/                            # Button with @Input() type/disabled, @Output() onClick
    base-card/                              # Card component — border, shadow, padding
    base-table/                             # Generic table — columns, rows, delegate row actions
  (shared)/header/
    header.ts                               # Header Page — sticky Amazon-style dark bar
    header.scss
    sections/header-main/
      header-main.section.ts                # Arranges four Areas in a flex row
      header-main.section.scss
      areas/
        logo/                               # "amazon.ae" logo link
        search/                             # Search form + category dropdown
        navigation/                         # Account, Returns, Cart links
        user-menu/                          # Language selector ("AE EN")
  (modules)/product-detail/
    product-detail.page.ts                  # Page — container, arranges Sections
    product-detail.page.html
    product-detail.page.scss
    models/
      product.models.ts                     # Domain interfaces (camelCase)
    helpers/
      product-mapper.helper.ts              # DTO → domain pure mappers
    store/
      product-data.store.ts                 # Mock product DTO
      related-products-data.store.ts        # Mock related products DTOs
    state-management/
      product-showcase/
        product-showcase.models.ts          # State interface
        product-showcase.state-management.ts # Signals service (@Injectable, section-scoped)
      related-products/
        related-products.models.ts
        related-products.state-management.ts
    sections/
      product-showcase/                     # Main product display (3-column grid)
        product-showcase.section.ts
        product-showcase.section.html
        product-showcase.section.scss
        areas/
          product-gallery/                  # Image viewer + thumbnail strip
            components/thumbnail-selector/  # Prop-driven thumbnail button
          product-info/                     # Title, brand, rating, price, specs, about
            delegate-components/spec-row-actions/  # Injected into BaseTable
          product-purchase/                 # Buy box — price, delivery, cart, protection plans
            segments/
              price-summary/                # Current price, savings, original price
              delivery-info/                # Free delivery, estimated date, stock status
              cart-actions/                 # Add to Cart / Buy Now buttons
              protection-plans/             # Checkbox-selected warranty plans
      related-products/                     # "Products related to this item"
        related-products.section.ts
        related-products.section.html
        related-products.section.scss
        areas/related-items/
          components/product-card/          # Prop-driven product card
```

## Architecture: Page → Section → Area → Segment → Component

| Level | Role | Data | Angular Pattern |
|-------|------|------|-----------------|
| **Page** | Container, arranges Sections | None | `@Component` — no data fetching |
| **Section** | Data fetching, provides state | Signals service via `providers: []` | `inject(Service)`, `ngOnInit` fetches |
| **Area** | Business logic | Injects section service | `inject(Service)` — reads computed signals |
| **Segment** | Sub-unit inside complex Area | Injects section service | Same as Area, used for decomposition |
| **Component** | Reusable leaf UI | `@Input()` props (exception) | Prop-driven, no service injection |
| **Delegate** | Injected into theme components | `@Input()` from host | Receives `{ row }` or similar |

Key rules:
- Areas, Segments never receive `@Input()` from parent Section/Area — they inject the shared service.
- Only leaf Components and Delegates receive `@Input()`.
- Business logic lives in Areas/Segments, never in Pages or Sections.
- Sections fetch shared data, Areas may call their own specific APIs.

### Concrete hierarchy

```
ProductDetailPage (component, no data)
  └─ ProductShowcaseSection (provides ProductShowcaseStateManagement, fetches data)
       ├─ ProductGalleryArea     → inject(ProductShowcaseStateManagement)
       │    └─ ThumbnailSelector  → @Input() image, index, isSelected, @Output() onSelect
       ├─ ProductInfoArea        → inject(ProductShowcaseStateManagement)
       │    └─ SpecRowActions    → @Input() row (delegate, injected into BaseTable)
       └─ ProductPurchaseArea    → inject(ProductShowcaseStateManagement)
            ├─ PriceSummarySegment
            ├─ DeliveryInfoSegment
            ├─ CartActionsSegment
            └─ ProtectionPlansSegment  → local toggle logic
  └─ RelatedProductsSection (provides RelatedProductsStateManagement, fetches data)
       └─ RelatedItemsArea
            └─ ProductCard       → @Input() product
```

## State management: Angular signals

Each Section gets its own scoped state service using `@Injectable()` (no `providedIn: 'root'`) and Angular's `providers: []` array on the Section component:

```typescript
// Section provides the service — new instance per Section instance
@Injectable()
export class ProductShowcaseStateManagement {
  private state = signal<ProductShowcaseState>(initialState);

  product = computed(() => this.state().product);
  loading = computed(() => this.state().loading);
  // ...

  hydrate(data: Partial<ProductShowcaseState>): void {
    this.state.update(s => ({ ...s, ...data, loading: false }));
  }
}

// Section component
@Component({
  providers: [ProductShowcaseStateManagement],  // <-- scoped here
})
export class ProductShowcaseSection implements OnInit {
  state = inject(ProductShowcaseStateManagement);
  // fetches data, calls state.hydrate(data)
}

// Area component — same injector tree, gets same instance
export class ProductGalleryArea {
  state = inject(ProductShowcaseStateManagement);  // <-- same instance
}
```

This mirrors React's Context+Provider pattern but uses Angular's hierarchical DI instead.

## Data flow

```
Section.ngOnInit()
  └─ ProductsApiService.fetchProduct(id)
       └─ 800ms delay → mock DTO
            └─ mapProductDTOToDomain(dto) → camelCase domain models
                 └─ state.hydrate(data) → loading = false, all signals populated
                      └─ Areas re-render via signal subscriptions
```

## Theme components

Four Base* wrappers — never use native HTML directly in templates:

| Component | Template | Notes |
|-----------|----------|-------|
| `BaseBox` | `<ng-content />` | Generic wrapper, scoped styles via `:host` |
| `BaseButton` | `<button [type] [disabled]>` | `@Input()` type/disabled, `@Output()` onClick |
| `BaseCard` | `<div class="base-card">` | Border, radius, shadow, padding |
| `BaseTable` | `<table>` with `NgComponentOutlet` | Columns, rows, optional delegate for actions |

### Delegate pattern (BaseTable)

```typescript
// spec-row-actions.delegate.ts
@Component({
  selector: 'app-spec-row-actions',
  standalone: true,
  template: `<app-base-button>Edit</app-base-button>`,
})
export class SpecRowActions {
  @Input() row!: ProductSpec;
}

// product-info.area.ts
specRowActions = SpecRowActions;  // pass the class, not an instance
```

```html
<app-base-table
  [columns]="specColumns"
  [rows]="product.specs"
  [rowKey]="specRowKey"
  [rowActions]="specRowActions"
/>
```

## FFD patterns in Angular

| FFD Concept | Angular Implementation |
|---|---|
| Section state provider | `@Injectable()` with `signal()` in `providers: []` at Section |
| Area subscribing to state | `inject(Service)` — reads `computed()` signals |
| No props in chain | No `@Input()` on Areas/Segments. All data through injected services |
| Delegate Components | `@Input()` on the delegate — only exception to no-props rule |
| Zoneless | `provideZonelessChangeDetection()` in `main.ts` — signals drive updates |

## Key differences from React/Next.js

- **No ContextCreator factory** — Angular's DI hierarchy replaces the Provider pattern natively.
- **Signals instead of useReducer** — `signal()` + `computed()` replace `useReducer` + `useContext`.
- **Separate template files** — each component gets `.html` and `.scss` alongside its `.ts`.
- **Zoneless change detection** — signals trigger re-renders, no Zone.js needed.
- **Page is NOT a data fetcher** — unlike Next.js server components, the Angular Page is a pure container. Data fetching happens in Sections via `ngOnInit`.
