
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Helmet>
              <title>Smart Chain Society - Live Cryptocurrency Prices</title>
              <meta name="description" content="Track real-time cryptocurrency prices for Bitcoin, Ethereum, Solana, and more. Live market data updated every 30 seconds." />
              <meta name="keywords" content="cryptocurrency, bitcoin, ethereum, crypto prices, live prices, crypto tracker" />
              <meta property="og:title" content="Smart Chain Society - Live Cryptocurrency Prices" />
              <meta property="og:description" content="Real-time cryptocurrency price tracking powered by CoinGecko API" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
