import { useState, useCallback } from 'react';
import { defaultQueryCache } from '../api/queryCache';

export interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: any, variables: TVariables) => void;
  invalidateQueries?: (string | RegExp)[];
}

export function useMutation<TData = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: UseMutationOptions<TData, TVariables> = {}
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  const mutate = useCallback(
    async (variables: TVariables): Promise<TData> => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(variables);
        setData(result);
        if (options.invalidateQueries) {
          options.invalidateQueries.forEach((k) => defaultQueryCache.invalidate(k));
        }
        options.onSuccess?.(result, variables);
        return result;
      } catch (err) {
        setError(err);
        options.onError?.(err, variables);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn, options]
  );

  return { mutate, data, loading, error };
}
