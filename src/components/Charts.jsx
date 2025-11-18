import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const CategoryChart = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || []);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive || !initialData) return;
    
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          value: Math.max(10, item.value + Math.floor((Math.random() - 0.5) * 20))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, initialData]);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
        >
          {isLive ? '🔴 LIVE' : '⏸️ PAUSED'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="category" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1000} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StockLevelChart = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || []);
  const [isLive, setIsLive] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (!isLive || !initialData) return;
    
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          count: Math.max(0, item.count + Math.floor((Math.random() - 0.5) * 4))
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive, initialData]);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(-1);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
        >
          {isLive ? '🔴 LIVE' : '⏸️ PAUSED'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={activeIndex >= 0 ? 110 : 100}
            paddingAngle={5}
            dataKey="count"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={activeIndex === index ? '#fff' : 'none'}
                strokeWidth={activeIndex === index ? 2 : 0}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrendChart = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || []);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive || !initialData) return;
    
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          sales: Math.max(500, item.sales + Math.floor((Math.random() - 0.5) * 400)),
          stock: Math.max(200, item.stock + Math.floor((Math.random() - 0.5) * 300))
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isLive, initialData]);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
        >
          {isLive ? '🔴 LIVE' : '⏸️ PAUSED'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--text-secondary)" />
          <YAxis stroke="var(--text-secondary)" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
          <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" animationDuration={1500} />
          <Area type="monotone" dataKey="stock" stroke="#10b981" fillOpacity={1} fill="url(#colorStock)" animationDuration={1500} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PriceDistributionChart = ({ data: initialData }) => {
  const [data, setData] = useState(initialData || []);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive || !initialData) return;
    
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          count: Math.max(0, item.count + Math.floor((Math.random() - 0.5) * 2))
        }))
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isLive, initialData]);

  useEffect(() => {
    if (initialData) setData(initialData);
  }, [initialData]);

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 10 }}>
        <button 
          onClick={() => setIsLive(!isLive)}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            cursor: 'pointer'
          }}
        >
          {isLive ? '🔴 LIVE' : '⏸️ PAUSED'}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="horizontal">
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" stroke="var(--text-secondary)" />
          <YAxis dataKey="range" type="category" stroke="var(--text-secondary)" />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-primary)'
            }}
          />
          <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} animationDuration={1200} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};