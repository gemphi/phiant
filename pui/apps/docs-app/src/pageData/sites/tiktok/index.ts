import type { SiteDefinition } from '../../types';
import { TIKTOK_THEME } from './theme';
import { TIKTOK_PAGES } from './pages';

export const TIKTOK_SITE: SiteDefinition = {
  id: 'tiktok',
  name: 'TikTok',
  description: 'Vertical video feed with side actions, creator profiles, and comments.',
  themeVars: TIKTOK_THEME,
  pages: TIKTOK_PAGES,
};

export default TIKTOK_SITE;
