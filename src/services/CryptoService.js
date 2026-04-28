
const COINGECKO_API = 'https://api.coingecko.com/api/v3';

const CRYPTO_MAP = {
  solana: { symbol: 'SOL', name: 'Solana', color: 'from-purple-500 to-pink-500' },
  ethereum: { symbol: 'ETH', name: 'Ethereum', color: 'from-blue-500 to-purple-500' },
  tether: { symbol: 'USDT', name: 'Tether', color: 'from-green-500 to-emerald-500' },
  bitcoin: { symbol: 'BTC', name: 'Bitcoin', color: 'from-orange-500 to-yellow-500' },
  ripple: { symbol: 'XRP', name: 'Ripple', color: 'from-blue-400 to-cyan-400' },
  cardano: { symbol: 'ADA', name: 'Cardano', color: 'from-blue-600 to-indigo-600' },
  dogecoin: { symbol: 'DOGE', name: 'Dogecoin', color: 'from-yellow-400 to-orange-400' },
  'matic-network': { symbol: 'MATIC', name: 'Polygon', color: 'from-purple-600 to-violet-600' }
};

export async function fetchCryptoPrices() {
  try {
    const ids = Object.keys(CRYPTO_MAP).join(',');
    const response = await fetch(
      `${COINGECKO_API}/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Parse and validate the API response
    return Object.entries(data).map(([id, values]) => {
      // Validate that required data exists
      if (!values || typeof values !== 'object') {
        console.warn(`Invalid data for ${id}:`, values);
        return null;
      }

      // Extract values with fallbacks
      const price = values.usd ?? null;
      const change24h = values.usd_24h_change ?? null;
      const marketCap = values.usd_market_cap ?? null;

      // Log missing data for debugging
      if (price === null) {
        console.warn(`Missing price data for ${id}`);
      }
      if (change24h === null) {
        console.warn(`Missing 24h change data for ${id}`);
      }
      if (marketCap === null) {
        console.warn(`Missing market cap data for ${id}`);
      }

      return {
        id,
        symbol: CRYPTO_MAP[id].symbol,
        name: CRYPTO_MAP[id].name,
        color: CRYPTO_MAP[id].color,
        price: price,
        change24h: change24h,
        marketCap: marketCap
      };
    }).filter(crypto => crypto !== null); // Remove any null entries
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
}

export function formatPrice(price) {
  // Validate input
  if (price === null || price === undefined) {
    return 'N/A';
  }

  // Convert to number if it's a string
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  // Check if valid number
  if (typeof numPrice !== 'number' || isNaN(numPrice) || !isFinite(numPrice)) {
    return 'N/A';
  }

  // Format based on value
  if (numPrice >= 1) {
    return `$${numPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  
  if (numPrice > 0) {
    return `$${numPrice.toFixed(6)}`;
  }

  return '$0.00';
}

export function formatMarketCap(marketCap) {
  // Validate input
  if (marketCap === null || marketCap === undefined) {
    return 'N/A';
  }

  // Convert to number if it's a string
  const numMarketCap = typeof marketCap === 'string' ? parseFloat(marketCap) : marketCap;

  // Check if valid number
  if (typeof numMarketCap !== 'number' || isNaN(numMarketCap) || !isFinite(numMarketCap)) {
    return 'N/A';
  }

  if (numMarketCap >= 1e12) {
    return `$${(numMarketCap / 1e12).toFixed(2)}T`;
  }
  if (numMarketCap >= 1e9) {
    return `$${(numMarketCap / 1e9).toFixed(2)}B`;
  }
  if (numMarketCap >= 1e6) {
    return `$${(numMarketCap / 1e6).toFixed(2)}M`;
  }
  if (numMarketCap > 0) {
    return `$${numMarketCap.toLocaleString()}`;
  }

  return '$0';
}

export function formatChange(change) {
  // Validate input
  if (change === null || change === undefined) {
    return 'N/A';
  }

  // Convert to number if it's a string
  const numChange = typeof change === 'string' ? parseFloat(change) : change;

  // Check if valid number
  if (typeof numChange !== 'number' || isNaN(numChange) || !isFinite(numChange)) {
    return 'N/A';
  }

  const formatted = Math.abs(numChange).toFixed(2);
  return numChange >= 0 ? `+${formatted}%` : `-${formatted}%`;
}
