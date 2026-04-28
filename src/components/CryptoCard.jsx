
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Coins, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, formatMarketCap, formatChange } from '@/services/CryptoService';

export default function CryptoCard({ crypto, index }) {
  // Safely check if data is valid
  const hasValidPrice = crypto.price !== null && crypto.price !== undefined;
  const hasValidChange = crypto.change24h !== null && crypto.change24h !== undefined;
  const hasValidMarketCap = crypto.marketCap !== null && crypto.marketCap !== undefined;
  
  const isPositive = hasValidChange && crypto.change24h >= 0;

  // Format values with validation
  const formattedPrice = formatPrice(crypto.price);
  const formattedChange = formatChange(crypto.change24h);
  const formattedMarketCap = formatMarketCap(crypto.marketCap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden group cursor-pointer border-border/50 hover:border-primary/50 transition-all">
        <div className={`absolute inset-0 bg-gradient-to-br ${crypto.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
        
        <CardHeader className="relative pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${crypto.color} flex items-center justify-center shadow-lg`}>
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">{crypto.symbol}</CardTitle>
                <p className="text-sm text-muted-foreground">{crypto.name}</p>
              </div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {!hasValidChange ? (
                <AlertCircle className="w-5 h-5 text-muted-foreground" />
              ) : isPositive ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="relative space-y-3">
          <div>
            <p className={`text-2xl font-bold ${hasValidPrice ? 'text-foreground' : 'text-muted-foreground'}`}>
              {formattedPrice}
            </p>
          </div>

          <div className="flex items-center justify-between">
            {hasValidChange ? (
              <Badge 
                variant="secondary" 
                className={`${
                  isPositive 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                } font-semibold`}
              >
                {formattedChange}
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-muted/50 text-muted-foreground font-semibold">
                N/A
              </Badge>
            )}
            <p className="text-xs text-muted-foreground">24h</p>
          </div>

          <div className="pt-2 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Market Cap</span>
              <span className={`text-xs font-medium ${hasValidMarketCap ? '' : 'text-muted-foreground'}`}>
                {formattedMarketCap}
              </span>
            </div>
          </div>
        </CardContent>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          layoutId={`glow-${crypto.id}`}
        />
      </Card>
    </motion.div>
  );
}
