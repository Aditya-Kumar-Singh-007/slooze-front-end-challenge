import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { apiService } from '../utils/mockData';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import ProductModal from '../components/ProductModal';
import { Search, Filter, Download, Edit, Trash2, Eye, Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [activeTab, setActiveTab] = useState('published');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  
  const itemsPerPage = 5;
  const chartData = [
    { name: 'Nov', value: 12000 },
    { name: 'Dec', value: 14000 }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, activeTab, filterCategory]);

  const loadProducts = async () => {
    try {
      const response = await apiService.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;
    
    // Filter by tab
    filtered = filtered.filter(product => 
      activeTab === 'published' ? product.status === 'published' : product.status === 'draft'
    );
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (filterCategory) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    
    setFilteredProducts(filtered);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (productData) => {
    try {
      if (editingProduct) {
        await apiService.updateProduct(editingProduct.id, productData);
      } else {
        await apiService.addProduct(productData);
      }
      await loadProducts();
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    const currentPageProducts = getCurrentPageProducts();
    const allSelected = currentPageProducts.every(p => selectedProducts.includes(p.id));
    
    if (allSelected) {
      setSelectedProducts(prev => prev.filter(id => !currentPageProducts.map(p => p.id).includes(id)));
    } else {
      setSelectedProducts(prev => [...new Set([...prev, ...currentPageProducts.map(p => p.id)])]);
    }
  };

  const handleDownload = () => {
    const csvContent = filteredProducts.map(p => 
      `${p.name},${p.category},${p.price},${p.status}`
    ).join('\n');
    
    const blob = new Blob([`Name,Category,Price,Status\n${csvContent}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.csv';
    a.click();
  };

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentPageProducts = getCurrentPageProducts();

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setDeleteLoading(id);
      try {
        await apiService.deleteProduct(id);
        await loadProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="products-page-layout">
          <div className="products-header">
            <div className="search-wrapper">
              <Search size={20} />
              <input type="text" placeholder="Search products..." className="header-search" disabled />
            </div>
            <TopBar />
          </div>
          <div className="products-content">
            <div className="loading-spinner" style={{ margin: '50px auto' }}></div>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="products-page-layout">
        <div className="products-header">
          <div className="search-wrapper">
            <Search size={20} />
            <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="header-search" />
          </div>
          <div className="header-right">
            <TopBar />
            <button className="btn btn-primary" onClick={() => navigate('/products/add')}>
              <Plus size={16} />
              Add New Product
            </button>
          </div>
        </div>
        
        <div className="products-content">
          <div className="title-row">
            <div className="title-section">
              <h1>Product</h1>
              <div className="tabs">
                <button className={`tab ${activeTab === 'published' ? 'active' : ''}`} onClick={() => setActiveTab('published')}>Published</button>
                <button className={`tab ${activeTab === 'draft' ? 'active' : ''}`} onClick={() => setActiveTab('draft')}>Draft</button>
              </div>
            </div>
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={() => setShowFilter(!showFilter)}>
                <Filter size={16} />Filter
              </button>
              <button className="btn btn-secondary" onClick={handleDownload}>
                <Download size={16} />Download
              </button>
            </div>
          </div>

          {showFilter && (
            <div className="filter-panel">
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="food">Food</option>
                <option value="books">Books</option>
              </select>
            </div>
          )}

          <div className="products-layout">
            <div className="products-main">
              <div className="products-table-container">
                <table className="products-table">
                  <thead>
                    <tr>
                      <th>
                        <input 
                          type="checkbox" 
                          checked={currentPageProducts.length > 0 && currentPageProducts.every(p => selectedProducts.includes(p.id))}
                          onChange={handleSelectAll}
                        />
                      </th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Views</th>
                      <th>Pricing</th>
                      <th>Revenue</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPageProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                          {activeTab === 'published' ? 'No published products found' : 'No draft products found'}
                        </td>
                      </tr>
                    ) : (
                      currentPageProducts.map((product, index) => (
                      <motion.tr 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                          />
                        </td>
                        <td><div className="product-thumbnail">📦</div></td>
                        <td>
                          <div className="product-name">{product.name}</div>
                          <div className="product-placeholder">{product.category}</div>
                        </td>
                        <td>{product.views || (Math.floor(Math.random() * 20) + 5) * 1000}</td>
                        <td>${product.price}</td>
                        <td>${((product.price * (product.views || 1000)) / 10).toLocaleString()}</td>
                        <td>
                          <div className="manage-actions">
                            <button onClick={() => handleEditProduct(product)} className="action-btn edit"><Edit size={14} /></button>
                            <button onClick={() => handleDeleteProduct(product.id)} className="action-btn delete" disabled={deleteLoading === product.id}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page} 
                    className={`page-btn ${currentPage === page ? 'active' : ''}`} 
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-sidebar">
              <div className="stats-widget">
                <h3>Total Views</h3>
                <div className="stats-value">14,000</div>
                <div className="stats-growth">
                  <TrendingUp size={16} />
                  <span>+12.5%</span>
                </div>
                <div className="stats-chart">
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={chartData}>
                      <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
      
      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveProduct} product={editingProduct} />
    </>
  );
};

export default Products;