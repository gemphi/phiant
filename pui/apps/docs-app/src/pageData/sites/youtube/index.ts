import type { SiteDefinition } from '../../types';
import { YOUTUBE_THEME } from './theme';
import { YOUTUBE_PAGES } from './pages';

export const YOUTUBE_SITE: SiteDefinition = {
  id: 'youtube',
  name: 'YouTube',
  description: 'Video platform with search, feed, watch page, and channel pages.',
  themeVars: YOUTUBE_THEME,
  pages: YOUTUBE_PAGES,
};

export default YOUTUBE_SITE;
