import { useSyncExternalStore, useCallback } from 'react';
import { StoreApi } from '../store/types';

export type EqualityFn<T> = (a: T, b: T) => boolean;

const defaultEquality = <T>(a: T, b: T): boolean => Object.is(a, b);

export function useStore<TState, TSelected = TState>(
  store: StoreApi<TState>,
  selector?: (state: TState) => TSelected,
  _equalityFn: EqualityFn<TSelected> = defaultEquality
): TSelected {
  const getSnapshot = useCallback(() => {
    const state = store.getState();
    return selector ? selector(state) : (state as unknown as TSelected);
  }, [store, selector]);

  return useSyncExternalStore(
    store.subscribe,
    getSnapshot,
    getSnapshot
  );
}
