import React from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Title } from '../../primitives/Title';
import { Text } from '../../primitives/Text';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({ icon: Icon, title, description, action, className = '' }: EmptyStateProps) => {
  return (
    <Stack direction="column" align="center" gap={3} className={cn(styles.empty, className)}>
      {Icon && <Icon className={styles.icon} size={48} />}
      <Title variant="h4" className={styles.title}>
        {title}
      </Title>
      {description && <Text variant="muted">{description}</Text>}
      {action && <Stack direction="row" className={styles.action}>{action}</Stack>}
    </Stack>
  );
};
