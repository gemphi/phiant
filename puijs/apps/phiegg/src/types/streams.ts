export type StreamTaxonomy =
  | 'AGENT_STATUS'
  | 'ONTOLOGY_MUTATION'
  | 'TRANSACTION_COMMITTED'
  | 'AUDIT_EVENT'
  | 'TELEMETRY_PULSE';

export interface StreamPacket {
  id: string;
  sequence: number;
  timestamp: string;
  taxonomy: StreamTaxonomy;
  source: string;
  payload: Record<string, any>;
  merkleSignature: string;
}

export interface StreamFilter {
  taxonomies: Set<StreamTaxonomy>;
  searchQuery: string;
  paused: boolean;
}
