import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ 
        padding: '4rem 2rem', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: '1rem',
          opacity: 0.3
        }}>🛒</div>
        <h1 style={{ 
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Your Cart is Empty
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Start adding products to your cart!
        </p>
        <Link 
          to="/catalog"
          style={{
            padding: '1rem 2.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-block',
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
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '3rem', 
        fontWeight: '700',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Shopping Cart
      </h1>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}>
              <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Product</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Quantity</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Total</th>
              <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr 
                key={item._id} 
                style={{ 
                  borderBottom: index < cartItems.length - 1 ? '1px solid #f0f0f0' : 'none',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                <td style={{ padding: '1.5rem', fontWeight: '500' }}>{item.name}</td>
                <td style={{ padding: '1.5rem', color: '#667eea', fontWeight: '600' }}>${item.price}</td>
                <td style={{ padding: '1.5rem' }}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                    style={{ 
                      width: '80px', 
                      padding: '0.5rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </td>
                <td style={{ padding: '1.5rem', fontWeight: '600', color: '#333' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
                <td style={{ padding: '1.5rem' }}>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ 
                      padding: '0.5rem 1rem', 
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      boxShadow: '0 4px 15px rgba(238, 90, 111, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(238, 90, 111, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(238, 90, 111, 0.3)';
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ 
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        textAlign: 'right'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#333'
        }}>
          Total: <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ${getTotalPrice().toFixed(2)}
          </span>
        </h2>
        <Link
          to="/checkout"
          style={{ 
            padding: '1rem 2.5rem', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-block',
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
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;

