import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Admin Dashboard
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Manage your e-commerce platform
        </p>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Products Management Card */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            fontSize: '2rem'
          }}>
            📦
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            Products
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Manage your product catalog, add new items, and update existing products.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link
              to="/admin/products"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View All Products
            </Link>
            <Link
              to="/admin/products/add"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'white',
                color: '#667eea',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                textAlign: 'center',
                border: '2px solid #667eea',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              Add New Product
            </Link>
          </div>
        </div>

        {/* Users Management Card */}
        <div style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        }}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            fontSize: '2rem'
          }}>
            👥
          </div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            color: '#333'
          }}>
            Users
          </h2>
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            Manage user accounts, assign admin roles, and control access permissions.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <Link
              to="/admin/users"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(245, 87, 108, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              View All Users
            </Link>
            <Link
              to="/admin/users/add"
              style={{
                padding: '0.8rem 1.5rem',
                background: 'white',
                color: '#f5576c',
                textDecoration: 'none',
                borderRadius: '10px',
                fontWeight: '600',
                textAlign: 'center',
                border: '2px solid #f5576c',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
              }}
            >
              Add New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

