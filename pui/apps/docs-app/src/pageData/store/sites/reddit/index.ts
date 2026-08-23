/* ---------- Reddit data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'reddit.xxx'`.
 */

export type RedditCategory = {
  id: string;
  name: string;
  icon: string;
};

export type RedditPost = {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  score: number;
  commentCount: number;
  postedAgo: string;
  type: 'text' | 'link' | 'image' | 'video';
  flair: string;
};

export type RedditPostDetail = {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  score: number;
  upvoteRatio: number;
  commentCount: number;
  postedAgo: string;
  body: string;
  flair: string;
  awards: number;
};

export type RedditCommentReply = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  score: number;
  time: string;
};

export type RedditComment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  score: number;
  time: string;
  awards: number;
  replies: RedditCommentReply[];
};

export type RedditSubreddit = {
  id: string;
  name: string;
  members: string;
  description: string;
  icon: string;
  category: string;
  rank: number;
};

export type RedditSubredditInfo = {
  id: string;
  name: string;
  members: string;
  online: string;
  description: string;
  banner: string;
  icon: string;
  created: string;
  rules: string[];
};

export type RedditTrending = {
  id: string;
  name: string;
  members: string;
  category: string;
  rank: number;
};

export type RedditAward = {
  id: string;
  name: string;
  icon: string;
  cost: number;
  description: string;
};

