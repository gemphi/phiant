export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

export interface ApiInterceptor {
  onRequest?: (config: RequestOptions) => Promise<RequestOptions> | RequestOptions;
  onResponse?: <T>(response: ApiResponse<T>) => Promise<ApiResponse<T>> | ApiResponse<T>;
  onError?: (error: any) => Promise<any> | any;
}

export interface QueryCacheEntry<T = any> {
  data: T;
  timestamp: number;
  staleTime: number;
  isFetching: boolean;
  promise?: Promise<T>;
}

export interface StreamEvent<T = any> {
  event: string;
  data: T;
  id?: string;
  retry?: number;
}
