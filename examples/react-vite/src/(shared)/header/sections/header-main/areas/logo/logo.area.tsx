// Area: Amazon-style logo. No business logic.

import { BaseBox } from '@/theme/components/base-box/base-box';
import './logo.area.scss';

export function LogoArea() {
  return (
    <BaseBox
      component="a"
      href="/"
      className="logo"
    >
      <BaseBox className="logo-text">
        amazon<span className="logo-tld">.ae</span>
      </BaseBox>
    </BaseBox>
  );
}
