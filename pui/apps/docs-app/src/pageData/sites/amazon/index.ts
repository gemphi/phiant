import type { SiteDefinition } from '../../types';
import { AMAZON_THEME } from './theme';
import { AMAZON_PAGES } from './pages';

export const AMAZON_SITE: SiteDefinition = {
  id: 'amazon',
  name: 'Amazon',
  description: 'Earth\u2019s most customer-centric company \u2014 shop millions of products with fast Prime delivery.',
  themeVars: AMAZON_THEME,
  pages: AMAZON_PAGES,
};

export default AMAZON_SITE;
