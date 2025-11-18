import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home,
  LayoutDashboard, 
  Store,
  BarChart3, 
  DollarSign, 
  Settings, 
  HelpCircle,
  Package,
  Plus,
  TrendingUp,
  Users,
  CreditCard,
  Wallet,
  User,
  Shield,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const { isManager } = useAuth();
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      key: 'home',
      icon: Home,
      label: 'HOME',
      path: '/dashboard',
      visible: true
    },
    {
      key: 'dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      visible: isManager
    },
    {
      key: 'store',
      icon: Store,
      label: 'Store',
      visible: true,
      hasSubmenu: true,
      submenu: [
        { label: 'Product', path: '/products', icon: Package },
        { label: 'Add Product', path: '/products/add', icon: Plus }
      ]
    },
    {
      key: 'analytics',
      icon: BarChart3,
      label: 'Analytics',
      visible: isManager,
      hasSubmenu: true,
      submenu: [
        { label: 'Traffic', path: '/analytics/traffic', icon: TrendingUp },
        { label: 'Earning', path: '/analytics/earning', icon: DollarSign }
      ]
    },
    {
      key: 'finances',
      icon: DollarSign,
      label: 'Finances',
      visible: isManager,
      hasSubmenu: true,
      submenu: [
        { label: 'Payment', path: '/finances/payment', icon: CreditCard },
        { label: 'Payout', path: '/finances/payout', icon: Wallet }
      ]
    },
    {
      key: 'account',
      icon: Settings,
      label: 'Account Setting',
      visible: true,
      hasSubmenu: true,
      submenu: [
        { label: 'My Profile', path: '/account/profile', icon: User },
        { label: 'Security', path: '/account/security', icon: Shield }
      ]
    },
    {
      key: 'help',
      icon: HelpCircle,
      label: 'Help and Support',
      path: '/help',
      visible: true
    }
  ];

  return (
    <div className="vertical-sidebar cyber-grid">
      <div className="sidebar-header animated-bg">
        <div className="logo-section">
          <div className="logo-icon neon-glow">
            <Store size={32} color="#fff" />
          </div>
          <h2 className="store-name neon-text">GROSSTORE</h2>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.filter(item => item.visible).map((item) => (
          <div key={item.key} className="nav-group">
            {item.hasSubmenu ? (
              <>
                <button 
                  className="nav-item nav-toggle"
                  onClick={() => toggleMenu(item.key)}
                >
                  <div className="nav-item-content">
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  {expandedMenus[item.key] ? 
                    <ChevronDown size={16} /> : 
                    <ChevronRight size={16} />
                  }
                </button>
                {expandedMenus[item.key] && (
                  <div className="submenu">
                    {item.submenu.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.path}
                        className={`nav-item submenu-item ${isActive(subItem.path) ? 'active' : ''}`}
                      >
                        <subItem.icon size={18} />
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;