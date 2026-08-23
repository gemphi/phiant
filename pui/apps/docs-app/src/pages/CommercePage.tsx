import React from 'react';
import { PageView } from '../pageData';
import { getPageEntry } from '../pageData/store';

/**
 * CommercePage is now a pure data point.
 * All content is defined in pageData/store/commercePageData.ts
 * and rendered via PageView + PageRenderer.
 */
export default function CommercePage() {
  const entry = getPageEntry('/commerce');
  if (!entry) return null;
  return (
    <PageView
      page={entry.page}
      config={entry.config}
      title={entry.title}
      description={entry.description}
    />
  );
}
