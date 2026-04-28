
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Twitter, Github, Mail, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Chain Society
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time cryptocurrency price tracking powered by CoinGecko API. Stay updated with the latest market data.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-sm font-semibold text-foreground">Quick Links</span>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="space-y-4">
            <span className="text-sm font-semibold text-foreground">Important Notice</span>
            <div className="flex items-start space-x-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Cryptocurrency prices are provided in real-time via CoinGecko API. Prices update automatically every 30 seconds. This is for informational purposes only and should not be considered financial advice.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Smart Chain Society. All rights reserved. Powered by CoinGecko API.
          </p>
        </div>
      </div>
    </footer>
  );
}
