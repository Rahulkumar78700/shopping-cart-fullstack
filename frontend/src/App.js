import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import ItemsList from './components/ItemsList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';
import Profile from './components/Profile';
import './App.css';

// Wrapper components for navigation
const CartWrapper = ({ token }) => {
  const navigate = useNavigate();
  return <Cart token={token} onBack={() => navigate('/items')} />;
};

const CheckoutWrapper = ({ token }) => {
  const navigate = useNavigate();
  return (
    <Checkout 
      token={token} 
      onBack={() => navigate('/cart')} 
      onOrderComplete={() => navigate('/items')}
    />
  );
};

const OrderHistoryWrapper = ({ token }) => {
  const navigate = useNavigate();
  return <OrderHistory token={token} onBack={() => navigate('/items')} />;
};

const ProfileWrapper = ({ token, onLogout }) => {
  const navigate = useNavigate();
  return <Profile token={token} onLogout={onLogout} />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/items" replace />
              )
            } 
          />
          <Route 
            path="/items" 
            element={
              isAuthenticated ? (
                <ItemsList token={token} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/cart" 
            element={
              isAuthenticated ? (
                <CartWrapper token={token} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/checkout" 
            element={
              isAuthenticated ? (
                <CheckoutWrapper token={token} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/orders" 
            element={
              isAuthenticated ? (
                <OrderHistoryWrapper token={token} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? (
                <ProfileWrapper token={token} onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/items" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 