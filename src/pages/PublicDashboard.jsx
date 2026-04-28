import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  BookOpen, 
  Play, 
  TrendingUp, 
  Users, 
  Shield, 
  Brain, 
  Smartphone, 
  Calendar,
  Edit3,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ArticleCard from '@/components/ArticleCard';
import { useAuth } from '@/contexts/AuthContext';
import { useNews } from '@/contexts/NewsContext';
import { useCourses } from '@/contexts/CourseContext';
import { useBlog } from '@/contexts/BlogContext';

const CATEGORY_ICONS = {
  startups: Users,
  venture: TrendingUp,
  security: Shield,
  ai: Brain,
  apps: Smartphone,
  events: Calendar,
  latest: TrendingUp
};

export default function PublicDashboard() {
  const { user } = useAuth();
  const { getLatestArticles, getArticlesByCategory } = useNews();
  const { getActiveCourses } = useCourses();
  const { getPublishedPosts } = useBlog();
  
  const latestArticles = getLatestArticles(6);
  const activeCourses = getActiveCourses().slice(0, 4);
  const blogPosts = getPublishedPosts().slice(0, 3);
  
  const categories = [
    { name: 'Startups', key: 'startups', color: 'from-green-500 to-emerald-600' },
    { name: 'AI', key: 'ai', color: 'from-purple-500 to-violet-600' },
    { name: 'Security', key: 'security', color: 'from-red-500 to-rose-600' },
    { name: 'Venture', key: 'venture', color: 'from-blue-500 to-cyan-600' },
    { name: 'Apps', key: 'apps', color: 'from-orange-500 to-amber-600' },
    { name: 'Events', key: 'events', color: 'from-pink-500 to-rose-600' }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - TechPulse</title>
        <meta name="description" content="Your personalized tech news and learning dashboard" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Stay updated with the latest tech news, courses, and insights.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Latest Articles</p>
                      <p className="text-2xl font-bold">{latestArticles.length}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Courses</p>
                      <p className="text-2xl font-bold">{activeCourses.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Blog Posts</p>
                      <p className="text-2xl font-bold">{blogPosts.length}</p>
                    </div>
                    <Edit3 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Progress</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Link to="/courses">
                <Card className="hover-lift cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">Explore Courses</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover new skills with our comprehensive course library
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/techstart">
                <Card className="hover-lift cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <Edit3 className="w-12 h-12 mx-auto mb-4 text-green-600 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">TechStart Blog</h3>
                    <p className="text-sm text-muted-foreground">
                      Read in-depth articles and tutorials from industry experts
                    </p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/newsletter">
                <Card className="hover-lift cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay updated with weekly tech insights and trends
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Categories Grid */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => {
                  const Icon = CATEGORY_ICONS[category.key];
                  const articleCount = getArticlesByCategory(category.key).length;
                  
                  return (
                    <motion.div
                      key={category.key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/category/${category.key}`}>
                        <Card className="hover-lift group cursor-pointer">
                          <CardContent className="p-4 text-center">
                            <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                            <p className="text-xs text-muted-foreground">
                              {articleCount} articles
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Featured Courses */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Courses</h2>
                <Link to="/courses">
                  <Button variant="outline">View All Courses</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/course/${course.id}`}>
                      <Card className="hover-lift group cursor-pointer">
                        <div className="relative">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-32 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2">
                            <Badge className={course.isPaid ? 'bg-blue-600' : 'bg-green-600'}>
                              {course.isPaid ? `₹${course.price}` : 'Free'}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration}</span>
                            </div>
                            <span>{course.level}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Latest Articles */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest News</h2>
                <Link to="/category/latest">
                  <Button variant="outline">View All News</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestArticles.slice(0, 6).map((article, index) => (
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
            </section>

            {/* TechStart Blog Preview */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">TechStart Blog</h2>
                <Link to="/techstart">
                  <Button variant="outline">Read More Posts</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.id}`}>
                      <Card className="hover-lift group cursor-pointer">
                        <div className="relative">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-40 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime} min read</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>{post.likes} likes</span>
                              <span>{post.views} views</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </>
  );
}