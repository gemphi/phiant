import React from 'react';
import { Page } from '@phient/pui';
import { Selectable } from './inspector';
import PageNav from './PageNav';
import styles from './PageShell.module.scss';

type PageShellProps = {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const PageShell = ({ children, className = '', header, footer }: PageShellProps) => (
  <Selectable tag="Page" label="Page Content">
    <Page className={`${styles.page} ${className}`.trim()} header={header} footer={footer}>
      {children}
      <PageNav />
    </Page>
  </Selectable>
);

export default PageShell;
