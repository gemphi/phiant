/* ---------- Coinbase data store ----------
 * Comprehensive crypto exchange data keyed by dataSource strings.
 * Page blocks reference these via `dataSource: 'coinbase.xxx'`.
 */

export type CoinbaseAsset = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  icon: string;
  color: string;
};

export type CoinbaseAssetDetail = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  change7d: number;
  change30d: number;
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
  maxSupply: string;
  allTimeHigh: number;
  allTimeLow: number;
  description: string;
  icon: string;
  color: string;
  rank: number;
};

export type CoinbaseHolding = {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  avgCost: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
  color: string;
};

export type CoinbaseTransaction = {
  id: string;
  type: 'buy' | 'sell' | 'send' | 'receive' | 'convert';
  asset: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  method: string;
};

export type CoinbaseWatchlistItem = {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  alertAbove: number;
  alertBelow: number;
  color: string;
};

export type CoinbaseNewsArticle = {
  id: string;
  title: string;
  source: string;
  summary: string;
  date: string;
  category: string;
  url: string;
};

export type CoinbasePriceAlert = {
  id: string;
  asset: string;
  symbol: string;
  condition: 'above' | 'below';
  target: number;
  current: number;
  status: 'active' | 'triggered' | 'expired';
  created: string;
  color: string;
};

export type CoinbaseCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  assetCount: number;
  marketCap: string;
};

