/* ---------- Amazon data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'amazon.xxx'`.
 */

export type AmazonCategory = {
  id: string;
  name: string;
  icon: string;
  productCount: string;
};

export type AmazonProduct = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  prime: boolean;
  badge: string;
};

export type AmazonProductDetail = {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  features: string[];
  variations: { id: string; name: string; price: number }[];
  prime: boolean;
  inStock: boolean;
};

export type AmazonReviewReply = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  date: string;
};

export type AmazonReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
  helpful: number;
  replies: AmazonReviewReply[];
};

export type AmazonCartItem = {
  id: string;
  productId: string;
  title: string;
  brand: string;
  quantity: number;
  price: number;
  image: string;
  inStock: boolean;
};

export type AmazonOrder = {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: string;
  items: number;
  image: string;
};

export type AmazonDeal = {
  id: string;
  title: string;
  brand: string;
  originalPrice: number;
  dealPrice: number;
  discount: number;
  rating: number;
  image: string;
  claimed: string;
};

export type AmazonSearchResult = {
  id: string;
  title: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  prime: boolean;
  sponsored: boolean;
};

export const AMAZON_DATA: Record<string, any> = {
  /* 1. Categories (10+) */
  'amazon.categories': [
    { id: 'cat_electronics', name: 'Electronics', icon: 'Cpu', productCount: '4.2M' },
    { id: 'cat_home', name: 'Home & Kitchen', icon: 'Home', productCount: '8.1M' },
    { id: 'cat_books', name: 'Books', icon: 'Book', productCount: '12.3M' },
    { id: 'cat_fashion', name: 'Clothing & Accessories', icon: 'Shirt', productCount: '6.7M' },
    { id: 'cat_beauty', name: 'Beauty & Personal Care', icon: 'Sparkles', productCount: '2.4M' },
    { id: 'cat_toys', name: 'Toys & Games', icon: 'Gamepad2', productCount: '1.8M' },
    { id: 'cat_sports', name: 'Sports & Outdoors', icon: 'Trophy', productCount: '3.2M' },
    { id: 'cat_grocery', name: 'Grocery & Gourmet', icon: 'ShoppingCart', productCount: '1.1M' },
    { id: 'cat_office', name: 'Office Products', icon: 'Briefcase', productCount: '1.5M' },
    { id: 'cat_pet', name: 'Pet Supplies', icon: 'PawPrint', productCount: '920K' },
    { id: 'cat_auto', name: 'Automotive', icon: 'Car', productCount: '1.3M' },
  ] as AmazonCategory[],

  /* 2. Products (15+) */
  'amazon.products': [
    { id: 'ap1', title: 'Apple AirPods Pro (2nd Gen) with USB-C Charging Case', brand: 'Apple', category: 'cat_electronics', price: 189, originalPrice: 249, rating: 4.7, reviewCount: 87432, image: 'https://picsum.photos/seed/airpodspro/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap2', title: 'Kindle Paperwhite (16 GB) — 6.8" display, adjustable warm light', brand: 'Amazon', category: 'cat_electronics', price: 139, originalPrice: 159, rating: 4.6, reviewCount: 54211, image: 'https://picsum.photos/seed/kindle/400/400', prime: true, badge: "Amazon's Choice" },
    { id: 'ap3', title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart', brand: 'Instant Pot', category: 'cat_home', price: 89, originalPrice: 129, rating: 4.7, reviewCount: 167234, image: 'https://picsum.photos/seed/instantpot/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap4', title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', brand: 'Sony', category: 'cat_electronics', price: 328, originalPrice: 399, rating: 4.8, reviewCount: 23104, image: 'https://picsum.photos/seed/sonyxm5/400/400', prime: true, badge: 'Premium' },
    { id: 'ap5', title: 'Echo Dot (5th Gen) Smart Speaker with Alexa', brand: 'Amazon', category: 'cat_electronics', price: 22, originalPrice: 49, rating: 4.7, reviewCount: 412876, image: 'https://picsum.photos/seed/echodot/400/400', prime: true, badge: 'Deal' },
    { id: 'ap6', title: 'Fire TV Stick 4K Max streaming device', brand: 'Amazon', category: 'cat_electronics', price: 29, originalPrice: 59, rating: 4.7, reviewCount: 198432, image: 'https://picsum.photos/seed/firetv/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap7', title: 'Ninja AF101 Air Fryer that Crisps, Roasts, Reheats, & Dehydrates, 4 Qt', brand: 'Ninja', category: 'cat_home', price: 99, originalPrice: 129, rating: 4.7, reviewCount: 87654, image: 'https://picsum.photos/seed/ninjaair/400/400', prime: true, badge: "Amazon's Choice" },
    { id: 'ap8', title: 'Hydro Flask Water Bottle — Vacuum Insulated Stainless Steel, 32 oz', brand: 'Hydro Flask', category: 'cat_sports', price: 44, originalPrice: 52, rating: 4.8, reviewCount: 65432, image: 'https://picsum.photos/seed/hydroflask/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap9', title: 'Apple Watch Series 9 [GPS 45mm] Smartwatch', brand: 'Apple', category: 'cat_electronics', price: 329, originalPrice: 429, rating: 4.7, reviewCount: 18234, image: 'https://picsum.photos/seed/applewatch/400/400', prime: true, badge: 'Premium' },
    { id: 'ap10', title: 'LEGO Star Wars The Mandalorian Building Set, 1,023 Pieces', brand: 'LEGO', category: 'cat_toys', price: 129, originalPrice: 159, rating: 4.9, reviewCount: 8421, image: 'https://picsum.photos/seed/legomando/400/400', prime: true, badge: 'New' },
    { id: 'ap11', title: 'CeraVe Moisturizing Cream | Body and Face Moisturizer for Dry Skin', brand: 'CeraVe', category: 'cat_beauty', price: 16, originalPrice: 22, rating: 4.8, reviewCount: 234109, image: 'https://picsum.photos/seed/cerave/400/400', prime: true, badge: "Amazon's Choice" },
    { id: 'ap12', title: 'Samsung T7 Portable SSD 1TB — USB 3.2 External Solid State Drive', brand: 'SAMSUNG', category: 'cat_electronics', price: 79, originalPrice: 129, rating: 4.8, reviewCount: 45821, image: 'https://picsum.photos/seed/samsungt7/400/400', prime: true, badge: 'Deal' },
    { id: 'ap13', title: 'Anker 622 MagGo Magnetic Portable Charger (MagSafe Compatible)', brand: 'Anker', category: 'cat_electronics', price: 49, originalPrice: 69, rating: 4.6, reviewCount: 12043, image: 'https://picsum.photos/seed/ankermag/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap14', title: 'Levi\'s Men\'s 501 Original Fit Jeans', brand: 'Levi\'s', category: 'cat_fashion', price: 39, originalPrice: 59, rating: 4.4, reviewCount: 98234, image: 'https://picsum.photos/seed/levis501/400/400', prime: true, badge: 'Deal' },
    { id: 'ap15', title: 'Rubbermaid Brilliance Food Storage Containers, 10 Piece Set', brand: 'Rubbermaid', category: 'cat_home', price: 24, originalPrice: 34, rating: 4.8, reviewCount: 34210, image: 'https://picsum.photos/seed/rubbermaid/400/400', prime: true, badge: 'Best Seller' },
    { id: 'ap16', title: 'Tide Pods 3-in-1 Laundry Detergent Pacs, Spring Meadow, 81 Count', brand: 'Tide', category: 'cat_grocery', price: 19, originalPrice: 28, rating: 4.8, reviewCount: 156432, image: 'https://picsum.photos/seed/tidepods/400/400', prime: true, badge: "Amazon's Choice" },
  ] as AmazonProduct[],

  /* 3. Product detail */
  'amazon.product.detail': {
    id: 'ap1',
    title: 'Apple AirPods Pro (2nd Gen) with USB-C Charging Case',
    brand: 'Apple',
    category: 'cat_electronics',
    price: 189,
    originalPrice: 249,
    rating: 4.7,
    reviewCount: 87432,
    description:
      'AirPods Pro feature up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. The redesigned USB-C charging case includes a built-in speaker for Find My and a lanyard loop. Up to 6 hours of listening time with ANC enabled, and 30 hours total with the MagSafe charging case.',
    images: [
      'https://picsum.photos/seed/airpodsmain/800/500',
      'https://picsum.photos/seed/airpodscase/200/120',
      'https://picsum.photos/seed/airpodsin/200/120',
      'https://picsum.photos/seed/airpodsside/200/120',
      'https://picsum.photos/seed/airpodsbox/200/120',
    ],
    features: [
      'Up to 2x more Active Noise Cancellation',
      'Adaptive Transparency reduces loud environmental noise',
      'Personalized Spatial Audio with dynamic head tracking',
      'USB-C charging case with built-in speaker and lanyard loop',
      'Up to 6 hours of listening time with ANC',
      'Sweat and dust resistant (IP54)',
      'Four silicone ear tip sizes for the best fit and acoustic seal',
    ],
    variations: [
      { id: 'var_ap1_std', name: 'Standard', price: 189 },
      { id: 'var_ap1_engrave', name: 'Free Engraving', price: 189 },
      { id: 'var_ap1_care', name: 'With AppleCare+', price: 248 },
    ],
    prime: true,
    inStock: true,
  } as AmazonProductDetail,

  /* 4. Product reviews (15+ with replies) */
  'amazon.product.reviews': [
    {
      id: 'arev_001',
      author: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      title: 'The ANC is genuinely incredible now',
      text: 'I owned the original AirPods Pro and the 2nd gen is a massive leap. The noise cancellation on a plane is now competitive with my Sony XM5s, and the transparency mode is so natural I forget I have them in. USB-C case is the cherry on top.',
      date: 'October 14, 2024',
      verified: true,
      helpful: 1243,
      replies: [
        { id: 'arev_001_r1', author: 'Amazon Customer', avatar: 'https://i.pravatar.cc/150?img=5', text: 'Agreed on the ANC. Flew JFK to LAX and could barely hear the engines.', date: 'October 16, 2024' },
      ],
    },
    {
      id: 'arev_002',
      author: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=25',
      rating: 5,
      title: 'Finally USB-C — one cable for everything',
      text: 'My whole bag is USB-C now and these were the last holdout. The case feels more solid and the speaker for Find My is genuinely useful — I lost my old pair constantly.',
      date: 'October 10, 2024',
      verified: true,
      helpful: 876,
      replies: [],
    },
    {
      id: 'arev_003',
      author: 'David Rodriguez',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4,
      title: 'Great but the fit changed slightly',
      text: 'Sound and ANC are 5 stars. Deducted one because the new case is a bit chunkier and the ear tips feel slightly different from gen 1. Took a day to re-find my best fit. Once sealed, they\'re flawless.',
      date: 'October 8, 2024',
      verified: true,
      helpful: 432,
      replies: [
        { id: 'arev_003_r1', author: 'Apple Fan', avatar: 'https://i.pravatar.cc/150?img=14', text: 'Try the largest tip — I had to size up from gen 1 and the seal is way better.', date: 'October 9, 2024' },
      ],
    },
    {
      id: 'arev_004',
      author: 'Emily Davis',
      avatar: 'https://i.pravatar.cc/150?img=23',
      rating: 5,
      title: 'Spatial Audio on movies is wild',
      text: 'Watched Dune Part Two with these and the head tracking makes it feel like a theater. The bass is surprisingly deep for how small they are. Battery easily lasted a full cross-country flight.',
      date: 'October 3, 2024',
      verified: true,
      helpful: 612,
      replies: [],
    },
    {
      id: 'arev_005',
      author: 'Robert Wilson',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      title: 'Switched from Sony XM5 and no regrets',
      text: 'The XM5s are great but they\'re bulky for travel. The AirPods Pro fit in my pocket, integrate with my iPhone instantly, and the ANC is 90% as good. For daily use these win on convenience.',
      date: 'September 28, 2024',
      verified: true,
      helpful: 389,
      replies: [
        { id: 'arev_005_r1', author: 'Audiophile Andy', avatar: 'https://i.pravatar.cc/150?img=13', text: 'XM5 still wins on pure sound quality but for convenience AirPods are unbeatable in the Apple ecosystem.', date: 'September 29, 2024' },
      ],
    },
    {
      id: 'arev_006',
      author: 'Aisha Patel',
      avatar: 'https://i.pravatar.cc/150?img=44',
      rating: 5,
      title: 'Workout proof — IP54 is real',
      text: 'I run 5 miles a day and sweat heavily. After 3 months of daily use there\'s zero degradation. The adaptive transparency is perfect for running outside — I can hear traffic but not wind noise.',
      date: 'September 22, 2024',
      verified: true,
      helpful: 298,
      replies: [],
    },
    {
      id: 'arev_007',
      author: 'Liam Murphy',
      avatar: 'https://i.pravatar.cc/150?img=15',
      rating: 4,
      title: 'Wish battery was a bit longer',
      text: '6 hours with ANC is fine for most days but on long travel days I\'m reaching for the case by hour 5. The case itself charges fast though — 5 minutes gives about an hour of playback.',
      date: 'September 18, 2024',
      verified: true,
      helpful: 187,
      replies: [],
    },
    {
      id: 'arev_008',
      author: 'Nadia Petrova',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      title: 'The Find My speaker saved me $250',
      text: 'Left them at a coffee shop and the Find My speaker chirped loud enough for the barista to find them behind the counter. Would have lost them for sure without it. Worth the upgrade alone.',
      date: 'September 12, 2024',
      verified: true,
      helpful: 521,
      replies: [
        { id: 'arev_008_r1', author: 'Careless Carl', avatar: 'https://i.pravatar.cc/150?img=54', text: 'This feature is underrated. I lose everything and this has saved my pair twice.', date: 'September 13, 2024' },
      ],
    },
    {
      id: 'arev_009',
      author: 'Carlos Santos',
      avatar: 'https://i.pravatar.cc/150?img=53',
      rating: 5,
      title: 'Call quality is dramatically better',
      text: 'On the original Pros people said I sounded muffled on calls. The 2nd gen has a noticeably clearer mic — my team confirmed it on video calls. Wind noise handling is also much improved.',
      date: 'September 5, 2024',
      verified: true,
      helpful: 234,
      replies: [],
    },
    {
      id: 'arev_010',
      author: 'Hannah Lee',
      avatar: 'https://i.pravatar.cc/150?img=49',
      rating: 5,
      title: 'Seamless with MacBook and iPad too',
      text: 'The auto-switching between my iPhone, iPad, and MacBook is magic. I can start a podcast on my phone and it picks up on my Mac when I open it. No fiddling with Bluetooth menus.',
      date: 'August 30, 2024',
      verified: true,
      helpful: 178,
      replies: [],
    },
    {
      id: 'arev_011',
      author: 'Ben Thompson',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 4,
      title: 'Pricey but the upgrade is worth it',
      text: 'Coming from AirPods 3, the ANC and seal are night and day. $189 on sale is fair. At full retail I\'d hesitate but this deal made it a no-brainer. Ear tip fit test is a great addition.',
      date: 'August 24, 2024',
      verified: true,
      helpful: 156,
      replies: [],
    },
    {
      id: 'arev_012',
      author: 'Mei Zhang',
      avatar: 'https://i.pravatar.cc/150?img=41',
      rating: 5,
      title: 'Best earbuds I\'ve owned, period',
      text: 'Tried Galaxy Buds Pro, Pixel Buds Pro, and these. The AirPods Pro 2 win on ANC, transparency, and ecosystem fit. The case is the most pocketable of any flagship earbud. No complaints.',
      date: 'August 18, 2024',
      verified: true,
      helpful: 143,
      replies: [
        { id: 'arev_012_r1', author: 'Pixel User', avatar: 'https://i.pravatar.cc/150?img=45', text: 'Agree on ANC but Pixel Buds win if you\'re on Android. Horses for courses.', date: 'August 19, 2024' },
      ],
    },
    {
      id: 'arev_013',
      author: 'Olu Adeyemi',
      avatar: 'https://i.pravatar.cc/150?img=43',
      rating: 5,
      title: 'Adaptive transparency is futuristic',
      text: 'Walking through a construction zone, the loud jackhammer sounds were dampened but I could still hear my podcast and people talking. It feels like magic. Genuinely a safety feature for city living.',
      date: 'August 11, 2024',
      verified: true,
      helpful: 198,
      replies: [],
    },
    {
      id: 'arev_014',
      author: 'Greta Andersson',
      avatar: 'https://i.pravatar.cc/150?img=31',
      rating: 4,
      title: 'Great but Android users look elsewhere',
      text: 'Sound and ANC are top tier but you lose half the features on Android — no Spatial Audio, no auto-switching, limited Find My. If you\'re all-in on Apple, 5 stars. Mixed household, 4 stars.',
      date: 'August 4, 2024',
      verified: true,
      helpful: 167,
      replies: [],
    },
    {
      id: 'arev_015',
      author: 'Andre Silva',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      title: 'Replaced my over-ears for daily use',
      text: 'I used to wear my Bose QC45s everywhere but they\'re too big for summer commutes. The AirPods Pro 2 give me 90% of the ANC in a tiny package. Over-ears are now only for long flights.',
      date: 'July 28, 2024',
      verified: true,
      helpful: 134,
      replies: [
        { id: 'arev_015_r1', author: 'Ravi Kumar', avatar: 'https://i.pravatar.cc/150?img=11', text: 'Same here. Over-ears for flights, AirPods Pro for everything else.', date: 'July 29, 2024' },
      ],
    },
    {
      id: 'arev_016',
      author: 'Clara Dubois',
      avatar: 'https://i.pravatar.cc/150?img=24',
      rating: 5,
      title: 'Volume control finally on the buds',
      text: 'The swipe on the stem for volume is the feature I didn\'t know I needed. No more pulling out my phone to adjust. It\'s responsive and the clicks give nice tactile feedback. Small thing, big QoL.',
      date: 'July 21, 2024',
      verified: true,
      helpful: 98,
      replies: [],
    },
  ] as AmazonReview[],

  /* 5. Cart items */
  'amazon.cart.items': [
    {
      id: 'cart_ap1',
      productId: 'ap1',
      title: 'Apple AirPods Pro (2nd Gen) with USB-C Charging Case',
      brand: 'Apple',
      quantity: 1,
      price: 189,
      image: 'https://picsum.photos/seed/airpodspro/400/400',
      inStock: true,
    },
    {
      id: 'cart_ap3',
      productId: 'ap3',
      title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart',
      brand: 'Instant Pot',
      quantity: 1,
      price: 89,
      image: 'https://picsum.photos/seed/instantpot/400/400',
      inStock: true,
    },
    {
      id: 'cart_ap11',
      productId: 'ap11',
      title: 'CeraVe Moisturizing Cream | Body and Face Moisturizer for Dry Skin',
      brand: 'CeraVe',
      quantity: 2,
      price: 16,
      image: 'https://picsum.photos/seed/cerave/400/400',
      inStock: true,
    },
  ] as AmazonCartItem[],

  /* 6. Orders (10+) */
  'amazon.orders': [
    { id: 'ord_1', orderNumber: '112-8472910-3382014', date: 'October 12, 2024', total: 189, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/airpodspro/200/200' },
    { id: 'ord_2', orderNumber: '112-7382019-4471023', date: 'October 3, 2024', total: 139, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/kindle/200/200' },
    { id: 'ord_3', orderNumber: '112-6291048-5562032', date: 'September 21, 2024', total: 247, status: 'Delivered', items: 3, image: 'https://picsum.photos/seed/echodot/200/200' },
    { id: 'ord_4', orderNumber: '112-5182937-6653041', date: 'September 8, 2024', total: 328, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/sonyxm5/200/200' },
    { id: 'ord_5', orderNumber: '112-4073826-7744050', date: 'August 24, 2024', total: 99, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/ninjaair/200/200' },
    { id: 'ord_6', orderNumber: '112-3964715-8835069', date: 'August 15, 2024', total: 168, status: 'Delivered', items: 4, image: 'https://picsum.photos/seed/hydroflask/200/200' },
    { id: 'ord_7', orderNumber: '112-2855604-9926078', date: 'July 30, 2024', total: 329, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/applewatch/200/200' },
    { id: 'ord_8', orderNumber: '112-1746493-1017087', date: 'July 18, 2024', total: 129, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/legomando/200/200' },
    { id: 'ord_9', orderNumber: '112-0637382-2108096', date: 'July 2, 2024', total: 48, status: 'Delivered', items: 3, image: 'https://picsum.photos/seed/cerave/200/200' },
    { id: 'ord_10', orderNumber: '111-9528271-3219105', date: 'June 20, 2024', total: 79, status: 'Delivered', items: 1, image: 'https://picsum.photos/seed/samsungt7/200/200' },
    { id: 'ord_11', orderNumber: '111-8419160-4320114', date: 'June 8, 2024', total: 63, status: 'Delivered', items: 2, image: 'https://picsum.photos/seed/levis501/200/200' },
  ] as AmazonOrder[],

  /* 7. Deals (10+) */
  'amazon.deals': [
    { id: 'deal1', title: 'Apple AirPods Pro (2nd Gen)', brand: 'Apple', originalPrice: 249, dealPrice: 189, discount: 24, rating: 4.7, image: 'https://picsum.photos/seed/airpodspro/300/300', claimed: '63% claimed' },
    { id: 'deal2', title: 'Echo Dot (5th Gen)', brand: 'Amazon', originalPrice: 49, dealPrice: 22, discount: 55, rating: 4.7, image: 'https://picsum.photos/seed/echodot/300/300', claimed: '78% claimed' },
    { id: 'deal3', title: 'Fire TV Stick 4K Max', brand: 'Amazon', originalPrice: 59, dealPrice: 29, discount: 50, rating: 4.7, image: 'https://picsum.photos/seed/firetv/300/300', claimed: '45% claimed' },
    { id: 'deal4', title: 'Instant Pot Duo 7-in-1', brand: 'Instant Pot', originalPrice: 129, dealPrice: 89, discount: 31, rating: 4.7, image: 'https://picsum.photos/seed/instantpot/300/300', claimed: '52% claimed' },
    { id: 'deal5', title: 'Sony WH-1000XM5 Headphones', brand: 'Sony', originalPrice: 399, dealPrice: 328, discount: 18, rating: 4.8, image: 'https://picsum.photos/seed/sonyxm5/300/300', claimed: '29% claimed' },
    { id: 'deal6', title: 'Samsung T7 Portable SSD 1TB', brand: 'SAMSUNG', originalPrice: 129, dealPrice: 79, discount: 39, rating: 4.8, image: 'https://picsum.photos/seed/samsungt7/300/300', claimed: '67% claimed' },
    { id: 'deal7', title: 'Anker 622 MagGo Portable Charger', brand: 'Anker', originalPrice: 69, dealPrice: 49, discount: 29, rating: 4.6, image: 'https://picsum.photos/seed/ankermag/300/300', claimed: '40% claimed' },
    { id: 'deal8', title: "Levi's Men's 501 Original Jeans", brand: "Levi's", originalPrice: 59, dealPrice: 39, discount: 34, rating: 4.4, image: 'https://picsum.photos/seed/levis501/300/300', claimed: '71% claimed' },
    { id: 'deal9', title: 'Ninja AF101 Air Fryer 4 Qt', brand: 'Ninja', originalPrice: 129, dealPrice: 99, discount: 23, rating: 4.7, image: 'https://picsum.photos/seed/ninjaair/300/300', claimed: '58% claimed' },
    { id: 'deal10', title: 'Hydro Flask 32 oz Water Bottle', brand: 'Hydro Flask', originalPrice: 52, dealPrice: 44, discount: 15, rating: 4.8, image: 'https://picsum.photos/seed/hydroflask/300/300', claimed: '33% claimed' },
    { id: 'deal11', title: 'Apple Watch Series 9 [GPS 45mm]', brand: 'Apple', originalPrice: 429, dealPrice: 329, discount: 23, rating: 4.7, image: 'https://picsum.photos/seed/applewatch/300/300', claimed: '21% claimed' },
  ] as AmazonDeal[],

  /* 8. Search results (12+) */
  'amazon.search.results': [
    { id: 'sr1', title: 'Apple AirPods Pro (2nd Gen) with USB-C Charging Case', brand: 'Apple', price: 189, rating: 4.7, reviewCount: 87432, image: 'https://picsum.photos/seed/airpodspro/200/200', prime: true, sponsored: false },
    { id: 'sr2', title: 'Apple AirPods (3rd Generation) with Lightning Charging Case', brand: 'Apple', price: 139, rating: 4.7, reviewCount: 54211, image: 'https://picsum.photos/seed/airpods3/200/200', prime: true, sponsored: false },
    { id: 'sr3', title: 'Bose QuietComfort Wireless Earbuds with Noise Cancellation', brand: 'Bose', price: 179, rating: 4.5, reviewCount: 12304, image: 'https://picsum.photos/seed/boseqc/200/200', prime: true, sponsored: true },
    { id: 'sr4', title: 'Beats Studio Buds — True Wireless Noise Cancelling Earbuds', brand: 'Beats', price: 99, rating: 4.4, reviewCount: 21043, image: 'https://picsum.photos/seed/beatsstudio/200/200', prime: true, sponsored: false },
    { id: 'sr5', title: 'JBL Tune Buds — Wireless Noise Cancelling Earbuds', brand: 'JBL', price: 49, rating: 4.3, reviewCount: 8421, image: 'https://picsum.photos/seed/jbltune/200/200', prime: true, sponsored: true },
    { id: 'sr6', title: 'Apple AirPods Max Wireless Over-Ear Headphones', brand: 'Apple', price: 479, rating: 4.6, reviewCount: 18234, image: 'https://picsum.photos/seed/airpodsmax/200/200', prime: true, sponsored: false },
    { id: 'sr7', title: 'Samsung Galaxy Buds2 Pro True Wireless Earbuds', brand: 'SAMSUNG', price: 169, rating: 4.5, reviewCount: 9821, image: 'https://picsum.photos/seed/galaxybuds/200/200', prime: true, sponsored: false },
    { id: 'sr8', title: 'Sony LinkBuds S Truly Wireless Noise Canceling Earbuds', brand: 'Sony', price: 148, rating: 4.4, reviewCount: 6432, image: 'https://picsum.photos/seed/sonylinkbuds/200/200', prime: true, sponsored: true },
    { id: 'sr9', title: 'Google Pixel Buds Pro Wireless Earbuds with ANC', brand: 'Google', price: 159, rating: 4.4, reviewCount: 7210, image: 'https://picsum.photos/seed/pixelbuds/200/200', prime: true, sponsored: false },
    { id: 'sr10', title: 'Anker Soundcore Liberty 4 NC Wireless Earbuds', brand: 'Anker', price: 49, rating: 4.5, reviewCount: 14203, image: 'https://picsum.photos/seed/ankerliberty/200/200', prime: true, sponsored: false },
    { id: 'sr11', title: 'Tozo A1 Mini Wireless Earbuds Bluetooth Headphones', brand: 'TOZO', price: 19, rating: 4.2, reviewCount: 23104, image: 'https://picsum.photos/seed/tozoa1/200/200', prime: true, sponsored: true },
    { id: 'sr12', title: 'AppleCare+ for Headphones (AirPods Pro)', brand: 'Apple', price: 59, rating: 4.6, reviewCount: 2103, image: 'https://picsum.photos/seed/applecared/200/200', prime: false, sponsored: false },
    { id: 'sr13', title: 'Spigen AirPods Pro 2 Case Cover with Carabiner', brand: 'Spigen', price: 12, rating: 4.6, reviewCount: 18432, image: 'https://picsum.photos/seed/spigencase/200/200', prime: true, sponsored: false },
  ] as AmazonSearchResult[],
};
