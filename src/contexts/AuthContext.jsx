import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const ADMIN_CREDENTIALS = {
  email: 'thedevsurujx@gmail.com',
  password: '9875321op*/"\\',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('techpulse_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Check admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminUser = {
        id: 'admin',
        email: email,
        role: 'admin',
        name: 'Admin User'
      };
      setUser(adminUser);
      localStorage.setItem('techpulse_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }
    
    // For demo purposes, any other email/password combo creates a regular user
    if (email && password) {
      const regularUser = {
        id: Date.now().toString(),
        email: email,
        role: 'user',
        name: email.split('@')[0]
      };
      setUser(regularUser);
      localStorage.setItem('techpulse_user', JSON.stringify(regularUser));
      return { success: true, user: regularUser };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techpulse_user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      isAdmin,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}