export const COINBASE_DATA: Record<string, any> = {
  /* 1. Assets — 12+ cryptocurrencies */
  'coinbase.assets': [
    { id: 'btc', symbol: 'BTC', name: 'Bitcoin', price: 67234.50, change24h: 2.34, marketCap: '$1.32T', volume24h: '$28.4B', icon: '₿', color: '#f7931a' },
    { id: 'eth', symbol: 'ETH', name: 'Ethereum', price: 3456.78, change24h: 1.87, marketCap: '$415.2B', volume24h: '$15.7B', icon: 'Ξ', color: '#627eea' },
    { id: 'sol', symbol: 'SOL', name: 'Solana', price: 178.42, change24h: 5.12, marketCap: '$82.1B', volume24h: '$3.2B', icon: '◎', color: '#14f195' },
    { id: 'ada', symbol: 'ADA', name: 'Cardano', price: 0.5847, change24h: -1.23, marketCap: '$20.5B', volume24h: '$890M', icon: '₳', color: '#0033ad' },
    { id: 'dot', symbol: 'DOT', name: 'Polkadot', price: 7.89, change24h: 3.45, marketCap: '$10.8B', volume24h: '$245M', icon: '●', color: '#e6007a' },
    { id: 'doge', symbol: 'DOGE', name: 'Dogecoin', price: 0.1543, change24h: 8.76, marketCap: '$22.3B', volume24h: '$1.8B', icon: 'Ð', color: '#c2a633' },
    { id: 'avax', symbol: 'AVAX', name: 'Avalanche', price: 38.67, change24h: 4.21, marketCap: '$15.2B', volume24h: '$670M', icon: '▲', color: '#e84142' },
    { id: 'link', symbol: 'LINK', name: 'Chainlink', price: 17.23, change24h: -0.87, marketCap: '$10.1B', volume24h: '$420M', icon: '⬡', color: '#2a5ada' },
    { id: 'matic', symbol: 'MATIC', name: 'Polygon', price: 0.8923, change24h: 2.15, marketCap: '$8.7B', volume24h: '$340M', icon: '⬢', color: '#8247e5' },
    { id: 'shib', symbol: 'SHIB', name: 'Shiba Inu', price: 0.00002456, change24h: 12.43, marketCap: '$14.5B', volume24h: '$920M', icon: '🐕', color: '#f00' },
    { id: 'ltc', symbol: 'LTC', name: 'Litecoin', price: 84.56, change24h: 1.12, marketCap: '$6.3B', volume24h: '$410M', icon: 'Ł', color: '#345d9d' },
    { id: 'uni', symbol: 'UNI', name: 'Uniswap', price: 9.87, change24h: -2.34, marketCap: '$5.9B', volume24h: '$178M', icon: '🦄', color: '#ff007a' },
    { id: 'atom', symbol: 'ATOM', name: 'Cosmos', price: 8.45, change24h: 6.78, marketCap: '$3.3B', volume24h: '$125M', icon: '⚛', color: '#2e3148' },
  ] as CoinbaseAsset[],

  /* 2. Asset detail — single crypto with stats */
  'coinbase.asset.detail': {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67234.50,
    change24h: 2.34,
    change7d: 5.67,
    change30d: 12.34,
    marketCap: '$1.32T',
    volume24h: '$28.4B',
    circulatingSupply: '19.7M BTC',
    maxSupply: '21.0M BTC',
    allTimeHigh: 73750.07,
    allTimeLow: 67.81,
    description:
      'Bitcoin is the first decentralized cryptocurrency, created by an anonymous person or group known as Satoshi Nakamoto in 2009. It operates on a peer-to-peer network without the need for intermediaries, using blockchain technology to record transactions. Bitcoin has a fixed supply cap of 21 million coins, making it a deflationary asset often compared to digital gold.',
    icon: '₿',
    color: '#f7931a',
    rank: 1,
  } as CoinbaseAssetDetail,

  /* 2b. Asset stats — flat array for item templates */
  'coinbase.asset.stats': [
    { label: 'Market Cap', value: '$1.32T' },
    { label: '24h Volume', value: '$28.4B' },
    { label: 'Circulating Supply', value: '19.7M BTC' },
    { label: 'Max Supply', value: '21.0M BTC' },
    { label: 'All-Time High', value: '$73,750.07' },
    { label: 'All-Time Low', value: '$67.81' },
  ],

  /* 3. Portfolio — holdings */
  'coinbase.portfolio': {
    totalValue: 48523.67,
    totalCost: 38210.45,
    totalPnl: 10313.22,
    totalPnlPercent: 27.0,
    holdings: [
      { id: 'h1', symbol: 'BTC', name: 'Bitcoin', amount: 0.4521, avgCost: 52000, currentPrice: 67234.50, totalValue: 30403.12, pnl: 6877.32, pnlPercent: 29.3, color: '#f7931a' },
      { id: 'h2', symbol: 'ETH', name: 'Ethereum', amount: 3.2, avgCost: 2800, currentPrice: 3456.78, totalValue: 11061.70, pnl: 2101.70, pnlPercent: 23.5, color: '#627eea' },
      { id: 'h3', symbol: 'SOL', name: 'Solana', amount: 25, avgCost: 120, currentPrice: 178.42, totalValue: 4460.50, pnl: 1460.50, pnlPercent: 48.7, color: '#14f195' },
      { id: 'h4', symbol: 'ADA', name: 'Cardano', amount: 1500, avgCost: 0.45, currentPrice: 0.5847, totalValue: 877.05, pnl: 202.05, pnlPercent: 29.9, color: '#0033ad' },
      { id: 'h5', symbol: 'DOT', name: 'Polkadot', amount: 50, avgCost: 6.50, currentPrice: 7.89, totalValue: 394.50, pnl: 69.50, pnlPercent: 21.4, color: '#e6007a' },
      { id: 'h6', symbol: 'AVAX', name: 'Avalanche', amount: 8, avgCost: 35, currentPrice: 38.67, totalValue: 309.36, pnl: 29.36, pnlPercent: 10.5, color: '#e84142' },
      { id: 'h7', symbol: 'LINK', name: 'Chainlink', amount: 12, avgCost: 15, currentPrice: 17.23, totalValue: 206.76, pnl: 26.76, pnlPercent: 14.9, color: '#2a5ada' },
      { id: 'h8', symbol: 'MATIC', name: 'Polygon', amount: 300, avgCost: 0.75, currentPrice: 0.8923, totalValue: 267.69, pnl: 42.69, pnlPercent: 19.0, color: '#8247e5' },
    ] as CoinbaseHolding[],
  },

  /* 3b. Portfolio holdings — flat array extracted from portfolio for item templates */
  'coinbase.portfolio.holdings': [
    { id: 'h1', symbol: 'BTC', name: 'Bitcoin', amount: 0.4521, avgCost: 52000, currentPrice: 67234.50, totalValue: 30403.12, pnl: 6877.32, pnlPercent: 29.3, color: '#f7931a' },
    { id: 'h2', symbol: 'ETH', name: 'Ethereum', amount: 3.2, avgCost: 2800, currentPrice: 3456.78, totalValue: 11061.70, pnl: 2101.70, pnlPercent: 23.5, color: '#627eea' },
    { id: 'h3', symbol: 'SOL', name: 'Solana', amount: 25, avgCost: 120, currentPrice: 178.42, totalValue: 4460.50, pnl: 1460.50, pnlPercent: 48.7, color: '#14f195' },
    { id: 'h4', symbol: 'ADA', name: 'Cardano', amount: 1500, avgCost: 0.45, currentPrice: 0.5847, totalValue: 877.05, pnl: 202.05, pnlPercent: 29.9, color: '#0033ad' },
    { id: 'h5', symbol: 'DOT', name: 'Polkadot', amount: 50, avgCost: 6.50, currentPrice: 7.89, totalValue: 394.50, pnl: 69.50, pnlPercent: 21.4, color: '#e6007a' },
    { id: 'h6', symbol: 'AVAX', name: 'Avalanche', amount: 8, avgCost: 35, currentPrice: 38.67, totalValue: 309.36, pnl: 29.36, pnlPercent: 10.5, color: '#e84142' },
    { id: 'h7', symbol: 'LINK', name: 'Chainlink', amount: 12, avgCost: 15, currentPrice: 17.23, totalValue: 206.76, pnl: 26.76, pnlPercent: 14.9, color: '#2a5ada' },
    { id: 'h8', symbol: 'MATIC', name: 'Polygon', amount: 300, avgCost: 0.75, currentPrice: 0.8923, totalValue: 267.69, pnl: 42.69, pnlPercent: 19.0, color: '#8247e5' },
  ] as CoinbaseHolding[],

  /* 3c. Portfolio summary stats — flat array for item templates */
  'coinbase.portfolio.stats': [
    { label: 'Total Value', value: '$48,523.67' },
    { label: 'Total Cost', value: '$38,210.45' },
    { label: 'Total P&L', value: '+$10,313.22', badge: '+27.0%' },
    { label: 'Assets', value: '8' },
  ],

  /* 4. Transactions — 15+ transactions */
  'coinbase.transactions': [
    { id: 'tx1', type: 'buy', asset: 'BTC', amount: 0.05, price: 65000, total: 3250.00, date: '2024-12-15T10:30:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx2', type: 'buy', asset: 'ETH', amount: 0.8, price: 3200, total: 2560.00, date: '2024-12-14T14:22:00Z', status: 'completed', method: 'Debit Card' },
    { id: 'tx3', type: 'sell', asset: 'SOL', amount: 10, price: 170, total: 1700.00, date: '2024-12-13T09:15:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx4', type: 'receive', asset: 'BTC', amount: 0.02, price: 66000, total: 1320.00, date: '2024-12-12T18:45:00Z', status: 'completed', method: 'External Wallet' },
    { id: 'tx5', type: 'buy', asset: 'ADA', amount: 500, price: 0.52, total: 260.00, date: '2024-12-11T11:00:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx6', type: 'send', asset: 'ETH', amount: 0.5, price: 3300, total: 1650.00, date: '2024-12-10T16:30:00Z', status: 'completed', method: 'External Wallet' },
    { id: 'tx7', type: 'convert', asset: 'BTC → ETH', amount: 0.03, price: 65500, total: 1965.00, date: '2024-12-09T13:20:00Z', status: 'completed', method: 'Instant Convert' },
    { id: 'tx8', type: 'buy', asset: 'DOT', amount: 20, price: 7.20, total: 144.00, date: '2024-12-08T08:10:00Z', status: 'completed', method: 'Debit Card' },
    { id: 'tx9', type: 'sell', asset: 'AVAX', amount: 5, price: 36, total: 180.00, date: '2024-12-07T15:45:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx10', type: 'buy', asset: 'LINK', amount: 10, price: 16.50, total: 165.00, date: '2024-12-06T12:00:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx11', type: 'receive', asset: 'MATIC', amount: 100, price: 0.82, total: 82.00, date: '2024-12-05T19:30:00Z', status: 'completed', method: 'External Wallet' },
    { id: 'tx12', type: 'buy', asset: 'BTC', amount: 0.08, price: 64000, total: 5120.00, date: '2024-12-04T10:15:00Z', status: 'completed', method: 'Bank Transfer' },
    { id: 'tx13', type: 'buy', asset: 'ETH', amount: 1.2, price: 3100, total: 3720.00, date: '2024-12-03T14:50:00Z', status: 'completed', method: 'Debit Card' },
    { id: 'tx14', type: 'pending', asset: 'SOL', amount: 15, price: 175, total: 2625.00, date: '2024-12-16T11:00:00Z', status: 'pending', method: 'Bank Transfer' },
    { id: 'tx15', type: 'buy', asset: 'DOGE', amount: 1000, price: 0.14, total: 140.00, date: '2024-12-02T09:30:00Z', status: 'completed', method: 'Debit Card' },
    { id: 'tx16', type: 'send', asset: 'ADA', amount: 200, price: 0.55, total: 110.00, date: '2024-12-01T17:20:00Z', status: 'completed', method: 'External Wallet' },
  ] as CoinbaseTransaction[],

  /* 5. Watchlist — 10+ watched assets */
  'coinbase.watchlist': [
    { id: 'w1', symbol: 'BTC', name: 'Bitcoin', price: 67234.50, change24h: 2.34, alertAbove: 70000, alertBelow: 60000, color: '#f7931a' },
    { id: 'w2', symbol: 'ETH', name: 'Ethereum', price: 3456.78, change24h: 1.87, alertAbove: 4000, alertBelow: 3000, color: '#627eea' },
    { id: 'w3', symbol: 'SOL', name: 'Solana', price: 178.42, change24h: 5.12, alertAbove: 200, alertBelow: 150, color: '#14f195' },
    { id: 'w4', symbol: 'ADA', name: 'Cardano', price: 0.5847, change24h: -1.23, alertAbove: 0.70, alertBelow: 0.50, color: '#0033ad' },
    { id: 'w5', symbol: 'DOT', name: 'Polkadot', price: 7.89, change24h: 3.45, alertAbove: 10, alertBelow: 6, color: '#e6007a' },
    { id: 'w6', symbol: 'AVAX', name: 'Avalanche', price: 38.67, change24h: 4.21, alertAbove: 50, alertBelow: 30, color: '#e84142' },
    { id: 'w7', symbol: 'LINK', name: 'Chainlink', price: 17.23, change24h: -0.87, alertAbove: 25, alertBelow: 14, color: '#2a5ada' },
    { id: 'w8', symbol: 'MATIC', name: 'Polygon', price: 0.8923, change24h: 2.15, alertAbove: 1.20, alertBelow: 0.75, color: '#8247e5' },
    { id: 'w9', symbol: 'ATOM', name: 'Cosmos', price: 8.45, change24h: 6.78, alertAbove: 12, alertBelow: 7, color: '#2e3148' },
    { id: 'w10', symbol: 'DOGE', name: 'Dogecoin', price: 0.1543, change24h: 8.76, alertAbove: 0.20, alertBelow: 0.12, color: '#c2a633' },
  ] as CoinbaseWatchlistItem[],

  /* 6. News — 10+ news articles */
  'coinbase.news': [
    { id: 'n1', title: 'Bitcoin Surges Past $67K as ETF Inflows Hit Record High', source: 'Coinbase News', summary: 'Spot Bitcoin ETFs saw record weekly inflows of $2.4B, driving BTC to a new monthly high.', date: '2024-12-15', category: 'Market', url: '#' },
    { id: 'n2', title: 'Ethereum Pectra Upgrade Testnet Launch Scheduled for January', source: 'Ethereum Foundation', summary: 'The next major Ethereum upgrade includes account abstraction improvements and increased blob capacity.', date: '2024-12-14', category: 'Protocol', url: '#' },
    { id: 'n3', title: 'Solana DeFi TVL Crosses $8B Amid Meme Coin Frenzy', source: 'DeFi Llama', summary: 'Solana ecosystem growth accelerates as DEX volume on the network surpasses Ethereum for the second week.', date: '2024-12-13', category: 'DeFi', url: '#' },
    { id: 'n4', title: 'SEC Approves First Spot Ethereum ETF Options Trading', source: 'Bloomberg', summary: 'The regulatory green light opens new hedging strategies for institutional Ethereum investors.', date: '2024-12-12', category: 'Regulation', url: '#' },
    { id: 'n5', title: 'Cardano Founder Outlines 2025 Roadmap with Hydra Scaling Focus', source: 'IOG', summary: 'Input Output Global reveals plans for full Hydra deployment and improved smart contract tooling.', date: '2024-12-11', category: 'Protocol', url: '#' },
    { id: 'n6', title: 'Polkadot 2.0 Agile Coretime Goes Live on Mainnet', source: 'Polkadot', summary: 'The new block-space allocation model replaces auction-based parachain slots with flexible coretime.', date: '2024-12-10', category: 'Protocol', url: '#' },
    { id: 'n7', title: 'Dogecoin Rallies 12% After Elon Musk Mentions X Payments Integration', source: 'Reuters', summary: 'DOGE led altcoin gains after renewed speculation about potential integration with the X platform.', date: '2024-12-09', category: 'Market', url: '#' },
    { id: 'n8', title: 'Avalanche Foundation Announces $50M Retroactive Funding Program', source: 'Ava Labs', summary: 'The program rewards protocols and builders that contributed to Avalanche ecosystem growth in 2024.', date: '2024-12-08', category: 'Ecosystem', url: '#' },
    { id: 'n9', title: 'Chainlink CCIP Integrates with Three Major Traditional Banks', source: 'Chainlink', summary: 'Cross-chain interoperability protocol enables tokenized asset settlement between banking ledgers.', date: '2024-12-07', category: 'Institutional', url: '#' },
    { id: 'n10', title: 'Coinbase Reports Record Q4 Revenue Driven by Institutional Trading', source: 'Coinbase', summary: 'Quarterly revenue exceeded $1.2B with institutional volume up 38% quarter-over-quarter.', date: '2024-12-06', category: 'Business', url: '#' },
  ] as CoinbaseNewsArticle[],

  /* 7. Price alerts — 8+ alerts */
  'coinbase.price.alerts': [
    { id: 'pa1', asset: 'Bitcoin', symbol: 'BTC', condition: 'above', target: 70000, current: 67234.50, status: 'active', created: '2024-12-10', color: '#f7931a' },
    { id: 'pa2', asset: 'Ethereum', symbol: 'ETH', condition: 'above', target: 4000, current: 3456.78, status: 'active', created: '2024-12-08', color: '#627eea' },
    { id: 'pa3', asset: 'Solana', symbol: 'SOL', condition: 'below', target: 150, current: 178.42, status: 'active', created: '2024-12-12', color: '#14f195' },
    { id: 'pa4', asset: 'Cardano', symbol: 'ADA', condition: 'above', target: 0.70, current: 0.5847, status: 'active', created: '2024-12-05', color: '#0033ad' },
    { id: 'pa5', asset: 'Dogecoin', symbol: 'DOGE', condition: 'above', target: 0.15, current: 0.1543, status: 'triggered', created: '2024-12-01', color: '#c2a633' },
    { id: 'pa6', asset: 'Polkadot', symbol: 'DOT', condition: 'below', target: 6.50, current: 7.89, status: 'active', created: '2024-12-09', color: '#e6007a' },
    { id: 'pa7', asset: 'Avalanche', symbol: 'AVAX', condition: 'above', target: 45, current: 38.67, status: 'active', created: '2024-12-07', color: '#e84142' },
    { id: 'pa8', asset: 'Chainlink', symbol: 'LINK', condition: 'below', target: 14, current: 17.23, status: 'active', created: '2024-12-03', color: '#2a5ada' },
  ] as CoinbasePriceAlert[],

  /* 8. Categories — crypto categories */
  'coinbase.categories': [
    { id: 'cat1', name: 'Layer 1', description: 'Base blockchain protocols', icon: 'Blocks', assetCount: 24, marketCap: '$1.8T' },
    { id: 'cat2', name: 'Layer 2', description: 'Scaling solutions built on Layer 1', icon: 'Layers', assetCount: 18, marketCap: '$45.2B' },
    { id: 'cat3', name: 'DeFi', description: 'Decentralized finance protocols', icon: 'Bank', assetCount: 156, marketCap: '$82.3B' },
    { id: 'cat4', name: 'Meme Coins', description: 'Community-driven tokens', icon: 'Laugh', assetCount: 89, marketCap: '$38.7B' },
    { id: 'cat5', name: 'Stablecoins', description: 'Pegged to fiat currencies', icon: 'Anchor', assetCount: 12, marketCap: '$190.5B' },
    { id: 'cat6', name: 'Gaming', description: 'Blockchain gaming and metaverse', icon: 'Gamepad2', assetCount: 67, marketCap: '$15.4B' },
    { id: 'cat7', name: 'AI & Big Data', description: 'Artificial intelligence tokens', icon: 'Cpu', assetCount: 34, marketCap: '$22.1B' },
    { id: 'cat8', name: 'Governance', description: 'DAO and protocol governance tokens', icon: 'Vote', assetCount: 78, marketCap: '$18.9B' },
  ] as CoinbaseCategory[],
};
