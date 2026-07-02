// Shared state — global available app-wide (providedIn: 'root').
// Sections use their own scoped state management. This is for cross-module state only.

import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedStateManagement {
  currentUser = signal<{ name: string } | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  refresh = signal<boolean>(false);
}
