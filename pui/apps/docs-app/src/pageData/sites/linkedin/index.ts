import type { SiteDefinition } from '../../types';
import { LINKEDIN_THEME } from './theme';
import { LINKEDIN_PAGES } from './pages';

export const LINKEDIN_SITE: SiteDefinition = {
  id: 'linkedin',
  name: 'LinkedIn',
  description: 'Professional networking — feed, profile, jobs, and connections.',
  themeVars: LINKEDIN_THEME,
  pages: LINKEDIN_PAGES,
};

export default LINKEDIN_SITE;
