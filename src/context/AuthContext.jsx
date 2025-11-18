/**
 * Authentication Context
 * 
 * Manages user authentication state throughout the application.
 * Currently uses mock data and localStorage for demonstration.
 * 
 * Features:
 * - Email/password login
 * - User registration
 * - Social login (Google/Facebook)
 * - Role-based access (manager/storekeeper)
 * - Persistent sessions via localStorage
 * 
 * TODO: Replace with real API calls when backend is integrated
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create authentication context
const AuthContext = createContext();

/**
 * Custom hook to access authentication context
 * Throws error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * Mock user database for demonstration
 * In production, this would be replaced with API calls
 */
let mockUsers = [
  { id: 1, email: 'manager@grossstore.com', password: 'manager123', role: 'manager', name: 'John Manager' },
  { id: 2, email: 'keeper@grossstore.com', password: 'keeper123', role: 'storekeeper', name: 'Jane Keeper' }
];

/**
 * Authentication Provider Component
 * Wraps the app and provides authentication state and methods
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);           // Current authenticated user
  const [loading, setLoading] = useState(true);     // Loading state for initial auth check

  /**
   * Check for existing user session on app load
   * Restores user from localStorage if available
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Login function - authenticates user with email/password
   * TODO: Replace with API call to /api/auth/login
   */
  const login = async (email, password) => {
    // Find user in mock database
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Create user session (remove password for security)
      const userSession = { ...foundUser };
      delete userSession.password;
      
      // Update state and persist to localStorage
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  /**
   * User registration function
   * TODO: Replace with API call to /api/auth/register
   */
  const signup = async (email, password, name, role = 'storekeeper') => {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      email,
      password,
      name,
      role
    };
    
    // Add to mock database
    mockUsers.push(newUser);
    
    // Create session and login user
    const userSession = { ...newUser };
    delete userSession.password;
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    
    return { success: true };
  };

  /**
   * Social login function (Google/Facebook)
   * TODO: Integrate with real OAuth providers
   */
  const socialLogin = async (provider, userData) => {
    // Check if user exists with this email
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      // Login existing user
      const userSession = { ...existingUser };
      delete userSession.password;
      setUser(userSession);
      localStorage.setItem('user', JSON.stringify(userSession));
      return { success: true };
    }
    
    // Create new user from social data
    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      email: userData.email,
      name: userData.name,
      role: 'storekeeper',  // Default role for social signups
      provider
    };
    
    // Add to database and login
    mockUsers.push(newUser);
    
    const userSession = { ...newUser };
    setUser(userSession);
    localStorage.setItem('user', JSON.stringify(userSession));
    
    return { success: true };
  };

  /**
   * Logout function - clears user session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Context value with all auth methods and state
  const value = {
    user,                                           // Current user object
    login,                                          // Login function
    signup,                                         // Registration function
    socialLogin,                                    // Social login function
    logout,                                         // Logout function
    loading,                                        // Loading state
    isManager: user?.role === 'manager',           // Helper: check if user is manager
    isStoreKeeper: user?.role === 'storekeeper'    // Helper: check if user is store keeper
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};