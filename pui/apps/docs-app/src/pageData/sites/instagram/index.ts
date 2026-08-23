import type { SiteDefinition } from '../../types';
import { INSTAGRAM_THEME } from './theme';
import { INSTAGRAM_PAGES } from './pages';

export const INSTAGRAM_SITE: SiteDefinition = {
  id: 'instagram',
  name: 'Instagram',
  description: 'Photo and video sharing platform with feed, explore, and stories.',
  themeVars: INSTAGRAM_THEME,
  pages: INSTAGRAM_PAGES,
};

export default INSTAGRAM_SITE;
