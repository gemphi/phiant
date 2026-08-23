import { StateCreator, StoreMiddleware, HistoryState } from './types';

export function persist<T>(name: string): StoreMiddleware<T> {
  return (config: StateCreator<T>) => (set, get, api) => {
    let initial: T | undefined = undefined;
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem(`phi_store_${name}`) : null;
      initial = stored ? JSON.parse(stored) : undefined;
    } catch {
      initial = undefined;
    }

    const state = config(
      (partial, replace) => {
        set(partial, replace);
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(`phi_store_${name}`, JSON.stringify(get()));
          } catch (e) {
            console.warn('[PUI Persist Error]', e);
          }
        }
      },
      get,
      api
    );

    return initial !== undefined ? Object.assign({}, state, initial) : state;
  };
}

export function logger<T>(name?: string): StoreMiddleware<T> {
  return (config: StateCreator<T>) => (set, get, api) => {
    return config(
      (partial, replace) => {
        const prev = get();
        set(partial, replace);
        const next = get();
        console.groupCollapsed(`[PUI Store] ${name || 'Store'} @ ${new Date().toLocaleTimeString()}`);
        console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', prev);
        console.log('%c next state', 'color: #4CAF50; font-weight: bold', next);
        console.groupEnd();
      },
      get,
      api
    );
  };
}

export function createHistoryStore<T>(initialValue: T) {
  const history: HistoryState<T> = {
    past: [],
    present: initialValue,
    future: [],
    canUndo: false,
    canRedo: false,
  };

  return history;
}
