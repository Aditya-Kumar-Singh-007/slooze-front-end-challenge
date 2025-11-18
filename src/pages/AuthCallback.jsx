import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { socialLogin } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const provider = window.location.pathname.includes('google') ? 'google' : 'facebook';
      
      if (code) {
        try {
          // In a real app, you'd exchange the code for user info via your backend
          // For demo purposes, we'll simulate a successful login
          const mockUserData = {
            email: `user@${provider}.com`,
            name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
            picture: 'https://via.placeholder.com/40'
          };
          
          await socialLogin(provider, mockUserData);
        } catch (error) {
          console.error('OAuth callback error:', error);
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, socialLogin, navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div className="loading-spinner" style={{ width: '40px', height: '40px' }}></div>
      <p>Completing authentication...</p>
    </div>
  );
};

export default AuthCallback;