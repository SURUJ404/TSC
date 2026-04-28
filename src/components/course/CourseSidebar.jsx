import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CourseSidebar({ course }) {
  return (
    <>
      {/* Course Info */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-semibold">
                {course.isPaid ? `₹${course.price}` : 'Free'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-semibold">{course.duration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Level</span>
              <span className="font-semibold">{course.level}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Instructor</span>
              <span className="font-semibold">{course.instructor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Students</span>
              <span className="font-semibold">1,234</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Instructor */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">{course.instructor}</h4>
                <p className="text-sm text-muted-foreground">Senior Developer</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Experienced developer with 10+ years in the industry, 
              specializing in modern web technologies and best practices.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}