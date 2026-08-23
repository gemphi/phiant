'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Stack,
  Text,
  Badge,
  Callout,
  useService,
  TelemetryService,
} from '@pui/components';
import { Activity, Send, Terminal } from 'lucide-react';

export const ServiceExample: React.FC = () => {
  const telemetry = useService(TelemetryService);
  const [events, setEvents] = useState<Array<{ timestamp: string; event: string; payload: any }>>([]);

  useEffect(() => {
    const unsub = telemetry.on('track', (entry) => {
      setEvents((prev) => [entry, ...prev].slice(0, 5));
    });
    return unsub;
  }, [telemetry]);

  const fireEvent = (name: string) => {
    telemetry.track(name, { sessionId: 'sess-8891', user: 'agent-007' });
  };

  return (
    <Card style={{ padding: '1.5rem' }}>
      <Stack direction="column" gap={3}>
        <Callout intent="warning" title="Dependency Injection & Event Bus (Inversion of Control)">
          Services encapsulate asynchronous business rules, background jobs, and emit events without tying to React UI lifecycles.
        </Callout>

        <Stack direction="row" gap={2}>
          <Button
            variant="primary"
            size="sm"
            icon={<Send size={14} />}
            onClick={() => fireEvent('agent.plan.generated')}
          >
            Emit "agent.plan.generated"
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Activity size={14} />}
            onClick={() => fireEvent('telemetry.heartbeat')}
          >
            Emit "telemetry.heartbeat"
          </Button>
        </Stack>

        <div style={{ background: '#0f172a', padding: '1rem', borderRadius: 6, color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: '#94a3b8' }}>
            <Terminal size={14} /> Service Event Stream ({events.length} received):
          </div>
          {events.length === 0 ? (
            <span style={{ color: '#64748b' }}>No events emitted yet. Click a button above.</span>
          ) : (
            events.map((ev, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                <span style={{ color: '#a855f7' }}>[{ev.timestamp.slice(11, 19)}]</span>{' '}
                <span style={{ color: '#22c55e', fontWeight: 600 }}>{ev.event}</span>{' '}
                <span style={{ color: '#94a3b8' }}>{JSON.stringify(ev.payload)}</span>
              </div>
            ))
          )}
        </div>
      </Stack>
    </Card>
  );
};
