import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Bell, Grid, User, Sun, Moon, LogOut } from 'lucide-react';

const TopBar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="top-bar">
      <div className="top-bar-right">
        <button className="icon-btn">
          <User size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <Grid size={20} />
        </button>
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <div className="user-badge">
          <User size={16} />
          <span>{user?.role === 'manager' ? 'Admin' : 'Store Keeper'}</span>
        </div>
        <button className="icon-btn logout-btn" onClick={logout} title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
