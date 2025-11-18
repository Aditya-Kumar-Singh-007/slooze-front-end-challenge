import React from 'react';
import Sidebar from '../components/Sidebar';
import { Construction } from 'lucide-react';

const PlaceholderPage = ({ title, description }) => {
  return (
    <>
      <Sidebar />
      <div className="products-page-content">
        <div className="container" style={{ padding: '40px 20px' }}>
          <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <Construction size={64} color="var(--text-muted)" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ marginBottom: '12px', color: 'var(--text-primary)' }}>{title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              {description || 'This page is under construction and will be available soon.'}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceholderPage;