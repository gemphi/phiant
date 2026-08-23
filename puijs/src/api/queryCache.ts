import { QueryCacheEntry } from './types';

export class QueryCache {
  private cache: Map<string, QueryCacheEntry> = new Map();
  private subscribers: Map<string, Set<() => void>> = new Map();

  async fetch<T>(key: string, fetcher: () => Promise<T>, staleTime: number = 30000): Promise<T> {
    const entry = this.cache.get(key);
    const now = Date.now();

    if (entry && now - entry.timestamp < entry.staleTime) {
      return entry.data as T;
    }

    if (entry?.isFetching && entry.promise) {
      return entry.promise as Promise<T>;
    }

    const promise = fetcher()
      .then((data) => {
        this.set(key, data, staleTime);
        return data;
      })
      .catch((err) => {
        this.cache.delete(key);
        this.notify(key);
        throw err;
      });

    this.cache.set(key, {
      data: entry ? entry.data : (undefined as any),
      timestamp: now,
      staleTime,
      isFetching: true,
      promise,
    });

    return promise;
  }

  get<T>(key: string): T | undefined {
    return this.cache.get(key)?.data;
  }

  set<T>(key: string, data: T, staleTime: number = 30000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      staleTime,
      isFetching: false,
    });
    this.notify(key);
  }

  invalidate(key: string | RegExp): void {
    if (typeof key === 'string') {
      this.cache.delete(key);
      this.notify(key);
    } else {
      for (const k of this.cache.keys()) {
        if (key.test(k)) {
          this.cache.delete(k);
          this.notify(k);
        }
      }
    }
  }

  subscribe(key: string, listener: () => void): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(listener);
    return () => this.subscribers.get(key)?.delete(listener);
  }

  private notify(key: string): void {
    this.subscribers.get(key)?.forEach((cb) => cb());
  }

  clear(): void {
    this.cache.clear();
  }
}

export const defaultQueryCache = new QueryCache();
