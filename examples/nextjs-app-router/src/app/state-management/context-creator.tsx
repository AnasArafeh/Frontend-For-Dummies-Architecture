import '../../types/declarations';

import React, { useReducer, createContext, type ReactNode } from 'react';

export function ContextCreator<S, A>(
  reducer: (state: S, action: A) => S,
  actionsFactory: (dispatch: React.Dispatch<A>) => Record<string, (...args: any[]) => void>,
  defaultInitialState: S,
) {
  const Context = createContext<{ state: S } & ReturnType<typeof actionsFactory>>({} as any);

  function Provider({
    children,
    initialData,
  }: {
    children: ReactNode;
    initialData?: Partial<S>;
  }) {
    const [state, dispatch] = useReducer(
      reducer,
      initialData ? { ...defaultInitialState, ...initialData } : defaultInitialState,
    );
    const boundActions = actionsFactory(dispatch) as ReturnType<typeof actionsFactory>;

    const value = { state, ...boundActions } as { state: S } & ReturnType<typeof actionsFactory>;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  return { Context, Provider };
}
