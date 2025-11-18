import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';
import { apiService } from '../utils/mockData';
import { Search, Upload, X, Save } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    tags: '',
    price: '',
    discount: '',
    discountCategory: '',
    stock: ''
  });
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (file, type) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'preview') {
          setPreviewImage(e.target.result);
        } else {
          setThumbnailImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file, type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert('Please fill in required fields: Name, Category, and Price');
      return;
    }
    
    setSaving(true);
    try {
      await apiService.addProduct({
        ...formData,
        price: parseFloat(formData.price) || 0,
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock) || 0
      });
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      navigate('/products');
    }
  };

  return (
    <div className="add-product-page">
      <Sidebar />
      <div className="add-product-main">
        <div className="add-product-header">
          <div className="search-wrapper">
            <Search size={20} />
            <input type="text" placeholder="Search..." className="header-search" />
          </div>
          <div className="header-right">
            <TopBar />
            <button className="btn btn-primary">
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        <div className="add-product-content">
          <div className="page-header">
            <h1>Add New Product</h1>
            <div className="page-actions">
              <button className="btn btn-danger" onClick={handleDiscard}>
                <X size={16} />
                Discard Changes
              </button>
              <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                <Save size={16} />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="form-layout">
            <div className="form-left">
              <div className="form-card">
                <div className="form-section">
                  <h3>General Information</h3>
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Product Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select category</option>
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="food">Food</option>
                      <option value="books">Books</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="4"
                      placeholder="Enter product description"
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag Keywords</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter tags separated by commas"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Pricing</h3>
                  <div className="form-group">
                    <label>Pricing</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount</label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount Category</label>
                    <select
                      name="discountCategory"
                      value={formData.discountCategory}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="">Select discount type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="seasonal">Seasonal</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-right">
              <div className="upload-section">
                <div 
                  className="upload-box"
                  onDrop={(e) => handleDrop(e, 'preview')}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('preview-file').click()}
                >
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="upload-preview" />
                  ) : (
                    <>
                      <Upload size={32} />
                      <h4>Preview Image Upload</h4>
                      <p>Drag and drop your image here or click to browse</p>
                    </>
                  )}
                  <input 
                    id="preview-file"
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileSelect(e.target.files[0], 'preview')}
                  />
                </div>
                <div 
                  className="upload-box upload-small"
                  onDrop={(e) => handleDrop(e, 'thumbnail')}
                  onDragOver={handleDragOver}
                  onClick={() => document.getElementById('thumbnail-file').click()}
                >
                  {thumbnailImage ? (
                    <img src={thumbnailImage} alt="Thumbnail" className="upload-preview" />
                  ) : (
                    <>
                      <Upload size={24} />
                      <h4>Thumbnail Image</h4>
                      <p>Drag and drop your image here or click to browse</p>
                    </>
                  )}
                  <input 
                    id="thumbnail-file"
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileSelect(e.target.files[0], 'thumbnail')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AddProduct;