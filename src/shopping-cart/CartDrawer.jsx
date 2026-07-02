import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import './ShoppingCart.css';

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    closeCart,
    cartTotal,
    cartCount,
    checkout,
    isCheckoutSuccess,
    resetCheckout,
  } = useCart();

  if (!isCartOpen) return null;

  // Constants for calculations
  const taxRate = 0.08; // 8% sales tax
  const tax = cartTotal * taxRate;
  const shipping = cartTotal > 0 ? 0 : 0; // Free shipping
  const grandTotal = cartTotal + tax + shipping;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    checkout();
  };

  const handleCloseSuccessModal = () => {
    resetCheckout();
    closeCart();
  };

  // Generate random order number for the success screen
  const orderNumber = React.useMemo(() => {
    return 'ORD-' + Math.floor(Math.random() * 900000 + 100000);
  }, [isCheckoutSuccess]);

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={closeCart} id="cart-drawer-backdrop" />

      {/* Cart Drawer Panel */}
      <div className="cart-panel" id="cart-drawer-panel">
        <div className="cart-header">
          <h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Shopping Cart ({cartCount})
          </h3>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart drawer" id="btn-close-cart-drawer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items listing */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state" id="cart-empty-view">
              <div className="cart-empty-icon">🛒</div>
              <h4>Your Cart is Empty</h4>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <button className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }} onClick={closeCart}>
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.product.id} className="cart-item" id={`cart-item-${item.product.id}`}>
                <div className="cart-item-image-wrapper">
                  <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
                </div>
                
                <div className="cart-item-details">
                  <Link
                    to={`/${item.product.id}`}
                    className="cart-item-title"
                    onClick={closeCart}
                    title={item.product.title}
                    id={`cart-item-link-${item.product.id}`}
                  >
                    {item.product.title}
                  </Link>
                  <div className="cart-item-price">${item.product.price.toFixed(2)}</div>
                  
                  <div className="cart-item-controls">
                    {/* Quantity Selector */}
                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        id={`cart-qty-dec-${item.product.id}`}
                      >
                        -
                      </button>
                      <span className="quantity-val" id={`cart-qty-val-${item.product.id}`}>{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        id={`cart-qty-inc-${item.product.id}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.product.id)}
                      title="Remove product"
                      id={`btn-remove-cart-${item.product.id}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart footer and total summaries */}
        {cartItems.length > 0 && (
          <div className="cart-footer" id="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Free</span>
            </div>
            <div className="cart-summary-row total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>

            <button className="btn-checkout" onClick={handleCheckout} id="btn-checkout-trigger">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Success Modal Overlay */}
      {isCheckoutSuccess && (
        <div className="checkout-overlay" id="checkout-success-overlay">
          {/* Animated sparkles */}
          <div className="checkout-sparkle checkout-sparkle-1">✨</div>
          <div className="checkout-sparkle checkout-sparkle-2">🎈</div>
          <div className="checkout-sparkle checkout-sparkle-3">🎉</div>
          
          <div className="checkout-modal">
            <div className="checkout-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Order Placed!</h3>
            <p>Thank you for your purchase. Your payment was processed successfully, and your package will be shipped shortly.</p>
            
            <div className="checkout-order-number">
              Order: <span style={{ fontWeight: '700', color: 'var(--text-primary)' }} id="order-number-display">{orderNumber}</span>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleCloseSuccessModal} id="btn-success-continue">
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </>
  );
}
