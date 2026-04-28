
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CryptoCard from '@/components/CryptoCard';
import BitcoinAnimation from '@/components/BitcoinAnimation';
import TokenSwap from '@/components/TokenSwap';
import { fetchCryptoPrices } from '@/services/CryptoService';
import { useToast } from '@/components/ui/use-toast';

export default function HomePage() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const { toast } = useToast();

  const loadPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCryptoPrices();
      setCryptos(data);
      setLastUpdate(new Date());
      
      toast({
        title: "Prices Updated",
        description: "Successfully fetched latest cryptocurrency prices"
      });
    } catch (err) {
      setError('Failed to fetch cryptocurrency prices. Please try again.');
      toast({
        title: "Error",
        description: "Failed to fetch prices from CoinGecko API",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrices();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadPrices();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Smart Chain Society - Live Cryptocurrency Prices</title>
        <meta name="description" content="Track real-time cryptocurrency prices for Bitcoin, Ethereum, Solana, and more. Live market data updated every 30 seconds." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section with Bitcoin Animation */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20 px-4">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          
          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Bitcoin 3D Animation */}
              <div className="flex justify-center mb-8">
                <BitcoinAnimation />
              </div>

              <div className="flex items-center justify-center space-x-2 mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Live Cryptocurrency Prices
                </h1>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Real-time market data for the world's leading cryptocurrencies. 
                Updated automatically every 30 seconds via CoinGecko API.
              </p>
              
              {lastUpdate && (
                <p className="text-sm text-gray-400">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </p>
              )}

              <div className="flex items-center justify-center space-x-4 mt-8">
                <Button 
                  onClick={loadPrices} 
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Refresh Prices
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Price Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {loading && cryptos.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-muted rounded-xl" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 bg-muted rounded w-16" />
                            <div className="h-3 bg-muted rounded w-24" />
                          </div>
                        </div>
                        <div className="h-8 bg-muted rounded w-32" />
                        <div className="h-6 bg-muted rounded w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Card className="max-w-md mx-auto border-destructive/50">
                  <CardContent className="p-8">
                    <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Error Loading Prices</h3>
                    <p className="text-sm text-muted-foreground mb-4">{error}</p>
                    <Button onClick={loadPrices} variant="outline">
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {cryptos.map((crypto, index) => (
                  <CryptoCard key={crypto.id} crypto={crypto} index={index} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Token Swap Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Token Swap</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Exchange cryptocurrencies seamlessly with our token swap interface
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TokenSwap />
            </motion.div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold">Real-Time Market Data</h2>
              <p className="text-muted-foreground">
                Our cryptocurrency tracker provides live price updates for major digital assets including 
                Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Tether (USDT), Ripple (XRP), Cardano (ADA), 
                Dogecoin (DOGE), and Polygon (MATIC). Data is sourced from CoinGecko's reliable API and 
                automatically refreshes every 30 seconds to ensure you have the most current information.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <RefreshCw className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Auto-Refresh</h3>
                    <p className="text-sm text-muted-foreground">
                      Prices update automatically every 30 seconds
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">24h Changes</h3>
                    <p className="text-sm text-muted-foreground">
                      Track daily price movements and trends
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">Market Cap</h3>
                    <p className="text-sm text-muted-foreground">
                      View total market capitalization data
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
