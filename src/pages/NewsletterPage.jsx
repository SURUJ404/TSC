import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Mail, CheckCircle, Calendar, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { subscribeToNewsletter, newsletters } = useNews();
  const { toast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    // Check if already subscribed
    const existingSubscription = newsletters.find(sub => sub.email === email);
    if (existingSubscription) {
      toast({
        title: "You're already subscribed!",
        description: "Thank you for being a loyal reader."
      });
      return;
    }

    subscribeToNewsletter(email);
    setIsSubscribed(true);
    setEmail('');
    
    toast({
      title: "Successfully subscribed!",
      description: "Welcome to the TechPulse community."
    });
  };

  const stats = [
    {
      icon: Users,
      label: 'Subscribers',
      value: '25,000+',
      description: 'Tech enthusiasts worldwide'
    },
    {
      icon: Calendar,
      label: 'Weekly Issues',
      value: '52',
      description: 'Delivered every week'
    },
    {
      icon: TrendingUp,
      label: 'Open Rate',
      value: '68%',
      description: 'Above industry average'
    }
  ];

  const features = [
    {
      title: 'Weekly Tech Roundup',
      description: 'Get the most important tech news and trends delivered to your inbox every week.'
    },
    {
      title: 'Exclusive Insights',
      description: 'Access to exclusive interviews, analysis, and behind-the-scenes content.'
    },
    {
      title: 'Startup Spotlight',
      description: 'Discover promising startups and emerging technologies before they go mainstream.'
    },
    {
      title: 'Investment Updates',
      description: 'Stay informed about the latest funding rounds, acquisitions, and market movements.'
    }
  ];

  const sampleIssues = [
    {
      title: 'The AI Revolution: What\'s Next?',
      date: 'January 15, 2024',
      description: 'Exploring the latest breakthroughs in artificial intelligence and their impact on various industries.'
    },
    {
      title: 'Startup Funding Trends 2024',
      date: 'January 8, 2024',
      description: 'Analysis of venture capital trends and what they mean for entrepreneurs and investors.'
    },
    {
      title: 'Cybersecurity in the Cloud Era',
      date: 'January 1, 2024',
      description: 'How companies are adapting their security strategies for cloud-first environments.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Newsletter - TechPulse</title>
        <meta name="description" content="Subscribe to TechPulse newsletter for weekly tech insights, startup stories, and industry analysis delivered to your inbox." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Stay Ahead with TechPulse
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join thousands of tech professionals who rely on our weekly newsletter 
                for the latest insights, trends, and opportunities in technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Subscription Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-effect border-0">
                <CardContent className="p-8">
                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-6">
                      <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
                        <p className="text-muted-foreground">
                          Get weekly tech insights delivered straight to your inbox. No spam, unsubscribe anytime.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                          required
                        />
                        <Button type="submit" size="lg" className="electric-blue-bg hover:bg-blue-600">
                          Subscribe
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        By subscribing, you agree to receive our weekly newsletter. 
                        You can unsubscribe at any time.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center space-y-4">
                      <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
                      <h2 className="text-2xl font-bold">Welcome to TechPulse!</h2>
                      <p className="text-muted-foreground">
                        Thank you for subscribing. You'll receive your first newsletter soon.
                      </p>
                      <Button 
                        onClick={() => setIsSubscribed(false)}
                        variant="outline"
                      >
                        Subscribe Another Email
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Join Our Growing Community</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="text-center hover-lift">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-3xl font-bold mb-2">{stat.value}</div>
                        <div className="font-semibold mb-1">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">{stat.description}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sample Issues */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Recent Issues</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {sampleIssues.map((issue, index) => (
                  <motion.div
                    key={issue.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
                            <p className="text-muted-foreground mb-3">{issue.description}</p>
                            <div className="text-sm text-muted-foreground">{issue.date}</div>
                          </div>
                          <Button variant="outline" size="sm">
                            Read Archive
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}