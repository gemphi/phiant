export * from './storeService';
export * from './accountStore';
export * from './themeTypes';

import { registerServices } from './storeService';
import { ACCOUNT_DATA } from './accountStore';
import { YOUTUBE_DATA } from '../sites/youtube';
import { TIKTOK_DATA } from '../sites/tiktok';
import { X_DATA } from '../sites/xcom';
import { APP_STORE_DATA } from '../sites/appstore';
import { INSTAGRAM_DATA } from '../sites/instagram';
import { TESLA_DATA } from '../sites/tesla';
import { NIKE_DATA } from '../sites/nike';
import { REDDIT_DATA } from '../sites/reddit';
import { AMAZON_DATA } from '../sites/amazon';
import { COINBASE_DATA } from '../sites/coinbase';
import { SPOTIFY_DATA } from '../sites/spotify';
import { LINKEDIN_DATA } from '../sites/linkedin';
import { TWITCH_DATA } from '../sites/twitch';
import { GITHUB_DATA } from '../sites/github';

/**
 * Register all site data services at app startup.
 * Call this once — pages then resolve data by key.
 */
export const initStore = () => {
  registerServices(ACCOUNT_DATA);
  registerServices(YOUTUBE_DATA);
  registerServices(TIKTOK_DATA);
  registerServices(X_DATA);
  registerServices(APP_STORE_DATA);
  registerServices(INSTAGRAM_DATA);
  registerServices(TESLA_DATA);
  registerServices(NIKE_DATA);
  registerServices(REDDIT_DATA);
  registerServices(AMAZON_DATA);
  registerServices(COINBASE_DATA);
  registerServices(SPOTIFY_DATA);
  registerServices(LINKEDIN_DATA);
  registerServices(TWITCH_DATA);
  registerServices(GITHUB_DATA);
};
