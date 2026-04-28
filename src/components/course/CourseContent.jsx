import React from 'react';
import { motion } from 'framer-motion';
import { Play, Lock, CheckCircle, Download, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CourseContent({ course, canAccess, setShowPayment }) {
  return (
    <>
      {/* Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardContent className="p-0">
            {canAccess ? (
              <div className="relative">
                <video
                  controls
                  controlsList="nodownload"
                  className="w-full h-64 md:h-96 rounded-lg"
                  poster={course.thumbnail}
                >
                  <source src={course.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="h-64 md:h-96 bg-muted rounded-lg flex flex-col items-center justify-center space-y-4">
                <Lock className="w-16 h-16 text-muted-foreground" />
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">Course Locked</h3>
                  <p className="text-muted-foreground">
                    {course.isPaid 
                      ? 'Purchase this course to access the content'
                      : 'This course is currently unavailable'
                    }
                  </p>
                </div>
                {course.isPaid && (
                  <Button onClick={() => setShowPayment(true)}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Purchase Course
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Course Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About This Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Master the fundamentals and advanced concepts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Build real-world projects from scratch</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Learn industry best practices and patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Get hands-on experience with modern tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="curriculum">
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((lesson) => (
                    <div key={lesson} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{lesson}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">Lesson {lesson}: Introduction to Concepts</h4>
                          <p className="text-sm text-muted-foreground">15 minutes</p>
                        </div>
                      </div>
                      {canAccess ? (
                        <Play className="w-5 h-5 text-primary" />
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Course Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {course.resources?.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{resource.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {resource.isPaid ? 'Premium Resource' : 'Free Resource'}
                          </p>
                        </div>
                      </div>
                      {(canAccess && !resource.isPaid) || (canAccess && resource.isPaid) ? (
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      ) : (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </>
  );
}