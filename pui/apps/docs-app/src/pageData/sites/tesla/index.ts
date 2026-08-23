import type { SiteDefinition } from '../../types';
import { TESLA_THEME } from './theme';
import { TESLA_PAGES } from './pages';

export const TESLA_SITE: SiteDefinition = {
  id: 'tesla',
  name: 'Tesla Store',
  description: 'Premium electric vehicles, energy, and charging — configure and order online.',
  themeVars: TESLA_THEME,
  pages: TESLA_PAGES,
};

export default TESLA_SITE;
