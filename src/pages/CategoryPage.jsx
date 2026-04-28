import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { TrendingUp, Users, Shield, Brain, Smartphone, Calendar, BookOpen, Zap } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';

const CATEGORY_INFO = {
  latest: {
    title: 'Latest News',
    description: 'Stay up-to-date with the most recent developments in technology',
    icon: Zap,
    color: 'from-gray-500 to-slate-600'
  },
  startups: {
    title: 'Startups',
    description: 'Discover emerging companies and entrepreneurial stories',
    icon: Users,
    color: 'from-green-500 to-emerald-600'
  },
  venture: {
    title: 'Venture Capital',
    description: 'Investment news, funding rounds, and market analysis',
    icon: TrendingUp,
    color: 'from-blue-500 to-cyan-600'
  },
  security: {
    title: 'Cybersecurity',
    description: 'Security threats, vulnerabilities, and protection strategies',
    icon: Shield,
    color: 'from-red-500 to-rose-600'
  },
  ai: {
    title: 'Artificial Intelligence',
    description: 'AI breakthroughs, machine learning, and future technologies',
    icon: Brain,
    color: 'from-purple-500 to-violet-600'
  },
  apps: {
    title: 'Apps & Software',
    description: 'Mobile apps, software reviews, and digital tools',
    icon: Smartphone,
    color: 'from-orange-500 to-amber-600'
  },
  events: {
    title: 'Tech Events',
    description: 'Conferences, webinars, and industry gatherings',
    icon: Calendar,
    color: 'from-pink-500 to-rose-600'
  },
  courses: {
    title: 'Learning & Courses',
    description: 'Educational resources and skill development',
    icon: BookOpen,
    color: 'from-indigo-500 to-blue-600'
  }
};

export default function CategoryPage() {
  const { category } = useParams();
  const { getArticlesByCategory, getLatestArticles } = useNews();
  const { toast } = useToast();
  
  const categoryInfo = CATEGORY_INFO[category];

  // Handle courses category - moved before early return
  React.useEffect(() => {
    if (category === 'courses') {
      toast({
        title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
      });
    }
  }, [category, toast]);
  
  if (!categoryInfo) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
        <p className="text-muted-foreground">The requested category does not exist.</p>
      </div>
    );
  }

  const articles = category === 'latest' 
    ? getLatestArticles(20) 
    : getArticlesByCategory(category);
  
  const Icon = categoryInfo.icon;

  return (
    <>
      <Helmet>
        <title>{categoryInfo.title} - TechPulse</title>
        <meta name="description" content={categoryInfo.description} />
      </Helmet>

      <div className="min-h-screen">
        {/* Category Header */}
        <section className={`py-20 px-4 bg-gradient-to-r ${categoryInfo.color}`}>
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                {categoryInfo.title}
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                {categoryInfo.description}
              </p>
              <div className="text-white/80">
                {articles.length} {articles.length === 1 ? 'article' : 'articles'} available
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <Icon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Articles Yet</h2>
                <p className="text-muted-foreground">
                  We're working on bringing you the latest {categoryInfo.title.toLowerCase()} content. 
                  Check back soon!
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}