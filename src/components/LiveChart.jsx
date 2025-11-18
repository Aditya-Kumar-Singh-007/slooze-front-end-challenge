import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const LiveChart = () => {
  const data = [
    { time: '00:00', views: 120 },
    { time: '04:00', views: 180 },
    { time: '08:00', views: 350 },
    { time: '12:00', views: 420 },
    { time: '16:00', views: 380 },
    { time: '20:00', views: 290 },
    { time: '24:00', views: 240 }
  ];

  return (
    <div className="live-chart">
      <h3>Total Views</h3>
      <div className="chart-value">2,847</div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis hide />
          <Line 
            type="monotone" 
            dataKey="views" 
            stroke="var(--primary)" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;