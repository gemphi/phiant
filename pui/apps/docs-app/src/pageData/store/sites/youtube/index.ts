/* ---------- YouTube data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'youtube.xxx'`.
 */

export type YoutubeCategory = {
  id: string;
  name: string;
  icon: string;
};

export type YoutubeFeedVideo = {
  id: string;
  title: string;
  channel: string;
  channelInitials: string;
  views: string;
  duration: string;
  uploaded: string;
  thumbnail: string;
};

export type YoutubeChannelInfo = {
  name: string;
  handle: string;
  subscribers: string;
  videoCount: string;
  description: string;
  banner: string;
  initials: string;
  verified: boolean;
};

export type YoutubeChannelVideo = {
  id: string;
  title: string;
  views: string;
  duration: string;
  uploaded: string;
  initials: string;
};

export type YoutubeWatchInfo = {
  id: string;
  title: string;
  channel: string;
  views: string;
  likes: string;
  dislikes: string;
  uploaded: string;
  description: string;
  initials: string;
  tags: string[];
};

export type YoutubeCommentReply = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  likes: string;
  time: string;
};

export type YoutubeComment = {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  text: string;
  likes: string;
  time: string;
  replies: YoutubeCommentReply[];
};

export type YoutubeRelatedVideo = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  initials: string;
};

export type YoutubeSubscription = {
  id: string;
  name: string;
  initials: string;
  subscribers: string;
  newVideos: number;
};

export type YoutubeTrendingVideo = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  category: string;
  rank: number;
};

export type YoutubeSearchResult = {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  type: 'video' | 'channel' | 'playlist';
};