export const REDDIT_DATA: Record<string, any> = {
  /* 1. Categories */
  'reddit.categories': [
    { id: 'cat_news', name: 'News', icon: 'Newspaper' },
    { id: 'cat_gaming', name: 'Gaming', icon: 'Gamepad2' },
    { id: 'cat_sports', name: 'Sports', icon: 'Trophy' },
    { id: 'cat_tech', name: 'Technology', icon: 'Cpu' },
    { id: 'cat_science', name: 'Science', icon: 'FlaskConical' },
    { id: 'cat_movies', name: 'Movies & TV', icon: 'Film' },
    { id: 'cat_music', name: 'Music', icon: 'Music' },
    { id: 'cat_funny', name: 'Funny', icon: 'Laugh' },
    { id: 'cat_education', name: 'Education', icon: 'GraduationCap' },
    { id: 'cat_lifestyle', name: 'Lifestyle', icon: 'Coffee' },
  ] as RedditCategory[],

  /* 2. Posts (15+) */
  'reddit.posts': [
    { id: 'p1', title: 'I finally finished my homemade mechanical keyboard after 3 months', subreddit: 'r/MechanicalKeyboards', author: 'u/keysmith', score: 24831, commentCount: 412, postedAgo: '5h', type: 'image', flair: 'Build' },
    { id: 'p2', title: 'NASA confirms the James Webb telescope detected water vapor on a distant exoplanet', subreddit: 'r/space', author: 'u/orbitwatcher', score: 58210, commentCount: 1284, postedAgo: '7h', type: 'link', flair: 'News' },
    { id: 'p3', title: 'After 8 years of saving, I bought my first house. Here\'s what I learned.', subreddit: 'r/personalfinance', author: 'u/frugal_finn', score: 18742, commentCount: 893, postedAgo: '9h', type: 'text', flair: 'Discussion' },
    { id: 'p4', title: 'My dog learned to open the fridge. We\'re in trouble.', subreddit: 'r/aww', author: 'u/puppydad', score: 92104, commentCount: 612, postedAgo: '11h', type: 'video', flair: 'Cute' },
    { id: 'p5', title: 'Elden Ring DLC — I beat every boss on RL1. AMA', subreddit: 'r/Eldenring', author: 'u/tarnished_one', score: 15623, commentCount: 2341, postedAgo: '12h', type: 'text', flair: 'Achievement' },
    { id: 'p6', title: 'TIL that octopuses have three hearts and blue blood', subreddit: 'r/todayilearned', author: 'u/curious_cat', score: 41203, commentCount: 287, postedAgo: '14h', type: 'link', flair: 'TIL' },
    { id: 'p7', title: 'My grandmother\'s handwritten recipe book from 1952. Thought you\'d enjoy it.', subreddit: 'r/Old_Recipes', author: 'u/grandmas_kitchen', score: 33891, commentCount: 521, postedAgo: '16h', type: 'image', flair: 'Recipe' },
    { id: 'p8', title: 'Company laid off 40% of staff then sent an email about "family values"', subreddit: 'r/antiwork', author: 'u/overworked_dev', score: 67420, commentCount: 3120, postedAgo: '18h', type: 'text', flair: 'Vent' },
    { id: 'p9', title: 'Benchmarked every major JavaScript runtime in 2025 — here are the results', subreddit: 'r/javascript', author: 'u/benchmarker', score: 8923, commentCount: 412, postedAgo: '20h', type: 'link', flair: 'Benchmark' },
    { id: 'p10', title: 'The sunset from my balcony in Santorini last night', subreddit: 'r/EarthPorn', author: 'u/islandhopper', score: 45821, commentCount: 198, postedAgo: '22h', type: 'image', flair: 'OC' },
    { id: 'p11', title: 'I reverse-engineered my smart fridge and it was sending data to 14 third parties', subreddit: 'r/privacy', author: 'u/privacy_punk', score: 28740, commentCount: 1102, postedAgo: '1d', type: 'text', flair: 'Research' },
    { id: 'p12', title: 'Therapist of 20 years shares the one question that changes every session', subreddit: 'r/LifeProTips', author: 'u/therapist_tips', score: 52301, commentCount: 845, postedAgo: '1d', type: 'text', flair: 'LPT' },
    { id: 'p13', title: 'My local library has a "human book" program where you can borrow a person to chat', subreddit: 'r/mildlyinteresting', author: 'u/bookworm', score: 19823, commentCount: 312, postedAgo: '1d', type: 'image', flair: 'Cool' },
    { id: 'p14', title: 'PSA: The new iOS update silently enables ad tracking. Here\'s how to turn it off.', subreddit: 'r/iphone', author: 'u/ios_savvy', score: 31402, commentCount: 678, postedAgo: '1d', type: 'text', flair: 'PSA' },
    { id: 'p15', title: 'I cooked through every recipe in Salt Fat Acid Heat. Here\'s my ranking.', subreddit: 'r/cooking', author: 'u/home_chef', score: 12453, commentCount: 421, postedAgo: '2d', type: 'text', flair: 'Review' },
    { id: 'p16', title: 'Watch this cat figure out a puzzle feeder in real time', subreddit: 'r/CatClips', author: 'u/catdad', score: 27840, commentCount: 156, postedAgo: '2d', type: 'video', flair: 'Cute' },
  ] as RedditPost[],

  /* 3. Post detail */
  'reddit.post.detail': {
    id: 'p1',
    title: 'I finally finished my homemade mechanical keyboard after 3 months',
    subreddit: 'r/MechanicalKeyboards',
    author: 'u/keysmith',
    score: 24831,
    upvoteRatio: 0.96,
    commentCount: 412,
    postedAgo: '5h',
    body: 'After three months of soldering, desoldering, lubing switches, and breaking two PCBs, my dream keyboard is done. It\'s a 65% layout with lubed Gateron Oil Kings, GMK Olivia keycaps, and a hand-lubed stabilizer set. The sound is exactly the thocky marshmallow I was chasing. Total cost was around $480 — yes, I know, I could have bought a prebuilt. But the journey was the point. Happy to answer any questions about the build process!',
    flair: 'Build',
    awards: 14,
  } as RedditPostDetail,

  /* 4. Post comments (15+ with nested replies) */
  'reddit.post.comments': [
    {
      id: 'c1',
      author: 'u/switch_addict',
      avatar: 'SA',
      text: 'Those Oil Kings are criminally underrated. The sound profile is incredible for the price. What lube did you use?',
      score: 1842,
      time: '4h',
      awards: 2,
      replies: [
        { id: 'c1r1', author: 'u/keysmith', avatar: 'KS', text: 'Krytox 205g0 on the stems and a thin film of dielectric grease on the housing rails. Took about 90 minutes for the whole batch.', score: 612, time: '4h' },
        { id: 'c1r2', author: 'u/thockmaster', avatar: 'TM', text: '205g0 is the way. I tried 105 once and it was too thin — switches felt scratchy after a week.', score: 234, time: '3h' },
      ],
    },
    {
      id: 'c2',
      author: 'u/gmk_collector',
      avatar: 'GC',
      text: 'GMK Olivia is such a timeless set. I have it on three boards and I keep buying more. The cherry profile is unmatched.',
      score: 932,
      time: '4h',
      awards: 1,
      replies: [
        { id: 'c2r1', author: 'u/keysmith', avatar: 'KS', text: 'It was my grail set for years. Finally caught a restock on Drop. Worth the wait.', score: 187, time: '4h' },
      ],
    },
    {
      id: 'c3',
      author: 'u/pcb_panic',
      avatar: 'PP',
      text: 'You said you broke two PCBs — what happened? I\'m about to do my first build and now I\'m nervous lol',
      score: 521,
      time: '3h',
      awards: 0,
      replies: [
        { id: 'c3r1', author: 'u/keysmith', avatar: 'KS', text: 'First one I bridged two pads with solder and killed a column. Second one I snapped a hot-swap socket pad off by forcing a switch in. Get a solder sucker and be gentle with switch seating — you\'ll be fine.', score: 412, time: '3h' },
        { id: 'c3r2', author: 'u/solder_sage', avatar: 'SS', text: 'Flux is your best friend. Use plenty of it and the solder flows where it should.', score: 156, time: '2h' },
      ],
    },
    {
      id: 'c4',
      author: 'u/budget_builder',
      avatar: 'BB',
      text: '$480 and you could have bought a Keychron Q1 for $200 that sounds 90% as good. Not hating, just saying.',
      score: -42,
      time: '3h',
      awards: 0,
      replies: [
        { id: 'c4r1', author: 'u/keysmith', avatar: 'KS', text: 'Totally fair point! The Q1 is a great board. For me the custom build, the exact switch choice, and the process were worth the premium. Different strokes.', score: 234, time: '3h' },
      ],
    },
    {
      id: 'c5',
      author: 'u/sound_test',
      avatar: 'ST',
      text: 'Do you have a sound test video? Would love to hear the thock.',
      score: 387,
      time: '2h',
      awards: 0,
      replies: [],
    },
    {
      id: 'c6',
      author: 'u/foam_fanatic',
      avatar: 'FF',
      text: 'What foam did you use? I\'m debating between PE foam and EVA.',
      score: 214,
      time: '2h',
      awards: 0,
      replies: [
        { id: 'c6r1', author: 'u/keysmith', avatar: 'KS', text: 'PE foam between the PCB and plate, plus EVA in the case bottom. The PE gives that deep thock and the EVA kills the hollow ping.', score: 178, time: '2h' },
      ],
    },
    {
      id: 'c7',
      author: 'u/tape_modder',
      avatar: 'TM',
      text: 'Did you do the tape mod? Changed my board more than any other mod.',
      score: 156,
      time: '2h',
      awards: 0,
      replies: [],
    },
    {
      id: 'c8',
      author: 'u/first_build',
      avatar: 'FB',
      text: 'This post just convinced me to build my own. Where did you source the parts?',
      score: 98,
      time: '1h',
      awards: 0,
      replies: [
        { id: 'c8r1', author: 'u/keysmith', avatar: 'KS', text: 'PCB and plate from Keebmaker, switches from CannonKeys, keycaps from Drop. Stabilizers are Durock V2s.', score: 76, time: '1h' },
      ],
    },
    {
      id: 'c9',
      author: 'u/ergo_gang',
      avatar: 'EG',
      text: '65% is nice but have you considered a split ergo? Game changer for my wrists.',
      score: 134,
      time: '1h',
      awards: 0,
      replies: [],
    },
    {
      id: 'c10',
      author: 'u/lube_hater',
      avatar: 'LH',
      text: 'I lubed 90 switches once and my back has never been the same. Respect for the dedication.',
      score: 642,
      time: '1h',
      awards: 1,
      replies: [
        { id: 'c10r1', author: 'u/keysmith', avatar: 'KS', text: 'I did them in batches of 20 over a week. Spreading it out saved my sanity and my back.', score: 89, time: '1h' },
      ],
    },
    {
      id: 'c11',
      author: 'u/color_critic',
      avatar: 'CC',
      text: 'The Olivia set with that case color is chef\'s kiss. Perfect contrast.',
      score: 76,
      time: '50m',
      awards: 0,
      replies: [],
    },
    {
      id: 'c12',
      author: 'u/switch_scientist',
      avatar: 'SS',
      text: 'Oil Kings are factory-lubed. Did you relube them or just bag-lube? Curious if you noticed a difference.',
      score: 112,
      time: '40m',
      awards: 0,
      replies: [
        { id: 'c12r1', author: 'u/keysmith', avatar: 'KS', text: 'I cleaned off the factory lube with isopropyl and hand-lubed. The factory lube was uneven and a couple switches had none at all. Big improvement.', score: 67, time: '35m' },
      ],
    },
    {
      id: 'c13',
      author: 'u/plate_material',
      avatar: 'PM',
      text: 'Aluminum or polycarb plate? That makes a huge difference in sound.',
      score: 89,
      time: '30m',
      awards: 0,
      replies: [
        { id: 'c13r1', author: 'u/keysmith', avatar: 'KS', text: 'Polycarb. Wanted the flex for that deeper sound. Aluminum would have been too pingy for my taste.', score: 54, time: '25m' },
      ],
    },
    {
      id: 'c14',
      author: 'u/newbie_question',
      avatar: 'NQ',
      text: 'Sorry if dumb — what does "thocky" mean? New to this sub.',
      score: 43,
      time: '20m',
      awards: 0,
      replies: [
        { id: 'c14r1', author: 'u/thockmaster', avatar: 'TM', text: 'It\'s an onomatopoeia for a deep, low-pitched keystroke sound. Think knocking on a dense wooden door. Opposite of "clacky" which is high-pitched and sharp.', score: 98, time: '15m' },
      ],
    },
    {
      id: 'c15',
      author: 'u/mod_approves',
      avatar: 'MA',
      text: 'Stickied this. Beautiful build and great writeup. Welcome to the wall of fame!',
      score: 1240,
      time: '10m',
      awards: 3,
      replies: [],
    },
    {
      id: 'c16',
      author: 'u/next_project',
      avatar: 'NP',
      text: 'What\'s your next build? Once you start you can\'t stop.',
      score: 32,
      time: '5m',
      awards: 0,
      replies: [
        { id: 'c16r1', author: 'u/keysmith', avatar: 'KS', text: 'Already planning a 75% with Hall Effect switches. The adjustable actuation point has me hooked.', score: 18, time: '2m' },
      ],
    },
  ] as RedditComment[],

  /* 5. Subreddits (12+) */
  'reddit.subreddits': [
    { id: 'sub_mkb', name: 'r/MechanicalKeyboards', members: '1.2M', description: 'For keyboard enthusiasts and custom builds', icon: 'MK', category: 'cat_tech', rank: 1 },
    { id: 'sub_space', name: 'r/space', members: '24.8M', description: 'Space news, missions, and discussion', icon: 'SP', category: 'cat_science', rank: 2 },
    { id: 'sub_pf', name: 'r/personalfinance', members: '18.4M', description: 'Budgeting, saving, and financial planning', icon: 'PF', category: 'cat_lifestyle', rank: 3 },
    { id: 'sub_aww', name: 'r/aww', members: '34.1M', description: 'Cute animals and wholesome content', icon: 'AW', category: 'cat_funny', rank: 4 },
    { id: 'sub_er', name: 'r/Eldenring', members: '3.8M', description: 'Elden Ring community and discussion', icon: 'ER', category: 'cat_gaming', rank: 5 },
    { id: 'sub_til', name: 'r/todayilearned', members: '32.6M', description: 'Share new things you learned today', icon: 'TL', category: 'cat_education', rank: 6 },
    { id: 'sub_cook', name: 'r/cooking', members: '3.4M', description: 'Recipes, techniques, and food discussion', icon: 'CK', category: 'cat_lifestyle', rank: 7 },
    { id: 'sub_js', name: 'r/javascript', members: '2.1M', description: 'JavaScript news, tips, and discussion', icon: 'JS', category: 'cat_tech', rank: 8 },
    { id: 'sub_anti', name: 'r/antiwork', members: '2.8M', description: 'Workplace reform and labor discussion', icon: 'AW', category: 'cat_news', rank: 9 },
    { id: 'sub_priv', name: 'r/privacy', members: '1.6M', description: 'Digital privacy and data protection', icon: 'PR', category: 'cat_tech', rank: 10 },
    { id: 'sub_lpt', name: 'r/LifeProTips', members: '20.3M', description: 'Practical tips to improve your life', icon: 'LP', category: 'cat_lifestyle', rank: 11 },
    { id: 'sub_ep', name: 'r/EarthPorn', members: '23.1M', description: 'Stunning nature photography', icon: 'EP', category: 'cat_lifestyle', rank: 12 },
  ] as RedditSubreddit[],

  /* 6. Subreddit info */
  'reddit.subreddit.info': {
    id: 'sub_mkb',
    name: 'r/MechanicalKeyboards',
    members: '1.2M members',
    online: '4.8K online',
    description: 'A community for mechanical keyboard enthusiasts. Share your builds, ask questions, and discuss everything from switches to keycaps. Be excellent to each other.',
    banner: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    icon: 'MK',
    created: 'Jan 14, 2012',
    rules: [
      'No selling or trading outside the monthly market thread',
      'Photo posts must include a description of the build',
      'Be respectful — no gatekeeping, everyone starts somewhere',
      'Use the appropriate flair for your post',
      'No affiliate links without disclosure',
    ],
  } as RedditSubredditInfo,

  /* 7. Trending communities (10+) */
  'reddit.trending': [
    { id: 'tr1', name: 'r/MechanicalKeyboards', members: '1.2M', category: 'Technology', rank: 1 },
    { id: 'tr2', name: 'r/space', members: '24.8M', category: 'Science', rank: 2 },
    { id: 'tr3', name: 'r/Eldenring', members: '3.8M', category: 'Gaming', rank: 3 },
    { id: 'tr4', name: 'r/antiwork', members: '2.8M', category: 'News', rank: 4 },
    { id: 'tr5', name: 'r/personalfinance', members: '18.4M', category: 'Lifestyle', rank: 5 },
    { id: 'tr6', name: 'r/privacy', members: '1.6M', category: 'Technology', rank: 6 },
    { id: 'tr7', name: 'r/cooking', members: '3.4M', category: 'Lifestyle', rank: 7 },
    { id: 'tr8', name: 'r/aww', members: '34.1M', category: 'Funny', rank: 8 },
    { id: 'tr9', name: 'r/LifeProTips', members: '20.3M', category: 'Lifestyle', rank: 9 },
    { id: 'tr10', name: 'r/todayilearned', members: '32.6M', category: 'Education', rank: 10 },
    { id: 'tr11', name: 'r/javascript', members: '2.1M', category: 'Technology', rank: 11 },
  ] as RedditTrending[],

  /* 8. Award types (8+) */
  'reddit.awards': [
    { id: 'aw_silver', name: 'Silver', icon: '🥈', cost: 100, description: 'A simple silver award to show appreciation' },
    { id: 'aw_gold', name: 'Gold', icon: '🥇', cost: 500, description: 'A week of Premium and 700 coins' },
    { id: 'aw_platinum', name: 'Platinum', icon: '💎', cost: 1800, description: 'A month of Premium and 700 coins' },
    { id: 'aw_helpful', name: 'Helpful', icon: '💡', cost: 250, description: 'Awarded for genuinely helpful content' },
    { id: 'aw_wholesome', name: 'Wholesome', icon: '💛', cost: 250, description: 'For heartwarming and wholesome posts' },
    { id: 'aw_laugh', name: 'Laughing', icon: '😂', cost: 250, description: 'For posts that genuinely made us laugh' },
    { id: 'aw_brave', name: 'Brave', icon: '🦁', cost: 350, description: 'For bold takes and speaking truth' },
    { id: 'aw_mind', name: 'Mind Blown', icon: '🤯', cost: 400, description: 'For content that changed our perspective' },
    { id: 'aw_fire', name: 'Fire', icon: '🔥', cost: 300, description: 'For hot takes and 🔥 content' },
  ] as RedditAward[],
};
