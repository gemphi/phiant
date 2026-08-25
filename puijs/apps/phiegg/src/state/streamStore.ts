import { createStore } from '@pui/store';
import { StreamPacket, StreamTaxonomy } from '../types/streams';

const INITIAL_PACKETS: StreamPacket[] = [
  { id: 'pkt-1', sequence: 49201, timestamp: '14:21:01', taxonomy: 'AGENT_STATUS', source: 'PhiBot', payload: { state: 'RUNNING', playbook: 'SyncGlobalFleet' }, merkleSignature: '0x7f4a...88c2' },
  { id: 'pkt-2', sequence: 49202, timestamp: '14:21:03', taxonomy: 'ONTOLOGY_MUTATION', source: 'POntologyEngine', payload: { objectType: 'Flight', primaryKey: 'FL-101', status: 'EN_ROUTE' }, merkleSignature: '0x3e1b...99a1' },
  { id: 'pkt-3', sequence: 49203, timestamp: '14:21:05', taxonomy: 'TRANSACTION_COMMITTED', source: 'PhiSec', payload: { txId: 'tx_88192', changes: 4, verified: true }, merkleSignature: '0x99dd...120f' },
  { id: 'pkt-4', sequence: 49204, timestamp: '14:21:08', taxonomy: 'TELEMETRY_PULSE', source: 'PhiBus', payload: { channel: 'CORE_STREAM', ratePerSec: 14820, latencyMs: 2.1 }, merkleSignature: '0x12bb...884a' },
  { id: 'pkt-5', sequence: 49205, timestamp: '14:21:10', taxonomy: 'AUDIT_EVENT', source: 'PhiGov', payload: { ruleId: 'PII_REDACTED', entity: 'User#904', clearance: 'LEVEL_4' }, merkleSignature: '0x44fa...77b1' },
];

export interface StreamStoreState {
  packets: StreamPacket[];
  isPaused: boolean;
  selectedTaxonomy: StreamTaxonomy | 'ALL';
  searchQuery: string;
  addPacket: (p: StreamPacket) => void;
  togglePause: () => void;
  setTaxonomy: (t: StreamTaxonomy | 'ALL') => void;
  setSearch: (q: string) => void;
  clearPackets: () => void;
}

export const streamStore = createStore<StreamStoreState>((set, get) => ({
  packets: INITIAL_PACKETS,
  isPaused: false,
  selectedTaxonomy: 'ALL',
  searchQuery: '',
  addPacket: (p: StreamPacket) => {
    if (get().isPaused) return;
    set({ packets: [p, ...get().packets].slice(0, 100) });
  },
  togglePause: () => set({ isPaused: !get().isPaused }),
  setTaxonomy: (selectedTaxonomy: StreamTaxonomy | 'ALL') => set({ selectedTaxonomy }),
  setSearch: (searchQuery: string) => set({ searchQuery }),
  clearPackets: () => set({ packets: [] }),
}));
