import '@mantine/core/styles.layer.css';

import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';

export const metadata: Metadata = {
  title: 'FFD — Device Dashboard (Next.js)',
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
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