export const YOUTUBE_DATA: Record<string, any> = {
  /* 1. Categories */
  'youtube.categories': [
    { id: 'music', name: 'Music', icon: 'Music' },
    { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
    { id: 'live', name: 'Live', icon: 'Radio' },
    { id: 'news', name: 'News', icon: 'Newspaper' },
    { id: 'cooking', name: 'Cooking', icon: 'ChefHat' },
    { id: 'tech', name: 'Tech reviews', icon: 'Cpu' },
    { id: 'podcasts', name: 'Podcasts', icon: 'Mic' },
    { id: 'education', name: 'Education', icon: 'GraduationCap' },
    { id: 'sports', name: 'Sports', icon: 'Trophy' },
    { id: 'comedy', name: 'Comedy', icon: 'Laugh' },
  ] as YoutubeCategory[],

  /* 2. Feed videos */
  'youtube.feed.videos': [
    {
      id: 'fv1',
      title: 'Building a Design System from Scratch in React',
      channel: 'Fireship',
      channelInitials: 'FS',
      views: '1.2M views',
      duration: '14:32',
      uploaded: '3 days ago',
      thumbnail: 'https://picsum.photos/seed/fv1/320/180',
    },
    {
      id: 'fv2',
      title: 'React Server Components Explained Simply',
      channel: 'Theo - t3.gg',
      channelInitials: 'T3',
      views: '847K views',
      duration: '22:15',
      uploaded: '1 week ago',
      thumbnail: 'https://picsum.photos/seed/fv2/320/180',
    },
    {
      id: 'fv3',
      title: 'Lo-Fi Beats to Study & Relax to (Live Radio)',
      channel: 'Lofi Girl',
      channelInitials: 'LG',
      views: '12M views',
      duration: 'LIVE',
      uploaded: 'Streaming now',
      thumbnail: 'https://picsum.photos/seed/fv3/320/180',
    },
    {
      id: 'fv4',
      title: 'Perfect Homemade Pizza Dough — Step by Step',
      channel: 'Joshua Weissman',
      channelInitials: 'JW',
      views: '3.4M views',
      duration: '18:22',
      uploaded: '5 days ago',
      thumbnail: 'https://picsum.photos/seed/fv4/320/180',
    },
    {
      id: 'fv5',
      title: 'Elden Ring DLC — All New Bosses Ranked',
      channel: 'Ongaku',
      channelInitials: 'ON',
      views: '2.1M views',
      duration: '31:47',
      uploaded: '2 days ago',
      thumbnail: 'https://picsum.photos/seed/fv5/320/180',
    },
    {
      id: 'fv6',
      title: 'CSS Container Queries in 100 Seconds',
      channel: 'Fireship',
      channelInitials: 'FS',
      views: '2.1M views',
      duration: '2:14',
      uploaded: '2 weeks ago',
      thumbnail: 'https://picsum.photos/seed/fv6/320/180',
    },
    {
      id: 'fv7',
      title: 'M2 MacBook Air Review — Is It Worth It?',
      channel: 'Marques Brownlee',
      channelInitials: 'MB',
      views: '4.8M views',
      duration: '16:08',
      uploaded: '4 days ago',
      thumbnail: 'https://picsum.photos/seed/fv7/320/180',
    },
    {
      id: 'fv8',
      title: 'TypeScript Tips You Didn\'t Know Existed',
      channel: 'Matt Pocock',
      channelInitials: 'MP',
      views: '356K views',
      duration: '18:47',
      uploaded: '6 days ago',
      thumbnail: 'https://picsum.photos/seed/fv8/320/180',
    },
    {
      id: 'fv9',
      title: 'The Future of CSS — What\'s Coming in 2025',
      channel: 'Kevin Powell',
      channelInitials: 'KP',
      views: '523K views',
      duration: '12:08',
      uploaded: '1 week ago',
      thumbnail: 'https://picsum.photos/seed/fv9/320/180',
    },
    {
      id: 'fv10',
      title: 'Vite vs Webpack — Real-World Benchmarks',
      channel: 'Syntax',
      channelInitials: 'SY',
      views: '198K views',
      duration: '28:41',
      uploaded: '3 weeks ago',
      thumbnail: 'https://picsum.photos/seed/fv10/320/180',
    },
    {
      id: 'fv11',
      title: 'Synthwave Mix for Late Night Coding',
      channel: 'Night Tempo',
      channelInitials: 'NT',
      views: '6.7M views',
      duration: '1:02:14',
      uploaded: '1 month ago',
      thumbnail: 'https://picsum.photos/seed/fv11/320/180',
    },
    {
      id: 'fv12',
      title: 'How to Make Sushi at Home (Beginner Guide)',
      channel: 'Joshua Weissman',
      channelInitials: 'JW',
      views: '5.2M views',
      duration: '24:55',
      uploaded: '2 weeks ago',
      thumbnail: 'https://picsum.photos/seed/fv12/320/180',
    },
  ] as YoutubeFeedVideo[],

  /* 3. Channel info */
  'youtube.channel.info': {
    name: 'Fireship',
    handle: '@fireship',
    subscribers: '3.2M subscribers',
    videoCount: '642 videos',
    description:
      'High-intensity developer education. New videos every week covering web, mobile, and the bleeding edge of tech.',
    banner: 'linear-gradient(135deg, #FF4500, #8B0000)',
    initials: 'FS',
    verified: true,
  } as YoutubeChannelInfo,

  /* 4. Channel videos */
  'youtube.channel.videos': [
    { id: 'cv1', title: '100 Seconds of Rust', views: '1.8M views', duration: '2:14', uploaded: '1 week ago', initials: 'FS' },
    { id: 'cv2', title: '100 Seconds of Go', views: '1.2M views', duration: '2:08', uploaded: '2 weeks ago', initials: 'FS' },
    { id: 'cv3', title: '100 Seconds of Python', views: '2.4M views', duration: '2:32', uploaded: '3 weeks ago', initials: 'FS' },
    { id: 'cv4', title: 'Build a Full Stack App in 7 Minutes', views: '890K views', duration: '14:22', uploaded: '1 month ago', initials: 'FS' },
    { id: 'cv5', title: 'CSS in 100 Seconds', views: '2.1M views', duration: '2:14', uploaded: '1 month ago', initials: 'FS' },
    { id: 'cv6', title: 'Docker in 100 Seconds', views: '1.5M views', duration: '2:01', uploaded: '2 months ago', initials: 'FS' },
    { id: 'cv7', title: 'GraphQL in 100 Seconds', views: '1.1M views', duration: '2:18', uploaded: '2 months ago', initials: 'FS' },
    { id: 'cv8', title: 'Kubernetes Explained in 5 Minutes', views: '780K views', duration: '5:42', uploaded: '3 months ago', initials: 'FS' },
    { id: 'cv9', title: 'WebAssembly in 100 Seconds', views: '960K views', duration: '2:24', uploaded: '3 months ago', initials: 'FS' },
    { id: 'cv10', title: 'Tailwind CSS in 100 Seconds', views: '1.7M views', duration: '2:11', uploaded: '4 months ago', initials: 'FS' },
    { id: 'cv11', title: 'Svelte in 100 Seconds', views: '1.3M views', duration: '2:19', uploaded: '4 months ago', initials: 'FS' },
    { id: 'cv12', title: 'Bun.js — The New JavaScript Runtime', views: '1.0M views', duration: '8:36', uploaded: '5 months ago', initials: 'FS' },
  ] as YoutubeChannelVideo[],

  /* 5. Watch info */
  'youtube.watch.info': {
    id: 'w1',
    title: 'Building a Design System from Scratch in React',
    channel: 'Fireship',
    views: '1,234,567 views',
    likes: '54K',
    dislikes: '312',
    uploaded: '3 days ago',
    description:
      'A complete guide to building a scalable design system with React, TypeScript, and design tokens. Covers component architecture, theming, accessibility, and documentation. Whether you\'re starting fresh or refactoring an existing UI, this video walks through the full process from zero to production-ready.',
    initials: 'FS',
    tags: ['react', 'design system', 'typescript', 'ui', 'frontend', 'tokens', 'css'],
  } as YoutubeWatchInfo,

  /* 6. Watch comments */
  'youtube.watch.comments': [
    {
      id: 'c1',
      author: 'Jane Doe',
      handle: '@devjane',
      avatar: 'JD',
      text: 'This is exactly what I needed! The token explanation at 4:32 was crystal clear. Subscribed!',
      likes: '1.2K',
      time: '2 days ago',
      replies: [
        {
          id: 'c1r1',
          author: 'Fireship',
          handle: '@fireship',
          avatar: 'FS',
          text: 'Glad it helped! More design system content coming soon.',
          likes: '342',
          time: '2 days ago',
        },
        {
          id: 'c1r2',
          author: 'Mark Lee',
          handle: '@marklee',
          avatar: 'ML',
          text: 'Same here, the token part finally clicked for me.',
          likes: '87',
          time: '1 day ago',
        },
      ],
    },
    {
      id: 'c2',
      author: 'Code Craft',
      handle: '@codecraft',
      avatar: 'CC',
      text: 'Best design system video on YouTube, hands down. The way you break down component architecture is unmatched.',
      likes: '847',
      time: '2 days ago',
      replies: [
        {
          id: 'c2r1',
          author: 'Priya N.',
          handle: '@priyan',
          avatar: 'PN',
          text: 'Agreed, bookmarked for my team.',
          likes: '54',
          time: '1 day ago',
        },
      ],
    },
    {
      id: 'c3',
      author: 'UX Guru',
      handle: '@uxguru',
      avatar: 'UG',
      text: 'The accessibility section was a pleasant surprise. Most design system tutorials skip it entirely.',
      likes: '423',
      time: '1 day ago',
      replies: [],
    },
    {
      id: 'c4',
      author: 'Sam Wright',
      handle: '@samwright',
      avatar: 'SW',
      text: 'Watched twice already. The theming approach is so clean — switching from CSS variables to a token pipeline changed my life.',
      likes: '298',
      time: '1 day ago',
      replies: [
        {
          id: 'c4r1',
          author: 'Alex Kim',
          handle: '@alexkim',
          avatar: 'AK',
          text: 'Right? The token pipeline is a game changer for multi-brand setups.',
          likes: '41',
          time: '20 hours ago',
        },
      ],
    },
    {
      id: 'c5',
      author: 'Nina Patel',
      handle: '@ninapatel',
      avatar: 'NP',
      text: 'Can you do a follow-up on testing design system components? Would love to see your setup with Vitest and Testing Library.',
      likes: '156',
      time: '1 day ago',
      replies: [],
    },
    {
      id: 'c6',
      author: 'DevOps Dan',
      handle: '@devopsdan',
      avatar: 'DD',
      text: 'The documentation strategy at the end was gold. Storybook + MDX is the way.',
      likes: '112',
      time: '22 hours ago',
      replies: [],
    },
    {
      id: 'c7',
      author: 'Olivia Brown',
      handle: '@oliviab',
      avatar: 'OB',
      text: 'I\'ve been putting off building a design system for months. This video finally got me to start. Thank you!',
      likes: '98',
      time: '20 hours ago',
      replies: [
        {
          id: 'c7r1',
          author: 'Tom Hardy',
          handle: '@tomhardy',
          avatar: 'TH',
          text: 'You got this! Start small with tokens and build up.',
          likes: '23',
          time: '18 hours ago',
        },
      ],
    },
    {
      id: 'c8',
      author: 'Ravi Kumar',
      handle: '@ravikumar',
      avatar: 'RK',
      text: 'The comparison between styled-components and CSS modules at 9:15 was super helpful for deciding our stack.',
      likes: '76',
      time: '18 hours ago',
      replies: [],
    },
    {
      id: 'c9',
      author: 'Grace Liu',
      handle: '@graceliu',
      avatar: 'GL',
      text: 'Quality content as always. The pacing is perfect — dense but never overwhelming.',
      likes: '64',
      time: '15 hours ago',
      replies: [],
    },
    {
      id: 'c10',
      author: 'Marcus Reed',
      handle: '@marcusreed',
      avatar: 'MR',
      text: 'Would love a part 2 covering headless components and compound component patterns.',
      likes: '58',
      time: '12 hours ago',
      replies: [],
    },
    {
      id: 'c11',
      author: 'Sofia Martinez',
      handle: '@sofiam',
      avatar: 'SM',
      text: 'Just shared this with my entire frontend team. The ROI on a proper design system is insane.',
      likes: '47',
      time: '10 hours ago',
      replies: [],
    },
    {
      id: 'c12',
      author: 'Liam O\'Brien',
      handle: '@liamob',
      avatar: 'LO',
      text: 'The part about semantic tokens vs primitive tokens finally made the distinction click for me.',
      likes: '39',
      time: '8 hours ago',
      replies: [
        {
          id: 'c12r1',
          author: 'Emma Stone',
          handle: '@emmastone',
          avatar: 'ES',
          text: 'Same! Primitive -> semantic -> component is such a clean mental model.',
          likes: '12',
          time: '6 hours ago',
        },
      ],
    },
    {
      id: 'c13',
      author: 'Yuki Tanaka',
      handle: '@yukitanaka',
      avatar: 'YT',
      text: 'Translated the subtitles to Japanese for my team. This deserves way more views.',
      likes: '34',
      time: '6 hours ago',
      replies: [],
    },
    {
      id: 'c14',
      author: 'Chris Evans',
      handle: '@chrisevans',
      avatar: 'CE',
      text: 'The monorepo setup with Turborepo was the missing piece for me. Great recommendation.',
      likes: '28',
      time: '4 hours ago',
      replies: [],
    },
    {
      id: 'c15',
      author: 'Aisha Khan',
      handle: '@aishakhan',
      avatar: 'AK',
      text: 'New subscriber here! Your editing and energy make complex topics genuinely fun to learn.',
      likes: '21',
      time: '2 hours ago',
      replies: [],
    },
    {
      id: 'c16',
      author: 'Diego Santos',
      handle: '@diegosantos',
      avatar: 'DS',
      text: 'The Figma-to-code workflow at the end is exactly what our design team has been looking for.',
      likes: '15',
      time: '1 hour ago',
      replies: [],
    },
  ] as YoutubeComment[],

  /* 7. Watch related */
  'youtube.watch.related': [
    { id: 'rv1', title: 'Tailwind CSS Deep Dive — Utility-First Mastery', channel: 'Fireship', views: '1.7M views', duration: '14:32', initials: 'FS' },
    { id: 'rv2', title: 'Styled Components vs CSS Modules — Which Wins?', channel: 'Theo - t3.gg', views: '412K views', duration: '22:15', initials: 'T3' },
    { id: 'rv3', title: 'CSS Grid Mastery in 20 Minutes', channel: 'Kevin Powell', views: '823K views', duration: '12:08', initials: 'KP' },
    { id: 'rv4', title: 'Radix UI — The Best Headless Component Library', channel: 'Matt Pocock', views: '234K views', duration: '16:44', initials: 'MP' },
    { id: 'rv5', title: 'Building Accessible React Components', channel: 'Syntax', views: '189K views', duration: '24:11', initials: 'SY' },
    { id: 'rv6', title: 'Design Tokens with Style Dictionary', channel: 'Fireship', views: '567K views', duration: '9:28', initials: 'FS' },
    { id: 'rv7', title: 'Storybook 7 — Component-Driven Development', channel: 'Web Dev Simplified', views: '345K views', duration: '19:55', initials: 'WD' },
    { id: 'rv8', title: 'Monorepos with Turborepo and pnpm', channel: 'Theo - t3.gg', views: '278K views', duration: '17:32', initials: 'T3' },
    { id: 'rv9', title: 'Figma to React — A Practical Workflow', channel: 'Kevin Powell', views: '491K views', duration: '15:20', initials: 'KP' },
    { id: 'rv10', title: 'Compound Components in React Explained', channel: 'Matt Pocock', views: '167K views', duration: '13:47', initials: 'MP' },
  ] as YoutubeRelatedVideo[],

  /* 8. Subscriptions */
  'youtube.subscriptions': [
    { id: 's1', name: 'Fireship', initials: 'FS', subscribers: '3.2M', newVideos: 2 },
    { id: 's2', name: 'Theo - t3.gg', initials: 'T3', subscribers: '890K', newVideos: 1 },
    { id: 's3', name: 'Marques Brownlee', initials: 'MB', subscribers: '18.4M', newVideos: 3 },
    { id: 's4', name: 'Lofi Girl', initials: 'LG', subscribers: '12.1M', newVideos: 0 },
    { id: 's5', name: 'Joshua Weissman', initials: 'JW', subscribers: '9.8M', newVideos: 1 },
    { id: 's6', name: 'Kevin Powell', initials: 'KP', subscribers: '1.1M', newVideos: 4 },
    { id: 's7', name: 'Matt Pocock', initials: 'MP', subscribers: '234K', newVideos: 0 },
    { id: 's8', name: 'Syntax', initials: 'SY', subscribers: '678K', newVideos: 2 },
    { id: 's9', name: 'Ongaku', initials: 'ON', subscribers: '1.5M', newVideos: 1 },
    { id: 's10', name: 'Web Dev Simplified', initials: 'WD', subscribers: '1.3M', newVideos: 5 },
    { id: 's11', name: 'Night Tempo', initials: 'NT', subscribers: '890K', newVideos: 0 },
  ] as YoutubeSubscription[],

  /* 9. Trending */
  'youtube.trending': [
    { id: 't1', title: 'Elden Ring DLC — All New Bosses Ranked', channel: 'Ongaku', views: '2.1M views', duration: '31:47', category: 'Gaming', rank: 1 },
    { id: 't2', title: 'M2 MacBook Air Review — Is It Worth It?', channel: 'Marques Brownlee', views: '4.8M views', duration: '16:08', category: 'Tech reviews', rank: 2 },
    { id: 't3', title: 'Perfect Homemade Pizza Dough — Step by Step', channel: 'Joshua Weissman', views: '3.4M views', duration: '18:22', category: 'Cooking', rank: 3 },
    { id: 't4', title: 'Lo-Fi Beats to Study & Relax to (Live Radio)', channel: 'Lofi Girl', views: '12M views', duration: 'LIVE', category: 'Music', rank: 4 },
    { id: 't5', title: 'Building a Design System from Scratch in React', channel: 'Fireship', views: '1.2M views', duration: '14:32', category: 'Education', rank: 5 },
    { id: 't6', title: 'The Future of CSS — What\'s Coming in 2025', channel: 'Kevin Powell', views: '523K views', duration: '12:08', category: 'Education', rank: 6 },
    { id: 't7', title: 'Synthwave Mix for Late Night Coding', channel: 'Night Tempo', views: '6.7M views', duration: '1:02:14', category: 'Music', rank: 7 },
    { id: 't8', title: 'How to Make Sushi at Home (Beginner Guide)', channel: 'Joshua Weissman', views: '5.2M views', duration: '24:55', category: 'Cooking', rank: 8 },
    { id: 't9', title: 'TypeScript Tips You Didn\'t Know Existed', channel: 'Matt Pocock', views: '356K views', duration: '18:47', category: 'Education', rank: 9 },
    { id: 't10', title: 'Vite vs Webpack — Real-World Benchmarks', channel: 'Syntax', views: '198K views', duration: '28:41', category: 'Tech reviews', rank: 10 },
  ] as YoutubeTrendingVideo[],

  /* 10. Search results */
  'youtube.search.results': [
    { id: 'sr1', title: 'Building a Design System from Scratch in React', channel: 'Fireship', views: '1.2M views', duration: '14:32', type: 'video' },
    { id: 'sr2', title: 'Fireship', channel: 'Fireship', views: '3.2M subscribers', duration: '—', type: 'channel' },
    { id: 'sr3', title: 'Design System Essentials — Curated Playlist', channel: 'Kevin Powell', views: '12 videos', duration: '3h 24m', type: 'playlist' },
    { id: 'sr4', title: 'CSS Grid Mastery in 20 Minutes', channel: 'Kevin Powell', views: '823K views', duration: '12:08', type: 'video' },
    { id: 'sr5', title: 'Radix UI — The Best Headless Component Library', channel: 'Matt Pocock', views: '234K views', duration: '16:44', type: 'video' },
    { id: 'sr6', title: 'Theo - t3.gg', channel: 'Theo - t3.gg', views: '890K subscribers', duration: '—', type: 'channel' },
    { id: 'sr7', title: 'React Component Patterns — Curated Playlist', channel: 'Web Dev Simplified', views: '8 videos', duration: '2h 11m', type: 'playlist' },
    { id: 'sr8', title: 'Tailwind CSS Deep Dive — Utility-First Mastery', channel: 'Fireship', views: '1.7M views', duration: '14:32', type: 'video' },
    { id: 'sr9', title: 'Storybook 7 — Component-Driven Development', channel: 'Web Dev Simplified', views: '345K views', duration: '19:55', type: 'video' },
  ] as YoutubeSearchResult[],
};
