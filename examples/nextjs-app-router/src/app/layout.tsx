import '@mantine/core/styles.layer.css';

import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import { HeaderPage } from './(shared)/header/header';

export const metadata: Metadata = {
  title: 'FFD — Product Detail (Next.js)',
  description: 'FFD architecture example with Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <HeaderPage />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
