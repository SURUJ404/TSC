import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ArticleCard({ article, featured = false }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      ai: 'bg-purple-500',
      startups: 'bg-green-500',
      security: 'bg-red-500',
      venture: 'bg-blue-500',
      apps: 'bg-orange-500',
      events: 'bg-pink-500',
      latest: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (featured) {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className="group"
      >
        <Card className="overflow-hidden hover-lift glass-effect border-0">
          <div className="relative">
            <img  
              alt={article.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
             src="https://images.unsplash.com/photo-1677694031058-95963b42a0b7" />
            <div className="absolute top-4 left-4">
              <Badge className={`${getCategoryColor(article.category)} text-white border-0`}>
                {article.category.toUpperCase()}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Link to={`/article/${article.id}`}>
                <h2 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
              </Link>
              <p className="text-muted-foreground line-clamp-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} min read</span>
                  </div>
                </div>
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <Link 
                to={`/article/${article.id}`}
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="overflow-hidden hover-lift">
        <div className="relative">
          <img  
            alt={article.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
           src="https://images.unsplash.com/photo-1677694031058-95963b42a0b7" />
          <div className="absolute top-3 left-3">
            <Badge className={`${getCategoryColor(article.category)} text-white border-0 text-xs`}>
              {article.category.toUpperCase()}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <Link to={`/article/${article.id}`}>
              <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>{article.author}</span>
                <span>•</span>
                <span>{article.readTime} min</span>
              </div>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}