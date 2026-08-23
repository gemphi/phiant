/**
 * Common account store — shared profile data across all sites.
 * Any site can reference 'account.profile', 'account.settings', etc.
 */

export type AccountProfile = {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  initials: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  verified: boolean;
  followers: number;
  following: number;
};

export type AccountSettings = {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    mentions: boolean;
    replies: boolean;
    follows: boolean;
  };
  privacy: {
    profileVisible: boolean;
    showActivity: boolean;
    allowTagging: boolean;
    directMessages: 'everyone' | 'followers' | 'noone';
  };
  preferences: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: 'sm' | 'md' | 'lg';
    autoplay: boolean;
    defaultSort: 'recent' | 'popular' | 'trending';
  };
};

export type AccountConnection = {
  id: string;
  platform: string;
  handle: string;
  connected: boolean;
  avatar: string;
};

export const ACCOUNT_DATA: Record<string, any> = {
  'account.profile': {
    id: 'user-001',
    name: 'Batanayi Matuku',
    handle: '@bmatuku',
    email: 'batanayi@example.com',
    avatar: 'BM',
    initials: 'BM',
    bio: 'Building design systems and component libraries. Coffee enthusiast.',
    location: 'Cape Town, South Africa',
    website: 'https://bmatuku.dev',
    joinedDate: 'March 2021',
    verified: true,
    followers: 14820,
    following: 412,
  } as AccountProfile,

  'account.settings': {
    theme: 'system',
    language: 'en-US',
    timezone: 'Africa/Johannesburg',
    notifications: {
      email: true,
      push: true,
      sms: false,
      mentions: true,
      replies: true,
      follows: false,
    },
    privacy: {
      profileVisible: true,
      showActivity: true,
      allowTagging: true,
      directMessages: 'followers',
    },
    preferences: {
      reducedMotion: false,
      highContrast: false,
      fontSize: 'md',
      autoplay: true,
      defaultSort: 'recent',
    },
  } as AccountSettings,

  'account.connections': {
    items: [
      { id: 'conn-1', platform: 'YouTube', handle: '@bmatuku', connected: true, avatar: 'YT' },
      { id: 'conn-2', platform: 'X.com', handle: '@bmatuku', connected: true, avatar: 'X' },
      { id: 'conn-3', platform: 'Instagram', handle: '@bmatuku.dev', connected: true, avatar: 'IG' },
      { id: 'conn-4', platform: 'TikTok', handle: '@bmatuku', connected: false, avatar: 'TT' },
      { id: 'conn-5', platform: 'GitHub', handle: 'bmatuku', connected: true, avatar: 'GH' },
      { id: 'conn-6', platform: 'LinkedIn', handle: 'batanayi-matuku', connected: true, avatar: 'LI' },
      { id: 'conn-7', platform: 'Twitch', handle: 'bmatuku', connected: false, avatar: 'TW' },
      { id: 'conn-8', platform: 'Spotify', handle: 'bmatuku', connected: true, avatar: 'SP' },
    ] as AccountConnection[],
  },

  'account.activity': {
    items: [
      { id: 'act-1', type: 'login', description: 'Signed in from Cape Town, ZA', time: '2 hours ago' },
      { id: 'act-2', type: 'post', description: 'Published a new article on design tokens', time: '1 day ago' },
      { id: 'act-3', type: 'comment', description: 'Replied to a comment on YouTube', time: '2 days ago' },
      { id: 'act-4', type: 'follow', description: 'Started following @fireship', time: '3 days ago' },
      { id: 'act-5', type: 'like', description: 'Liked a post on Instagram', time: '4 days ago' },
      { id: 'act-6', type: 'login', description: 'Signed in from Johannesburg, ZA', time: '1 week ago' },
      { id: 'act-7', type: 'settings', description: 'Updated notification preferences', time: '1 week ago' },
      { id: 'act-8', type: 'connection', description: 'Connected GitHub account', time: '2 weeks ago' },
    ],
  },

  'account.notifications': {
    items: [
      { id: 'ntf-1', type: 'mention', actor: 'Sarah Chen', handle: '@sarahc', avatar: 'SC', text: 'mentioned you in a comment', time: '5m ago', read: false },
      { id: 'ntf-2', type: 'follow', actor: 'Marcus Williams', handle: '@marcusw', avatar: 'MW', text: 'started following you', time: '1h ago', read: false },
      { id: 'ntf-3', type: 'like', actor: 'Priya Sharma', handle: '@priyas', avatar: 'PS', text: 'liked your post', time: '3h ago', read: true },
      { id: 'ntf-4', type: 'reply', actor: 'Leo Martinez', handle: '@leom', avatar: 'LM', text: 'replied to your comment', time: '6h ago', read: true },
      { id: 'ntf-5', type: 'mention', actor: 'Ada Kim', handle: '@adakim', avatar: 'AK', text: 'mentioned you in a story', time: '1d ago', read: true },
      { id: 'ntf-6', type: 'follow', actor: 'Jordan Diaz', handle: '@jdiaz', avatar: 'JD', text: 'started following you', time: '2d ago', read: true },
      { id: 'ntf-7', type: 'like', actor: 'Maya Reyes', handle: '@mreyes', avatar: 'MR', text: 'and 24 others liked your video', time: '3d ago', read: true },
      { id: 'ntf-8', type: 'system', actor: 'PUIBook', handle: '@puibook', avatar: 'VB', text: 'Your weekly summary is ready', time: '4d ago', read: true },
    ],
  },

  'account.bookmarks': {
    items: [
      { id: 'bm-1', title: 'Building a Design System from Scratch', source: 'YouTube', time: '2d ago' },
      { id: 'bm-2', title: 'React Server Components Explained', source: 'YouTube', time: '5d ago' },
      { id: 'bm-3', title: 'Focus Flow — App of the Day', source: 'App Store', time: '1w ago' },
      { id: 'bm-4', title: 'Design tokens thread by @dan_abramov2', source: 'X.com', time: '1w ago' },
      { id: 'bm-5', title: '15-minute spicy ramen hack', source: 'TikTok', time: '2w ago' },
      { id: 'bm-6', title: 'Golden hour over the bay', source: 'Instagram', time: '2w ago' },
    ],
  },
};
