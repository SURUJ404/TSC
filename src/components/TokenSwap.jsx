
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export default function TokenSwap() {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const tokens = ['BTC', 'ETH', 'SOL', 'USDT', 'XRP', 'ADA', 'DOGE', 'MATIC'];

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "🚧 Swap Feature Coming Soon",
      description: "Token swap functionality isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  return (
    <Card className="w-full max-w-md mx-auto hover-lift">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Token Swap</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* From Token */}
        <div className="space-y-2">
          <Label htmlFor="from-token" className="text-sm font-medium">From</Label>
          <div className="relative">
            <Input
              id="from-amount"
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-24 text-lg h-14 text-foreground"
              min="0"
              step="0.0001"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button className="flex items-center space-x-1 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                <span className="font-semibold">{fromToken}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={switchTokens}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-colors"
          >
            <ArrowDownUp className="w-5 h-5 text-primary-foreground" />
          </motion.button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <Label htmlFor="to-token" className="text-sm font-medium">To</Label>
          <div className="relative">
            <Input
              id="to-amount"
              type="number"
              placeholder="0.0"
              readOnly
              className="pr-24 text-lg h-14 bg-muted/50 text-foreground"
              value=""
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button className="flex items-center space-x-1 px-3 py-1.5 bg-muted hover:bg-muted/80 rounded-lg transition-colors">
                <span className="font-semibold">{toToken}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Exchange Rate</span>
            <span className="font-medium">--</span>
          </div>
        </div>

        {/* Swap Button */}
        <Button 
          onClick={handleSwap}
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          Swap Tokens
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          Token swap interface ready for backend integration
        </p>
      </CardContent>
    </Card>
  );
}
