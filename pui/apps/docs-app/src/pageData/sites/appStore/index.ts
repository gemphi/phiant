import type { SiteDefinition } from '../../types';
import { APP_STORE_THEME } from './theme';
import { APP_STORE_PAGES } from './pages';

export const APP_STORE_SITE: SiteDefinition = {
  id: 'app-store',
  name: 'Apple App Store',
  description: 'Editorial storefront for discovering, browsing, and downloading apps.',
  themeVars: APP_STORE_THEME,
  pages: APP_STORE_PAGES,
};

export default APP_STORE_SITE;
