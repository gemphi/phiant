import React from 'react';
import { cn } from '../../../utils/cn';
import { Stack } from '../../layout/Stack';
import styles from './styles.module.scss';

type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
};

export const Page = ({ header, sidebar, footer, className = '', children, ...props }: PageProps) => {
  return (
    <Stack direction="row" className={cn(styles.page, className)} {...props}>
      {sidebar && <aside className={styles.sidebarWrapper}>{sidebar}</aside>}
      <Stack direction="column" className={styles.contentWrapper}>
        {header && <header className={styles.header}>{header}</header>}
        <main className={styles.main}>{children}</main>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </Stack>
    </Stack>
  );
};
