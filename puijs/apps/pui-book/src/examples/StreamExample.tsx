'use client';

import React from 'react';
import { Card, Button, Stack, ProgressBar, Callout, useStream } from '@pui/components';
import { Play, Square, Sparkles } from 'lucide-react';

const STREAM_PROMPT =
  'Initializing Phient Autonomous Agent Kernel v2.4... Fetching ontology graph schema. Loading geosemantic index from Topos cluster. Running tensor constraint solvers. Synthesizing multi-modal operational response. Execution complete with 0 anomalies detected.';

export const StreamExample: React.FC = () => {
  const { tokens, progress, isStreaming, startStream, stopStream } = useStream();

  return (
    <Card style={{ padding: '1.5rem' }}>
      <Stack direction="column" gap={3}>
        <Callout intent="primary" title="Real-Time Streaming Engine (SSE & NDJSON)">
          Stream live LLM tokens and time-series telemetry directly into pure PUI presentation components with zero layout thrashing.
        </Callout>

        <Stack direction="row" gap={2}>
          <Button
            variant="primary"
            size="sm"
            icon={<Play size={14} />}
            disabled={isStreaming}
            onClick={() => startStream(STREAM_PROMPT)}
          >
            Start Token Stream
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Square size={14} />}
            disabled={!isStreaming}
            onClick={stopStream}
          >
            Stop Stream
          </Button>
        </Stack>

        <ProgressBar value={progress} max={100} intent="primary" animate={isStreaming} />

        <div style={{ background: '#090d16', padding: '1rem', borderRadius: 6, minHeight: 80, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: 1.6, border: '1px solid #1e293b' }}>
          {tokens ? (
            <span>
              {tokens}
              {isStreaming && <span style={{ display: 'inline-block', width: 8, height: 16, background: '#38bdf8', marginLeft: 4, verticalAlign: 'middle', animation: 'pulse 1s infinite' }} />}
            </span>
          ) : (
            <span style={{ color: '#475569' }}>Click "Start Token Stream" to observe live chunk emission...</span>
          )}
        </div>
      </Stack>
    </Card>
  );
};
