import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatsCards from '../components/StatsCards';
import ChartsSection from '../components/ChartsSection';
import RecentSales from '../components/RecentSales';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Tooltip, Area, AreaChart } from 'recharts';
import { Search, Menu, Zap, TrendingUp, Activity } from 'lucide-react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const dashboardRef = useRef(null);
  const [overviewData, setOverviewData] = useState([
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 }, { name: 'Aug', value: 2000 }, { name: 'Sep', value: 2780 },
    { name: 'Oct', value: 1890 }, { name: 'Nov', value: 2390 }, { name: 'Dec', value: 3490 }
  ]);

  const [earningsData, setEarningsData] = useState([{ name: 'Jan', value: 2400 }, { name: 'Feb', value: 1398 }, { name: 'Mar', value: 9800 }]);
  const [salesData, setSalesData] = useState([{ name: 'W1', value: 1200 }, { name: 'W2', value: 1900 }, { name: 'W3', value: 1700 }]);
  const [subscriptionData, setSubscriptionData] = useState([{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 500 }]);
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
    

    
    const interval = setInterval(() => {
      setOverviewData(prev => prev.map(item => ({
        ...item,
        value: Math.max(1000, item.value + Math.floor((Math.random() - 0.5) * 400))
      })));
      
      setEarningsData(prev => prev.map(item => ({
        ...item,
        value: Math.max(500, item.value + Math.floor((Math.random() - 0.5) * 200))
      })));
      
      setSalesData(prev => prev.map(item => ({
        ...item,
        value: Math.max(800, item.value + Math.floor((Math.random() - 0.5) * 150))
      })));
      
      setSubscriptionData(prev => prev.map(item => ({
        ...item,
        value: Math.max(200, item.value + Math.floor((Math.random() - 0.5) * 50))
      })));
    }, 2500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <Zap size={48} className="loading-icon" />
          </div>
          <div className="loading-text">Loading Dashboard...</div>
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  const topProducts = [
    { name: 'Product A', amount: '$1,234' },
    { name: 'Product B', amount: '$987' },
    { name: 'Product C', amount: '$756' }
  ];

  const paymentHistory = [
    { date: '2024-01-15', customer: 'John Doe', amount: '$234' },
    { date: '2024-01-14', customer: 'Jane Smith', amount: '$156' }
  ];

  return (
    <div className="analytics-dashboard" ref={dashboardRef}>
      {/* Particle Background */}
      <div className="particle-background">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>
      

      
      <Sidebar className={sidebarOpen ? 'mobile-open' : ''} />
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="dashboard-main">
        <div className="top-header">
          <div className="header-left">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={20} />
            </button>
            <div className="search-section">
              <div className="search-bar">
                <Search size={20} />
                <input type="text" placeholder="Search..." className="search-input" />
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <TopBar />
          </div>
        </div>
        
        <div className="dashboard-content">
          {/* Welcome Banner */}
          <div className="welcome-banner">
            <div className="welcome-content">
              <div className="welcome-text">
                <h2>Welcome back, Manager! 👋</h2>
                <p>Here's what's happening with your business today</p>
              </div>
              <div className="welcome-stats">
                <div className="quick-stat">
                  <TrendingUp size={20} />
                  <span>+23.5% Growth</span>
                </div>
                <div className="quick-stat">
                  <Activity size={20} />
                  <span>Live Updates</span>
                </div>
              </div>
            </div>
          </div>
          
          <StatsCards />
          
          <div className="dashboard-body">
            <div className="charts-section">
              <div className="chart-container">
                <div className="chart-header">
                  <h3>Overview</h3>
                  <p>Monthly performance metrics</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={overviewData}>
                    <defs>
                      <linearGradient id="overviewGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6d28d9" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(30, 64, 175, 0.2)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        color: '#0f172a'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1e40af" 
                      strokeWidth={3}
                      fill="url(#overviewGradient)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <RecentSales />
          </div>

          <div className="stats-controls">
            <div className="control-group">
              <label>Year</label>
              <select className="enhanced-select">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="control-group">
              <label>Period</label>
              <select className="enhanced-select">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
            </div>
            <div className="control-group">
              <label>Compare</label>
              <select className="enhanced-select">
                <option>Previous Period</option>
                <option>Same Period Last Year</option>
              </select>
            </div>
          </div>

          <div className="stats-charts">
            <div className="chart-widget">
              <h4>Earnings</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={earningsData}>
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#047857" strokeWidth={3} animationDuration={1200} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-widget">
              <h4>Weekly Sales</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <Tooltip />
                  <Bar dataKey="value" fill="#6d28d9" animationDuration={1000} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-widget">
              <h4>Subscriptions</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={subscriptionData}>
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#b45309" strokeWidth={3} animationDuration={1200} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bottom-widgets">
            <div className="widget">
              <h4>Total Earnings</h4>
              <div className="widget-value">$112,893</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={earningsData}>
                  <Line type="monotone" dataKey="value" stroke="#047857" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Total Sales</h4>
              <div className="widget-value">2,847</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Total Views</h4>
              <div className="widget-value">1.2M</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={subscriptionData}>
                  <Line type="monotone" dataKey="value" stroke="#6d28d9" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Subscription Performers</h4>
              <div className="widget-value">+500</div>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={subscriptionData}>
                  <Bar dataKey="value" fill="#b45309" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Top Selling Products</h4>
              {topProducts.map((product, i) => (
                <div key={i} className="product-row">
                  <span>📦 {product.name}</span>
                  <span>{product.amount}</span>
                </div>
              ))}
            </div>
            <div className="widget">
              <h4>Payment History</h4>
              {paymentHistory.map((payment, i) => (
                <div key={i} className="payment-row">
                  <div>{payment.customer}</div>
                  <div>{payment.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;