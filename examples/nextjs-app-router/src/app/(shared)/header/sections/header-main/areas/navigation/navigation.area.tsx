import { BaseBox } from '@/theme/components/base-box/base-box';
import styles from './navigation.area.module.scss';

interface NavigationAreaProps {
  cartCount: number;
}

export function NavigationArea({ cartCount }: NavigationAreaProps) {
  return (
    <BaseBox className={styles.navigation}>
      <BaseBox component="a" href="#" className={styles['navigation-link']}>
        <BaseBox className={styles['navigation-link-label']}>Hello, sign in</BaseBox>
        <BaseBox className={styles['navigation-link-value']}>Account & Lists</BaseBox>
      </BaseBox>

      <BaseBox component="a" href="#" className={styles['navigation-link']}>
        <BaseBox className={styles['navigation-link-label']}>Returns</BaseBox>
        <BaseBox className={styles['navigation-link-value']}>& Orders</BaseBox>
      </BaseBox>

      <BaseBox component="a" href="#" className={styles['navigation-cart']}>
        <BaseBox className={styles['navigation-cart-icon']}>
          {'🛒'}
          {cartCount > 0 && (
            <BaseBox className={styles['navigation-cart-badge']}>{cartCount}</BaseBox>
          )}
        </BaseBox>
        <BaseBox className={styles['navigation-link-value']}>Cart</BaseBox>
      </BaseBox>
    </BaseBox>
  );
}
