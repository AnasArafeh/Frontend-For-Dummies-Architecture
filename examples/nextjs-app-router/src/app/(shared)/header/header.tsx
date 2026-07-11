import { BaseBox } from '@/theme/components/base-box/base-box';
import { HeaderMainSection } from './sections/header-main/header-main.section';
import styles from './header.module.scss';

export interface HeaderPageProps {
  onSearch?: (query: string) => void;
  cartCount?: number;
}

export function HeaderPage({ onSearch, cartCount = 0 }: HeaderPageProps) {
  return (
    <BaseBox component="header" className={styles.header}>
      <BaseBox className={styles['header-inner']}>
        <HeaderMainSection onSearch={onSearch} cartCount={cartCount} />
      </BaseBox>
    </BaseBox>
  );
}
