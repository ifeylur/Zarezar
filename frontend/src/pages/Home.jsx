import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const Home = () => {
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(0, 4);

  return (
    <div style={{ padding: '0', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '4rem', 
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0 0 50px 50px',
        color: 'white',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '700',
          marginBottom: '1rem',
          textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
        }}>
          Welcome to Zarezar
        </h1>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '2rem',
          opacity: 0.95
        }}>
          Premium Women's Skincare Products
        </p>
        <Link 
          to="/catalog" 
          style={{ 
            padding: '1rem 2.5rem', 
            background: 'white',
            color: '#667eea',
            textDecoration: 'none',
            borderRadius: '30px',
            fontSize: '1.1rem',
            fontWeight: '600',
            display: 'inline-block',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
          }}
        >
          Shop Now
        </Link>
      </div>

      <div style={{ padding: '0 2rem' }}>
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Featured Products
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            marginBottom: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Best Sellers
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {bestSellers.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

