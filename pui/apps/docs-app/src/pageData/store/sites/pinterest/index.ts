export const PINTEREST_DATA: Record<string, any> = {
  // ---------------------------------------------------------------------------
  // 1. PINS (home feed)
  // ---------------------------------------------------------------------------
  'pinterest.pins': [
    { id: 'pin_001', title: 'Scandinavian living room with oak accents', source: 'homestyling.co', saves: 8432, image: 'https://picsum.photos/seed/pin001/400/600' },
    { id: 'pin_002', title: 'Strawberry shortcake layer recipe', source: 'sweetbakes.com', saves: 5210, image: 'https://picsum.photos/seed/pin002/400/400' },
    { id: 'pin_003', title: 'Minimalist garden design ideas', source: 'greenliving.io', saves: 12034, image: 'https://picsum.photos/seed/pin003/400/600' },
    { id: 'pin_004', title: 'Coastal cottage interior tour', source: 'coastalliving.com', saves: 6789, image: 'https://picsum.photos/seed/pin004/400/500' },
    { id: 'pin_005', title: 'Autumn capsule wardrobe essentials', source: 'stylefile.co', saves: 9123, image: 'https://picsum.photos/seed/pin005/400/400' },
    { id: 'pin_006', title: 'Santorini sunset photography spots', source: 'wanderlust.travel', saves: 15678, image: 'https://picsum.photos/seed/pin006/400/600' },
    { id: 'pin_007', title: 'Modern kitchen island inspiration', source: 'designhouse.com', saves: 7456, image: 'https://picsum.photos/seed/pin007/400/600' },
    { id: 'pin_008', title: 'Watercolor painting techniques for beginners', source: 'artstudio.io', saves: 4321, image: 'https://picsum.photos/seed/pin008/400/400' },
    { id: 'pin_009', title: 'DIY macrame wall hanging tutorial', source: 'craftyhands.com', saves: 3890, image: 'https://picsum.photos/seed/pin009/400/500' },
    { id: 'pin_010', title: 'Cozy reading nook by the window', source: 'interiorinspo.co', saves: 11023, image: 'https://picsum.photos/seed/pin010/400/600' },
    { id: 'pin_011', title: 'One-pot Tuscan chicken pasta', source: 'easyeats.com', saves: 8932, image: 'https://picsum.photos/seed/pin011/400/400' },
    { id: 'pin_012', title: 'Boho bedroom with rattan headboard', source: 'bohodecor.co', saves: 6745, image: 'https://picsum.photos/seed/pin012/400/600' },
    { id: 'pin_013', title: 'Hiking trail map for Banff National Park', source: 'trailfinder.io', saves: 14567, image: 'https://picsum.photos/seed/pin013/400/500' },
    { id: 'pin_014', title: 'Minimalist bullet journal spread ideas', source: 'plannerpages.co', saves: 5612, image: 'https://picsum.photos/seed/pin014/400/400' },
    { id: 'pin_015', title: 'Industrial loft bathroom with concrete sink', source: 'urbandesign.com', saves: 7890, image: 'https://picsum.photos/seed/pin015/400/600' },
    { id: 'pin_016', title: 'Sourdough bread scoring patterns', source: 'breadcraft.com', saves: 9234, image: 'https://picsum.photos/seed/pin016/400/400' },
  ],

  // ---------------------------------------------------------------------------
  // 2. PIN DETAIL
  // ---------------------------------------------------------------------------
  'pinterest.pin.detail': {
    id: 'pin_001',
    title: 'Scandinavian living room with oak accents and natural light',
    description: 'A bright, airy living space styled with warm oak furniture, soft textiles, and a curated gallery wall. The neutral palette keeps the room calm while the layered textures add depth.',
    source: 'homestyling.co',
    saves: 8432,
    comments: 1287,
    author: 'emma.miller',
    authorAvatar: 'https://i.pravatar.cc/150?img=47',
    followers: 12400,
    image: 'https://picsum.photos/seed/pin001/600/800',
    board: 'Cozy Home Office Ideas',
    tags: ['scandinavian', 'livingroom', 'oak', 'minimalist', 'interior'],
  },

  // ---------------------------------------------------------------------------
  // 3. PIN COMMENTS (with replies)
  // ---------------------------------------------------------------------------
  'pinterest.pin.comments': [
    {
      id: 'comment_001',
      author: 'Sara Kim',
      handle: 'sara.kim',
      avatar: 'https://i.pravatar.cc/150?img=23',
      text: 'This is exactly the vibe I want for my apartment. Where is the sofa from?',
      likes: 234,
      time: '2 days ago',
      replies: [
        { id: 'reply_001a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'It is the HAGALUND from a local Scandinavian furniture shop. Link in my bio!', likes: 45, time: '1 day ago' },
        { id: 'reply_001b', author: 'Sara Kim', handle: 'sara.kim', avatar: 'https://i.pravatar.cc/150?img=23', text: 'Thank you so much! Just ordered it.', likes: 12, time: '1 day ago' },
      ],
    },
    {
      id: 'comment_002',
      author: 'James Taylor',
      handle: 'james.taylor',
      avatar: 'https://i.pravatar.cc/150?img=33',
      text: 'The gallery wall is stunning. Did you frame all the prints yourself?',
      likes: 156,
      time: '3 days ago',
      replies: [
        { id: 'reply_002a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Yes! Used IKEA RIBBA frames in mixed sizes. The key is keeping consistent matting.', likes: 28, time: '2 days ago' },
      ],
    },
    {
      id: 'comment_003',
      author: 'Lina Park',
      handle: 'lina.park',
      avatar: 'https://i.pravatar.cc/150?img=45',
      text: 'Saving this for my living room refresh next month. The oak + white combo is timeless.',
      likes: 112,
      time: '5 days ago',
      replies: [],
    },
    {
      id: 'comment_004',
      author: 'Devon Walker',
      handle: 'devonwalks',
      avatar: 'https://i.pravatar.cc/150?img=15',
      text: 'The natural light in this room is incredible. What direction does it face?',
      likes: 89,
      time: '5 days ago',
      replies: [
        { id: 'reply_004a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'South-facing! Gets light from about 9am to 4pm.', likes: 34, time: '4 days ago' },
      ],
    },
    {
      id: 'comment_005',
      author: 'Maya Chen',
      handle: 'maya.chen',
      avatar: 'https://i.pravatar.cc/150?img=25',
      text: 'Where did you find the area rug? Love the subtle pattern.',
      likes: 67,
      time: '6 days ago',
      replies: [
        { id: 'reply_005a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'It is a hand-woven wool rug from a small shop in Copenhagen.', likes: 19, time: '5 days ago' },
      ],
    },
    {
      id: 'comment_006',
      author: 'Tomás Herrera',
      handle: 'tomas.herrera',
      avatar: 'https://i.pravatar.cc/150?img=51',
      text: 'The layered textiles really make this work. Throw blanket source?',
      likes: 54,
      time: '1 week ago',
      replies: [],
    },
    {
      id: 'comment_007',
      author: 'Aisha Bello',
      handle: 'aisha.bello',
      avatar: 'https://i.pravatar.cc/150?img=44',
      text: 'This is my dream living room. Pinned to my "future home" board immediately.',
      likes: 143,
      time: '1 week ago',
      replies: [
        { id: 'reply_007a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'So glad it inspired you! Tag me if you recreate any elements.', likes: 22, time: '6 days ago' },
      ],
    },
    {
      id: 'comment_008',
      author: 'Liam O\'Brien',
      handle: 'liam.obrien',
      avatar: 'https://i.pravatar.cc/150?img=13',
      text: 'The oak coffee table is gorgeous. Is it solid wood or veneer?',
      likes: 38,
      time: '1 week ago',
      replies: [
        { id: 'reply_008a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Solid white oak. Got it from a local maker — worth every penny.', likes: 24, time: '6 days ago' },
      ],
    },
    {
      id: 'comment_009',
      author: 'Yuki Tanaka',
      handle: 'yuki.tanaka',
      avatar: 'https://i.pravatar.cc/150?img=48',
      text: 'The calmness of this space is everything. Minimalism done right.',
      likes: 201,
      time: '1 week ago',
      replies: [],
    },
    {
      id: 'comment_010',
      author: 'Carlos Mendes',
      handle: 'carlos.mendes',
      avatar: 'https://i.pravatar.cc/150?img=53',
      text: 'What paint color is on the walls? Looking for that exact warm white.',
      likes: 76,
      time: '1 week ago',
      replies: [
        { id: 'reply_010a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Benjamin Moore Simply White OC-117. Never fails!', likes: 31, time: '6 days ago' },
      ],
    },
    {
      id: 'comment_011',
      author: 'Sofia Almeida',
      handle: 'sofia.almeida',
      avatar: 'https://i.pravatar.cc/150?img=25',
      text: 'The plant in the corner — is that a fiddle leaf fig? How do you keep it happy?',
      likes: 49,
      time: '2 weeks ago',
      replies: [
        { id: 'reply_011a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Yes! South-facing window, water when top inch is dry, and rotate weekly.', likes: 15, time: '2 weeks ago' },
      ],
    },
    {
      id: 'comment_012',
      author: 'Priya Sharma',
      handle: 'priya.sharma',
      avatar: 'https://i.pravatar.cc/150?img=45',
      text: 'The proportions of this room are perfect. Ceiling height?',
      likes: 41,
      time: '2 weeks ago',
      replies: [],
    },
    {
      id: 'comment_013',
      author: 'Jake Morrison',
      handle: 'jake.morrison',
      avatar: 'https://i.pravatar.cc/150?img=15',
      text: 'Bookmarked. Renovating next year and this is the reference image.',
      likes: 63,
      time: '2 weeks ago',
      replies: [],
    },
    {
      id: 'comment_014',
      author: 'Elena Rossi',
      handle: 'elena.rossi',
      avatar: 'https://i.pravatar.cc/150?img=23',
      text: 'The way the light hits the oak is magical. What time was this shot?',
      likes: 35,
      time: '2 weeks ago',
      replies: [
        { id: 'reply_014a', author: 'Emma Miller', handle: 'emma.miller', avatar: 'https://i.pravatar.cc/150?img=47', text: 'Around 11am when the sun is high enough to flood the room evenly.', likes: 18, time: '2 weeks ago' },
      ],
    },
    {
      id: 'comment_015',
      author: 'Marcus Bell',
      handle: 'marcus.bell',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'This is the most saved pin on my board. Just perfect styling.',
      likes: 27,
      time: '3 weeks ago',
      replies: [],
    },
  ],

  // ---------------------------------------------------------------------------
  // 4. BOARDS
  // ---------------------------------------------------------------------------
  'pinterest.boards': [
    { id: 'board_001', name: 'Cozy Home Office Ideas', owner: 'emma.miller', pins: 142, followers: 3420, cover: 'https://picsum.photos/seed/board001/300/300' },
    { id: 'board_002', name: 'Weeknight Dinner Recipes', owner: 'emma.miller', pins: 89, followers: 5670, cover: 'https://picsum.photos/seed/board002/300/300' },
    { id: 'board_003', name: 'Travel Bucket List: Europe', owner: 'emma.miller', pins: 234, followers: 8910, cover: 'https://picsum.photos/seed/board003/300/300' },
    { id: 'board_004', name: 'Minimalist Wardrobe', owner: 'emma.miller', pins: 67, followers: 2340, cover: 'https://picsum.photos/seed/board004/300/300' },
    { id: 'board_005', name: 'Garden & Outdoor Spaces', owner: 'emma.miller', pins: 156, followers: 4560, cover: 'https://picsum.photos/seed/board005/300/300' },
    { id: 'board_006', name: 'DIY Home Projects', owner: 'emma.miller', pins: 98, followers: 1890, cover: 'https://picsum.photos/seed/board006/300/300' },
    { id: 'board_007', name: 'Watercolor Art Inspiration', owner: 'emma.miller', pins: 73, followers: 1230, cover: 'https://picsum.photos/seed/board007/300/300' },
    { id: 'board_008', name: 'Scandinavian Interiors', owner: 'emma.miller', pins: 187, followers: 6780, cover: 'https://picsum.photos/seed/board008/300/300' },
    { id: 'board_009', name: 'Bullet Journal Layouts', owner: 'emma.miller', pins: 54, followers: 980, cover: 'https://picsum.photos/seed/board009/300/300' },
    { id: 'board_010', name: 'Plant Care Tips', owner: 'emma.miller', pins: 112, followers: 3450, cover: 'https://picsum.photos/seed/board010/300/300' },
    { id: 'board_011', name: 'Wedding Decor Ideas', owner: 'emma.miller', pins: 145, followers: 7890, cover: 'https://picsum.photos/seed/board011/300/300' },
    { id: 'board_012', name: 'Small Space Hacks', owner: 'emma.miller', pins: 101, followers: 4120, cover: 'https://picsum.photos/seed/board012/300/300' },
  ],

  // ---------------------------------------------------------------------------
  // 5. BOARD PINS
  // ---------------------------------------------------------------------------
  'pinterest.board.pins': [
    { id: 'bp_001', title: 'Standing desk with floating shelves', saves: 1234, image: 'https://picsum.photos/seed/bp001/400/600' },
    { id: 'bp_002', title: 'Natural light reading nook', saves: 2345, image: 'https://picsum.photos/seed/bp002/400/400' },
    { id: 'bp_003', title: 'Plant wall above the desk', saves: 3456, image: 'https://picsum.photos/seed/bp003/400/600' },
    { id: 'bp_004', title: 'Cable management solutions', saves: 456, image: 'https://picsum.photos/seed/bp004/400/500' },
    { id: 'bp_005', title: 'Dual monitor setup layout', saves: 1567, image: 'https://picsum.photos/seed/bp005/400/400' },
    { id: 'bp_006', title: 'Warm wood accent workspace', saves: 2789, image: 'https://picsum.photos/seed/bp006/400/600' },
    { id: 'bp_007', title: 'Minimalist pegboard organizer', saves: 890, image: 'https://picsum.photos/seed/bp007/400/600' },
    { id: 'bp_008', title: 'Cork board inspiration wall', saves: 1234, image: 'https://picsum.photos/seed/bp008/400/400' },
    { id: 'bp_009', title: 'Built-in bookshelf desk combo', saves: 3456, image: 'https://picsum.photos/seed/bp009/400/500' },
    { id: 'bp_010', title: 'Corner desk with storage', saves: 678, image: 'https://picsum.photos/seed/bp010/400/600' },
    { id: 'bp_011', title: 'Acoustic panel sound treatment', saves: 456, image: 'https://picsum.photos/seed/bp011/400/400' },
    { id: 'bp_012', title: 'Adjustable drafting table setup', saves: 1234, image: 'https://picsum.photos/seed/bp012/400/600' },
  ],

  // ---------------------------------------------------------------------------
  // 6. CATEGORIES
  // ---------------------------------------------------------------------------
  'pinterest.categories': [
    { id: 'cat_foryou', name: 'For You' },
    { id: 'cat_homedecor', name: 'Home Decor' },
    { id: 'cat_recipes', name: 'Recipes' },
    { id: 'cat_travel', name: 'Travel' },
    { id: 'cat_fashion', name: 'Fashion' },
    { id: 'cat_garden', name: 'Garden' },
    { id: 'cat_diy', name: 'DIY' },
    { id: 'cat_art', name: 'Art' },
    { id: 'cat_architecture', name: 'Architecture' },
    { id: 'cat_fitness', name: 'Fitness' },
    { id: 'cat_beauty', name: 'Beauty' },
  ],

  // ---------------------------------------------------------------------------
  // 7. FOLLOWING (followed boards)
  // ---------------------------------------------------------------------------
  'pinterest.following': [
    { id: 'follow_001', name: 'Nordic Interior Design', owner: 'nordic.living', pins: 423, followers: 12400, cover: 'https://picsum.photos/seed/follow001/300/300' },
    { id: 'follow_002', name: 'Plant-Based Recipes', owner: 'green.kitchen', pins: 289, followers: 8900, cover: 'https://picsum.photos/seed/follow002/300/300' },
    { id: 'follow_003', name: 'Wanderlust Travel', owner: 'travel.globe', pins: 567, followers: 23400, cover: 'https://picsum.photos/seed/follow003/300/300' },
    { id: 'follow_004', name: 'Capsule Wardrobe', owner: 'minimal.style', pins: 134, followers: 6700, cover: 'https://picsum.photos/seed/follow004/300/300' },
    { id: 'follow_005', name: 'Urban Garden Ideas', owner: 'balcony.bloom', pins: 198, followers: 4500, cover: 'https://picsum.photos/seed/follow005/300/300' },
    { id: 'follow_006', name: 'Modern Architecture', owner: 'arch.daily', pins: 612, followers: 18900, cover: 'https://picsum.photos/seed/follow006/300/300' },
    { id: 'follow_007', name: 'Hand Lettering', owner: 'letter.studio', pins: 87, followers: 3200, cover: 'https://picsum.photos/seed/follow007/300/300' },
    { id: 'follow_008', name: 'Cozy Reading Nooks', owner: 'book.nook', pins: 156, followers: 5600, cover: 'https://picsum.photos/seed/follow008/300/300' },
    { id: 'follow_009', name: 'Sourdough Baking', owner: 'bread.craft', pins: 234, followers: 7800, cover: 'https://picsum.photos/seed/follow009/300/300' },
    { id: 'follow_010', name: 'Watercolor Tutorials', owner: 'paint.flow', pins: 112, followers: 4100, cover: 'https://picsum.photos/seed/follow010/300/300' },
  ],

  // ---------------------------------------------------------------------------
  // 8. SUGGESTED PINS
  // ---------------------------------------------------------------------------
  'pinterest.suggested': [
    { id: 'sug_001', title: 'Japandi style bedroom tour', source: 'zeninterior.co', saves: 9876, image: 'https://picsum.photos/seed/sug001/400/600' },
    { id: 'sug_002', title: '30-minute weeknight stir fry', source: 'quickwok.com', saves: 6543, image: 'https://picsum.photos/seed/sug002/400/400' },
    { id: 'sug_003', title: 'Hidden gems of Lisbon', source: 'lisboanguide.io', saves: 12340, image: 'https://picsum.photos/seed/sug003/400/500' },
    { id: 'sug_004', title: 'Capsule wardrobe fall edition', source: 'stylefile.co', saves: 7890, image: 'https://picsum.photos/seed/sug004/400/600' },
    { id: 'sug_005', title: 'Balcony garden for small spaces', source: 'tinygreen.io', saves: 4567, image: 'https://picsum.photos/seed/sug005/400/400' },
    { id: 'sug_006', title: 'Concrete planter DIY tutorial', source: 'craftyhands.com', saves: 3210, image: 'https://picsum.photos/seed/sug006/400/500' },
    { id: 'sug_007', title: 'Abstract acrylic pour techniques', source: 'artstudio.io', saves: 5678, image: 'https://picsum.photos/seed/sug007/400/400' },
    { id: 'sug_008', title: 'Brutalist architecture photo essay', source: 'arch.daily', saves: 8901, image: 'https://picsum.photos/seed/sug008/400/600' },
    { id: 'sug_009', title: 'Home gym setup under $500', source: 'fitathome.com', saves: 2345, image: 'https://picsum.photos/seed/sug009/400/400' },
    { id: 'sug_010', title: 'Skincare routine for sensitive skin', source: 'glowguide.co', saves: 6789, image: 'https://picsum.photos/seed/sug010/400/500' },
  ],
};
