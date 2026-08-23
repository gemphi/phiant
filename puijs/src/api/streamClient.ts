import { StreamEvent } from './types';

export interface StreamOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  onEvent?: (event: StreamEvent) => void;
  onError?: (error: any) => void;
  onComplete?: () => void;
}

export class StreamClient {
  static async streamNdJson(
    url: string,
    onChunk: (chunk: string) => void,
    options: StreamOptions = {}
  ): Promise<void> {
    const response = await fetch(url, {
      headers: { Accept: 'application/x-ndjson, text/event-stream', ...options.headers },
      signal: options.signal,
    });

    if (!response.body) throw new Error('[StreamClient] Response body is null');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        onChunk(text);
      }
      options.onComplete?.();
    } catch (err) {
      if ((err as any)?.name === 'AbortError') return;
      options.onError?.(err);
      throw err;
    }
  }

  static simulateTokenStream(
    fullText: string,
    onToken: (token: string, progress: number) => void,
    tokenDelay: number = 30
  ): () => void {
    let index = 0;
    const words = fullText.split(/(\s+)/);
    let timer: any = null;

    const tick = () => {
      if (index < words.length) {
        const token = words[index];
        index++;
        const progress = Math.min(100, Math.round((index / words.length) * 100));
        onToken(token, progress);
        timer = setTimeout(tick, tokenDelay + Math.random() * 20);
      }
    };

    timer = setTimeout(tick, tokenDelay);
    return () => clearTimeout(timer);
  }
}
