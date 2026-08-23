'use client';

import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

export interface NonIdealStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const NonIdealState: React.FC<NonIdealStateProps> = ({
  icon,
  title,
  description,
  action,
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(styles.nonIdealState, className)} {...props}>
      {icon && <div className={styles.visual}>{icon}</div>}
      {title && <h4 className={styles.heading}>{title}</h4>}
      {description && <div className={styles.description}>{description}</div>}
      {action && <div className={styles.action}>{action}</div>}
      {children}
    </div>
  );
};

export default NonIdealState;
