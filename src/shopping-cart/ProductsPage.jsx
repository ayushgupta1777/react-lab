import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ShoppingCart.css';

export default function ProductsPage() {
  const { addToCart, openCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please check your network connection or try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Process sorting and filtering
  const processedProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating.rate - a.rating.rate;
      return 0; // default (no sort)
    });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('');
  };

  return (
    <div className="store-container">
      {/* Header Info */}
      <div className="store-header">
        <div className="store-title-area">
          <h2>Antigravity Store</h2>
          <p>Discover high-quality items curated just for you.</p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar">
        {/* Search */}
        <div className="search-input-wrapper">
          <span className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            id="product-search"
          />
        </div>

        {/* Category Select */}
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by Category"
          id="category-filter"
        >
          <option value="" disabled hidden>Filter by Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort Select */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          aria-label="Sort products"
          id="sort-filter"
        >
          <option value="" disabled hidden>Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
        </select>

        {/* Reset */}
        {(searchQuery || selectedCategory || sortBy) && (
          <button className="reset-filters-btn" onClick={handleResetFilters} id="btn-reset-filters">
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Presentation */}
      {loading ? (
        // Loading Skeletons
        <div className="products-grid">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="product-card skeleton-card">
              <div className="skeleton-image skeleton-pulse" />
              <div className="product-card-content">
                <div className="skeleton-text skeleton-title skeleton-pulse" />
                <div className="skeleton-text skeleton-pulse" style={{ width: '40%' }} />
                <div className="product-card-footer" style={{ border: 'none', paddingTop: '1rem' }}>
                  <div className="skeleton-price skeleton-pulse" />
                  <div className="skeleton-btn skeleton-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="panel" style={{ textAlign: 'center', padding: '3rem 1.5rem', borderColor: 'var(--danger)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--danger)' }}>⚠️</div>
          <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Oops! Something went wrong</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : processedProducts.length === 0 ? (
        <div className="panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
          <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>No Products Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any products matching your current search filters.</p>
          <button className="btn btn-secondary" style={{ marginTop: '1.25rem' }} onClick={handleResetFilters}>Clear Filters</button>
        </div>
      ) : (
        // Render Product Cards
        <div className="products-grid" id="products-list-grid">
          {processedProducts.map((product) => (
            <div key={product.id} className="product-card" id={`product-card-${product.id}`}>
              <div className="product-card-image-wrapper">
                <Link to={`/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-card-image"
                    loading="lazy"
                  />
                </Link>
                <div className="product-card-badge">{product.category}</div>
              </div>

              <div className="product-card-content">
                {/* Ratings */}
                <div className="product-card-rating">
                  <span>★</span>
                  <span>{product.rating?.rate || 0}</span>
                  <span className="product-card-rating-count">({product.rating?.count || 0})</span>
                </div>

                {/* Title */}
                <Link
                  to={`/${product.id}`}
                  className="product-card-title"
                  title={product.title}
                  id={`product-link-${product.id}`}
                >
                  {product.title}
                </Link>

                {/* Footer details */}
                <div className="product-card-footer">
                  <div className="product-card-price">${product.price.toFixed(2)}</div>
                  <button
                    className="btn-add-cart"
                    onClick={() => {
                      addToCart(product);
                      openCart();
                    }}
                    id={`btn-add-to-cart-${product.id}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
