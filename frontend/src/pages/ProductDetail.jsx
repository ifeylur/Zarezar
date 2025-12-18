import React, { useState, useEffect } from 'react';
import { API_URL } from '../config/api';import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  if (loading) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Loading...
    </div>
  );
  if (!product) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '4rem',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      Product not found
    </div>
  );

  const dummyReviews = [
    { name: 'Sarah M.', rating: 5, comment: 'Amazing product! My skin feels so smooth.' },
    { name: 'Emily R.', rating: 4, comment: 'Great results, would recommend.' },
    { name: 'Jessica L.', rating: 5, comment: 'Love this product, definitely buying again!' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '3rem', 
        marginBottom: '3rem',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ borderRadius: '15px', overflow: 'hidden' }}>
          {product.image && (
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '500px',
                objectFit: 'cover',
                borderRadius: '15px'
              }} 
            />
          )}
        </div>
        <div>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '25px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1rem',
            textTransform: 'capitalize'
          }}>
            {product.category}
          </div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '1rem',
            color: '#333',
            lineHeight: '1.2'
          }}>
            {product.name}
          </h1>
          <p style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ${product.price}
          </p>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              <strong style={{ color: '#333' }}>Skin Type:</strong> {product.skinType}
            </p>
            <p style={{ color: '#666', marginBottom: '0.5rem' }}>
              <strong style={{ color: '#333' }}>Stock:</strong> {product.stock} available
            </p>
          </div>
          <p style={{ 
            color: '#555', 
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            fontSize: '1.05rem'
          }}>
            {product.description}
          </p>
          {product.seoDescription && (
            <div style={{ 
              marginTop: '1.5rem', 
              padding: '1.5rem', 
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              borderRadius: '15px',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ 
                marginTop: 0,
                marginBottom: '0.8rem',
                color: '#333',
                fontSize: '1.2rem',
                fontWeight: '600'
              }}>
                SEO Description
              </h3>
              <p style={{ color: '#555', lineHeight: '1.6' }}>{product.seoDescription}</p>
            </div>
          )}
          
          <div style={{ 
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '15px'
          }}>
            <label style={{ 
              display: 'block',
              marginBottom: '1rem',
              fontWeight: '600',
              color: '#333'
            }}>
              Quantity:
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ 
                  padding: '0.8rem 1rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  width: '100px',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                style={{ 
                  flex: 1,
                  padding: '1rem 2rem', 
                  background: product.stock === 0 
                    ? '#ccc' 
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '30px',
                  cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  boxShadow: product.stock === 0 
                    ? 'none' 
                    : '0 10px 30px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (product.stock > 0) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.stock > 0) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Ingredients
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {product.ingredients.map((ingredient, index) => (
            <li key={index} style={{ 
              padding: '0.8rem',
              marginBottom: '0.5rem',
              background: '#f8f9fa',
              borderRadius: '10px',
              color: '#555'
            }}>
              ✓ {ingredient}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ 
        marginTop: '2rem',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Usage Instructions
        </h2>
        <p style={{ 
          color: '#555', 
          lineHeight: '1.8',
          fontSize: '1.05rem'
        }}>
          Apply a small amount to clean, damp skin. Gently massage in circular motions for 1-2 minutes. Rinse thoroughly with warm water. Use 2-3 times per week for best results.
        </p>
      </div>

      <div style={{ 
        marginTop: '2rem',
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Customer Reviews
        </h2>
        {dummyReviews.map((review, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '1.5rem', 
              marginBottom: '1rem',
              background: '#f8f9fa',
              borderRadius: '15px',
              border: '1px solid #e0e0e0'
            }}
          >
            <p style={{ marginBottom: '0.5rem' }}>
              <strong style={{ color: '#333' }}>{review.name}</strong>{' '}
              <span style={{ color: '#ffc107', fontSize: '1.2rem' }}>
                {'⭐'.repeat(review.rating)}
              </span>
            </p>
            <p style={{ color: '#555', lineHeight: '1.6' }}>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;

