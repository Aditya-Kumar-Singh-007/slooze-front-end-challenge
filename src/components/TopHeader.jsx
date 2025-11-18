import React from 'react';
import { Search, Bell, User } from 'lucide-react';

const TopHeader = () => {
  return (
    <header className="top-header">
      <div className="search-section">
        <div className="search-bar">
          <Search size={20} />
          <input 
            type="text" 
            placeholder="Search analytics, reports, customers..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-actions">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        
        <div className="user-profile">
          <div className="user-avatar">
            <User size={20} />
          </div>
          <div className="user-info">
            <span className="user-name">John Doe</span>
            <span className="user-role">Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;