import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { toast } from 'react-toastify';

const Cart = ({ token, onBack }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const removeFromCart = async (itemId) => {
    try {
      const response = await api.delete(`/carts/${itemId}`);
      
      // Update the cart state with the response
      setCart(response.data);
      toast.success('Item removed from cart!');
    } catch (error) {
      toast.error('Failed to remove item from cart');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, cartItem) => {
      return total + (cartItem.item?.price || 0);
    }, 0);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>Shopping Cart</h1>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Items
          </button>
        </div>
      </div>

      <div className="container">
        {!cart || !cart.items || cart.items.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart to get started!</p>
            <button className="btn btn-primary" onClick={onBack}>
              Browse Items
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.items.map((cartItem) => (
                <div key={cartItem.id} className="cart-item">
                  <div className="item-image">
                    <img src={cartItem.item?.image_url} alt={cartItem.item?.name} />
                  </div>
                  <div className="item-details">
                    <h3>{cartItem.item?.name}</h3>
                    <p className="item-category">{cartItem.item?.category}</p>
                    <p>{cartItem.item?.description}</p>
                    <div className="price">${cartItem.item?.price?.toFixed(2)}</div>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="btn btn-danger" 
                      onClick={() => removeFromCart(cartItem.item_id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Cart Summary</h3>
              <div className="summary-item">
                <span>Items:</span>
                <span>{cart.items.length}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-success" 
                style={{ width: '100%', marginTop: '20px' }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 