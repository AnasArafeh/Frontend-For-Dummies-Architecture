// Shared Feature: Header — follows Page→Section→Area structure.
// Receives configuration via props at the Page boundary.
// Receives global data via global context (current user, etc.).

import { BaseBox } from '@/theme/components/base-box/base-box';

export interface HeaderPageProps {
  activeSection?: string;
  showSearch?: boolean;
}

export function HeaderPage({
  activeSection = 'home',
  showSearch = true,
}: HeaderPageProps) {
  return (
    <BaseBox component="header">
      <nav>FFD Next.js Example — {activeSection}</nav>
    </BaseBox>
  );
}
