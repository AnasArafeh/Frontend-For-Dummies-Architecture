import { BaseBox } from '@/theme/components/base-box/base-box';
import styles from './user-menu.area.module.scss';

export function UserMenuArea() {
  return (
    <BaseBox className={styles['user-menu']}>
      <BaseBox component="button" className={styles['user-menu-locale-btn']}>
        {'🇦🇪'} EN
      </BaseBox>
    </BaseBox>
  );
}
