import { createStore } from '@pui/store';
import { NamespaceDef, ApiEndpoint } from '../types/docs';

const PALANTIR_NAMESPACES: NamespaceDef[] = [
  {
    name: 'Ontologies', title: 'Ontologies v2', description: 'Load, query, filter and mutate objects, interfaces, links and actions.',
    endpoints: [
      {
        id: 'list-objects', namespace: 'Ontologies', method: 'POST', path: '/api/v2/ontologies/objects/Flight/load',
        summary: 'Load Object Set', description: 'Retrieves a filtered page of Flight objects from the POntologyEngine.',
        parameters: [{ name: 'pageSize', type: 'integer', required: false, description: 'Page limit' }, { name: 'filter', type: 'object', required: false, description: 'RQL filter predicate' }],
        samplePayload: { pageSize: 50, filter: { status: { eq: 'EN_ROUTE' } } },
        sampleResponse: { data: [{ flightId: 'FL-104', origin: 'LAX', destination: 'SYD', altitude: 36000 }], nextPageToken: null },
        pythonSnippet: 'from phiadk import Client\n\nclient = Client()\nflights = client.ontology.objects.Flight.where(status="EN_ROUTE").all()\nprint(flights)',
        tsSnippet: 'import { createClient } from "@phiace/puijs";\n\nconst client = createClient();\nconst flights = await client.ontology.objects.Flight.where({ status: "EN_ROUTE" }).all();',
        curlSnippet: 'curl -X POST "https://api.puijs.com/v2/ontologies/objects/Flight/load" \\\n  -H "Authorization: Bearer phi_tok_..." \\\n  -H "Content-Type: application/json" \\\n  -d \'{"pageSize": 50}\'',
      },
    ],
  },
  {
    name: 'AipAgents', title: 'AIP Agent Studio', description: 'Invoke, evaluate, and trace autonomous domain agents.',
    endpoints: [
      {
        id: 'dispatch-agent', namespace: 'AipAgents', method: 'POST', path: '/api/v2/aip/agents/phibot/execute',
        summary: 'Execute Agent Playbook', description: 'Executes an automated playbook with streaming token receipts.',
        parameters: [{ name: 'playbookId', type: 'string', required: true, description: 'Playbook ID' }],
        samplePayload: { playbookId: 'SyncFleetRadar', parameters: { region: 'PACIFIC' } },
        sampleResponse: { taskId: 'task_99120', status: 'COMPLETED', receipts: 3 },
        pythonSnippet: 'from phiadk import Client\n\nclient = Client()\nres = client.phibot.execute_playbook("SyncFleetRadar", region="PACIFIC")\nprint(res.receipts)',
        tsSnippet: 'import { createClient } from "@phiace/puijs";\n\nconst client = createClient();\nconst res = await client.aip.executePlaybook("SyncFleetRadar", { region: "PACIFIC" });',
        curlSnippet: 'curl -X POST "https://api.puijs.com/v2/aip/agents/phibot/execute" \\\n  -H "Authorization: Bearer phi_tok_..." \\\n  -d \'{"playbookId":"SyncFleetRadar"}\'',
      },
    ],
  },
  {
    name: 'Streams', title: 'PhiBus Live Streams', description: 'Server-Sent Events (SSE) packet streams and event replay.',
    endpoints: [
      {
        id: 'subscribe-stream', namespace: 'Streams', method: 'GET', path: '/api/v2/streams/events/subscribe',
        summary: 'Subscribe to SSE Stream', description: 'Connects to the real-time PhiBus SSE packet stream.',
        parameters: [{ name: 'channels', type: 'string', required: false, description: 'Comma separated channels' }],
        sampleResponse: { seq: 49201, channel: 'CORE_STREAM', event: 'PACKET_COMMITTED' },
        pythonSnippet: 'from phiadk import Client\n\nclient = Client()\nfor event in client.phibus.stream(channels=["CORE_STREAM"]):\n    print(event.seq, event.payload)',
        tsSnippet: 'import { createClient } from "@phiace/puijs";\n\nconst client = createClient();\nclient.streams.on("CORE_STREAM", (packet) => console.log(packet));',
        curlSnippet: 'curl -N "https://api.puijs.com/v2/streams/events/subscribe?channels=CORE_STREAM" \\\n  -H "Authorization: Bearer phi_tok_..."',
      },
    ],
  },
];

export interface DocsStoreState {
  namespaces: NamespaceDef[];
  selectedNamespaceName: string;
  selectedEndpointId: string;
  activeLanguage: 'python' | 'ts' | 'curl';
  liveResponse: Record<string, any> | null;
  isRunning: boolean;
  selectEndpoint: (ns: string, id: string) => void;
  setLanguage: (lang: 'python' | 'ts' | 'curl') => void;
  runEndpoint: () => void;
}

export const docsStore = createStore<DocsStoreState>((set, get) => ({
  namespaces: PALANTIR_NAMESPACES,
  selectedNamespaceName: 'Ontologies',
  selectedEndpointId: 'list-objects',
  activeLanguage: 'python',
  liveResponse: null,
  isRunning: false,
  selectEndpoint: (selectedNamespaceName: string, selectedEndpointId: string) => set({ selectedNamespaceName, selectedEndpointId, liveResponse: null }),
  setLanguage: (activeLanguage: 'python' | 'ts' | 'curl') => set({ activeLanguage }),
  runEndpoint: () => {
    set({ isRunning: true });
    setTimeout(() => {
      const ns = get().namespaces.find((n) => n.name === get().selectedNamespaceName);
      const ep = ns?.endpoints.find((e) => e.id === get().selectedEndpointId);
      set({ liveResponse: ep?.sampleResponse || { status: 200, message: 'OK' }, isRunning: false });
    }, 450);
  },
}));
