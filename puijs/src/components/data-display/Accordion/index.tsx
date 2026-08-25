'use client';

import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { Span } from '../../primitives/Span';
import { Stack } from '../../layout/Stack';
import { Row } from '../../layout/Row';
import { Col } from '../../layout/Col';
import styles from './styles.module.scss';

type AccordionItemProps = {
  title: React.ReactNode;
  open?: boolean;
  isOpen?: boolean;
  onToggle: () => void;
  children: React.ReactNode;
};

export const AccordionItem = ({ title, open, isOpen, onToggle, children }: AccordionItemProps) => {
  const isItemOpen = open ?? isOpen ?? false;
  return (
    <Stack direction="column" className={styles.item}>
      <Row
        align="center"
        justify="between"
        className={styles.header}
        onClick={onToggle}
      >
        <Span className={styles.title}>{title}</Span>
        <Icon name={isItemOpen ? ChevronDown : ChevronRight} size="sm" />
      </Row>
      {isItemOpen && <Col className={styles.body}>{children}</Col>}
    </Stack>
  );
};

type AccordionProps = {
  children: React.ReactNode;
  allowMultiple?: boolean;
  className?: string;
};

export const Accordion = ({ children, className = '' }: AccordionProps) => {
  return <Stack direction="column" className={cn(styles.accordion, className)}>{children}</Stack>;
};
