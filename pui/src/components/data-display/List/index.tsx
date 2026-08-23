import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type ListProps = React.HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
  ordered?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export const List = ({ ordered = false, className = '', children, ...props }: ListProps) => {
  const Tag = ordered ? 'ol' : 'ul';
  return <Tag className={cn(styles.list, className)} {...props}>{children}</Tag>;
};

type ListItemProps = React.HTMLAttributes<HTMLLIElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const ListItem = ({ className = '', children, ...props }: ListItemProps) => {
  return <li className={cn(styles.item, className)} {...props}>{children}</li>;
};
