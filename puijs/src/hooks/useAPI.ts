import { useState, useEffect, useCallback, useRef } from 'react';
import { RequestOptions } from '../api/types';
import { defaultApiClient } from '../api/apiClient';

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
  refetch: () => Promise<void>;
}

export function useAPI<T = any>(endpoint: string, options: RequestOptions = {}): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await defaultApiClient.request<T>(endpoint, {
        ...options,
        signal: controller.signal,
      });
      setData(response.data);
    } catch (err: any) {
      if (err?.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
