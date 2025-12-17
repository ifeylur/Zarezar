import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      padding: '1.5rem 2rem', 
      background: 'white',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      marginBottom: '0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Logo */}
        <Link 
          to="/catalog" 
          style={{ 
            textDecoration: 'none', 
            fontSize: '1.8rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Zarezar
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Link 
            to="/catalog"
            style={{
              textDecoration: 'none',
              color: isActive('/catalog') ? '#667eea' : '#333',
              fontWeight: isActive('/catalog') ? '600' : '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: isActive('/catalog') ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              borderBottom: isActive('/catalog') ? '2px solid #667eea' : '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/catalog')) {
                e.target.style.color = '#667eea';
                e.target.style.background = 'rgba(102, 126, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/catalog')) {
                e.target.style.color = '#333';
                e.target.style.background = 'transparent';
              }
            }}
          >
            Catalog
          </Link>
          <Link 
            to="/"
            style={{
              textDecoration: 'none',
              color: isActive('/') ? '#667eea' : '#333',
              fontWeight: isActive('/') ? '600' : '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: isActive('/') ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              borderBottom: isActive('/') ? '2px solid #667eea' : '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/')) {
                e.target.style.color = '#667eea';
                e.target.style.background = 'rgba(102, 126, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/')) {
                e.target.style.color = '#333';
                e.target.style.background = 'transparent';
              }
            }}
          >
            Home
          </Link>
          <Link 
            to="/about"
            style={{
              textDecoration: 'none',
              color: isActive('/about') ? '#667eea' : '#333',
              fontWeight: isActive('/about') ? '600' : '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: isActive('/about') ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              borderBottom: isActive('/about') ? '2px solid #667eea' : '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/about')) {
                e.target.style.color = '#667eea';
                e.target.style.background = 'rgba(102, 126, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/about')) {
                e.target.style.color = '#333';
                e.target.style.background = 'transparent';
              }
            }}
          >
            About
          </Link>
          <Link 
            to="/cart"
            style={{
              textDecoration: 'none',
              color: isActive('/cart') ? '#667eea' : '#333',
              fontWeight: isActive('/cart') ? '600' : '500',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              background: isActive('/cart') ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
              borderBottom: isActive('/cart') ? '2px solid #667eea' : '2px solid transparent',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/cart')) {
                e.target.style.color = '#667eea';
                e.target.style.background = 'rgba(102, 126, 234, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/cart')) {
                e.target.style.color = '#333';
                e.target.style.background = 'transparent';
              }
            }}
          >
            Cart
            {getTotalItems() > 0 && (
              <span style={{
                marginLeft: '0.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '0.2rem 0.5rem',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {getTotalItems()}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              {isAdmin() && (
                <Link 
                  to="/admin"
                  style={{
                    textDecoration: 'none',
                    color: isActive('/admin') ? '#667eea' : '#333',
                    fontWeight: isActive('/admin') ? '600' : '500',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    padding: '0.6rem 1.2rem',
                    borderRadius: '8px',
                    background: isActive('/admin') ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                    borderBottom: isActive('/admin') ? '2px solid #667eea' : '2px solid transparent'
                  }}
                >
                  Admin
                </Link>
              )}
              <span style={{ 
                color: '#666', 
                fontSize: '0.9rem',
                fontWeight: '500',
                padding: '0 1rem'
              }}>
                {user?.name}
              </span>
              <button
                onClick={logout}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: 'transparent',
                  color: '#667eea',
                  border: '1px solid #667eea',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#667eea';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#667eea';
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '0.6rem 1.5rem',
                background: 'transparent',
                color: '#667eea',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                e.target.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
              }}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

