import type { SiteDefinition } from '../../types';
import { NETFLIX_THEME } from './theme';
import { NETFLIX_PAGES } from './pages';

export const NETFLIX_SITE: SiteDefinition = {
  id: 'netflix',
  name: 'Netflix',
  description: 'Streaming platform with browse rows, title detail with episodes, and My List.',
  themeVars: NETFLIX_THEME,
  pages: NETFLIX_PAGES,
};
