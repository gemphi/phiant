import React from 'react';

export interface DocGuide {
  id: string;
  category: string;
  title: string;
  badge: string;
  summary: string;
  citations: string[];
  content: string;
}

export interface DocsPortalProps {
  guides: DocGuide[];
  initialGuideId?: string;
  version?: string;
  brandTitle?: string;
  onBackToApp?: () => void;
  backToAppLabel?: string;
  dark?: boolean;
  onToggleDark?: () => void;
  className?: string;
}
