import React from 'react';
import { Page, Stack, Card, CardHeader, CardBody, Title, Text, Tag, Badge, Icon, Table, Thead, Tbody, Tr, Th, Td } from '@pui/components';
import { Shield, ShieldCheck, CheckCircle } from 'lucide-react';

const AUDIT_RECORDS = [
  { id: 'AUD-901', time: '14:20:12', actor: 'phione', action: 'ROTATE_CREDENTIALS', target: 'User#882', status: 'VERIFIED', merkleProof: '0x33ee...881a' },
  { id: 'AUD-902', time: '14:20:18', actor: 'phisec', action: 'ENCRYPT_CIPHER_TEXT', target: 'Payment#401', status: 'VERIFIED', merkleProof: '0x77fa...99cc' },
  { id: 'AUD-903', time: '14:20:25', actor: 'phigov', action: 'APPLY_PII_REDACTION', target: 'TelemetryLog#99', status: 'VERIFIED', merkleProof: '0x12ab...44ef' },
  { id: 'AUD-904', time: '14:20:31', actor: 'phibot', action: 'DISPATCH_WORKFLOW', target: 'Playbook#Sync', status: 'VERIFIED', merkleProof: '0x66bb...11ee' },
];

export const GovernancePage: React.FC = () => {
  return (
    <Page>
      <Stack direction="column" gap={4}>
        <Stack direction="row" justify="between" align="center">
          <Stack direction="column" gap={1}>
            <Title level={2} size="xl">Cryptographic Governance & Audit Ledger</Title>
            <Text size="md" intent="secondary">Zero-trust immutable audit trails, Merkle proofs, and PII redaction policies.</Text>
          </Stack>
          <Tag intent="success" minimal round size="md">
            <Icon icon={ShieldCheck} size="xs" />
            Ledger Status: 100% Immutable
          </Tag>
        </Stack>

        <Card variant="default">
          <CardHeader
            action={
              <Stack direction="row" align="center" gap={2}>
                <Tag intent="primary" minimal round size="md">Zero-Trust: Enforced</Tag>
              </Stack>
            }
          >
            <Stack direction="row" align="center" gap={2}>
              <Icon icon={Shield} size="md" />
              <Title level={4} size="md">Immutable Merkle Proof Ledger</Title>
            </Stack>
          </CardHeader>
          <CardBody>
            <Table>
              <Thead>
                <Tr>
                  <Th>Audit ID</Th>
                  <Th>Timestamp</Th>
                  <Th>Actor Agent</Th>
                  <Th>Policy Action</Th>
                  <Th>Target Entity</Th>
                  <Th>Verification</Th>
                  <Th>Merkle Proof</Th>
                </Tr>
              </Thead>
              <Tbody>
                {AUDIT_RECORDS.map((rec) => (
                  <Tr key={rec.id}>
                    <Td><Badge variant="primary">{rec.id}</Badge></Td>
                    <Td><Text size="sm">{rec.time}</Text></Td>
                    <Td><Badge variant="neutral">{rec.actor}</Badge></Td>
                    <Td><Tag intent="primary" minimal round size="sm">{rec.action}</Tag></Td>
                    <Td><Text size="sm">{rec.target}</Text></Td>
                    <Td>
                      <Tag intent="success" minimal round size="sm">
                        <Icon icon={CheckCircle} size="xs" />
                        {rec.status}
                      </Tag>
                    </Td>
                    <Td><Text size="xs" intent="muted">{rec.merkleProof}</Text></Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Stack>
    </Page>
  );
};
