import type { SiteDefinition } from '../../types';
import { PINTEREST_THEME } from './theme';
import { PINTEREST_PAGES } from './pages';

export const PINTEREST_SITE: SiteDefinition = {
  id: 'pinterest',
  name: 'Pinterest',
  description: 'Visual discovery platform for finding ideas and inspiration for home decor, recipes, fashion, and more.',
  themeVars: PINTEREST_THEME,
  pages: PINTEREST_PAGES,
};

export default PINTEREST_SITE;
