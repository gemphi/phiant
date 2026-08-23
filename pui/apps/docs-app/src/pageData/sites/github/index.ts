import type { SiteDefinition } from '../../types';
import { GITHUB_THEME } from './theme';
import { GITHUB_PAGES } from './pages';

export const GITHUB_SITE: SiteDefinition = {
  id: 'github',
  name: 'GitHub',
  description: 'Developer platform — repositories, issues, pull requests, and activity.',
  themeVars: GITHUB_THEME,
  pages: GITHUB_PAGES,
};

export default GITHUB_SITE;
