import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Play, 
  Clock, 
  Star, 
  User, 
  Download, 
  Lock, 
  CheckCircle,
  CreditCard,
  Copy
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { courses, hasAccessToCourse, requestCourseAccess } = useCourses();
  const { paymentConfig } = usePayment();
  const { toast } = useToast();
  
  const [showPayment, setShowPayment] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  
  const course = courses.find(c => c.id === id);
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground">The requested course could not be found.</p>
      </div>
    );
  }

  const hasAccess = hasAccessToCourse(course.id, user.id);
  const canAccess = !course.isPaid || hasAccess;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (!transactionId.trim()) {
      toast({
        title: "Please enter transaction ID",
        variant: "destructive"
      });
      return;
    }

    requestCourseAccess(course.id, user.id, transactionId.trim(), userEmail);
    
    toast({
      title: "Payment request submitted!",
      description: "Your request has been sent to admin for verification. You'll get access once approved."
    });
    
    setShowPayment(false);
    setTransactionId('');
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(paymentConfig.upiId);
    toast({
      title: "UPI ID copied to clipboard!"
    });
  };

  return (
    <>
      <Helmet>
        <title>{course.title} - TechPulse</title>
        <meta name="description" content={course.description} />
      </Helmet>

      <div className="min-h-screen">
        {/* Course Header */}
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
                {!canAccess && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <Lock className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Course Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
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
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
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
              </div>
            </div>
          </div>
        </section>

        {/* Payment Modal */}
        {showPayment && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-4">Complete Payment</h3>
              
              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Scan QR code or use UPI ID to pay
                  </p>
                  {paymentConfig.qrCodeImage && (
                    <img
                      src={paymentConfig.qrCodeImage}
                      alt="Payment QR Code"
                      className="w-48 h-48 mx-auto border rounded-lg"
                    />
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input
                    value={paymentConfig.upiId}
                    readOnly
                    className="flex-1"
                  />
                  <Button size="sm" onClick={copyUpiId}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-semibold">Amount: ₹{course.price}</p>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Transaction ID *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter UPI transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1">
                    Submit Payment
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPayment(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}