// FFD React Vite Example — Entry Point
// The App component renders the DeviceDashboardPage module.
// In a real app, you'd wire up a router here.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
