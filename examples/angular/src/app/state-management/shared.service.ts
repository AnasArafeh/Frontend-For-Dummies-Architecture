// Shared state — global service available app-wide (providedIn: 'root').
// Sections use their own scoped services. This is for cross-module state only.

import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentUser = signal<{ name: string } | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);
  refresh = signal<boolean>(false);
}
