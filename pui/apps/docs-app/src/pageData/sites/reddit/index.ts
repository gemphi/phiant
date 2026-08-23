import type { SiteDefinition } from '../../types';
import { REDDIT_THEME } from './theme';
import { REDDIT_PAGES } from './pages';

export const REDDIT_SITE: SiteDefinition = {
  id: 'reddit',
  name: 'Reddit',
  description: 'Community-driven social platform with feeds, subreddits, posts, and comments.',
  themeVars: REDDIT_THEME,
  pages: REDDIT_PAGES,
};
