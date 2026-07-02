import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from './CartContext';

export default function Dashboard({ theme, toggleTheme, children }) {
  const location = useLocation();
  const { cartCount, openCart } = useCart();

  const menuItems = [
    { path: '/', name: 'Storefront', icon: '🛒' },
    { path: '/products', name: 'Simple Products', icon: '📦' },
    { path: '/practice-state', name: 'Practice: State & Props', icon: '📝' },
    { path: '/practice-users', name: 'Practice: User Directory', icon: '👥' },
    { path: '/practice-form', name: 'Practice: Controlled Forms', icon: '📋' }
  ];

  const getHeaderInfo = () => {
    const path = location.pathname;
    
    // Dynamic matching for simple product detail page (e.g. /products/1)
    if (path.match(/^\/products\/\d+$/)) {
      return {
        title: 'Simple Product Details',
        desc: 'Review specification and pricing details.'
      };
    }

    // Dynamic matching for product detail page (e.g. /1, /12)
    if (path.match(/^\/\d+$/)) {
      return {
        title: 'Product Details',
        desc: 'Review specifications, customer reviews, and purchase items.'
      };
    }

    switch (path) {
      case '/':
        return {
          title: 'Antigravity Storefront',
          desc: 'Explore quality products fetched in real-time from the Store API.'
        };
      case '/products':
        return {
          title: 'Simple Products',
          desc: 'Explore products using simple, low-level React rendering.'
        };
      case '/practice-state':
        return {
          title: 'Practice: State & Props',
          desc: 'Understand state management and passing properties between React components.'
        };
      case '/practice-users':
        return {
          title: 'Practice: User Directory',
          desc: 'Learn list rendering, array filters, and appending dynamic state entries.'
        };
      case '/practice-form':
        return {
          title: 'Practice: Controlled Forms',
          desc: 'Build forms, handle inputs, and validate user input fields.'
        };
      default:
        return {
          title: 'React Lab Store',
          desc: 'An interactive shopping experience with dynamic styling.'
        };
    }
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="logo-container">
          <div className="logo-icon" style={{ fontSize: '1rem' }}>🛍️</div>
          <span className="logo-text">Vite Shop</span>
        </div>

        <nav>
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.path} className="nav-item">
                <NavLink
                  to={item.path}
                  id={`nav-link-${item.path.replace('/', 'root').replace('-', '_')}`}
                  className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            id="theme-toggle-btn" 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle active UI theme"
          >
            <span>{theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
          </button>
        </div>
      </aside>

      {/* Main Panel View */}
      <main className="main-content">
        <header className="header-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="header-title-section">
            <h1 id="view-title">{headerInfo.title}</h1>
            <p>{headerInfo.desc}</p>
          </div>

          {/* Header Cart Button */}
          <button
            onClick={openCart}
            id="btn-header-cart"
            style={{
              position: 'relative',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '0.6rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && (
              <span
                id="header-cart-badge"
                style={{
                  background: 'var(--danger)',
                  color: 'white',
                  borderRadius: '9999px',
                  padding: '0.1rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '800'
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </header>

        {children}
      </main>
    </div>
  );
}
