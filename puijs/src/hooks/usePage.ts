import { useState, useEffect } from 'react';

export interface PageMetadata {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function usePage(meta?: PageMetadata) {
  const [metadata, setMetadata] = useState<PageMetadata>(meta || {});

  useEffect(() => {
    if (meta?.title && typeof document !== 'undefined') {
      document.title = `${meta.title} - Phient UI`;
    }
  }, [meta?.title]);

  return { metadata, setMetadata };
}
