import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatsCards from '../components/StatsCards';
import ChartsSection from '../components/ChartsSection';
import RecentSales from '../components/RecentSales';
import Footer from '../components/Footer';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Search, ChevronDown } from 'lucide-react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = () => {
  const overviewData = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 }, { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 }, { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 }, { name: 'Aug', value: 2000 }, { name: 'Sep', value: 2780 },
    { name: 'Oct', value: 1890 }, { name: 'Nov', value: 2390 }, { name: 'Dec', value: 3490 }
  ];

  const earningsData = [{ name: 'Jan', value: 2400 }, { name: 'Feb', value: 1398 }, { name: 'Mar', value: 9800 }];
  const salesData = [{ name: 'W1', value: 1200 }, { name: 'W2', value: 1900 }, { name: 'W3', value: 1700 }];
  const subscriptionData = [{ name: 'Jan', value: 400 }, { name: 'Feb', value: 300 }, { name: 'Mar', value: 500 }];

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
    <div className="analytics-dashboard">
      <Sidebar />
      <div className="dashboard-main">
        <div className="header-bar">
          <div className="search-wrapper">
            <Search size={20} />
            <input type="text" placeholder="Search..." className="header-search" />
          </div>
          <TopBar />
        </div>
        
        <div className="dashboard-content">
          <StatsCards />
          
          <div className="overview-section">
            <div className="overview-chart">
              <h3>Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={overviewData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <RecentSales />
          </div>

          <div className="stats-controls">
            <select><option>2024</option></select>
            <select><option>This Week</option></select>
            <select><option>Compare to 2023</option></select>
          </div>

          <div className="stats-charts">
            <div className="chart-widget">
              <h4>Earnings</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={earningsData}>
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-widget">
              <h4>Weekly Sales</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData}>
                  <Bar dataKey="value" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-widget">
              <h4>Subscriptions</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={subscriptionData}>
                  <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
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
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Total Sales</h4>
              <div className="widget-value">2,847</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={salesData}>
                  <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Total Views</h4>
              <div className="widget-value">1.2M</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={subscriptionData}>
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="widget">
              <h4>Subscription Performers</h4>
              <div className="widget-value">+500</div>
              <ResponsiveContainer width="100%" height={60}>
                <BarChart data={subscriptionData}>
                  <Bar dataKey="value" fill="#f59e0b" />
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