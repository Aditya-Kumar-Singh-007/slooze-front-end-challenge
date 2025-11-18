import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
let mockUsers = [
  { id: 1, email: 'manager@slooze.com', password: 'manager123', role: 'manager', name: 'John Manager' },
  { id: 2, email: 'keeper@slooze.com', password: 'keeper123', role: 'storekeeper', name: 'Jane Keeper' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = { ...foundUser };
      delete userSession.password;
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = async (email, password, name, role = 'storekeeper') => {
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      email,
      password,
      name,
      role
    };
    
    mockUsers.push(newUser);
    
    const userSession = { ...newUser };
    delete userSession.password;
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    
    return { success: true };
  };

  const socialLogin = async (provider, userData) => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      const userSession = { ...existingUser };
      delete userSession.password;
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return { success: true };
    }
    
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      email: userData.email,
      name: userData.name,
      role: 'storekeeper',
      provider
    };
    
    mockUsers.push(newUser);
    
    const userSession = { ...newUser };
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    socialLogin,
    logout,
    loading,
    isManager: user?.role === 'manager',
    isStoreKeeper: user?.role === 'storekeeper'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};