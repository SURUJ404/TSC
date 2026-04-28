import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ArticleCard from '@/components/ArticleCard';
import { useNews } from '@/contexts/NewsContext';

const CATEGORIES = ['all', 'latest', 'startups', 'venture', 'security', 'ai', 'apps', 'events', 'courses'];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState([]);
  const { searchArticles, articles } = useNews();

  useEffect(() => {
    const searchQuery = searchParams.get('q') || '';
    setQuery(searchQuery);
    performSearch(searchQuery, selectedCategory);
  }, [searchParams, selectedCategory, articles]);

  const performSearch = (searchQuery, category) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    let searchResults = searchArticles(searchQuery);
    
    if (category !== 'all') {
      searchResults = searchResults.filter(article => article.category === category);
    }

    setResults(searchResults);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Helmet>
        <title>{query ? `Search: ${query}` : 'Search'} - TechPulse</title>
        <meta name="description" content="Search for articles, news, and insights on TechPulse" />
      </Helmet>

      <div className="min-h-screen">
        {/* Search Header */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">
                {query ? `Search Results for "${query}"` : 'Search Articles'}
              </h1>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles, topics, authors..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
                <Button type="submit" size="lg">
                  Search
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="py-8 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Filters */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Filter by category:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryFilter(category)}
                      className="capitalize"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Results */}
              {query && (
                <div className="mb-6">
                  <p className="text-muted-foreground">
                    {results.length} {results.length === 1 ? 'result' : 'results'} found
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  </p>
                </div>
              )}

              {/* Results Grid */}
              {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((article, index) => (
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
              ) : query ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                      <p className="text-muted-foreground mb-6">
                        We couldn't find any articles matching "{query}"
                        {selectedCategory !== 'all' && ` in the ${selectedCategory} category`}.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Try:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Using different keywords</li>
                          <li>• Checking your spelling</li>
                          <li>• Searching in all categories</li>
                          <li>• Using broader search terms</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Start Your Search</h2>
                      <p className="text-muted-foreground">
                        Enter keywords to find articles, news, and insights on technology topics.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}