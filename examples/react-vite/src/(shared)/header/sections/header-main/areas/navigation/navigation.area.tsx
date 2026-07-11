// Area: Account/cart navigation links.

import { BaseBox } from '@/theme/components/base-box/base-box';
import './navigation.area.scss';

interface NavigationAreaProps {
  cartCount: number;
}

export function NavigationArea({ cartCount }: NavigationAreaProps) {
  return (
    <BaseBox className="navigation">
      <BaseBox
        component="a"
        href="#"
        className="navigation-link"
      >
        <BaseBox className="navigation-link-label">Hello, sign in</BaseBox>
        <BaseBox className="navigation-link-value">Account & Lists</BaseBox>
      </BaseBox>

      <BaseBox
        component="a"
        href="#"
        className="navigation-link"
      >
        <BaseBox className="navigation-link-label">Returns</BaseBox>
        <BaseBox className="navigation-link-value">& Orders</BaseBox>
      </BaseBox>

      <BaseBox
        component="a"
        href="#"
        className="navigation-cart"
      >
        <BaseBox className="navigation-cart-icon">
          🛒
          {cartCount > 0 && <BaseBox className="navigation-cart-badge">{cartCount}</BaseBox>}
        </BaseBox>
        <BaseBox className="navigation-link-value">Cart</BaseBox>
      </BaseBox>
    </BaseBox>
  );
}
