import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { BookOpen, Clock, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCourses } from '@/contexts/CourseContext';

const CATEGORIES = ['All', 'Web Development', 'AI & ML', 'Backend Development', 'Mobile Development', 'Data Science'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const PRICE_FILTERS = ['All', 'Free', 'Paid'];

export default function CoursesPage() {
  const { getActiveCourses } = useCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  
  const allCourses = getActiveCourses();
  
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesPrice = selectedPrice === 'All' || 
                        (selectedPrice === 'Free' && !course.isPaid) ||
                        (selectedPrice === 'Paid' && course.isPaid);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  return (
    <>
      <Helmet>
        <title>Courses - TechPulse</title>
        <meta name="description" content="Explore our comprehensive collection of tech courses and enhance your skills" />
      </Helmet>

      <div className="min-h-screen">
        {/* Header */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Learn & Grow
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Master new technologies with our comprehensive course library. 
                From beginner to advanced, we have something for everyone.
              </p>
              <div className="text-white/80">
                {allCourses.length} courses available
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters and Search */}
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
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">Filters:</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Level Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Level</label>
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Price</label>
                    <select
                      value={selectedPrice}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                    >
                      {PRICE_FILTERS.map(price => (
                        <option key={price} value={price}>{price}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-center">
                <p className="text-muted-foreground">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link to={`/course/${course.id}`}>
                      <Card className="hover-lift group cursor-pointer h-full">
                        <div className="relative">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className={course.isPaid ? 'bg-blue-600' : 'bg-green-600'}>
                              {course.isPaid ? `₹${course.price}` : 'Free'}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge variant="secondary">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {course.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span>4.8</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                By {course.instructor}
                              </span>
                              <span className="text-sm font-medium">
                                {course.category}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
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
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Courses Found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search criteria or filters to find more courses.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedLevel('All');
                    setSelectedPrice('All');
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}