// Mock products data
export let mockProducts = [
  { id: 1, name: 'Premium Coffee Beans', category: 'food', price: 24.99, stock: 150, status: 'published', views: 14500, supplier: 'Global Coffee Co.', lastUpdated: '2024-01-15' },
  { id: 2, name: 'Organic Wheat Flour', category: 'food', price: 8.50, stock: 200, status: 'published', views: 8200, supplier: 'Farm Fresh Ltd.', lastUpdated: '2024-01-14' },
  { id: 3, name: 'Raw Sugar', category: 'food', price: 12.30, stock: 45, status: 'draft', views: 0, supplier: 'Sweet Harvest Inc.', lastUpdated: '2024-01-13' },
  { id: 4, name: 'Extra Virgin Olive Oil', category: 'food', price: 18.75, stock: 80, status: 'published', views: 12300, supplier: 'Mediterranean Oils', lastUpdated: '2024-01-12' },
  { id: 5, name: 'Basmati Rice', category: 'food', price: 15.60, stock: 250, status: 'published', views: 9800, supplier: 'Rice Masters', lastUpdated: '2024-01-11' },
  { id: 6, name: 'Wireless Headphones', category: 'electronics', price: 89.99, stock: 35, status: 'published', views: 22100, supplier: 'Tech World', lastUpdated: '2024-01-10' },
  { id: 7, name: 'Cotton T-Shirt', category: 'clothing', price: 19.99, stock: 180, status: 'published', views: 15600, supplier: 'Fashion Hub', lastUpdated: '2024-01-09' },
  { id: 8, name: 'Programming Guide', category: 'books', price: 34.99, stock: 25, status: 'draft', views: 0, supplier: 'Book Store', lastUpdated: '2024-01-08' },
  { id: 9, name: 'Smartphone Case', category: 'electronics', price: 16.80, stock: 120, status: 'published', views: 18700, supplier: 'Mobile Accessories', lastUpdated: '2024-01-07' },
  { id: 10, name: 'Denim Jeans', category: 'clothing', price: 59.99, stock: 90, status: 'draft', views: 0, supplier: 'Denim Co.', lastUpdated: '2024-01-06' }
];

// Mock activity data
export const mockActivity = [
  { id: 1, type: 'add', message: 'Added new product: Premium Coffee Beans', time: '2 hours ago', icon: '➕' },
  { id: 2, type: 'update', message: 'Updated stock for Organic Wheat Flour', time: '4 hours ago', icon: '📝' },
  { id: 3, type: 'delete', message: 'Removed expired product: Old Spices', time: '6 hours ago', icon: '🗑️' },
  { id: 4, type: 'alert', message: 'Low stock alert: Raw Sugar (45 units)', time: '8 hours ago', icon: '⚠️' },
  { id: 5, type: 'add', message: 'Added new supplier: Mediterranean Oils', time: '1 day ago', icon: '🏢' }
];

// Calculate dynamic statistics
const calculateStats = () => {
  const totalProducts = mockProducts.length;
  const totalValue = mockProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);
  const lowStockItems = mockProducts.filter(product => product.stock < 50).length;
  const categories = [...new Set(mockProducts.map(product => product.category))].length;
  const avgPrice = totalValue / mockProducts.reduce((sum, product) => sum + product.stock, 0);
  
  return {
    totalProducts,
    totalValue,
    lowStockItems,
    categories,
    avgPrice,
    totalStock: mockProducts.reduce((sum, product) => sum + product.stock, 0)
  };
};

// Chart data for dashboard
export const getChartData = () => {
  const categoryData = mockProducts.reduce((acc, product) => {
    const existing = acc.find(item => item.category === product.category);
    if (existing) {
      existing.value += product.stock;
      existing.products += 1;
    } else {
      acc.push({
        category: product.category,
        value: product.stock,
        products: 1
      });
    }
    return acc;
  }, []);

  const priceRangeData = [
    { range: '$0-10', count: mockProducts.filter(p => p.price <= 10).length },
    { range: '$10-20', count: mockProducts.filter(p => p.price > 10 && p.price <= 20).length },
    { range: '$20+', count: mockProducts.filter(p => p.price > 20).length }
  ];

  const stockLevelData = [
    { level: 'Low Stock', count: mockProducts.filter(p => p.stock < 50).length, color: '#ef4444' },
    { level: 'Medium Stock', count: mockProducts.filter(p => p.stock >= 50 && p.stock < 150).length, color: '#f59e0b' },
    { level: 'High Stock', count: mockProducts.filter(p => p.stock >= 150).length, color: '#10b981' }
  ];

  const monthlyData = [
    { month: 'Jan', sales: 4000, stock: 2400 },
    { month: 'Feb', sales: 3000, stock: 1398 },
    { month: 'Mar', sales: 2000, stock: 9800 },
    { month: 'Apr', sales: 2780, stock: 3908 },
    { month: 'May', sales: 1890, stock: 4800 },
    { month: 'Jun', sales: 2390, stock: 3800 }
  ];

  return {
    categoryData,
    priceRangeData,
    stockLevelData,
    monthlyData
  };
};

// API simulation functions
export const apiService = {
  delay: (ms = 300) => new Promise(resolve => setTimeout(resolve, ms)),

  getProducts: async () => {
    await apiService.delay(100);
    return { success: true, data: [...mockProducts] };
  },

  getStats: async () => {
    await apiService.delay();
    return { success: true, data: calculateStats() };
  },

  getActivity: async () => {
    await apiService.delay(300);
    return { success: true, data: mockActivity };
  },

  addProduct: async (product) => {
    await apiService.delay();
    const newProduct = {
      ...product,
      id: Math.max(...mockProducts.map(p => p.id)) + 1,
      status: 'draft',
      views: 0,
      stock: parseInt(product.stock) || 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    mockProducts.push(newProduct);
    
    // Add activity
    mockActivity.unshift({
      id: Date.now(),
      type: 'add',
      message: `Added new product: ${newProduct.name}`,
      time: 'Just now',
      icon: '➕'
    });
    
    return { success: true, data: newProduct };
  },

  updateProduct: async (id, updates) => {
    await apiService.delay();
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { 
        ...mockProducts[index], 
        ...updates,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      // Add activity
      mockActivity.unshift({
        id: Date.now(),
        type: 'update',
        message: `Updated product: ${mockProducts[index].name}`,
        time: 'Just now',
        icon: '📝'
      });
      
      return { success: true, data: mockProducts[index] };
    }
    return { success: false, error: 'Product not found' };
  },

  deleteProduct: async (id) => {
    await apiService.delay();
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      const deletedProduct = mockProducts[index];
      mockProducts.splice(index, 1);
      
      // Add activity
      mockActivity.unshift({
        id: Date.now(),
        type: 'delete',
        message: `Deleted product: ${deletedProduct.name}`,
        time: 'Just now',
        icon: '🗑️'
      });
      
      return { success: true };
    }
    return { success: false, error: 'Product not found' };
  }
};