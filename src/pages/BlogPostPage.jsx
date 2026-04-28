import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Clock, 
  Heart, 
  Eye, 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  ArrowLeft,
  MessageCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function BlogPostPage() {
  const { id } = useParams();
  const { 
    blogPosts, 
    incrementViews, 
    toggleLike, 
    addComment, 
    getCommentsForPost 
  } = useBlog();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [comment, setComment]= useState('');
  const [authorName, setAuthorName] = useState(user?.name || '');
  
  const post = blogPosts.find(p => p.id === id);
  const comments = getCommentsForPost(id);
  
  useEffect(() => {
    if (post) {
      incrementViews(post.id);
    }
  }, [post, incrementViews]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested article could not be found.</p>
        <Link to="/techstart">
          <Button>Back to Blog</Button>
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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
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

  const handleLike = () => {
    toggleLike(post.id);
    toast({
      title: "Thanks for the like! ❤️"
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      toast({
        title: "Please login to comment",
        variant: "destructive"
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Please enter a comment",
        variant: "destructive"
      });
      return;
    }

    addComment(post.id, {
      content: comment.trim(),
      author: authorName || user.name,
      userId: user.id
    });

    setComment('');
    toast({
      title: "Comment added successfully!"
    });
  };

  const renderContent = (content) => {
    // Simple markdown-like rendering
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mb-4 mt-8">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mb-3 mt-6">{line.slice(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{line.slice(4)}</h3>;
      } else if (line.startsWith('```')) {
        const nextCodeBlockIndex = lines.findIndex((l, i) => i > index && l.startsWith('```'));
        if (nextCodeBlockIndex !== -1) {
          const codeLines = lines.slice(index + 1, nextCodeBlockIndex);
          const code = codeLines.join('\n');
          return (
            <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
              <code className="text-sm">{code}</code>
            </pre>
          );
        }
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else if (!line.startsWith('```')) {
        return <p key={index} className="mb-4 leading-relaxed">{line}</p>;
      }
      return null;
    });
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - TechStart Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featuredImage} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featuredImage} />
      </Helmet>

      <div className="min-h-screen">
        {/* Back Navigation */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/techstart" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
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
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
              <span>{formatDate(post.publishedAt)}</span>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Share and Like Buttons */}
            <div className="flex items-center justify-between mb-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className="flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>{post.likes}</span>
                </Button>
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare('copy')}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-lg leading-relaxed">
                {renderContent(post.content)}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{post.author}</h3>
                    <p className="text-muted-foreground">
                      Technology writer and developer with expertise in modern web technologies, 
                      AI, and software engineering best practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Comments ({comments.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Comment Form */}
                {isAuthenticated() ? (
                  <form onSubmit={handleCommentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Your Name</label>
                      <Input
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Comment</label>
                      <Textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit">Post Comment</Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Please login to join the conversation.
                    </p>
                    <Link to="/login">
                      <Button>Login to Comment</Button>
                    </Link>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-primary/20 pl-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{comment.content}</p>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </article>
      </div>
    </>
  );
}