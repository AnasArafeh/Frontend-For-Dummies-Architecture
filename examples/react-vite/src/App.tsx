// FFD React Vite Example — App Root
// Demonstrates both the original DeviceDashboard AND the new ProductDetail modules.
// In a real app with routing, you'd lazy-load each module.

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { HeaderPage } from './(shared)/header/header';
import { ProductDetailPage } from './(modules)/product-detail/product-detail.page';

export function App() {
  return (
    <MantineProvider>
      <HeaderPage
        onSearch={q => console.log('Search:', q)}
        cartCount={0}
      />
      <main>
        <ProductDetailPage />
      </main>
    </MantineProvider>
  );
}
