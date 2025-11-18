import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const LiveChart = ({ title = "Total Views", color = "var(--primary)" }) => {
  const [data, setData] = useState([
    { time: '00:00', views: 120 },
    { time: '04:00', views: 180 },
    { time: '08:00', views: 350 },
    { time: '12:00', views: 420 },
    { time: '16:00', views: 380 },
    { time: '20:00', views: 290 },
    { time: '24:00', views: 240 }
  ]);
  
  const [totalViews, setTotalViews] = useState(2847);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        const lastPoint = newData[newData.length - 1];
        const currentTime = new Date();
        const timeStr = currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        
        // Generate realistic fluctuation
        const baseValue = lastPoint.views;
        const fluctuation = (Math.random() - 0.5) * 50;
        const newValue = Math.max(50, Math.min(500, baseValue + fluctuation));
        
        // Keep only last 20 points for smooth animation
        if (newData.length >= 20) {
          newData.shift();
        }
        
        newData.push({
          time: timeStr,
          views: Math.round(newValue)
        });
        
        return newData;
      });
      
      // Update total views
      setTotalViews(prev => {
        const change = Math.floor((Math.random() - 0.4) * 10);
        return Math.max(1000, prev + change);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleLive = () => setIsLive(!isLive);

  return (
    <div className="live-chart" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)' }}>{title}</h3>
        <button 
          onClick={toggleLive}
          style={{
            background: isLive ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '0.7rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'currentColor',
            animation: isLive ? 'pulse 1s infinite' : 'none'
          }} />
          {isLive ? 'LIVE' : 'PAUSED'}
        </button>
      </div>
      
      <div className="chart-value" style={{ 
        fontSize: '1.8rem', 
        fontWeight: '700', 
        color: 'var(--text-primary)',
        marginBottom: '12px'
      }}>
        {totalViews.toLocaleString()}
      </div>
      
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '0.8rem'
            }}
            labelStyle={{ color: 'var(--text-primary)' }}
          />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default LiveChart;