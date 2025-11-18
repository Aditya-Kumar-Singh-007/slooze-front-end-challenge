import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Package, Sun, Moon, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isManager } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div className="navbar-brand">Slooze CMS</div>
            <ul className="nav-links">
              {isManager && (
                <li>
                  <Link 
                    to="/dashboard" 
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link 
                  to="/products" 
                  className={`nav-link ${isActive('/products') ? 'active' : ''}`}
                >
                  <Package size={18} />
                  Products
                </Link>
              </li>
            </ul>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
              <User size={16} color="var(--text-secondary)" />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
                  {user?.role === 'manager' ? 'Manager' : 'Store Keeper'}
                </div>
              </div>
            </div>
            
            <button onClick={logout} className="btn btn-danger btn-sm">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;