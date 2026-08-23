import { useState, useCallback, useRef } from 'react';
import { StreamClient } from '../api/streamClient';

export interface UseStreamOptions {
  onToken?: (token: string, progress: number) => void;
  onComplete?: () => void;
}

export function useStream() {
  const [tokens, setTokens] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const cancelRef = useRef<(() => void) | null>(null);

  const startStream = useCallback((text: string, options: UseStreamOptions = {}) => {
    if (cancelRef.current) cancelRef.current();
    setTokens('');
    setProgress(0);
    setIsStreaming(true);

    const cancel = StreamClient.simulateTokenStream(
      text,
      (token, prog) => {
        setTokens((prev: string) => prev + token);
        setProgress(prog);
        options.onToken?.(token, prog);
        if (prog >= 100) {
          setIsStreaming(false);
          options.onComplete?.();
        }
      },
      25
    );

    cancelRef.current = cancel;
  }, []);

  const stopStream = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current();
      cancelRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  return { tokens, progress, isStreaming, startStream, stopStream };
}
