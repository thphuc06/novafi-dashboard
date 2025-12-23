// Mock data for cryptocurrency dashboard
// Structured for easy swap to CoinGecko API later

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  sparklineData: number[];
  rank: number;
}

export interface PortfolioHolding {
  asset: CryptoAsset;
  amount: number;
  value: number;
  allocation: number;
}

// Generate realistic sparkline data
const generateSparkline = (basePrice: number, volatility: number = 0.05): number[] => {
  const points = 24;
  const data: number[] = [];
  let price = basePrice * (1 - volatility * 2);
  
  for (let i = 0; i < points; i++) {
    const change = (Math.random() - 0.5) * volatility * basePrice;
    price = Math.max(price + change, basePrice * 0.8);
    data.push(price);
  }
  
  // End near current price
  data[data.length - 1] = basePrice;
  return data;
};

export const cryptoAssets: CryptoAsset[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    currentPrice: 67234.52,
    priceChange24h: 1523.45,
    priceChangePercentage24h: 2.32,
    marketCap: 1324567890123,
    volume24h: 28765432109,
    sparklineData: generateSparkline(67234.52, 0.03),
    rank: 1,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    currentPrice: 3456.78,
    priceChange24h: -45.23,
    priceChangePercentage24h: -1.29,
    marketCap: 415678901234,
    volume24h: 15678901234,
    sparklineData: generateSparkline(3456.78, 0.04),
    rank: 2,
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    currentPrice: 178.45,
    priceChange24h: 12.34,
    priceChangePercentage24h: 7.42,
    marketCap: 78901234567,
    volume24h: 3456789012,
    sparklineData: generateSparkline(178.45, 0.08),
    rank: 5,
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
    currentPrice: 0.6234,
    priceChange24h: 0.0234,
    priceChangePercentage24h: 3.91,
    marketCap: 21890123456,
    volume24h: 567890123,
    sparklineData: generateSparkline(0.6234, 0.06),
    rank: 8,
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    image: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
    currentPrice: 42.67,
    priceChange24h: -2.15,
    priceChangePercentage24h: -4.80,
    marketCap: 16789012345,
    volume24h: 456789012,
    sparklineData: generateSparkline(42.67, 0.07),
    rank: 9,
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    image: "https://assets.coingecko.com/coins/images/12171/large/polkadot.png",
    currentPrice: 8.92,
    priceChange24h: 0.34,
    priceChangePercentage24h: 3.96,
    marketCap: 12345678901,
    volume24h: 345678901,
    sparklineData: generateSparkline(8.92, 0.05),
    rank: 12,
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    image: "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png",
    currentPrice: 18.45,
    priceChange24h: 1.23,
    priceChangePercentage24h: 7.14,
    marketCap: 10987654321,
    volume24h: 567890123,
    sparklineData: generateSparkline(18.45, 0.06),
    rank: 14,
  },
  {
    id: "arbitrum",
    symbol: "ARB",
    name: "Arbitrum",
    image: "https://assets.coingecko.com/coins/images/16547/large/arb.png",
    currentPrice: 1.23,
    priceChange24h: 0.08,
    priceChangePercentage24h: 6.96,
    marketCap: 4567890123,
    volume24h: 234567890,
    sparklineData: generateSparkline(1.23, 0.09),
    rank: 35,
  },
];

export const portfolioHoldings: PortfolioHolding[] = [
  {
    asset: cryptoAssets[0], // BTC
    amount: 1.5,
    value: 100851.78,
    allocation: 45,
  },
  {
    asset: cryptoAssets[1], // ETH
    amount: 15.2,
    value: 52543.06,
    allocation: 23.5,
  },
  {
    asset: cryptoAssets[2], // SOL
    amount: 120,
    value: 21414.00,
    allocation: 9.5,
  },
  {
    asset: cryptoAssets[6], // LINK
    amount: 500,
    value: 9225.00,
    allocation: 4.1,
  },
];

export const trendingCoin = cryptoAssets[2]; // SOL as hot coin

export const portfolioStats = {
  totalBalance: 224033.84,
  change24h: 5621.45,
  changePercentage24h: 2.57,
  allTimeHigh: 245678.90,
  allTimeLow: 89234.56,
};

// Historical portfolio data for chart
export const portfolioHistory = [
  { date: "Jan", value: 180000 },
  { date: "Feb", value: 195000 },
  { date: "Mar", value: 175000 },
  { date: "Apr", value: 210000 },
  { date: "May", value: 198000 },
  { date: "Jun", value: 224033 },
];

// Ticker data for marquee
export const tickerData = cryptoAssets.map(asset => ({
  symbol: asset.symbol,
  price: asset.currentPrice,
  change: asset.priceChangePercentage24h,
}));
