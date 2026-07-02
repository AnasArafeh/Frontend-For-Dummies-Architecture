// Shared Feature: Header
// Follows Page→Section→Area structure.
// Receives configuration via props at the Page boundary (module config).
// Receives global data via global context (current user, cart count).

import { BaseBox } from '@/theme/components/base-box';
import { HeaderMainSection } from './sections/header-main/header-main.section';

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
      <HeaderMainSection activeSection={activeSection} showSearch={showSearch} />
    </BaseBox>
  );
}
