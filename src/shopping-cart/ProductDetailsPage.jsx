import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ShoppingCart.css';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch specific product
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`Product not found (Status: ${response.status})`);
        }
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          throw new Error('Product details are empty.');
        }
        setProduct(data);
        setQuantity(1); // Reset quantity selector for new product

        // Fetch related products (same category)
        try {
          const categoryResponse = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
          if (categoryResponse.ok) {
            const catData = await categoryResponse.json();
            // Filter out current product and slice to top 4 related products
            const filtered = catData.filter(p => p.id !== data.id).slice(0, 4);
            setRelatedProducts(filtered);
          }
        } catch (catErr) {
          console.warn('Could not load related products:', catErr);
        }

      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError(err.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  if (loading) {
    return (
      <div className="store-container">
        {/* Back Link skeleton */}
        <div className="skeleton-btn skeleton-pulse" style={{ width: '120px', height: '38px', marginBottom: '1.5rem' }} />
        
        <div className="detail-layout">
          {/* Image Panel skeleton */}
          <div className="detail-image-panel skeleton-pulse" style={{ minHeight: '400px', background: 'transparent' }} />
          
          {/* Details Panel skeleton */}
          <div className="detail-info-panel">
            <div className="skeleton-text skeleton-pulse" style={{ width: '25%', height: '1.25rem' }} />
            <div className="skeleton-text skeleton-pulse" style={{ width: '90%', height: '2.5rem', marginBottom: '1rem' }} />
            <div className="skeleton-text skeleton-pulse" style={{ width: '30%', height: '2rem', marginBottom: '1rem' }} />
            <div className="skeleton-text skeleton-pulse" style={{ height: '4rem' }} />
            <div className="detail-purchase-row" style={{ background: 'transparent', border: 'none', padding: 0 }}>
              <div className="skeleton-text skeleton-pulse" style={{ width: '30%', height: '3rem' }} />
              <div className="skeleton-btn skeleton-pulse" style={{ width: '60%', height: '3rem' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-container">
        <Link to="/" className="detail-back-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shop
        </Link>
        <div className="panel" style={{ textAlign: 'center', padding: '3rem 1.5rem', borderColor: 'var(--danger)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--danger)' }}>⚠️</div>
          <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>Error Loading Product</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>{error}</p>
          <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Return to Shop</Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="store-container">
      {/* Back button */}
      <Link to="/" className="detail-back-link" id="btn-back-to-shop">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Shop
      </Link>

      {/* Main product card details layout */}
      <div className="detail-layout" id={`product-details-${product.id}`}>
        {/* Left image column */}
        <div className="detail-image-panel">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>

        {/* Right info column */}
        <div className="detail-info-panel">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="detail-meta">
            {product.rating && (
              <div className="detail-rating">
                <span>★ {product.rating.rate}</span>
                <span className="detail-rating-count">({product.rating.count} reviews)</span>
              </div>
            )}
            <div className="detail-price">${product.price.toFixed(2)}</div>
          </div>

          <div>
            <h2 className="detail-desc-title">Description</h2>
            <p className="detail-description">{product.description}</p>
          </div>

          {/* Quantity selector and Add-to-cart */}
          <div className="detail-purchase-row">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className="detail-qty-label">Quantity</span>
              <div className="quantity-control">
                <button className="quantity-btn" onClick={handleDecrement} id="qty-decrement" aria-label="Decrease quantity">-</button>
                <span className="quantity-val" id="qty-val-display">{quantity}</span>
                <button className="quantity-btn" onClick={handleIncrement} id="qty-increment" aria-label="Increase quantity">+</button>
              </div>
            </div>
            
            <button
              className="btn btn-primary detail-add-btn"
              onClick={() => {
                addToCart(product, quantity);
                openCart();
              }}
              id={`btn-add-to-cart-detail-${product.id}`}
            >
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related items section */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2 className="related-section-title">Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <div key={p.id} className="product-card" id={`product-card-${p.id}`}>
                <div className="product-card-image-wrapper">
                  <Link to={`/${p.id}`}>
                    <img src={p.image} alt={p.title} className="product-card-image" loading="lazy" />
                  </Link>
                  <div className="product-card-badge">{p.category}</div>
                </div>

                <div className="product-card-content">
                  <div className="product-card-rating">
                    <span>★</span>
                    <span>{p.rating?.rate || 0}</span>
                  </div>

                  <Link to={`/${p.id}`} className="product-card-title" title={p.title}>
                    {p.title}
                  </Link>

                  <div className="product-card-footer">
                    <div className="product-card-price">${p.price.toFixed(2)}</div>
                    <button
                      className="btn-add-cart"
                      onClick={() => {
                        addToCart(p);
                        openCart();
                      }}
                      id={`btn-add-to-cart-${p.id}`}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
