import React, { createContext, useContext, useState, useEffect } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentConfig, setPaymentConfig] = useState(() => {
    const saved = localStorage.getItem('techpulse_payment_config');
    return saved ? JSON.parse(saved) : {
      upiId: 'thedevsurujx@okhdfcbank',
      qrCodeImage: null,
      isActive: true
    };
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('techpulse_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('techpulse_payment_config', JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  useEffect(() => {
    localStorage.setItem('techpulse_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const updatePaymentConfig = (config) => {
    setPaymentConfig(prev => ({ ...prev, ...config }));
  };

  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: Date.now().toString(),
      ...transactionData,
      createdAt: new Date(),
      status: 'pending'
    };
    setTransactions(prev => [newTransaction, ...prev]);
    return newTransaction;
  };

  const updateTransactionStatus = (transactionId, status) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status, updatedAt: new Date() }
        : transaction
    ));
  };

  const getPendingTransactions = () => {
    return transactions.filter(t => t.status === 'pending');
  };

  const getTransactionsByUser = (userId) => {
    return transactions.filter(t => t.userId === userId);
  };

  return (
    <PaymentContext.Provider value={{
      paymentConfig,
      transactions,
      updatePaymentConfig,
      addTransaction,
      updateTransactionStatus,
      getPendingTransactions,
      getTransactionsByUser
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
}