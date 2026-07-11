import { BaseBox } from '@/theme/components/base-box/base-box';
import { LogoArea } from './areas/logo/logo.area';
import { SearchArea } from './areas/search/search.area';
import { NavigationArea } from './areas/navigation/navigation.area';
import { UserMenuArea } from './areas/user-menu/user-menu.area';
import styles from './header-main.section.module.scss';

interface HeaderMainSectionProps {
  onSearch?: (query: string) => void;
  cartCount: number;
}

export function HeaderMainSection({ onSearch, cartCount }: HeaderMainSectionProps) {
  return (
    <BaseBox className={styles['header-main']}>
      <LogoArea />
      <SearchArea onSearch={onSearch} />
      <NavigationArea cartCount={cartCount} />
      <UserMenuArea />
    </BaseBox>
  );
}
