import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Edit3, Clock, Heart, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlog } from '@/contexts/BlogContext';

export default function TechStartPage() {
  const { getPublishedPosts, searchPosts } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  
  const allPosts = getPublishedPosts();
  const allTags = ['All', ...new Set(allPosts.flatMap(post => post.tags))];
  
  const filteredPosts = searchQuery 
    ? searchPosts(searchQuery)
    : selectedTag === 'All' 
      ? allPosts 
      : allPosts.filter(post => post.tags.includes(selectedTag));

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>TechStart Blog - TechPulse</title>
        <meta name="description" content="In-depth articles, tutorials, and insights from the world of technology" />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                TechStart Blog
              </h1>
              <p className="text-xl text-green-100 max-w-3xl mx-auto">
                Deep dives into technology, programming tutorials, industry insights, 
                and thought leadership from our expert team.
              </p>
              <div className="text-white/80">
                {allPosts.length} articles published
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Search */}
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>

              {/* Tag Filter */}
              <div className="flex items-center justify-center space-x-4">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2 justify-center">
                  {allTags.slice(0, 8).map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTag === tag ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Featured Article</h2>
                <Link to={`/blog/${filteredPosts[0].id}`}>
                  <Card className="hover-lift group cursor-pointer max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative">
                        <img
                          src={filteredPosts[0].featuredImage}
                          alt={filteredPosts[0].title}
                          className="w-full h-64 lg:h-full object-cover rounded-l-lg group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {filteredPosts[0].tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {filteredPosts[0].title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3">
                            {filteredPosts[0].excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{filteredPosts[0].readTime} min read</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{filteredPosts[0].likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{filteredPosts[0].views}</span>
                              </div>
                            </div>
                            <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {filteredPosts.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.id}`}>
                      <Card className="hover-lift group cursor-pointer h-full">
                        <div className="relative">
                          <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex-1">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{post.readTime}m</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                              </div>
                            </div>
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <Edit3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Articles Found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search query or selected tags.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('All');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            ) : null}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">Stay Updated</h2>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Get the latest articles and insights delivered to your inbox every week.
              </p>
              <Link to="/newsletter">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                  Subscribe to Newsletter
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}