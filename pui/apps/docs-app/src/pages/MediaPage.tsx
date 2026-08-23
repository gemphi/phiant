import React from 'react';
import { PageHeader, Showcase } from '../components/Showcase';
import PageShell from '../components/PageShell';
import { Image, Avatar, Row, Col, Stack } from '@phi/pui';
import styles from './pages.module.scss';

export default function MediaPage() {
  return (
    <PageShell>
      <PageHeader
        title="Media"
        description="Image, Avatar — visual media components"
      />

      <Showcase title="Image" description="Responsive image with aspect ratio options">
        <Row xs={1} sm={3} gap={4}>
          <Col><Image src="https://picsum.photos/200/200" alt="Square" aspect="square" /></Col>
          <Col><Image src="https://picsum.photos/300/200" alt="Video" aspect="video" /></Col>
          <Col><Image src="https://picsum.photos/250/150" alt="Auto" aspect="auto" /></Col>
        </Row>
      </Showcase>

      <Showcase title="Avatar" description="Profile avatar with image or initials, sizes (sm, md, lg, xl)">
        <Row xs={3} sm={5} gap={4} align="center">
          <Col><Avatar initials="JD" size="sm" /></Col>
          <Col><Avatar initials="AB" size="md" /></Col>
          <Col><Avatar initials="CD" size="lg" /></Col>
          <Col><Avatar initials="EF" size="xl" /></Col>
          <Col><Avatar src="https://picsum.photos/100/100" alt="User" size="lg" /></Col>
        </Row>
      </Showcase>
    </PageShell>
  );
}
