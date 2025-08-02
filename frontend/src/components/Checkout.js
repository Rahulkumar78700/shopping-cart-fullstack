import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import { toast } from 'react-toastify';

const Checkout = ({ token, onBack, onOrderComplete }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get('/carts');
      setCart(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setCart({ items: [] });
      } else {
        toast.error('Failed to fetch cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, cartItem) => {
      return total + (cartItem.item?.price || 0);
    }, 0);
  };

  const handleCheckout = async () => {
    if (!cart || !cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setProcessing(true);
    try {
      const response = await api.post('/orders', {});
      
      toast.success('Order placed successfully!');
      onOrderComplete(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Failed to place order';
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading checkout...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>Checkout</h1>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Cart
          </button>
        </div>
      </div>

      <div className="container">
        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checkout!</p>
            <button className="btn btn-primary" onClick={onBack}>
              Back to Items
            </button>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="order-items">
                {cart.items.map((cartItem) => (
                  <div key={cartItem.id} className="order-item">
                    <div className="item-info">
                      <h4>{cartItem.item?.name}</h4>
                      <p>{cartItem.item?.description}</p>
                    </div>
                    <div className="item-price">
                      ${cartItem.item?.price}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Tax (10%):</span>
                  <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="total-line final">
                  <span>Total:</span>
                  <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn btn-success" 
                onClick={handleCheckout}
                disabled={processing}
                style={{ width: '100%', fontSize: '18px', padding: '15px' }}
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
              
              <button 
                className="btn btn-secondary" 
                onClick={onBack}
                style={{ width: '100%', marginTop: '10px' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout; 