import type { SiteDefinition } from '../../types';
import { SPOTIFY_THEME } from './theme';
import { SPOTIFY_PAGES } from './pages';

export const SPOTIFY_SITE: SiteDefinition = {
  id: 'spotify',
  name: 'Spotify',
  description: 'Music streaming with playlists, albums, artists, and podcasts.',
  themeVars: SPOTIFY_THEME,
  pages: SPOTIFY_PAGES,
};

export default SPOTIFY_SITE;
