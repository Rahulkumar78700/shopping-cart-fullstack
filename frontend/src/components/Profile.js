import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { toast } from 'react-toastify';

const Profile = ({ token, onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // For now, we'll use the token to get basic user info
      // In a real app, you'd have a /profile endpoint
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: tokenData.user_id,
        username: 'User', // This would come from the backend
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });
      setFormData({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd make an API call to update the profile
      setUser({ ...user, ...formData });
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      avatar: user.avatar
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h1>Profile</h1>
          <div className="header-buttons">
            <button className="btn btn-primary" onClick={() => navigate('/items')}>
              Back to Shop
            </button>
            <button className="btn btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="avatar-image"
              />
              {editing && (
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="Avatar URL"
                  className="avatar-input"
                />
              )}
            </div>
            <div className="profile-info">
              <h2>{user.first_name} {user.last_name}</h2>
              <p className="username">@{user.username}</p>
              <p className="email">{user.email}</p>
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3>Personal Information</h3>
              {editing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-success" onClick={handleSave}>
                      Save Changes
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="info-display">
                  <div className="info-item">
                    <span className="label">First Name:</span>
                    <span className="value">{user.first_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Last Name:</span>
                    <span className="value">{user.last_name}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Email:</span>
                    <span className="value">{user.email}</span>
                  </div>
                  <button className="btn btn-primary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            <div className="detail-section">
              <h3>Account Statistics</h3>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Orders Placed</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">$2,450</div>
                  <div className="stat-label">Total Spent</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">4.8</div>
                  <div className="stat-label">Rating</div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="btn btn-info" onClick={() => navigate('/orders')}>
                  View Order History
                </button>
                <button className="btn btn-info" onClick={() => navigate('/cart')}>
                  View Cart
                </button>
                <button className="btn btn-warning">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 