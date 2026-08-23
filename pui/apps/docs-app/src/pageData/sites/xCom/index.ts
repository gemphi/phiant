import type { SiteDefinition } from '../../types';
import { X_COM_THEME } from './theme';
import { X_COM_PAGES } from './pages';

export const X_COM_SITE: SiteDefinition = {
  id: 'x-com',
  name: 'X.com',
  description: 'Social feed with composer, posts, trending topics, and profiles.',
  themeVars: X_COM_THEME,
  pages: X_COM_PAGES,
};

export default X_COM_SITE;
