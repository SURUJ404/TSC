import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PaymentModal({
  course,
  paymentConfig,
  userEmail,
  setUserEmail,
  transactionId,
  setTransactionId,
  onSubmit,
  onClose,
  copyUpiId
}) {
  return (
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

        <form onSubmit={onSubmit} className="space-y-4">
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
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}