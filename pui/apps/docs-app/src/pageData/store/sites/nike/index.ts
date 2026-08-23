/* ---------- Nike data store ----------
 * Comprehensive data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'nike.xxx'`.
 */

export type NikeCategory = {
  id: string;
  name: string;
  description: string;
};

export type NikeProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  colors: string[];
  sizes: number[];
  image: string;
  badge: string;
  rating: number;
  reviewCount: number;
};

export type NikeProductDetail = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  colors: { id: string; name: string; hex: string }[];
  sizes: number[];
  images: string[];
  features: string[];
  rating: number;
  reviewCount: number;
};

export type NikeReviewReply = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
};

export type NikeReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
  replies: NikeReviewReply[];
};

export type NikeCollection = {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
};

export type NikeCartItem = {
  id: string;
  productId: string;
  name: string;
  size: number;
  color: string;
  quantity: number;
  price: number;
  image: string;
};

export type NikeStoreLocation = {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
};

export type NikeAthlete = {
  id: string;
  name: string;
  sport: string;
  team: string;
  signatureShoe: string;
  image: string;
};

export const NIKE_DATA: Record<string, any> = {
  /* 1. Categories */
  'nike.categories': [
    { id: 'cat_running', name: 'Running', description: 'Engineered for speed and distance' },
    { id: 'cat_basketball', name: 'Basketball', description: 'Built for the court and the jump' },
    { id: 'cat_training', name: 'Training', description: 'Versatile gear for the grind' },
    { id: 'cat_lifestyle', name: 'Lifestyle', description: 'Everyday streetwear icons' },
    { id: 'cat_soccer', name: 'Soccer', description: 'Pitch-ready performance' },
    { id: 'cat_tennis', name: 'Tennis', description: 'Court-grade stability and grip' },
  ] as NikeCategory[],

  /* 2. Products (12+) */
  'nike.products': [
    { id: 'aj1_high', name: 'Air Jordan 1 Retro High OG', brand: 'Jordan', category: 'cat_basketball', price: 180, colors: ['Chicago', 'Black/White'], sizes: [7, 8, 9, 10, 11, 12, 13], image: 'https://picsum.photos/seed/aj1/400/400', badge: 'New', rating: 4.9, reviewCount: 2143 },
    { id: 'airmax90', name: 'Nike Air Max 90', brand: 'Nike', category: 'cat_lifestyle', price: 130, colors: ['Infrared', 'Triple Black'], sizes: [6, 7, 8, 9, 10, 11, 12], image: 'https://picsum.photos/seed/airmax90/400/400', badge: 'Trending', rating: 4.8, reviewCount: 3871 },
    { id: 'pegasus41', name: 'Nike Pegasus 41', brand: 'Nike', category: 'cat_running', price: 140, colors: ['Volt', 'Black'], sizes: [7, 8, 9, 10, 11, 12, 13, 14], image: 'https://picsum.photos/seed/pegasus41/400/400', badge: 'Best Seller', rating: 4.7, reviewCount: 1524 },
    { id: 'dunklow', name: 'Nike Dunk Low', brand: 'Nike', category: 'cat_lifestyle', price: 115, colors: ['Panda', 'University Blue'], sizes: [7, 8, 9, 10, 11, 12], image: 'https://picsum.photos/seed/dunklow/400/400', badge: 'New', rating: 4.6, reviewCount: 2890 },
    { id: 'blazer77', name: "Nike Blazer Mid '77", brand: 'Nike', category: 'cat_lifestyle', price: 105, colors: ['White/Black', 'Vintage White'], sizes: [7, 8, 9, 10, 11, 12, 13], image: 'https://picsum.photos/seed/blazer77/400/400', badge: 'Classic', rating: 4.5, reviewCount: 1102 },
    { id: 'af107', name: "Nike Air Force 1 '07", brand: 'Nike', category: 'cat_lifestyle', price: 115, colors: ['White', 'Black'], sizes: [6, 7, 8, 9, 10, 11, 12, 13, 14], image: 'https://picsum.photos/seed/af107/400/400', badge: 'Essential', rating: 4.8, reviewCount: 5421 },
    { id: 'metcon9', name: 'Nike Metcon 9', brand: 'Nike', category: 'cat_training', price: 140, colors: ['Black', 'Volt'], sizes: [7, 8, 9, 10, 11, 12, 13], image: 'https://picsum.photos/seed/metcon9/400/400', badge: 'Training', rating: 4.7, reviewCount: 643 },
    { id: 'lebron21', name: 'Nike LeBron 21', brand: 'Nike', category: 'cat_basketball', price: 200, colors: ['Royal', 'Bred'], sizes: [8, 9, 10, 11, 12, 13, 14, 15], image: 'https://picsum.photos/seed/lebron21/400/400', badge: 'Basketball', rating: 4.8, reviewCount: 412 },
    { id: 'kobe6', name: 'Nike Kobe 6 Protro', brand: 'Nike', category: 'cat_basketball', price: 190, colors: ['Grinch', 'Black Mamba'], sizes: [8, 9, 10, 11, 12, 13, 14], image: 'https://picsum.photos/seed/kobe6/400/400', badge: 'Limited', rating: 4.9, reviewCount: 876 },
    { id: 'vaporfly3', name: 'Nike Vaporfly 3', brand: 'Nike', category: 'cat_running', price: 260, colors: ['Barely Volt', 'Pink Blast'], sizes: [7, 8, 9, 10, 11, 12, 13], image: 'https://picsum.photos/seed/vaporfly3/400/400', badge: 'Race Day', rating: 4.6, reviewCount: 234 },
    { id: 'airmax270', name: 'Nike Air Max 270', brand: 'Nike', category: 'cat_lifestyle', price: 150, colors: ['Triple Black', 'Dusty Cactus'], sizes: [6, 7, 8, 9, 10, 11, 12], image: 'https://picsum.photos/seed/airmax270/400/400', badge: 'Trending', rating: 4.5, reviewCount: 2103 },
    { id: 'sbdunk', name: 'Nike SB Dunk Low Pro', brand: 'Nike SB', category: 'cat_lifestyle', price: 125, colors: ['Blue Panda', 'Halloween'], sizes: [7, 8, 9, 10, 11, 12], image: 'https://picsum.photos/seed/sbdunk/400/400', badge: 'SB', rating: 4.7, reviewCount: 1567 },
  ] as NikeProduct[],

  /* 3. Product detail */
  'nike.product.detail': {
    id: 'aj1_high',
    name: 'Air Jordan 1 Retro High OG',
    brand: 'Jordan',
    category: 'cat_basketball',
    price: 180,
    description:
      'The Air Jordan 1 Retro High OG returns in its original silhouette with premium leather upper, Air-Sole cushioning, and the iconic Wings logo. A faithful reissue of the shoe that changed sneaker culture forever.',
    colors: [
      { id: 'col_chicago', name: 'Chicago', hex: '#cf0a2c' },
      { id: 'col_black', name: 'Black/White', hex: '#111111' },
      { id: 'col_royal', name: 'Royal', hex: '#1f3a93' },
    ],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
    images: [
      'https://picsum.photos/seed/aj1main/800/500',
      'https://picsum.photos/seed/aj1side/200/120',
      'https://picsum.photos/seed/aj1back/200/120',
      'https://picsum.photos/seed/aj1sole/200/120',
      'https://picsum.photos/seed/aj1box/200/120',
    ],
    features: [
      'Premium leather upper',
      'Air-Sole unit in heel for lightweight cushioning',
      'Solid rubber outsole with circular tread pattern',
      'High-top silhouette for ankle support',
      'Iconic Wings logo on collar',
    ],
    rating: 4.9,
    reviewCount: 2143,
  } as NikeProductDetail,

  /* 3b. Product detail nested arrays — flat keys for item templates */
  'nike.product.colors': [
    { id: 'col_chicago', name: 'Chicago', hex: '#cf0a2c' },
    { id: 'col_black', name: 'Black/White', hex: '#111111' },
    { id: 'col_royal', name: 'Royal', hex: '#1f3a93' },
  ],
  'nike.product.sizes': [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13],
  'nike.product.images': [
    'https://picsum.photos/seed/aj1main/800/500',
    'https://picsum.photos/seed/aj1side/200/120',
    'https://picsum.photos/seed/aj1back/200/120',
    'https://picsum.photos/seed/aj1sole/200/120',
    'https://picsum.photos/seed/aj1box/200/120',
  ],
  'nike.product.features': [
    'Premium leather upper',
    'Air-Sole unit in heel for lightweight cushioning',
    'Solid rubber outsole with circular tread pattern',
    'High-top silhouette for ankle support',
    'Iconic Wings logo on collar',
  ],

  /* 4. Product reviews (15+ with replies) */
  'nike.product.reviews': [
    {
      id: 'nrev_001',
      author: 'Marcus Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      title: 'Better than the original release',
      text: 'The leather quality on this retro is a huge step up from the 2016 pair. Stitching is clean, the shape is true to the 1985 original, and the Chicago colorway pops. Worth every penny.',
      date: '2 weeks ago',
      verified: true,
      replies: [
        { id: 'nrev_001_r1', author: 'Jordan Brand', avatar: 'https://i.pravatar.cc/150?img=68', text: 'Appreciate the love, Marcus! We put a lot into getting the shape right on this one.', time: '1 week ago' },
      ],
    },
    {
      id: 'nrev_002',
      author: 'Tasha Williams',
      avatar: 'https://i.pravatar.cc/150?img=25',
      rating: 5,
      title: 'My grail finally copped',
      text: 'Been chasing Chicagos for 6 years. Finally hit on SNKRS and they did not disappoint. Comfortable out of the box and the red is vibrant in person.',
      date: '3 weeks ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_003',
      author: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=33',
      rating: 4,
      title: 'Great but runs a half size big',
      text: 'Iconic shoe, no notes on the look. Sizing runs a half size large compared to modern Dunks — I usually wear a 10.5 and the 10 fits perfectly. Break-in takes about a week.',
      date: '1 month ago',
      verified: true,
      replies: [
        { id: 'nrev_003_r1', author: 'Eric Lopez', avatar: 'https://i.pravatar.cc/150?img=14', text: 'Agreed on sizing. Went down a half size and it\'s the best fit I\'ve had in a Jordan.', time: '3 weeks ago' },
      ],
    },
    {
      id: 'nrev_004',
      author: 'Priya Sharma',
      avatar: 'https://i.pravatar.cc/150?img=23',
      rating: 5,
      title: 'Creasing is inevitable, embrace it',
      text: 'First pair of leather Jordans and I was paranoid about creasing. After a month of wear I love the patina — they look better broken in. Use a shoe tree and you\'re golden.',
      date: '1 month ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_005',
      author: 'Andre Robinson',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      title: 'Comfier than I expected',
      text: 'Heard people say 1s are stiff but the Air-Sole actually does something. Wore them all day at a sneaker convention with zero discomfort. The ankle padding is plush.',
      date: '2 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_006',
      author: 'Mei Lin',
      avatar: 'https://i.pravatar.cc/150?img=44',
      rating: 4,
      title: 'Box was damaged on arrival',
      text: 'Shoes are perfect but the box arrived pretty beat up. For a collector that matters. Nike support sent a replacement box within a week though, so solid recovery.',
      date: '2 months ago',
      verified: true,
      replies: [
        { id: 'nrev_006_r1', author: 'Nike Support', avatar: 'https://i.pravatar.cc/150?img=68', text: 'Sorry about that, Mei! Glad we could get a replacement box out to you.', time: '2 months ago' },
      ],
    },
    {
      id: 'nrev_007',
      author: "Liam O'Brien",
      avatar: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      title: 'The colorway is undefeated',
      text: 'Chicago 1s are the greatest sneaker ever made, full stop. The red/white/black balance is timeless. Got compliments from my 14-year-old niece and my 60-year-old dad.',
      date: '3 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_008',
      author: 'Sofia Garcia',
      avatar: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      title: 'Held up through a Chicago winter',
      text: 'Wore these through slush and salt all winter (I know, sacrilege) and they cleaned up beautifully with some Jason Markk. The leather is genuinely durable.',
      date: '3 months ago',
      verified: true,
      replies: [
        { id: 'nrev_008_r1', author: 'Tom Henderson', avatar: 'https://i.pravatar.cc/150?img=13', text: 'You brave soul. Glad they survived!', time: '3 months ago' },
      ],
    },
    {
      id: 'nrev_009',
      author: 'Carlos Mendes',
      avatar: 'https://i.pravatar.cc/150?img=53',
      rating: 4,
      title: 'Laces are too short',
      text: 'Only complaint — the laces that come with it are barely long enough for the top two eyelets. Swapped in some longer flat laces and it\'s perfect. Otherwise flawless.',
      date: '4 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_010',
      author: 'Hannah Park',
      avatar: 'https://i.pravatar.cc/150?img=49',
      rating: 5,
      title: 'SNKRS draw win made my year',
      text: 'After 40+ Ls on Chicagos I finally hit. The unboxing experience with the tissue paper and Wings tag felt special. This is why sneaker culture exists.',
      date: '4 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_011',
      author: 'Ben Carter',
      avatar: 'https://i.pravatar.cc/150?img=14',
      rating: 5,
      title: 'Wife stole them',
      text: 'Bought these for myself and my wife, who wears a women\'s 9, keeps wearing my men\'s 7.5. Genuinely a unisex shoe that looks great on everyone. Buying a second pair.',
      date: '5 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_012',
      author: 'Nadia Volkov',
      avatar: 'https://i.pravatar.cc/150?img=41',
      rating: 5,
      title: 'Investment-grade retro',
      text: 'These hold value better than any shoe in my collection. Wore mine twice and kept them on ice — resale has already doubled. But honestly they\'re too good not to wear.',
      date: '6 months ago',
      verified: true,
      replies: [
        { id: 'nrev_012_r1', author: 'Diego Fernández', avatar: 'https://i.pravatar.cc/150?img=54', text: 'Wear your shoes! That\'s what they\'re made for.', time: '5 months ago' },
      ],
    },
    {
      id: 'nrev_013',
      author: 'Olu Adesanya',
      avatar: 'https://i.pravatar.cc/150?img=43',
      rating: 4,
      title: 'Wish the tongue was thicker',
      text: 'The 1985 original had a puffier tongue and this retro flattens it a bit. Minor nitpick — most people won\'t notice. Still the best Chicago retro to date.',
      date: '7 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_014',
      author: 'Greta Lindqvist',
      avatar: 'https://i.pravatar.cc/150?img=31',
      rating: 5,
      title: 'Shipped to Stockholm no problem',
      text: 'Ordered from Sweden and delivery took 5 days with no customs hassle. The shoes are 100% authentic and the packaging was pristine. Nike EU logistics are on point.',
      date: '8 months ago',
      verified: true,
      replies: [],
    },
    {
      id: 'nrev_015',
      author: 'Andre Costa',
      avatar: 'https://i.pravatar.cc/150?img=52',
      rating: 5,
      title: 'My 8th pair of 1s and still hyped',
      text: 'I own eight colorways of the AJ1 High and the Chicago is the one I keep coming back to. It goes with everything from joggers to raw denim to a suit. Timeless.',
      date: '9 months ago',
      verified: true,
      replies: [
        { id: 'nrev_015_r1', author: 'Ravi Kapoor', avatar: 'https://i.pravatar.cc/150?img=11', text: 'Eight pairs is dedication. Which colorway is next on your list?', time: '8 months ago' },
      ],
    },
    {
      id: 'nrev_016',
      author: 'Clara Moreau',
      avatar: 'https://i.pravatar.cc/150?img=24',
      rating: 5,
      title: 'Daughter\'s first pair of Jordans',
      text: 'Bought the grade school size for my 11-year-old and she hasn\'t taken them off since. The look on her face when she opened the box was worth triple the price.',
      date: '10 months ago',
      verified: true,
      replies: [],
    },
  ] as NikeReview[],

  /* 5. Collections (8+) */
  'nike.collections': [
    { id: 'col_jordan', name: 'Jordan Brand', description: 'The legacy of greatness', image: 'https://picsum.photos/seed/coljordan/300/200', productCount: 142 },
    { id: 'col_running', name: 'Running', description: 'Engineered for speed', image: 'https://picsum.photos/seed/colrunning/300/200', productCount: 98 },
    { id: 'col_training', name: 'Training', description: 'Built for the grind', image: 'https://picsum.photos/seed/coltraining/300/200', productCount: 64 },
    { id: 'col_sb', name: 'Nike SB', description: 'Skateboarding culture', image: 'https://picsum.photos/seed/colsb/300/200', productCount: 71 },
    { id: 'col_basketball', name: 'Basketball', description: 'Built for the hardwood', image: 'https://picsum.photos/seed/colbball/300/200', productCount: 53 },
    { id: 'col_airmax', name: 'Air Max', description: 'Visible air, undeniable style', image: 'https://picsum.photos/seed/colairmax/300/200', productCount: 87 },
    { id: 'col_dunk', name: 'Dunk', description: 'From hardwood to street', image: 'https://picsum.photos/seed/coldunk/300/200', productCount: 45 },
    { id: 'col_lifestyle', name: 'Lifestyle', description: 'Icons for every day', image: 'https://picsum.photos/seed/collifestyle/300/200', productCount: 120 },
    { id: 'col_acg', name: 'ACG', description: 'All Conditions Gear for the outdoors', image: 'https://picsum.photos/seed/colacg/300/200', productCount: 38 },
  ] as NikeCollection[],

  /* 6. Cart items */
  'nike.cart.items': [
    {
      id: 'cart_aj1',
      productId: 'aj1_high',
      name: 'Air Jordan 1 Retro High OG',
      size: 10,
      color: 'Chicago',
      quantity: 1,
      price: 180,
      image: 'https://picsum.photos/seed/aj1/400/400',
    },
    {
      id: 'cart_pegasus',
      productId: 'pegasus41',
      name: 'Nike Pegasus 41',
      size: 10,
      color: 'Volt',
      quantity: 2,
      price: 140,
      image: 'https://picsum.photos/seed/pegasus41/400/400',
    },
    {
      id: 'cart_hoodie',
      productId: 'nike_hoodie',
      name: 'Nike Sportswear Club Fleece Hoodie',
      size: 0,
      color: 'Grey Heather',
      quantity: 1,
      price: 60,
      image: 'https://picsum.photos/seed/nikehoodie/400/400',
    },
  ] as NikeCartItem[],

  /* 7. Store locations (10+) */
  'nike.store.locations': [
    { id: 'store_nyc', name: 'Nike House of Innovation NYC', address: '650 5th Ave, New York, NY 10019', phone: '(212) 221-0823', hours: '10am-8pm', lat: 40.7589, lng: -73.9775 },
    { id: 'store_la', name: 'Nike The Grove Los Angeles', address: '189 The Grove Dr, Los Angeles, CA 90036', phone: '(323) 852-8500', hours: '10am-9pm', lat: 34.0718, lng: -118.3563 },
    { id: 'store_chicago', name: 'Nike Chicago', address: '669 N Michigan Ave, Chicago, IL 60611', phone: '(312) 642-6363', hours: '10am-8pm', lat: 41.8939, lng: -87.6239 },
    { id: 'store_sf', name: 'Nike San Francisco', address: '160 Powell St, San Francisco, CA 94102', phone: '(415) 397-3142', hours: '10am-8pm', lat: 37.7857, lng: -122.4064 },
    { id: 'store_miami', name: 'Nike Miami', address: '7340 SW 88th St, Miami, FL 33156', phone: '(305) 596-9990', hours: '10am-9pm', lat: 25.6793, lng: -80.4316 },
    { id: 'store_seattle', name: 'Nike Seattle', address: '265 Pine St, Seattle, WA 98101', phone: '(206) 448-7990', hours: '10am-8pm', lat: 47.6125, lng: -122.3344 },
    { id: 'store_boston', name: 'Nike Boston', address: '200 Newbury St, Boston, MA 02116', phone: '(617) 262-0001', hours: '10am-8pm', lat: 42.3505, lng: -71.0736 },
    { id: 'store_atlanta', name: 'Nike Atlanta', address: '3500 Peachtree Rd NE, Atlanta, GA 30326', phone: '(404) 846-4700', hours: '10am-8pm', lat: 33.8493, lng: -84.3621 },
    { id: 'store_houston', name: 'Nike Houston', address: '4001 Westheimer Rd, Houston, TX 77027', phone: '(713) 622-0001', hours: '10am-9pm', lat: 29.7438, lng: -95.4612 },
    { id: 'store_portland', name: 'Nike Portland', address: '638 SW 5th Ave, Portland, OR 97204', phone: '(503) 241-3555', hours: '10am-7pm', lat: 45.5215, lng: -122.6777 },
    { id: 'store_vegas', name: 'Nike Las Vegas', address: '3717 S Las Vegas Blvd, Las Vegas, NV 89109', phone: '(702) 733-8500', hours: '10am-11pm', lat: 36.1133, lng: -115.1744 },
    { id: 'store_toronto', name: 'Nike Toronto', address: '110 Bloor St W, Toronto, ON M5P 1A2', phone: '(416) 920-0001', hours: '10am-8pm', lat: 43.6704, lng: -79.3936 },
  ] as NikeStoreLocation[],

  /* 8. Sponsored athletes (10+) */
  'nike.athletes': [
    { id: 'ath_lebron', name: 'LeBron James', sport: 'Basketball', team: 'Los Angeles Lakers', signatureShoe: 'LeBron 21', image: 'https://picsum.photos/seed/athlebron/200/200' },
    { id: 'ath_kobe', name: 'Kobe Bryant', sport: 'Basketball', team: 'Los Angeles Lakers (retired)', signatureShoe: 'Kobe 6 Protro', image: 'https://picsum.photos/seed/athkobe/200/200' },
    { id: 'ath_giannis', name: 'Giannis Antetokounmpo', sport: 'Basketball', team: 'Milwaukee Bucks', signatureShoe: 'Giannis Freak 5', image: 'https://picsum.photos/seed/athgiannis/200/200' },
    { id: 'ath_ja', name: 'Ja Morant', sport: 'Basketball', team: 'Memphis Grizzlies', signatureShoe: 'Ja 2', image: 'https://picsum.photos/seed/athja/200/200' },
    { id: 'ath_kylian', name: 'Kylian Mbappé', sport: 'Soccer', team: 'Real Madrid', signatureShoe: 'Mercurial Superfly 10', image: 'https://picsum.photos/seed/athkylian/200/200' },
    { id: 'ath_ronaldo', name: 'Cristiano Ronaldo', sport: 'Soccer', team: 'Al-Nassr', signatureShoe: 'Mercurial Vapor 16', image: 'https://picsum.photos/seed/athronaldo/200/200' },
    { id: 'ath_serena', name: 'Serena Williams', sport: 'Tennis', team: '—', signatureShoe: 'NikeCourt Flare', image: 'https://picsum.photos/seed/athserena/200/200' },
    { id: 'ath_rafa', name: 'Rafael Nadal', sport: 'Tennis', team: '—', signatureShoe: 'NikeCourt Air Zoom Vapor', image: 'https://picsum.photos/seed/athrafa/200/200' },
    { id: 'ath_sha', name: "Sha'Carri Richardson", sport: 'Track & Field', team: '—', signatureShoe: 'Air Zoom Maxfly', image: 'https://picsum.photos/seed/athsha/200/200' },
    { id: 'ath_ingo', name: 'Ingebrigtsen Jakob', sport: 'Track & Field', team: '—', signatureShoe: 'Vaporfly 3', image: 'https://picsum.photos/seed/athingo/200/200' },
    { id: 'ath_aria', name: "A'ja Wilson", sport: 'Basketball', team: 'Las Vegas Aces', signatureShoe: 'A\'One', image: 'https://picsum.photos/seed/atharia/200/200' },
  ] as NikeAthlete[],
};
