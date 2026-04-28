import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import { useCourses } from '@/contexts/CourseContext';
import { usePayment } from '@/contexts/PaymentContext';
import { useToast } from '@/components/ui/use-toast';
import CourseHeader from './CourseHeader';
import CourseContent from './CourseContent';
import CourseSidebar from './CourseSidebar';
import PaymentModal from './PaymentModal';

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
        <CourseHeader course={course} />

        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CourseContent 
                  course={course} 
                  canAccess={canAccess} 
                  setShowPayment={setShowPayment} 
                />
              </div>
              <div className="space-y-6">
                <CourseSidebar course={course} />
              </div>
            </div>
          </div>
        </section>

        {showPayment && (
          <PaymentModal
            course={course}
            paymentConfig={paymentConfig}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
            onSubmit={handlePaymentSubmit}
            onClose={() => setShowPayment(false)}
            copyUpiId={copyUpiId}
          />
        )}
      </div>
    </>
  );
}