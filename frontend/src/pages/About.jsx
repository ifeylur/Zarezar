import React from 'react';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: '70vh'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About Zarezar
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#666',
          maxWidth: '700px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Your trusted partner in premium skincare
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gap: '3rem',
        marginBottom: '4rem'
      }}>
        {/* Mission Section */}
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Our Mission
          </h2>
          <p style={{
            color: '#555',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            At Zarezar, we believe that everyone deserves access to premium skincare products that are 
            thoughtfully crafted and carefully formulated. Our mission is to provide high-quality face 
            scrubs and face masks that cater to all skin types, helping you achieve healthy, radiant skin.
          </p>
        </div>

        {/* Story Section */}
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Our Story
          </h2>
          <p style={{
            color: '#555',
            lineHeight: '1.8',
            fontSize: '1.05rem',
            marginBottom: '1.5rem'
          }}>
            Zarezar was born from a passion for natural, effective skincare solutions. We understand 
            that every skin type is unique, which is why we've curated a collection of products 
            specifically designed for different skin needs - from oily to dry, sensitive to combination skin.
          </p>
          <p style={{
            color: '#555',
            lineHeight: '1.8',
            fontSize: '1.05rem'
          }}>
            Our products are carefully selected and formulated with premium ingredients, ensuring that 
            each item in our catalog meets our high standards for quality and effectiveness. We're 
            committed to helping you find the perfect skincare routine that works for you.
          </p>
        </div>

        {/* Values Section */}
        <div style={{
          background: 'white',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#333'
          }}>
            Our Values
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '0.8rem',
                color: '#667eea'
              }}>
                Quality First
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                We never compromise on quality. Every product is carefully selected and tested to ensure 
                the best results for your skin.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '0.8rem',
                color: '#667eea'
              }}>
                Customer Care
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                Your satisfaction is our priority. We're here to help you find the perfect products 
                for your skincare journey.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '0.8rem',
                color: '#667eea'
              }}>
                Innovation
              </h3>
              <p style={{
                color: '#666',
                lineHeight: '1.6'
              }}>
                We continuously explore new formulations and ingredients to bring you the latest in 
                skincare technology.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

