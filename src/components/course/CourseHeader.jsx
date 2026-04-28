import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CourseHeader({ course }) {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <div className="text-white space-y-6">
            <div className="flex items-center space-x-3">
              <Badge className={course.isPaid ? 'bg-blue-800' : 'bg-green-800'}>
                {course.isPaid ? `₹${course.price}` : 'Free'}
              </Badge>
              <Badge variant="secondary">
                {course.level}
              </Badge>
              <Badge variant="secondary">
                {course.category}
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            
            <p className="text-xl text-blue-100">
              {course.description}
            </p>
            
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{course.instructor}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span>4.8 (1,234 reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}