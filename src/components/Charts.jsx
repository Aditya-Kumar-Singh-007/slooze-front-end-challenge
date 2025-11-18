import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const CategoryChart = ({ data }) => (
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
      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const StockLevelChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={5}
        dataKey="count"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
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
);

export const TrendChart = ({ data }) => (
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
      <Area type="monotone" dataKey="sales" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSales)" />
      <Area type="monotone" dataKey="stock" stroke="#10b981" fillOpacity={1} fill="url(#colorStock)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const PriceDistributionChart = ({ data }) => (
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
      <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} />
    </BarChart>
  </ResponsiveContainer>
);