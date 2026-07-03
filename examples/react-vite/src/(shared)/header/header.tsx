// Shared Feature: Header
// Follows Page→Section→Area structure.
// Receives configuration via props at the Page boundary (module config).

import { BaseBox } from '@/theme/components/base-box';

export interface HeaderPageProps {
  activeSection?: string;
}

export function HeaderPage({
  activeSection = 'home',
}: HeaderPageProps) {
  return (
    <BaseBox component="header">
      <nav>FFD React Vite Example — {activeSection}</nav>
    </BaseBox>
  );
}
