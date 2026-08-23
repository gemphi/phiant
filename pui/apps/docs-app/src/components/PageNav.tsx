import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Span, Stack } from '@phient/pui';
import { PAGES } from '../datasets';
import styles from './PageNav.module.scss';

export const PageNav = () => {
  const location = useLocation();
  const currentIndex = PAGES.findIndex((p) => p.path === location.pathname);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? PAGES[currentIndex - 1] : null;
  const next = currentIndex < PAGES.length - 1 ? PAGES[currentIndex + 1] : null;

  return (
    <nav className={styles.pageNav}>
      {prev ? (
        <Link to={prev.path} className={styles.prev}>
          <ChevronLeft size={18} />
          <Stack direction="column" className={styles.label}>
            <Span variant="sm" className={styles.dir}>Previous</Span>
            <Span className={styles.title}>{prev.label}</Span>
          </Stack>
        </Link>
      ) : (
        <Span />
      )}
      {next ? (
        <Link to={next.path} className={styles.next}>
          <Stack direction="column" className={styles.label}>
            <Span variant="sm" className={styles.dir}>Next</Span>
            <Span className={styles.title}>{next.label}</Span>
          </Stack>
          <ChevronRight size={18} />
        </Link>
      ) : (
        <Span />
      )}
    </nav>
  );
};

export default PageNav;