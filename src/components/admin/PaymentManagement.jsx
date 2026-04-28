import React, { useState } from 'react';
import { Settings, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentManagement({ 
  pendingPayments, 
  paymentConfig, 
  courses, 
  approvePaymentRequest, 
  rejectPaymentRequest, 
  updatePaymentConfig, 
  toast 
}) {
  const [paymentForm, setPaymentForm] = useState({
    upiId: paymentConfig.upiId || '',
    qrCodeImage: paymentConfig.qrCodeImage || ''
  });

  const handleUpdatePaymentConfig = (e) => {
    e.preventDefault();
    updatePaymentConfig(paymentForm);
    toast({ title: "Payment configuration updated!" });
  };

  return (
    <div className="space-y-6">
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
    </div>
  );
}