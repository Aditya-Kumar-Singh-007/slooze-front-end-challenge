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
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            <Route path="/auth/facebook/callback" element={<AuthCallback />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requireManager={true}>
                  <AnalyticsDashboard />
                </ProtectedRoute>
              } 
            />
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
            <Route 
              path="/help" 
              element={
                <ProtectedRoute>
                  <PlaceholderPage title="Help and Support" description="Get assistance and find answers to common questions." />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;