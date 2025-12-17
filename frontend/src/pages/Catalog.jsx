import React, { useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';

const Catalog = () => {
  const { products, loading, fetchProducts } = useProducts();

  const handleFilterChange = (filters) => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    fetchProducts(cleanFilters);
  };

  return (
    <div style={{ padding: '0', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0 0 50px 50px',
        padding: '5rem 2rem',
        marginBottom: '3rem',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '500px',
          height: '500px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Premium Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '30px',
            marginBottom: '2rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <span style={{ fontSize: '1.2rem' }}>⭐</span>
            <span style={{ 
              color: 'white', 
              fontWeight: '600',
              fontSize: '0.95rem',
              letterSpacing: '0.5px'
            }}>
              Premium Skincare Collection
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: '700',
            color: 'white',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)'
          }}>
            Discover Your
            <br />
            Perfect Skincare
            <br />
            Products
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: '1.6',
            marginBottom: '2.5rem',
            maxWidth: '600px'
          }}>
            Explore our curated collection of premium face scrubs and face masks,
            specially formulated for all skin types. Find your perfect match today.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                document.querySelector('.filter-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              style={{
                padding: '1rem 2.5rem',
                background: 'white',
                color: '#667eea',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
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
              Explore Products
              <span style={{ fontSize: '1.2rem' }}>→</span>
            </button>
            <button
              onClick={() => {
                const filterBar = document.querySelector('.filter-section');
                if (filterBar) {
                  filterBar.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                  // Focus on search input after scroll
                  setTimeout(() => {
                    const searchInput = filterBar.querySelector('input[name="search"]');
                    if (searchInput) searchInput.focus();
                  }, 500);
                }
              }}
              style={{
                padding: '1rem 2.5rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '30px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'white';
                e.target.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Search Products
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '0 2rem 2rem 2rem' }}>
        <div className="filter-section">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>
        
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            fontSize: '1.2rem',
            color: '#666'
          }}>
            Loading products...
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {!loading && products.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            fontSize: '1.2rem',
            color: '#666',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}>
            No products found. Try adjusting your filters.
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Catalog;

