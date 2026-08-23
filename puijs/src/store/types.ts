export type SetStateFn<T> = (partial: Partial<T> | ((state: T) => Partial<T> | T), replace?: boolean) => void;
export type GetStateFn<T> = () => T;
export type Listener<T> = (state: T, prevState: T) => void;
export type UnsubscribeFn = () => void;

export interface StoreApi<T> {
  getState: GetStateFn<T>;
  setState: SetStateFn<T>;
  subscribe: (listener: Listener<T>) => UnsubscribeFn;
  destroy: () => void;
  getInitialState: () => T;
}

export type StateCreator<T> = (
  set: SetStateFn<T>,
  get: GetStateFn<T>,
  api: StoreApi<T>
) => T;

export type StoreMiddleware<T> = (
  config: StateCreator<T>
) => StateCreator<T>;

export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
  canUndo: boolean;
  canRedo: boolean;
}
