'use client';

// Global utility — creates Context + Provider from a reducer, actions, and initial state.
// Supports SSR hydration via optional initialData prop on Provider.

import { createContext, useReducer, ReactNode } from 'react';

export function ContextCreator<TState, TActions extends Record<string, (...args: any[]) => any>>(
  reducer: (state: TState, action: any) => TState,
  actions: (dispatch: React.Dispatch<any>) => TActions,
  initialState: TState
) {
  const Context = createContext<{ state: TState } & TActions>(null!);

  const Provider = ({ children, initialData }: { children: ReactNode; initialData?: Partial<TState> }) => {
    const mergedState = { ...initialState, ...initialData };
    const [state, dispatch] = useReducer(reducer, mergedState);
    const boundActions = actions(dispatch);

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
}
