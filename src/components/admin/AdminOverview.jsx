import React from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Edit, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminOverview({ 
  stats, 
  courses, 
  articles,
  blogPosts,
  pendingPayments, 
  approvePaymentRequest, 
  rejectPaymentRequest 
}) {
  const iconMap = {
    'Total Videos': Play,
    'Articles': FileText,
    'Blog Posts': Edit,
    'Pending Payments': CreditCard
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.title];
          return (
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
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {courses.slice(0, 3).map((video) => (
                <div key={video.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-8 bg-muted rounded flex items-center justify-center">
                      <Play className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {video.isPaid ? `₹${video.price}` : 'Free'} • {video.duration}
                      </p>
                    </div>
                  </div>
                  <Badge variant={video.isActive ? 'default' : 'secondary'}>
                    {video.isActive ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              ))}
              {courses.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No videos uploaded yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Articles */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.slice(0, 3).map((article) => (
                <div key={article.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{article.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {article.category} • {article.readTime} min read
                    </p>
                  </div>
                  <Badge variant={article.featured ? 'default' : 'secondary'}>
                    {article.featured ? 'Featured' : 'Regular'}
                  </Badge>
                </div>
              ))}
              {articles.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No articles published yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payment Requests */}
      {pendingPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Payment Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.slice(0, 5).map((request) => {
                const course = courses.find(c => c.id === request.courseId);
                return (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{course?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {request.userEmail} • TXN: {request.transactionId}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => approvePaymentRequest(request.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rejectPaymentRequest(request.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}