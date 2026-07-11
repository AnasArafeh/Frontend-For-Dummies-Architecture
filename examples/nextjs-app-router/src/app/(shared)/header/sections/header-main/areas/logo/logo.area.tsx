import { BaseBox } from '@/theme/components/base-box/base-box';
import styles from './logo.area.module.scss';

export function LogoArea() {
  return (
    <BaseBox component="a" href="/" className={styles.logo}>
      <BaseBox className={styles['logo-text']}>
        amazon<span className={styles['logo-tld']}>.ae</span>
      </BaseBox>
    </BaseBox>
  );
}
