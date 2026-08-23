import type { SiteDefinition } from '../../types';
import { COINBASE_THEME } from './theme';
import { COINBASE_PAGES } from './pages';

export const COINBASE_SITE: SiteDefinition = {
  id: 'coinbase',
  name: 'Coinbase',
  description: 'Buy, sell, and manage cryptocurrency — portfolio, trading, and market data.',
  themeVars: COINBASE_THEME,
  pages: COINBASE_PAGES,
};

export default COINBASE_SITE;
