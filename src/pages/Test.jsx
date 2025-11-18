import React, { useState, useEffect } from 'react';
import { apiService } from '../utils/mockData';

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await apiService.getProducts();
        console.log('API Response:', response);
        if (response.success) {
          setProducts(response.data);
          console.log('Products loaded:', response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page - Products Count: {products.length}</h1>
      <div>
        <h2>Published Products:</h2>
        {products.filter(p => p.status === 'published').map(p => (
          <div key={p.id}>{p.name} - {p.status}</div>
        ))}
        
        <h2>Draft Products:</h2>
        {products.filter(p => p.status === 'draft').map(p => (
          <div key={p.id}>{p.name} - {p.status}</div>
        ))}
      </div>
    </div>
  );
};

export default Test;