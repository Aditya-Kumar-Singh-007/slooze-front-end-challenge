import React, { useState, useEffect } from 'react';
import { apiService } from '../utils/mockData';
import Sidebar from '../components/Sidebar';
import ProductModal from '../components/ProductModal';
import { Package, Plus, Edit, Trash2, Search, Filter, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, filterCategory]);

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
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory) {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
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
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setDeleteLoading(id);
      try {
        const response = await apiService.deleteProduct(id);
        if (response.success) {
          await loadProducts();
        } else {
          alert('Failed to delete product: ' + response.error);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const getStockStatus = (stock) => {
    if (stock < 50) return { status: 'Low Stock', class: 'low-stock', color: 'var(--danger)' };
    if (stock < 150) return { status: 'Medium Stock', class: 'medium-stock', color: 'var(--warning)' };
    return { status: 'Good Stock', class: 'good-stock', color: 'var(--success)' };
  };

  const categories = [...new Set(products.map(product => product.category))];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container" style={{ padding: '40px 20px' }}>
          <div className="animate-pulse">
            <div style={{ height: '40px', background: 'var(--border)', borderRadius: '8px', marginBottom: '30px' }}></div>
            <div className="products-grid">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{ height: '200px', background: 'var(--border)', borderRadius: '16px' }}></div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="products-page-content">
        <div className="container" style={{ padding: '40px 20px' }}>
        <div className="animate-fade-in">
          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Products Management
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Manage your commodity inventory with ease
                </p>
              </div>
              <button onClick={handleAddProduct} className="btn btn-primary btn-lg">
                <Plus size={20} />
                Add New Product
              </button>
            </div>

            {/* Search and Filter */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
                <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Search products, categories, or suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <Filter size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Package size={24} color="var(--primary)" />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>{filteredProducts.length}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Products</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <DollarSign size={24} color="var(--success)" />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                      ${filteredProducts.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Total Value</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <AlertTriangle size={24} color="var(--danger)" />
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                      {filteredProducts.filter(p => p.stock < 50).length}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Low Stock</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map((product, index) => {
              const stockStatus = getStockStatus(product.stock);
              return (
                <div key={product.id} className="product-card animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="product-header">
                    <div className="product-name">{product.name}</div>
                    <div className={`product-badge ${stockStatus.class}`} style={{ color: stockStatus.color }}>
                      {stockStatus.status}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div className="product-category" style={{ marginBottom: '8px' }}>
                      📦 {product.category}
                    </div>
                    <div className="product-price">${product.price}</div>
                  </div>
                  
                  <div style={{ marginBottom: '16px', padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Stock:</span>
                      <span style={{ fontWeight: '600', color: stockStatus.color }}>{product.stock} units</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Supplier:</span>
                      <span style={{ fontSize: '0.9rem' }}>{product.supplier}</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="btn btn-danger btn-sm"
                      disabled={deleteLoading === product.id}
                      style={{ flex: 1 }}
                    >
                      {deleteLoading === product.id ? (
                        <div className="loading-spinner"></div>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredProducts.length === 0 && !loading && (
            <div className="card" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <Package size={64} color="var(--text-muted)" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ marginBottom: '12px' }}>
                {searchTerm || filterCategory ? 'No products match your search' : 'No products found'}
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                {searchTerm || filterCategory 
                  ? 'Try adjusting your search criteria or filters.' 
                  : 'Start by adding your first product to the inventory.'
                }
              </p>
              {!searchTerm && !filterCategory && (
                <button onClick={handleAddProduct} className="btn btn-primary">
                  <Plus size={20} />
                  Add Your First Product
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
      </>
    </>
  );
};

export default Products;