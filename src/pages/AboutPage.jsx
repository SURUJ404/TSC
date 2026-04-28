
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Zap, Globe, ArrowRight, Coins, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  const features = [
    {
      icon: Building2,
      title: "Real World Asset Tokenization",
      description: "Transform physical assets into digital tokens on the blockchain, enabling fractional ownership and increased liquidity for real estate, commodities, and more."
    },
    {
      icon: Coins,
      title: "NFT Marketplace",
      description: "Trade unique digital assets in our secure NFT marketplace. Discover, buy, and sell NFTs representing art, collectibles, and tokenized real-world assets."
    },
    {
      icon: Shield,
      title: "Secure & Transparent",
      description: "Built on blockchain technology, ensuring every transaction is secure, transparent, and immutable. Your assets are protected with industry-leading security."
    },
    {
      icon: Zap,
      title: "Fast Transactions",
      description: "Experience lightning-fast transaction speeds with low fees, making asset trading and tokenization accessible and efficient for everyone."
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access tokenized assets and NFTs from anywhere in the world. Our platform operates 24/7, breaking down geographical barriers to investment."
    },
    {
      icon: TrendingUp,
      title: "Growth Potential",
      description: "Participate in the future of finance. Tokenized assets and NFTs represent a rapidly growing market with immense potential for investors and creators."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Smart Chain Society - RWA Tokenization & NFT Marketplace</title>
        <meta name="description" content="Learn about Smart Chain Society's mission to revolutionize asset ownership through Real World Asset tokenization and our secure NFT marketplace platform." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[500px] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1684217875364-35ed8311d463)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/95" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                About Smart Chain Society
              </h1>
              <p className="text-2xl text-gray-200 max-w-3xl mx-auto font-semibold">
                Tokenization of Real World Assets, NFTs Marketplace
              </p>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Empowering the future of digital asset ownership through blockchain technology
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <h2 className="text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Smart Chain Society is pioneering the transformation of traditional asset ownership through blockchain technology. 
                We provide a comprehensive platform for tokenizing real-world assets (RWA) and trading NFTs, making investment 
                opportunities accessible to everyone while maintaining the highest standards of security and transparency.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our vision is to democratize access to valuable assets by breaking them down into fractional ownership through 
                tokenization, while simultaneously fostering a vibrant NFT marketplace where digital and physical assets converge.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the innovative features that make Smart Chain Society the future of digital asset management
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover-lift">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* RWA Tokenization Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-4xl font-bold">Real World Asset Tokenization</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Transform physical assets into digital tokens on the blockchain. Our RWA tokenization platform enables 
                  fractional ownership of real estate, commodities, precious metals, and other valuable assets.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Fractional ownership makes high-value assets accessible</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Increased liquidity for traditionally illiquid assets</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">Transparent ownership records on the blockchain</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                  <Building2 className="w-32 h-32 text-primary" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* NFT Marketplace Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative order-2 md:order-1"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center">
                  <Coins className="w-32 h-32 text-secondary" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6 order-1 md:order-2"
              >
                <h2 className="text-4xl font-bold">NFT Marketplace</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Discover, create, and trade unique digital assets in our secure NFT marketplace. From digital art to 
                  tokenized real-world assets, our platform supports a wide range of NFT collections.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-muted-foreground">Secure trading with blockchain verification</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-muted-foreground">Support for multiple NFT standards and collections</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    <span className="text-muted-foreground">Creator royalties and transparent transaction history</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-8 p-12 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl border border-border"
            >
              <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join Smart Chain Society today and be part of the future of digital asset ownership. 
                Have questions? We're here to help.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
