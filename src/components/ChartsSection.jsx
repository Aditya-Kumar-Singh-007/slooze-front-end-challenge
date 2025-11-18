import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';

const ChartsSection = () => {
  const [barData, setBarData] = useState([
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 }
  ]);

  const [lineData, setLineData] = useState([
    { name: 'Week 1', users: 1200, sessions: 2400 },
    { name: 'Week 2', users: 1900, sessions: 1398 },
    { name: 'Week 3', users: 1700, sessions: 9800 },
    { name: 'Week 4', users: 2200, sessions: 3908 }
  ]);

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setBarData(prev => prev.map(item => ({
        ...item,
        sales: Math.max(1000, item.sales + Math.floor((Math.random() - 0.5) * 500)),
        revenue: Math.max(500, item.revenue + Math.floor((Math.random() - 0.5) * 300))
      })));
      
      setLineData(prev => prev.map(item => ({
        ...item,
        users: Math.max(800, item.users + Math.floor((Math.random() - 0.5) * 200)),
        sessions: Math.max(1000, item.sessions + Math.floor((Math.random() - 0.5) * 400))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="charts-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Live Analytics Dashboard</h2>
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            animation: isLive ? 'pulse 1s infinite' : 'none'
          }} />
          {isLive ? 'LIVE DATA' : 'PAUSED'}
        </button>
      </div>
      
      <div className="chart-container" style={{ position: 'relative' }}>
        <div className="chart-header">
          <h3>Revenue Overview</h3>
          <p>Monthly sales and revenue comparison</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1000} />
            <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container" style={{ position: 'relative' }}>
        <div className="chart-header">
          <h3>User Analytics</h3>
          <p>Weekly user engagement trends</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={lineData}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
            <Area type="monotone" dataKey="users" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={2} animationDuration={1500} />
            <Area type="monotone" dataKey="sessions" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSessions)" strokeWidth={2} animationDuration={1500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default ChartsSection;