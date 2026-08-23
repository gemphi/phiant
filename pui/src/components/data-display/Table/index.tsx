import React from 'react';
import { cn } from '../../../utils/cn';
import styles from './styles.module.scss';

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  className?: string;
  children?: React.ReactNode;
};

export const Table = ({ className = '', children, ...props }: TableProps) => {
  return (
    <table className={cn(styles.table, className)} {...props}>
      {children}
    </table>
  );
};

export const Thead = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn(styles.thead, className)} {...props}>{children}</thead>
);

export const Tbody = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn(styles.tbody, className)} {...props}>{children}</tbody>
);

export const Tr = ({ className = '', children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cn(styles.tr, className)} {...props}>{children}</tr>
);

export const Th = ({ className = '', children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th className={cn(styles.th, className)} {...props}>{children}</th>
);

export const Td = ({ className = '', children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td className={cn(styles.td, className)} {...props}>{children}</td>
);
