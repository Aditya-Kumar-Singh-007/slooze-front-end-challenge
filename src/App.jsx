/**
 * Main Application Component
 * 
 * This is the root component that sets up:
 * - Theme management (light/dark mode)
 * - Authentication context (user login state)
 * - Routing configuration with role-based access
 * - Protected routes for different user roles
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import Products from './pages/ProductsNew';
import AddProduct from './pages/AddProduct';
import AuthCallback from './pages/AuthCallback';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    // Theme Provider: Manages light/dark mode across the entire app
    <ThemeProvider>
      {/* Auth Provider: Manages user authentication state */}
      <AuthProvider>
        {/* Router: Handles client-side routing */}
        <Router>
          <Routes>
            {/* Public Routes - No authentication required */}
            <Route path="/login" element={<Login />} />
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            <Route path="/auth/facebook/callback" element={<AuthCallback />} />
            
            {/* Manager-Only Routes - Requires manager role */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireManager={true}>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes - Both managers and store keepers can access */}
            <Route 
              path="/products" 
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/products/add" 
              element={
                <ProtectedRoute>
                  <AddProduct />
                </ProtectedRoute>
              } 
            />
            
            {/* Manager-Only Analytics Routes */}
            <Route 
              path="/analytics/traffic" 
              element={
                <ProtectedRoute requireManager={true}>
                  <PlaceholderPage title="Traffic Analytics" description="Monitor website traffic and user behavior." />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics/earning" 
              element={
                <ProtectedRoute requireManager={true}>
                  <PlaceholderPage title="Earning Analytics" description="Track revenue and financial performance." />
                </ProtectedRoute>
              } 
            />
            
            {/* Manager-Only Finance Routes */}
            <Route 
              path="/finances/payment" 
              element={
                <ProtectedRoute requireManager={true}>
                  <PlaceholderPage title="Payment Management" description="Manage incoming payments and transactions." />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/finances/payout" 
              element={
                <ProtectedRoute requireManager={true}>
                  <PlaceholderPage title="Payout Management" description="Handle payouts and disbursements." />
                </ProtectedRoute>
              } 
            />
            
            {/* Account Management Routes - Available to all authenticated users */}
            <Route 
              path="/account/profile" 
              element={
                <ProtectedRoute>
                  <PlaceholderPage title="My Profile" description="Manage your personal information and preferences." />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/account/security" 
              element={
                <ProtectedRoute>
                  <PlaceholderPage title="Security Settings" description="Update your password and security preferences." />
                </ProtectedRoute>
              } 
            />
            
            {/* Help Route - Available to all authenticated users */}
            <Route 
              path="/help" 
              element={
                <ProtectedRoute>
                  <PlaceholderPage title="Help and Support" description="Get assistance and find answers to common questions." />
                </ProtectedRoute>
              } 
            />
            
            {/* Default Route - Redirect to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;