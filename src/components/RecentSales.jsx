import React from 'react';
import { MoreVertical, TrendingUp } from 'lucide-react';

const RecentSales = () => {
  const recentSales = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      amount: '$1,234.00',
      status: 'completed',
      avatar: 'SJ'
    },
    {
      id: 2,
      customer: 'Michael Chen',
      email: 'michael@example.com',
      amount: '$856.00',
      status: 'pending',
      avatar: 'MC'
    },
    {
      id: 3,
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      amount: '$2,145.00',
      status: 'completed',
      avatar: 'EW'
    },
    {
      id: 4,
      customer: 'David Brown',
      email: 'david@example.com',
      amount: '$678.00',
      status: 'completed',
      avatar: 'DB'
    },
    {
      id: 5,
      customer: 'Lisa Garcia',
      email: 'lisa@example.com',
      amount: '$1,567.00',
      status: 'processing',
      avatar: 'LG'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'processing': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <div className="recent-sales">
      <div className="sales-header">
        <div>
          <h3>Recent Sales</h3>
          <p>Latest transactions and orders</p>
        </div>
        <button className="more-btn">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="sales-summary">
        <div className="summary-item">
          <span className="summary-label">Total Sales Today</span>
          <span className="summary-value">$12,847</span>
          <span className="summary-trend">
            <TrendingUp size={14} />
            +8.2%
          </span>
        </div>
      </div>

      <div className="sales-list">
        {recentSales.map((sale) => (
          <div key={sale.id} className="sale-item">
            <div className="customer-info">
              <div className="customer-avatar">
                {sale.avatar}
              </div>
              <div className="customer-details">
                <span className="customer-name">{sale.customer}</span>
                <span className="customer-email">{sale.email}</span>
              </div>
            </div>
            <div className="sale-details">
              <span className="sale-amount">{sale.amount}</span>
              <span className={`sale-status ${getStatusColor(sale.status)}`}>
                {sale.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn">
        View All Sales
      </button>
    </div>
  );
};

export default RecentSales;