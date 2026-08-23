import { useState, useEffect, useCallback } from 'react';
import { defaultQueryCache } from '../api/queryCache';

export interface UseQueryOptions<T> {
  staleTime?: number;
  initialData?: T;
  enabled?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (err: any) => void;
}

export function useQuery<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: UseQueryOptions<T> = {}
) {
  const { staleTime = 30000, initialData, enabled = true, onSuccess, onError } = options;

  const [data, setData] = useState<T | undefined>(() => defaultQueryCache.get<T>(key) ?? initialData);
  const [loading, setLoading] = useState<boolean>(() => (enabled && data === undefined));
  const [error, setError] = useState<any | null>(null);

  const execute = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await defaultQueryCache.fetch<T>(key, fetcher, staleTime);
      setData(result);
      onSuccess?.(result);
    } catch (err) {
      setError(err);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [key, enabled, staleTime]);

  useEffect(() => {
    execute();
    const unsubscribe = defaultQueryCache.subscribe(key, () => {
      const cached = defaultQueryCache.get<T>(key);
      if (cached !== undefined) setData(cached);
    });
    return unsubscribe;
  }, [key, execute]);

  return { data, loading, error, refetch: execute };
}
