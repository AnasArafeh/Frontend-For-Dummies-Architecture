// Area: Language/region selector and secondary user actions.

import { BaseBox } from '@/theme/components/base-box/base-box';
import './user-menu.area.scss';

export function UserMenuArea() {
  return (
    <BaseBox className="user-menu">
      <BaseBox
        component="button"
        className="user-menu-locale-btn"
      >
        🇦🇪 EN
      </BaseBox>
    </BaseBox>
  );
}
