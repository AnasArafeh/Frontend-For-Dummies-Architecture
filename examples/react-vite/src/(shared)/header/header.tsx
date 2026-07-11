// Shared Feature: Header Page (entry point)
// Follows Page→Section→Area structure.
// Receives configuration via props at the Page boundary.

import { BaseBox } from '@/theme/components/base-box/base-box';
import { HeaderMainSection } from './sections/header-main/header-main.section';
import './header.scss';

export interface HeaderPageProps {
  onSearch?: (query: string) => void;
  cartCount?: number;
}

export function HeaderPage({ onSearch, cartCount = 0 }: HeaderPageProps) {
  return (
    <BaseBox
      component="header"
      className="header"
    >
      <BaseBox className="header-inner">
        <HeaderMainSection
          onSearch={onSearch}
          cartCount={cartCount}
        />
      </BaseBox>
    </BaseBox>
  );
}
