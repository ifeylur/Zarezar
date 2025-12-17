import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div style={{ 
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }}
    >
      {product.image && (
        <div style={{ 
          width: '100%', 
          height: '250px', 
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
      )}
      <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ 
          display: 'inline-block',
          padding: '0.3rem 0.8rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '600',
          marginBottom: '0.8rem',
          textTransform: 'capitalize'
        }}>
          {product.category}
        </div>
        <h3 style={{ 
          fontSize: '1.3rem', 
          fontWeight: '600',
          color: '#333',
          marginBottom: '0.5rem',
          lineHeight: '1.4'
        }}>
          {product.name}
        </h3>
        <p style={{ 
          color: '#666', 
          fontSize: '0.9rem',
          marginBottom: '1rem',
          flexGrow: 1
        }}>
          For {product.skinType} skin
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: 'auto'
        }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ${product.price}
          </span>
          <Link 
            to={`/product/${product._id}`}
            style={{
              padding: '0.6rem 1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

