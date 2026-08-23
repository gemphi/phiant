import { StoreApi, StateCreator, SetStateFn, GetStateFn, Listener } from './types';

export function createStore<T>(initializer: StateCreator<T> | T): StoreApi<T> {
  let state: T;
  const listeners: Set<Listener<T>> = new Set();

  const getState: GetStateFn<T> = () => state;

  const setState: SetStateFn<T> = (partial, replace = false) => {
    const nextPartial = typeof partial === 'function' ? (partial as (s: T) => Partial<T> | T)(state) : partial;
    if (Object.is(nextPartial, state)) return;

    const prevState = state;
    state = replace ? (nextPartial as T) : Object.assign({}, state, nextPartial);

    listeners.forEach((listener) => {
      try {
        listener(state, prevState);
      } catch (err) {
        console.error('[PUI Store Error]', err);
      }
    });
  };

  const subscribe = (listener: Listener<T>) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api: StoreApi<T> = {
    getState,
    setState,
    subscribe,
    destroy,
    getInitialState: () => state,
  };

  state = typeof initializer === 'function' ? (initializer as StateCreator<T>)(setState, getState, api) : initializer;

  return api;
}
