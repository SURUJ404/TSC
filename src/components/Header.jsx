
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white p-1 shadow-md flex-shrink-0">
                <img 
                  src="https://horizons-cdn.hostinger.com/c4a66682-d2cb-4ef5-8b15-4e543be56e39/382c23e229d710e7b6e8d91e3479d709.jpg" 
                  alt="TSC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hidden sm:inline">
                Smart Chain Society
              </span>
            </motion.div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-3">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch 
              checked={theme === 'dark'} 
              onCheckedChange={toggleTheme}
              className="data-[state=checked]:bg-primary"
            />
            <Moon className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4 flex items-center space-x-6">
          <Link 
            to="/" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
