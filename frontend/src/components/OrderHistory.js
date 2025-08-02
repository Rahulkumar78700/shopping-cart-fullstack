import React, { useState, useEffect } from 'react';
import api from '../config/axios';
import { toast } from 'react-toastify';

const OrderHistory = ({ token, onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch order history');
    } finally {
      setLoading(false);
    }
  };

  const calculateOrderTotal = (order) => {
    if (!order.items) return 0;
    return order.items.reduce((total, orderItem) => {
      return total + (orderItem.item?.price || 0);
    }, 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading order history...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>Order History</h1>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Items
          </button>
        </div>
      </div>

      <div className="container">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet.</p>
            <button className="btn btn-primary" onClick={onBack}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {formatDate(order.created_at)}</p>
                    <span className={`order-status ${order.status}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-total">
                    <span>Total: ${calculateOrderTotal(order).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((orderItem) => (
                      <div key={orderItem.id} className="order-item">
                        <div className="item-info">
                          <span className="item-name">{orderItem.item?.name}</span>
                          <span className="item-description">{orderItem.item?.description}</span>
                        </div>
                        <div className="item-price">
                          ${orderItem.item?.price}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No items found for this order.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory; 