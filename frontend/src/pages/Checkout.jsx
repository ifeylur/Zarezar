import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple checkout - no payment integration
    alert('Order placed successfully! (This is a demo)');
    clearCart();
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: '700',
        marginBottom: '2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Checkout
      </h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.2fr', 
        gap: '2rem' 
      }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          height: 'fit-content'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Order Summary
          </h2>
          {cartItems.map(item => (
            <div 
              key={item._id} 
              style={{ 
                marginBottom: '1rem', 
                padding: '1.5rem', 
                background: '#f8f9fa',
                borderRadius: '15px',
                border: '1px solid #e0e0e0'
              }}
            >
              <p style={{ 
                fontWeight: '600',
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: '#333'
              }}>
                {item.name}
              </p>
              <p style={{ color: '#666' }}>
                Quantity: {item.quantity} x ${item.price} = <strong style={{ color: '#667eea' }}>${(item.quantity * item.price).toFixed(2)}</strong>
              </p>
            </div>
          ))}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '2px solid #e0e0e0'
          }}>
            <h3 style={{ 
              fontSize: '1.8rem',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Total: ${getTotalPrice().toFixed(2)}
            </h3>
          </div>
        </div>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333'
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333'
              }}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333'
              }}>
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '600',
                color: '#333'
              }}>
                ZIP Code
              </label>
              <input
                type="text"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
                style={{ 
                  width: '100%', 
                  padding: '1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            <button
              type="submit"
              style={{ 
                width: '100%', 
                padding: '1.2rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white', 
                border: 'none', 
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                fontWeight: '600',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

