import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, User, Sparkles } from 'lucide-react';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, signup, socialLogin } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'manager' ? '/dashboard' : '/products'} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = isSignup 
      ? await signup(formData.email, formData.password, formData.name)
      : await login(formData.email, formData.password);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    
    // Check if running in development or if you want to use real OAuth
    const useRealOAuth = false; // Set to true to use real Google OAuth
    
    if (useRealOAuth) {
      const clientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
      const scope = encodeURIComponent('email profile');
      const responseType = 'code';
      
      const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
      window.location.href = googleAuthUrl;
    } else {
      // Demo mode - simulate successful login
      setTimeout(async () => {
        const mockGoogleUser = {
          email: 'user@gmail.com',
          name: 'Google User',
          picture: 'https://via.placeholder.com/40'
        };
        await socialLogin('google', mockGoogleUser);
        setLoading(false);
      }, 1500);
    }
  };

  const handleFacebookLogin = () => {
    setLoading(true);
    
    const useRealFB = false; // Set to true to use real Facebook login
    
    if (useRealFB && typeof window !== 'undefined' && window.FB) {
      window.FB.login((response) => {
        if (response.authResponse) {
          window.FB.api('/me', { fields: 'name,email,picture' }, async (userInfo) => {
            await socialLogin('facebook', {
              email: userInfo.email || 'user@facebook.com',
              name: userInfo.name || 'Facebook User',
              picture: userInfo.picture?.data?.url
            });
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }, { scope: 'email' });
    } else {
      // Demo mode - simulate successful login
      setTimeout(async () => {
        const mockFacebookUser = {
          email: 'user@facebook.com',
          name: 'Facebook User',
          picture: 'https://via.placeholder.com/40'
        };
        await socialLogin('facebook', mockFacebookUser);
        setLoading(false);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const fillDemoCredentials = (role) => {
    if (role === 'manager') {
      setFormData({ email: 'manager@slooze.com', password: 'manager123', name: '' });
    } else {
      setFormData({ email: 'keeper@slooze.com', password: 'keeper123', name: '' });
    }
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div 
            style={{ 
              width: '80px', 
              height: '80px', 
              background: 'var(--primary)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 20px',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <Shield size={40} color="white" />
          </div>
          <h2 className="login-title">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            {isSignup ? 'Join the Commodities Management System' : 'Sign in to your account'}
          </p>
        </div>


        
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} />
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              style={{ paddingRight: '44px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                marginTop: '24px'
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {error && (
            <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
              {error}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
            {loading ? (
              <>
                <div className="loading-spinner"></div>
                {isSignup ? 'Creating Account...' : 'Signing in...'}
              </>
            ) : (
              <>
                <LogIn size={20} />
                {isSignup ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-secondary)' }}>
          or
        </div>

        {/* Social Login Buttons */}
        <div style={{ marginBottom: '24px' }}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-secondary social-btn google-btn"
            style={{ width: '100%', marginBottom: '12px' }}
            disabled={loading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="btn btn-secondary social-btn facebook-btn"
            style={{ width: '100%' }}
            disabled={loading}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        {!isSignup && (
          <div style={{ marginTop: '32px', padding: '24px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)', fontSize: '1rem' }}>
              🚀 Demo Credentials
            </h4>
            <div style={{ display: 'grid', gap: '12px' }}>
              <button
                type="button"
                onClick={() => fillDemoCredentials('manager')}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>👨💼 Manager Account</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Full access to dashboard and products
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => fillDemoCredentials('keeper')}
                className="btn btn-secondary"
                style={{ justifyContent: 'flex-start', textAlign: 'left' }}
              >
                <div>
                  <div style={{ fontWeight: '600' }}>👥 Store Keeper Account</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Products management only
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
        
        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>Built for Slooze Front-End Challenge</p>
        </div>
      </div>
    </div>
  );
};

export default Login;