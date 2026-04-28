import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Upload,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useBlog } from '@/contexts/BlogContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { 
    courses, 
    addCourse, 
    updateCourse, 
    deleteCourse,
    getPendingPaymentRequests,
    approvePaymentRequest,
    rejectPaymentRequest
  } = useCourses();
  const { 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost 
  } = useBlog();
  const { 
    paymentConfig, 
    updatePaymentConfig,
    getPendingTransactions
  } = usePayment();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);

  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    level: 'Beginner',
    instructor: '',
    category: '',
    tags: '',
    videoUrl: '',
    thumbnail: '',
    isPaid: false,
    isActive: true
  });

  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featuredImage: '',
    isPublished: false
  });

  const [paymentForm, setPaymentForm] = useState({
    upiId: paymentConfig.upiId || '',
    qrCodeImage: paymentConfig.qrCodeImage || ''
  });

  const pendingPayments = getPendingPaymentRequests();
  const pendingTransactions = getPendingTransactions();

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const courseData = {
      ...courseForm,
      price: parseFloat(courseForm.price),
      tags: courseForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      instructor: courseForm.instructor || user.name
    };
    
    if (editingCourse) {
      updateCourse(editingCourse.id, courseData);
      toast({ title: "Course updated successfully!" });
      setEditingCourse(null);
    } else {
      addCourse(courseData);
      toast({ title: "Course created successfully!" });
    }
    
    resetCourseForm();
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const blogData = {
      ...blogForm,
      tags: blogForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      author: user.name
    };
    
    if (editingBlog) {
      updateBlogPost(editingBlog.id, blogData);
      toast({ title: "Blog post updated successfully!" });
      setEditingBlog(null);
    } else {
      addBlogPost(blogData);
      toast({ title: "Blog post created successfully!" });
    }
    
    resetBlogForm();
  };

  const handleUpdatePaymentConfig = (e) => {
    e.preventDefault();
    updatePaymentConfig(paymentForm);
    toast({ title: "Payment configuration updated!" });
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      description: '',
      price: 0,
      duration: '',
      level: 'Beginner',
      instructor: '',
      category: '',
      tags: '',
      videoUrl: '',
      thumbnail: '',
      isPaid: false,
      isActive: true
    });
    setIsCreatingCourse(false);
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: '',
      content: '',
      excerpt: '',
      tags: '',
      featuredImage: '',
      isPublished: false
    });
    setIsCreatingBlog(false);
  };

  const handleEditCourse = (course) => {
    setCourseForm({
      ...course,
      tags: course.tags.join(', ')
    });
    setEditingCourse(course);
    setIsCreatingCourse(true);
  };

  const handleEditBlog = (post) => {
    setBlogForm({
      ...post,
      tags: post.tags.join(', ')
    });
    setEditingBlog(post);
    setIsCreatingBlog(true);
  };

  const stats = [
    {
      title: 'Total Courses',
      value: courses.length,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      icon: Edit,
      color: 'text-green-600'
    },
    {
      title: 'Pending Payments',
      value: pendingPayments.length,
      icon: CreditCard,
      color: 'text-orange-600'
    },
    {
      title: 'Active Users',
      value: '1,234',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - TechPulse</title>
        <meta name="description" content="Admin dashboard for managing TechPulse content and users" />
      </Helmet>

      <div className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}! Manage your platform content and settings.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Courses */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {courses.slice(0, 3).map((course) => (
                          <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h4 className="font-medium">{course.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {course.isPaid ? `₹${course.price}` : 'Free'}
                              </p>
                            </div>
                            <Badge variant={course.isActive ? 'default' : 'secondary'}>
                              {course.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pending Payment Requests */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pending Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingPayments.slice(0, 3).map((request) => {
                          const course = courses.find(c => c.id === request.courseId);
                          return (
                            <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <h4 className="font-medium">{course?.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {request.userEmail}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  onClick={() => approvePaymentRequest(request.id)}
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => rejectPaymentRequest(request.id)}
                                >
                                  <XCircle className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                        {pendingPayments.length === 0 && (
                          <p className="text-center text-muted-foreground py-4">
                            No pending payment requests
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="courses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Course Management</h2>
                  <Button onClick={() => setIsCreatingCourse(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </div>

                {/* Course Form */}
                {isCreatingCourse && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingCourse ? 'Edit Course' : 'Create New Course'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateCourse} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title *</label>
                            <Input
                              value={courseForm.title}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, title: e.target.value }))}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Category *</label>
                            <Input
                              value={courseForm.category}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description *</label>
                          <Textarea
                            value={courseForm.description}
                            onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Price (₹)</label>
                            <Input
                              type="number"
                              value={courseForm.price}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, price: e.target.value }))}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Duration</label>
                            <Input
                              value={courseForm.duration}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, duration: e.target.value }))}
                              placeholder="e.g., 2 hours"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Level</label>
                            <select
                              value={courseForm.level}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, level: e.target.value }))}
                              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Video URL</label>
                            <Input
                              value={courseForm.videoUrl}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                              placeholder="https://..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
                            <Input
                              value={courseForm.thumbnail}
                              onChange={(e) => setCourseForm(prev => ({ ...prev, thumbnail: e.target.value }))}
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                          <Input
                            value={courseForm.tags}
                            onChange={(e) => setCourseForm(prev => ({ ...prev, tags: e.target.value }))}
                            placeholder="React, JavaScript, Frontend"
                          />
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={courseForm.isPaid}
                              onCheckedChange={(checked) => setCourseForm(prev => ({ ...prev, isPaid: checked }))}
                            />
                            <label className="text-sm font-medium">Paid Course</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={courseForm.isActive}
                              onCheckedChange={(checked) => setCourseForm(prev => ({ ...prev, isActive: checked }))}
                            />
                            <label className="text-sm font-medium">Active</label>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <Button type="submit">
                            {editingCourse ? 'Update Course' : 'Create Course'}
                          </Button>
                          <Button type="button" variant="outline" onClick={resetCourseForm}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Courses List */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Courses ({courses.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {courses.map((course) => (
                        <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{course.title}</h3>
                              <Badge variant={course.isPaid ? 'default' : 'secondary'}>
                                {course.isPaid ? `₹${course.price}` : 'Free'}
                              </Badge>
                              <Badge variant={course.isActive ? 'default' : 'outline'}>
                                {course.isActive ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{course.category}</span>
                              <span>{course.duration}</span>
                              <span>{course.level}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditCourse(course)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this course?')) {
                                  deleteCourse(course.id);
                                  toast({ title: "Course deleted successfully!" });
                                }
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blog" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Blog Management</h2>
                  <Button onClick={() => setIsCreatingBlog(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>

                {/* Blog Form */}
                {isCreatingBlog && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCreateBlog} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title *</label>
                          <Input
                            value={blogForm.title}
                            onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Excerpt *</label>
                          <Textarea
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                            rows={2}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Content *</label>
                          <Textarea
                            value={blogForm.content}
                            onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                            rows={15}
                            placeholder="Write your blog post content here... You can use Markdown formatting."
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                            <Input
                              value={blogForm.tags}
                              onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                              placeholder="React, JavaScript, Tutorial"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                            <Input
                              value={blogForm.featuredImage}
                              onChange={(e) => setBlogForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                              placeholder="https://..."
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={blogForm.isPublished}
                            onCheckedChange={(checked) => setBlogForm(prev => ({ ...prev, isPublished: checked }))}
                          />
                          <label className="text-sm font-medium">Publish immediately</label>
                        </div>

                        <div className="flex space-x-4">
                          <Button type="submit">
                            {editingBlog ? 'Update Post' : 'Create Post'}
                          </Button>
                          <Button type="button" variant="outline" onClick={resetBlogForm}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Blog Posts List */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Blog Posts ({blogPosts.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {blogPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold">{post.title}</h3>
                              <Badge variant={post.isPublished ? 'default' : 'secondary'}>
                                {post.isPublished ? 'Published' : 'Draft'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <span>{post.readTime} min read</span>
                              <span>{post.likes} likes</span>
                              <span>{post.views} views</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditBlog(post)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this post?')) {
                                  deleteBlogPost(post.id);
                                  toast({ title: "Blog post deleted successfully!" });
                                }
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="space-y-6">
                <h2 className="text-2xl font-bold">Payment Management</h2>

                {/* Payment Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle>GPay Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdatePaymentConfig} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">UPI ID</label>
                        <Input
                          value={paymentForm.upiId}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, upiId: e.target.value }))}
                          placeholder="yourname@bank"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">QR Code Image URL</label>
                        <Input
                          value={paymentForm.qrCodeImage}
                          onChange={(e) => setPaymentForm(prev => ({ ...prev, qrCodeImage: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                      <Button type="submit">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Configuration
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Pending Payment Requests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Payment Requests ({pendingPayments.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingPayments.map((request) => {
                        const course = courses.find(c => c.id === request.courseId);
                        return (
                          <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex-1">
                              <h3 className="font-semibold">{course?.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                User: {request.userEmail}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Transaction ID: {request.transactionId}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Requested: {new Date(request.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  approvePaymentRequest(request.id);
                                  toast({ title: "Payment approved! User now has access to the course." });
                                }}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  rejectPaymentRequest(request.id);
                                  toast({ title: "Payment request rejected." });
                                }}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      {pendingPayments.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">
                          No pending payment requests
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-2xl font-bold">Settings</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Additional platform settings and configurations will be available here.
                      </p>
                      <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure Platform
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
}