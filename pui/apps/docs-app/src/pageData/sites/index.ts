import { APP_STORE_SITE } from './appStore';
import { X_COM_SITE } from './xCom';
import { TIKTOK_SITE } from './tiktok';
import { YOUTUBE_SITE } from './youtube';
import { INSTAGRAM_SITE } from './instagram';
import { TESLA_SITE } from './tesla';
import { NIKE_SITE } from './nike';
import { REDDIT_SITE } from './reddit';
import { AMAZON_SITE } from './amazon';
import { COINBASE_SITE } from './coinbase';
import { SPOTIFY_SITE } from './spotify';
import { LINKEDIN_SITE } from './linkedin';
import { TWITCH_SITE } from './twitch';
import { GITHUB_SITE } from './github';
import type { SiteDefinition } from '../types';

export {
  APP_STORE_SITE,
  X_COM_SITE,
  TIKTOK_SITE,
  YOUTUBE_SITE,
  INSTAGRAM_SITE,
  TESLA_SITE,
  NIKE_SITE,
  REDDIT_SITE,
  AMAZON_SITE,
  COINBASE_SITE,
  SPOTIFY_SITE,
  LINKEDIN_SITE,
  TWITCH_SITE,
  GITHUB_SITE,
};

export const SITE_REGISTRY: Record<string, SiteDefinition> = {
  [APP_STORE_SITE.id]: APP_STORE_SITE,
  [X_COM_SITE.id]: X_COM_SITE,
  [TIKTOK_SITE.id]: TIKTOK_SITE,
  [YOUTUBE_SITE.id]: YOUTUBE_SITE,
  [INSTAGRAM_SITE.id]: INSTAGRAM_SITE,
  [TESLA_SITE.id]: TESLA_SITE,
  [NIKE_SITE.id]: NIKE_SITE,
  [REDDIT_SITE.id]: REDDIT_SITE,
  [AMAZON_SITE.id]: AMAZON_SITE,
  [COINBASE_SITE.id]: COINBASE_SITE,
  [SPOTIFY_SITE.id]: SPOTIFY_SITE,
  [LINKEDIN_SITE.id]: LINKEDIN_SITE,
  [TWITCH_SITE.id]: TWITCH_SITE,
  [GITHUB_SITE.id]: GITHUB_SITE,
};

export const ALL_SITES = Object.values(SITE_REGISTRY);
