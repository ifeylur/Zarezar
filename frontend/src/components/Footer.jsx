import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'white',
      padding: '4rem 2rem 2rem 2rem',
      marginTop: '4rem',
      borderTop: '1px solid #e0e0e0'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Left Column - Company Info */}
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Zarezar
            </h3>
            <p style={{
              color: '#666',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              Premium skincare products crafted with care. Discover our curated collection of face scrubs and face masks, specially formulated for all skin types.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#333',
              marginBottom: '1rem'
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link
                  to="/catalog"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  Catalog
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link
                  to="/"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link
                  to="/about"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link
                  to="/cart"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Connect With Us */}
          <div>
            <h4 style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#333',
              marginBottom: '1rem'
            }}>
              Connect With Us
            </h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  Instagram
                </a>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  Facebook
                </a>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#666',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#667eea';
                    e.target.style.paddingLeft = '5px';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#666';
                    e.target.style.paddingLeft = '0';
                  }}
                >
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #e0e0e0',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            color: '#999',
            fontSize: '0.9rem',
            margin: 0
          }}>
            © 2025 Zarezar. All rights reserved.
          </p>
          <p style={{
            color: '#999',
            fontSize: '0.95rem',
            fontStyle: 'italic',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            Simple, clean and thoughtful skincare. ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

