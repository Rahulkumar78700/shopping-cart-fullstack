import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { toast } from 'react-toastify';

const ItemsList = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchItems();
    fetchCategories();
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      if (sortBy) params.append('sort', sortBy);
      if (priceRange.min) params.append('min_price', priceRange.min);
      if (priceRange.max) params.append('max_price', priceRange.max);

      const response = await api.get(`/items?${params.toString()}`);
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const addToCart = async (itemId) => {
    try {
      await api.post('/carts', { item_id: itemId });
      toast.success('Item added to cart!');
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const viewCart = () => {
    navigate('/cart');
  };

  const viewOrderHistory = () => {
    navigate('/orders');
  };

  const checkout = () => {
    navigate('/checkout');
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
    setPriceRange({ min: '', max: '' });
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>🛍️ ShopHub</h1>
          <div className="header-buttons">
            <button className="btn btn-success" onClick={checkout}>
              Checkout
            </button>
            <button className="btn btn-info" onClick={viewCart}>
              Cart
            </button>
            <button className="btn btn-info" onClick={viewOrderHistory}>
              Orders
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/profile')}>
              Profile
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
          
          <div className="filters">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name_asc">Name: A to Z</option>
              <option value="name_desc">Name: Z to A</option>
            </select>
            
            <div className="price-range">
              <input
                type="number"
                placeholder="Min Price"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="price-input"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max Price"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="price-input"
              />
            </div>
            
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <h2>Products ({items.length} items)</h2>
          {selectedCategory && <span className="category-badge">{selectedCategory}</span>}
        </div>

        {/* Items Grid */}
        <div className="items-grid">
          {items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                <img src={item.image_url} alt={item.name} />
                <div className="item-category">{item.category}</div>
              </div>
              <div className="item-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="item-details">
                  <div className="price">${item.price.toFixed(2)}</div>
                  <div className="stock">In Stock: {item.stock}</div>
                </div>
                <button 
                  className="btn btn-primary add-to-cart-btn" 
                  onClick={() => addToCart(item.id)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="no-results">
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemsList; 