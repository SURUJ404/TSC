import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { useBlog } from '@/contexts/BlogContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useNews } from '@/contexts/NewsContext';
import { useToast } from '@/components/ui/use-toast';
import AdminOverview from './AdminOverview';
import VideoManagement from './VideoManagement';
import ArticleManagement from './ArticleManagement';
import BlogManagement from './BlogManagement';
import PaymentManagement from './PaymentManagement';
import AdminSettings from './AdminSettings';

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
  const { articles } = useNews();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState('overview');

  const pendingPayments = getPendingPaymentRequests();
  const pendingTransactions = getPendingTransactions();

  const stats = [
    {
      title: 'Total Videos',
      value: courses.length,
      color: 'text-blue-600'
    },
    {
      title: 'Articles',
      value: articles.length,
      color: 'text-green-600'
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      color: 'text-purple-600'
    },
    {
      title: 'Pending Payments',
      value: pendingPayments.length,
      color: 'text-orange-600'
    }
  ];

  const adminProps = {
    user,
    courses,
    blogPosts,
    articles,
    pendingPayments,
    pendingTransactions,
    paymentConfig,
    stats,
    addCourse,
    updateCourse,
    deleteCourse,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    approvePaymentRequest,
    rejectPaymentRequest,
    updatePaymentConfig,
    toast
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Hacksprint</title>
        <meta name="description" content="Admin dashboard for managing Hacksprint content and users" />
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
              <h1 className="text-3xl font-bold mb-2">Admin Control Panel</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}! Complete control over your platform content, videos, and settings.
              </p>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <AdminOverview {...adminProps} />
              </TabsContent>

              <TabsContent value="videos">
                <VideoManagement {...adminProps} />
              </TabsContent>

              <TabsContent value="articles">
                <ArticleManagement {...adminProps} />
              </TabsContent>

              <TabsContent value="blog">
                <BlogManagement {...adminProps} />
              </TabsContent>

              <TabsContent value="payments">
                <PaymentManagement {...adminProps} />
              </TabsContent>

              <TabsContent value="settings">
                <AdminSettings {...adminProps} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </>
  );
}