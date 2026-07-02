// Next.js Root Layout
// Global providers, theme setup, and shared layout go here.

import type { Metadata } from 'next';

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
        {/* Global providers would wrap children here */}
        {children}
      </body>
    </html>
  );
}
