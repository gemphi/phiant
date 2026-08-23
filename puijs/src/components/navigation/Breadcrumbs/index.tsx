import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Link } from '../Link';
import styles from './styles.module.scss';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export const Breadcrumbs = ({ items, className = '' }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cn(styles.breadcrumbs, className)}>
      {items.map((item, index) => (
        <React.Fragment key={item.label + index}>
          {index > 0 && <ChevronRight className={styles.separator} size={14} />}
          {item.href ? (
            <Link href={item.href} variant="muted" className={styles.item}>
              {item.label}
            </Link>
          ) : (
            <span className={cn(styles.item, styles.current)}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
