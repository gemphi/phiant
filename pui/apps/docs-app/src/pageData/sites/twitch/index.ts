import type { SiteDefinition } from '../../types';
import { TWITCH_THEME } from './theme';
import { TWITCH_PAGES } from './pages';

export const TWITCH_SITE: SiteDefinition = {
  id: 'twitch',
  name: 'Twitch',
  description: 'Live streaming platform — browse channels, watch streams, and chat.',
  themeVars: TWITCH_THEME,
  pages: TWITCH_PAGES,
};

export default TWITCH_SITE;
