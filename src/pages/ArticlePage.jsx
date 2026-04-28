import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Clock, User, Calendar, Share2, Twitter, Linkedin, Facebook, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';

export default function ArticlePage() {
  const { id } = useParams();
  const { articles } = useNews();
  const { toast } = useToast();
  
  const article = articles.find(a => a.id === id);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested article could not be found.</p>
        <Link to="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied to clipboard!"
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleComment = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>{article.title} - TechPulse</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
      </Helmet>

      <div className="min-h-screen">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="container mx-auto px-4 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            {/* Category Badge */}
            <div className="mb-6">
              <Badge className={`${getCategoryColor(article.category)} text-white border-0`}>
                {article.category.toUpperCase()}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} min read</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img  
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg"
               src="https://images.unsplash.com/photo-1677694031058-95963b42a0b7" />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm font-medium">Share:</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-2"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('copy')}
                className="flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Copy Link</span>
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-lg leading-relaxed space-y-6">
                {article.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{article.author}</h3>
                    <p className="text-muted-foreground">{article.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Comments</h3>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Join the conversation and share your thoughts on this article.
                  </p>
                  <Button onClick={handleComment}>
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </article>
      </div>
    </>
  );
}