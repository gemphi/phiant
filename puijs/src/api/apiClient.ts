import { RequestOptions, ApiResponse, ApiInterceptor } from './types';

export class ApiClient {
  private baseUrl: string;
  private interceptors: ApiInterceptor[] = [];

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  use(interceptor: ApiInterceptor): this {
    this.interceptors.push(interceptor);
    return this;
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    let config: RequestOptions = { ...options };
    for (const interceptor of this.interceptors) {
      if (interceptor.onRequest) {
        config = await interceptor.onRequest(config);
      }
    }

    const url = new URL(`${this.baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`, 'http://localhost');
    if (config.params) {
      Object.entries(config.params).forEach(([k, v]) => {
        if (v !== undefined) url.searchParams.set(k, String(v));
      });
    }

    const { timeout = 15000, retries = 0, retryDelay = 500, ...fetchInit } = config;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), {
        ...fetchInit,
        signal: config.signal || controller.signal,
      });
      clearTimeout(timeoutId);

      const isJson = response.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await response.json() : await response.text();

      let apiResponse: ApiResponse<T> = {
        data: data as T,
        status: response.status,
        headers: response.headers,
        ok: response.ok,
      };

      for (const interceptor of this.interceptors) {
        if (interceptor.onResponse) {
          apiResponse = await interceptor.onResponse(apiResponse);
        }
      }

      if (!response.ok) throw apiResponse;
      return apiResponse;
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (retries > 0) {
        await new Promise((r) => setTimeout(r, retryDelay));
        return this.request<T>(endpoint, { ...config, retries: retries - 1 });
      }
      for (const interceptor of this.interceptors) {
        if (interceptor.onError) await interceptor.onError(err);
      }
      throw err;
    }
  }

  get<T>(url: string, opts?: RequestOptions) {
    return this.request<T>(url, { ...opts, method: 'GET' });
  }

  post<T>(url: string, body?: any, opts?: RequestOptions) {
    return this.request<T>(url, {
      ...opts,
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json', ...opts?.headers },
    });
  }
}

export const defaultApiClient = new ApiClient();
