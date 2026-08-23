/* eslint-disable @typescript-eslint/no-explicit-any */
/* ---------- App Store data store (pure data, no functions) ---------- */
/* 10 data sources, 50+ records total. Realistic, varied sample data.  */

export const APP_STORE_DATA: Record<string, any> = {
  /* ------------------------------------------------------------------ */
  /* 1. Categories — 10                                                  */
  /* ------------------------------------------------------------------ */
  'appstore.categories': [
    { id: 'cat-productivity', name: 'Productivity', icon: 'clipboard-list' },
    { id: 'cat-games', name: 'Games', icon: 'gamepad' },
    { id: 'cat-photo-video', name: 'Photo & Video', icon: 'camera' },
    { id: 'cat-social', name: 'Social', icon: 'users' },
    { id: 'cat-health-fitness', name: 'Health & Fitness', icon: 'heart-pulse' },
    { id: 'cat-finance', name: 'Finance', icon: 'wallet' },
    { id: 'cat-education', name: 'Education', icon: 'graduation-cap' },
    { id: 'cat-entertainment', name: 'Entertainment', icon: 'film' },
    { id: 'cat-business', name: 'Business', icon: 'briefcase' },
    { id: 'cat-music', name: 'Music', icon: 'music-note' },
  ],

  /* ------------------------------------------------------------------ */
  /* 2. Featured apps — 8                                                */
  /* ------------------------------------------------------------------ */
  'appstore.featured': [
    {
      id: 'app-notion',
      name: 'Notion',
      developer: 'Notion Labs, Inc.',
      icon: 'https://picsum.photos/seed/notion/120/120',
      category: 'Productivity',
      price: 0,
      rating: 4.7,
      ratingCount: 38214,
      description:
        'Notes, docs, tasks, and wikis — all in one workspace. Notion blends everyday tools into one flexible home for your work, team, and life.',
    },
    {
      id: 'app-procreate',
      name: 'Procreate',
      developer: 'Savage Interactive',
      icon: 'https://picsum.photos/seed/procreate/120/120',
      category: 'Photo & Video',
      price: 12.99,
      rating: 4.9,
      ratingCount: 51892,
      description:
        'Powerful sketching, painting, and illustration app designed for iPad. Hundreds of handmade brushes, a complete layer system, and lightning-fast performance.',
    },
    {
      id: 'app-apollo',
      name: 'Apollo for Reddit',
      developer: 'Christian Selig',
      icon: 'https://picsum.photos/seed/apollo/120/120',
      category: 'Social',
      price: 0,
      rating: 4.8,
      ratingCount: 27341,
      description:
        'A beautiful, powerful Reddit client built by a former Apple engineer. Supercharged with Jump Bar, fully customizable gestures, and a Media Viewer.',
    },
    {
      id: 'app-streaks',
      name: 'Streaks',
      developer: 'Crunchy Bagel',
      icon: 'https://picsum.photos/seed/streaks/120/120',
      category: 'Health & Fitness',
      price: 4.99,
      rating: 4.6,
      ratingCount: 9821,
      description:
        'Award-winning to-do list that helps you form good habits. Track up to 24 tasks, sync with the Health app, and keep your streaks alive.',
    },
    {
      id: 'app-ynab',
      name: 'YNAB',
      developer: 'You Need A Budget',
      icon: 'https://picsum.photos/seed/ynab/120/120',
      category: 'Finance',
      price: 0,
      rating: 4.5,
      ratingCount: 14203,
      description:
        'Change your relationship with money. YNAB teaches you to give every dollar a job, roll with the punches, and age your money.',
    },
    {
      id: 'app-duolingo',
      name: 'Duolingo',
      developer: 'Duolingo, Inc.',
      icon: 'https://picsum.photos/seed/duolingo/120/120',
      category: 'Education',
      price: 0,
      rating: 4.6,
      ratingCount: 612840,
      description:
        'Learn Spanish, French, German, and 40+ other languages for free. Bite-sized lessons, gamified progress, and a friendly owl mascot.',
    },
    {
      id: 'app-netflix',
      name: 'Netflix',
      developer: 'Netflix, Inc.',
      icon: 'https://picsum.photos/seed/netflix/120/120',
      category: 'Entertainment',
      price: 0,
      rating: 3.9,
      ratingCount: 1842103,
      description:
        'Stream TV shows and movies, award-winning Netflix originals, and more — anytime, anywhere. Download episodes to watch offline.',
    },
    {
      id: 'app-garageband',
      name: 'GarageBand',
      developer: 'Apple',
      icon: 'https://picsum.photos/seed/garageband/120/120',
      category: 'Music',
      price: 0,
      rating: 4.4,
      ratingCount: 41205,
      description:
        'Turn your iPad or iPhone into a collection of Touch Instruments and a full-featured recording studio. Play, mix, and share your music.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 3. Top free apps — 10                                               */
  /* ------------------------------------------------------------------ */
  'appstore.topFree': [
    { id: 'app-tiktok', name: 'TikTok', developer: 'TikTok Ltd.', icon: 'https://picsum.photos/seed/tiktok/120/120', category: 'Entertainment', rating: 4.4, rank: 1 },
    { id: 'app-youtube', name: 'YouTube', developer: 'Google LLC', icon: 'https://picsum.photos/seed/youtube/120/120', category: 'Photo & Video', rating: 4.2, rank: 2 },
    { id: 'app-instagram', name: 'Instagram', developer: 'Instagram, Inc.', icon: 'https://picsum.photos/seed/instagram/120/120', category: 'Social', rating: 4.1, rank: 3 },
    { id: 'app-whatsapp', name: 'WhatsApp Messenger', developer: 'WhatsApp Inc.', icon: 'https://picsum.photos/seed/whatsapp/120/120', category: 'Social', rating: 4.3, rank: 4 },
    { id: 'app-capcut', name: 'CapCut', developer: 'Bytedance Pte. Ltd.', icon: 'https://picsum.photos/seed/capcut/120/120', category: 'Photo & Video', rating: 4.5, rank: 5 },
    { id: 'app-spotify', name: 'Spotify: Music and Podcasts', developer: 'Spotify AB', icon: 'https://picsum.photos/seed/spotify/120/120', category: 'Music', rating: 4.4, rank: 6 },
    { id: 'app-gmail', name: 'Gmail - Email by Google', developer: 'Google LLC', icon: 'https://picsum.photos/seed/gmail/120/120', category: 'Productivity', rating: 4.2, rank: 7 },
    { id: 'app-googlemaps', name: 'Google Maps', developer: 'Google LLC', icon: 'https://picsum.photos/seed/googlemaps/120/120', category: 'Navigation', rating: 4.5, rank: 8 },
    { id: 'app-zoom', name: 'Zoom Workplace', developer: 'Zoom Communications, Inc.', icon: 'https://picsum.photos/seed/zoom/120/120', category: 'Business', rating: 4.1, rank: 9 },
    { id: 'app-amazon', name: 'Amazon Shopping', developer: 'AMZN Mobile LLC', icon: 'https://picsum.photos/seed/amazon/120/120', category: 'Shopping', rating: 4.6, rank: 10 },
  ],

  /* ------------------------------------------------------------------ */
  /* 4. Top paid apps — 10                                               */
  /* ------------------------------------------------------------------ */
  'appstore.topPaid': [
    { id: 'app-minecraft', name: 'Minecraft', developer: 'Mojang', icon: 'https://picsum.photos/seed/minecraft/120/120', category: 'Games', price: 6.99, rating: 4.5, rank: 1 },
    { id: 'app-stardew', name: 'Stardew Valley', developer: 'ConcernedApe', icon: 'https://picsum.photos/seed/stardew/120/120', category: 'Games', price: 4.99, rating: 4.8, rank: 2 },
    { id: 'app-procreate', name: 'Procreate', developer: 'Savage Interactive', icon: 'https://picsum.photos/seed/procreate/120/120', category: 'Photo & Video', price: 12.99, rating: 4.9, rank: 3 },
    { id: 'app-things3', name: 'Things 3', developer: 'Cultured Code', icon: 'https://picsum.photos/seed/things3/120/120', category: 'Productivity', price: 9.99, rating: 4.7, rank: 4 },
    { id: 'app-monumentvalley', name: 'Monument Valley', developer: 'ustwo games', icon: 'https://picsum.photos/seed/monumentvalley/120/120', category: 'Games', price: 3.99, rating: 4.6, rank: 5 },
    { id: 'app-goodnotes', name: 'GoodNotes 5', developer: 'Time Base Technology Ltd.', icon: 'https://picsum.photos/seed/goodnotes/120/120', category: 'Productivity', price: 7.99, rating: 4.5, rank: 6 },
    { id: 'app-terraria', name: 'Terraria', developer: '505 Games (US), Inc.', icon: 'https://picsum.photos/seed/terraria/120/120', category: 'Games', price: 4.99, rating: 4.4, rank: 7 },
    { id: 'app-omnifocus', name: 'OmniFocus 3', developer: 'The Omni Group', icon: 'https://picsum.photos/seed/omnifocus/120/120', category: 'Productivity', price: 49.99, rating: 4.3, rank: 8 },
    { id: 'app-papertoss', name: 'Paper Toss', developer: 'Backflip Studios', icon: 'https://picsum.photos/seed/papertoss/120/120', category: 'Games', price: 0.99, rating: 3.9, rank: 9 },
    { id: 'app-fantastical', name: 'Fantastical', developer: 'Flexibits Inc.', icon: 'https://picsum.photos/seed/fantastical/120/120', category: 'Productivity', price: 5.99, rating: 4.6, rank: 10 },
  ],

  /* ------------------------------------------------------------------ */
  /* 5. Single app detail                                                */
  /* ------------------------------------------------------------------ */
  'appstore.app.detail': {
    id: 'app-procreate',
    name: 'Procreate',
    developer: 'Savage Interactive',
    category: 'Photo & Video',
    rating: 4.9,
    ratingCount: 51892,
    price: 12.99,
    description:
      'Procreate is the most powerful and intuitive illustration app designed for iPad. It gives you hundreds of handmade brushes, a full-featured layer system, and the legendary Silica-M engine for blazing-fast performance. Sketch, paint, and illustrate on a canvas up to 16K x 4K pixels.',
    version: '5.3.6',
    size: '324.8 MB',
    ageRating: '4+',
    whatsNew:
      'Version 5.3.6 brings 3D painting improvements, new brush sets from featured artists, and fixes for layer blending on M2 iPads.',
    screenshots: [
      'https://picsum.photos/seed/procreate-shot-1/640/960',
      'https://picsum.photos/seed/procreate-shot-2/640/960',
      'https://picsum.photos/seed/procreate-shot-3/640/960',
      'https://picsum.photos/seed/procreate-shot-4/640/960',
      'https://picsum.photos/seed/procreate-shot-5/640/960',
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 6. App reviews — 15 (each with 0-2 developer replies)              */
  /* ------------------------------------------------------------------ */
  'appstore.app.reviews': [
    {
      id: 'rev-1',
      author: 'ArtByMika',
      rating: 5,
      title: 'Best drawing app on iPad, period.',
      text: 'I have tried every drawing app out there and Procreate is simply the best. The brush engine is incredible and the layer system is so flexible. The new 3D painting is a nice bonus.',
      date: '2024-03-14',
      helpful: 248,
      replies: [
        { id: 'rep-1', author: 'Savage Interactive', text: 'Thank you so much for the kind words! We are thrilled you love the new 3D features.', date: '2024-03-15' },
      ],
    },
    {
      id: 'rev-2',
      author: 'SketchySue',
      rating: 4,
      title: 'Amazing but crashes sometimes',
      text: 'I love Procreate and use it daily for my comic work. However on my iPad Pro 11-inch it occasionally crashes when I have many layers. Otherwise it is fantastic.',
      date: '2024-03-10',
      helpful: 92,
      replies: [
        { id: 'rep-2', author: 'Savage Interactive', text: 'Sorry for the trouble! Please try turning off background app refresh and let us know at support.procreate.com if it persists.', date: '2024-03-11' },
      ],
    },
    {
      id: 'rev-3',
      author: 'DigitalDoodler',
      rating: 5,
      title: 'Worth every penny',
      text: 'For the price of a couple of coffees you get a professional-grade art tool. The QuickShape feature alone saves me hours. Highly recommended for beginners and pros alike.',
      date: '2024-03-08',
      helpful: 175,
      replies: [],
    },
    {
      id: 'rev-4',
      author: 'PixelPusher22',
      rating: 3,
      title: 'Great app, subscription fatigue elsewhere',
      text: 'Procreate is one of the few pro apps that is still a one-time purchase. Thank you for that. I just wish the text tool was more powerful — it feels basic compared to everything else.',
      date: '2024-03-05',
      helpful: 64,
      replies: [
        { id: 'rep-3', author: 'Savage Interactive', text: 'Great feedback — we are actively improving the text tool. Stay tuned for the next major release.', date: '2024-03-06' },
      ],
    },
    {
      id: 'rev-5',
      author: 'MangaMaven',
      rating: 5,
      title: 'Perfect for manga and comics',
      text: 'The symmetry tool and perspective guides make panel layouts a breeze. I have published three webtoons entirely made in Procreate. Cannot imagine working without it.',
      date: '2024-03-01',
      helpful: 138,
      replies: [],
    },
    {
      id: 'rev-6',
      author: 'GrumpyArtist',
      rating: 2,
      title: 'Frustrating on older iPads',
      text: 'On my iPad Air 2 the app lags badly with large canvases. I know it is an older device but the performance drop after the last update is noticeable.',
      date: '2024-02-27',
      helpful: 41,
      replies: [
        { id: 'rep-4', author: 'Savage Interactive', text: 'We hear you. Try reducing the canvas DPI in canvas settings, and ensure you are on iPadOS 16 or later for best results.', date: '2024-02-28' },
      ],
    },
    {
      id: 'rev-7',
      author: 'ColorNerd',
      rating: 5,
      title: 'Color management is top notch',
      text: 'The P3 wide color support and CMYK export make this viable for print work. ColorDrop and ColorHarmony are genuinely useful for picking palettes quickly.',
      date: '2024-02-22',
      helpful: 87,
      replies: [],
    },
    {
      id: 'rev-8',
      author: 'BeginnerBeth',
      rating: 4,
      title: 'Steep learning curve but worth it',
      text: 'As a total beginner I was overwhelmed at first. The in-app handbook and community tutorials helped a lot. Now three months in and I am producing work I am proud of.',
      date: '2024-02-18',
      helpful: 56,
      replies: [
        { id: 'rep-5', author: 'Savage Interactive', text: 'Welcome to the community! Check out procreate.com/handbook for the full guide.', date: '2024-02-19' },
      ],
    },
    {
      id: 'rev-9',
      author: 'ProPainter',
      rating: 5,
      title: 'Replaced my desktop workflow',
      text: 'I used to paint in Photoshop on a Wacom Cintiq. With Procreate on the iPad Pro I have completely switched. The Apple Pencil 2 double-tap to erase is genius.',
      date: '2024-02-14',
      helpful: 203,
      replies: [],
    },
    {
      id: 'rev-10',
      author: 'FrustratedFrank',
      rating: 1,
      title: 'Lost my work after a crash',
      text: 'I lost two hours of painting because the app crashed and autosave did not recover it. Please make autosave more reliable. This is unacceptable for a pro tool.',
      date: '2024-02-10',
      helpful: 119,
      replies: [
        { id: 'rep-6', author: 'Savage Interactive', text: 'We are so sorry. Please enable the automatic Time-lapse recovery in Settings > Backup. Email us with your iPad model so we can investigate.', date: '2024-02-11' },
        { id: 'rep-7', author: 'Savage Interactive', text: 'Update: we have identified a fix for the autosave issue in 5.3.6. Please update and let us know.', date: '2024-02-20' },
      ],
    },
    {
      id: 'rev-11',
      author: 'BrushJunkie',
      rating: 5,
      title: 'The brushes are unreal',
      text: 'The inking brushes feel like real ink on paper. The dry media set is gorgeous. And importing custom brushes from other artists is seamless. Best brush library on any platform.',
      date: '2024-02-06',
      helpful: 74,
      replies: [],
    },
    {
      id: 'rev-12',
      author: 'TeacherTara',
      rating: 4,
      title: 'Great for classroom use',
      text: 'I teach middle school art and we use Procreate on shared iPads. The students love it. Only wish there was a cheaper education licensing tier for bulk purchases.',
      date: '2024-02-02',
      helpful: 33,
      replies: [
        { id: 'rep-8', author: 'Savage Interactive', text: 'Great to hear! Apple School Manager offers volume pricing — please reach out to education@procreate.com for details.', date: '2024-02-03' },
      ],
    },
    {
      id: 'rev-13',
      author: 'AnimationAndy',
      rating: 4,
      title: 'Animation is fun but limited',
      text: 'The Animation Assist is a nice addition for quick loops and GIFs. For anything longer than a few seconds it gets unwieldy. Hoping for a timeline overhaul someday.',
      date: '2024-01-29',
      helpful: 48,
      replies: [],
    },
    {
      id: 'rev-14',
      author: 'HappyCustomer99',
      rating: 5,
      title: 'Six years and still the best',
      text: 'I bought Procreate in 2018 and it has only gotten better with free updates. No subscription, no ads, no nonsense. This is how software should be sold.',
      date: '2024-01-25',
      helpful: 312,
      replies: [
        { id: 'rep-9', author: 'Savage Interactive', text: 'Thank you for six years of support! We promise to keep Procreate a one-time purchase, forever.', date: '2024-01-26' },
      ],
    },
    {
      id: 'rev-15',
      author: 'CasualDoodler',
      rating: 3,
      title: 'Overkill for casual users',
      text: 'I just wanted to doodle occasionally and Procreate has way more than I need. It is powerful but the interface can be intimidating if you are not serious about art.',
      date: '2024-01-20',
      helpful: 22,
      replies: [],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 7. Screenshots — 6                                                  */
  /* ------------------------------------------------------------------ */
  'appstore.app.screenshots': [
    { id: 'shot-1', src: 'https://picsum.photos/seed/procreate-shot-1/640/960', alt: 'Brush library showing hundreds of handmade brushes', width: 640, height: 960 },
    { id: 'shot-2', src: 'https://picsum.photos/seed/procreate-shot-2/640/960', alt: 'Layer system with blend modes and masks', width: 640, height: 960 },
    { id: 'shot-3', src: 'https://picsum.photos/seed/procreate-shot-3/640/960', alt: 'Color picker with ColorHarmony and palettes', width: 640, height: 960 },
    { id: 'shot-4', src: 'https://picsum.photos/seed/procreate-shot-4/640/960', alt: 'Perspective drawing guides in action', width: 640, height: 960 },
    { id: 'shot-5', src: 'https://picsum.photos/seed/procreate-shot-5/640/960', alt: '3D painting on an imported model', width: 640, height: 960 },
    { id: 'shot-6', src: 'https://picsum.photos/seed/procreate-shot-6/640/960', alt: 'Animation Assist timeline with onion skins', width: 640, height: 960 },
  ],

  /* ------------------------------------------------------------------ */
  /* 8. Apps in a category (Productivity) — 12                           */
  /* ------------------------------------------------------------------ */
  'appstore.category.apps': [
    { id: 'app-notion', name: 'Notion', developer: 'Notion Labs, Inc.', icon: 'https://picsum.photos/seed/notion/120/120', price: 0, rating: 4.7, category: 'Productivity' },
    { id: 'app-things3', name: 'Things 3', developer: 'Cultured Code', icon: 'https://picsum.photos/seed/things3/120/120', price: 9.99, rating: 4.7, category: 'Productivity' },
    { id: 'app-goodnotes', name: 'GoodNotes 5', developer: 'Time Base Technology Ltd.', icon: 'https://picsum.photos/seed/goodnotes/120/120', price: 7.99, rating: 4.5, category: 'Productivity' },
    { id: 'app-omnifocus', name: 'OmniFocus 3', developer: 'The Omni Group', icon: 'https://picsum.photos/seed/omnifocus/120/120', price: 49.99, rating: 4.3, category: 'Productivity' },
    { id: 'app-fantastical', name: 'Fantastical', developer: 'Flexibits Inc.', icon: 'https://picsum.photos/seed/fantastical/120/120', price: 5.99, rating: 4.6, category: 'Productivity' },
    { id: 'app-bear', name: 'Bear', developer: 'Shiny Frog Ltd.', icon: 'https://picsum.photos/seed/bear/120/120', price: 0, rating: 4.5, ratingCount: 8201, category: 'Productivity' },
    { id: 'app-todoist', name: 'Todoist', developer: 'Doist Inc.', icon: 'https://picsum.photos/seed/todoist/120/120', price: 0, rating: 4.6, category: 'Productivity' },
    { id: 'app-obsidian', name: 'Obsidian', developer: 'Obsidian', icon: 'https://picsum.photos/seed/obsidian/120/120', price: 0, rating: 4.4, category: 'Productivity' },
    { id: 'app-shortcuts', name: 'Shortcuts', developer: 'Apple', icon: 'https://picsum.photos/seed/shortcuts/120/120', price: 0, rating: 4.0, category: 'Productivity' },
    { id: 'app-drafts', name: 'Drafts', developer: 'Agility Apps, LLC', icon: 'https://picsum.photos/seed/drafts/120/120', price: 0, rating: 4.5, category: 'Productivity' },
    { id: 'app-craft', name: 'Craft - Docs and Notes', developer: 'Luki Labs', icon: 'https://picsum.photos/seed/craft/120/120', price: 0, rating: 4.6, category: 'Productivity' },
    { id: 'app-spark', name: 'Spark Mail', developer: 'Readdle Inc.', icon: 'https://picsum.photos/seed/spark/120/120', price: 0, rating: 4.4, category: 'Productivity' },
  ],

  /* ------------------------------------------------------------------ */
  /* 9. Search results — 8                                               */
  /* ------------------------------------------------------------------ */
  'appstore.search.results': [
    { id: 'app-procreate', name: 'Procreate', developer: 'Savage Interactive', icon: 'https://picsum.photos/seed/procreate/120/120', category: 'Photo & Video', price: 12.99, rating: 4.9, type: 'app' },
    { id: 'app-procreatepocket', name: 'Procreate Pocket', developer: 'Savage Interactive', icon: 'https://picsum.photos/seed/procreatepocket/120/120', category: 'Photo & Video', price: 5.99, rating: 4.6, type: 'app' },
    { id: 'app-ibispaint', name: 'ibis Paint X', developer: 'ibis Inc.', icon: 'https://picsum.photos/seed/ibispaint/120/120', category: 'Photo & Video', price: 0, rating: 4.3, type: 'app' },
    { id: 'app-clipstudio', name: 'Clip Studio Paint', developer: 'CELSYS, Inc.', icon: 'https://picsum.photos/seed/clipstudio/120/120', category: 'Photo & Video', price: 0, rating: 4.2, type: 'app' },
    { id: 'app-sketchbook', name: 'Autodesk SketchBook', developer: 'Autodesk Inc.', icon: 'https://picsum.photos/seed/sketchbook/120/120', category: 'Photo & Video', price: 0, rating: 4.1, type: 'app' },
    { id: 'app-artset', name: 'Art Set 4', developer: 'Lofopi Ltd.', icon: 'https://picsum.photos/seed/artset/120/120', category: 'Photo & Video', price: 0, rating: 4.4, type: 'app' },
    { id: 'app-concepts', name: 'Concepts', developer: 'TopHatch, Inc.', icon: 'https://picsum.photos/seed/concepts/120/120', category: 'Productivity', price: 0, rating: 4.5, type: 'app' },
    { id: 'app-tayasui', name: 'Tayasui Sketches', developer: 'Tayasui', icon: 'https://picsum.photos/seed/tayasui/120/120', category: 'Photo & Video', price: 0, rating: 4.2, type: 'app' },
  ],

  /* ------------------------------------------------------------------ */
  /* 10. Developer info                                                  */
  /* ------------------------------------------------------------------ */
  'appstore.developer.info': {
    id: 'dev-savage',
    name: 'Savage Interactive',
    website: 'https://procreate.com',
    supportEmail: 'support@procreate.com',
    apps: [
      { id: 'app-procreate', name: 'Procreate', icon: 'https://picsum.photos/seed/procreate/120/120', price: 12.99, rating: 4.9, category: 'Photo & Video' },
      { id: 'app-procreatepocket', name: 'Procreate Pocket', icon: 'https://picsum.photos/seed/procreatepocket/120/120', price: 5.99, rating: 4.6, category: 'Photo & Video' },
      { id: 'app-procreatedreams', name: 'Procreate Dreams', icon: 'https://picsum.photos/seed/procreatedreams/120/120', price: 19.99, rating: 4.5, category: 'Photo & Video' },
    ],
  },
};

/* ---------- Helpers ---------- */

export const getAppStoreData = (dataSource: string): any | undefined =>
  APP_STORE_DATA[dataSource];

export const hasAppStoreData = (dataSource: string): boolean =>
  Object.prototype.hasOwnProperty.call(APP_STORE_DATA, dataSource);
