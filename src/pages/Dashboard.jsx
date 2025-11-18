import React, { useState, useEffect } from 'react';
import { apiService, getChartData } from '../utils/mockData';
import { CategoryChart, StockLevelChart, TrendChart, PriceDistributionChart } from '../components/Charts';
import Navbar from '../components/Navbar';
import { Package, DollarSign, AlertTriangle, TrendingUp, Activity, Users, ShoppingCart, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        apiService.getStats(),
        apiService.getActivity()
      ]);
      
      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
      
      if (activityResponse.success) {
        setActivity(activityResponse.data);
      }
      
      setChartData(getChartData());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: '40px 20px' }}>
          <div className="animate-pulse">
            <div style={{ height: '40px', background: 'var(--border)', borderRadius: '8px', marginBottom: '30px' }}></div>
            <div className="stats-grid">
              {[1,2,3,4].map(i => (
                <div key={i} style={{ height: '120px', background: 'var(--border)', borderRadius: '16px' }}></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="animate-fade-in">
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Manager Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Welcome back! Here's what's happening with your commodities today.
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card animate-slide-in">
              <div className="stat-icon">
                <Package size={24} />
              </div>
              <div className="stat-value">{stats?.totalProducts || 0}</div>
              <div className="stat-label">Total Products</div>
              <div className="stat-change positive">
                <TrendingUp size={12} />
                +12% from last month
              </div>
            </div>
            
            <div className="stat-card success animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="stat-icon">
                <DollarSign size={24} />
              </div>
              <div className="stat-value">${(stats?.totalValue || 0).toLocaleString()}</div>
              <div className="stat-label">Total Inventory Value</div>
              <div className="stat-change positive">
                <TrendingUp size={12} />
                +8% from last month
              </div>
            </div>
            
            <div className="stat-card danger animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <div className="stat-icon">
                <AlertTriangle size={24} />
              </div>
              <div className="stat-value">{stats?.lowStockItems || 0}</div>
              <div className="stat-label">Low Stock Alerts</div>
              <div className="stat-change negative">
                <AlertTriangle size={12} />
                Needs attention
              </div>
            </div>
            
            <div className="stat-card warning animate-slide-in" style={{ animationDelay: '0.3s' }}>
              <div className="stat-icon">
                <BarChart3 size={24} />
              </div>
              <div className="stat-value">{stats?.categories || 0}</div>
              <div className="stat-label">Product Categories</div>
              <div className="stat-change positive">
                <TrendingUp size={12} />
                Well diversified
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="dashboard-grid">
            <div>
              {/* Category Distribution */}
              <div className="chart-container animate-fade-in" style={{ marginBottom: '24px' }}>
                <div className="chart-header">
                  <div>
                    <h3 className="chart-title">Stock by Category</h3>
                    <p className="chart-subtitle">Distribution of inventory across product categories</p>
                  </div>
                </div>
                {chartData && <CategoryChart data={chartData.categoryData} />}
              </div>

              {/* Trend Analysis */}
              <div className="chart-container animate-fade-in">
                <div className="chart-header">
                  <div>
                    <h3 className="chart-title">Sales & Stock Trends</h3>
                    <p className="chart-subtitle">Monthly performance overview</p>
                  </div>
                </div>
                {chartData && <TrendChart data={chartData.monthlyData} />}
              </div>
            </div>

            <div>
              {/* Stock Levels */}
              <div className="chart-container animate-fade-in" style={{ marginBottom: '24px' }}>
                <div className="chart-header">
                  <div>
                    <h3 className="chart-title">Stock Levels</h3>
                    <p className="chart-subtitle">Current inventory status</p>
                  </div>
                </div>
                {chartData && <StockLevelChart data={chartData.stockLevelData} />}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' }}>
                  {chartData?.stockLevelData.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: item.color }}></div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Distribution */}
              <div className="chart-container animate-fade-in">
                <div className="chart-header">
                  <div>
                    <h3 className="chart-title">Price Distribution</h3>
                    <p className="chart-subtitle">Products by price range</p>
                  </div>
                </div>
                {chartData && <PriceDistributionChart data={chartData.priceRangeData} />}
              </div>
            </div>
          </div>

          {/* Recent Activity & Quick Stats */}
          <div className="dashboard-grid">
            <div className="chart-container animate-fade-in">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Recent Activity</h3>
                  <p className="chart-subtitle">Latest updates and changes</p>
                </div>
                <Activity size={20} color="var(--primary)" />
              </div>
              <div className="recent-activity">
                {activity.map(item => (
                  <div key={item.id} className="activity-item">
                    <div className="activity-icon" style={{ 
                      backgroundColor: item.type === 'add' ? 'var(--success-light)' : 
                                     item.type === 'update' ? 'var(--warning-light)' : 
                                     item.type === 'delete' ? 'var(--danger-light)' : 'var(--info-light)',
                      color: item.type === 'add' ? 'var(--success)' : 
                             item.type === 'update' ? 'var(--warning)' : 
                             item.type === 'delete' ? 'var(--danger)' : 'var(--info)'
                    }}>
                      {item.icon}
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">{item.message}</div>
                      <div className="activity-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-container animate-fade-in">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Quick Insights</h3>
                  <p className="chart-subtitle">Key performance indicators</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Average Product Price</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      ${(stats?.avgPrice || 0).toFixed(2)}
                    </div>
                  </div>
                  <DollarSign size={24} color="var(--success)" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Stock Units</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      {(stats?.totalStock || 0).toLocaleString()}
                    </div>
                  </div>
                  <Package size={24} color="var(--primary)" />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Inventory Health</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: stats?.lowStockItems > 3 ? 'var(--danger)' : 'var(--success)' }}>
                      {stats?.lowStockItems > 3 ? 'Needs Attention' : 'Good'}
                    </div>
                  </div>
                  <AlertTriangle size={24} color={stats?.lowStockItems > 3 ? 'var(--danger)' : 'var(--success)'} />
                </div>
              </div>
            </div>
          </div>

          {/* System Overview */}
          <div className="card animate-fade-in" style={{ background: 'var(--gradient-primary)', color: 'white', marginTop: '32px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Commodities Management Overview</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
              <div>
                <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={20} />
                  Inventory Management
                </h4>
                <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                  Track and manage your commodity inventory with real-time updates and automated alerts.
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={20} />
                  Multi-Role Access
                </h4>
                <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                  Role-based permissions ensure secure access for managers and store keepers.
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BarChart3 size={20} />
                  Analytics & Insights
                </h4>
                <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                  Comprehensive analytics help you make informed decisions about your inventory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;