import type { SiteDefinition } from '../../types';
import { NIKE_THEME } from './theme';
import { NIKE_PAGES } from './pages';

export const NIKE_SITE: SiteDefinition = {
  id: 'nike',
  name: 'Nike',
  description: 'Just Do It — shop running, basketball, training, and lifestyle footwear.',
  themeVars: NIKE_THEME,
  pages: NIKE_PAGES,
};

export default NIKE_SITE;
