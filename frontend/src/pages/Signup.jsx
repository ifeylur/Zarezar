import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    const result = await signup(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '2rem',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '450px', 
        padding: '3rem', 
        borderRadius: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Join Us
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>Create your account to get started</p>
        </div>
        
        {error && (
          <div style={{ 
            padding: '1rem', 
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)', 
            color: 'white', 
            borderRadius: '10px',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px rgba(238, 90, 111, 0.3)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500',
              fontSize: '0.9rem'
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
              onFocus={(e) => e.target.style.borderColor = '#f5576c'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="John Doe"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500',
              fontSize: '0.9rem'
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
              onFocus={(e) => e.target.style.borderColor = '#f5576c'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{ 
                width: '100%', 
                padding: '1rem', 
                border: '2px solid #e0e0e0', 
                borderRadius: '10px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#f5576c'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="Min 6 characters"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              color: '#333',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              onFocus={(e) => e.target.style.borderColor = '#f5576c'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '1rem', 
              background: loading 
                ? '#ccc' 
                : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1.5rem',
              boxShadow: loading 
                ? 'none' 
                : '0 10px 30px rgba(245, 87, 108, 0.4)',
              transform: loading ? 'none' : 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 40px rgba(245, 87, 108, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(245, 87, 108, 0.4)';
              }
            }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '1.5rem',
          color: '#666'
        }}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            style={{ 
              color: '#f5576c',
              fontWeight: '600',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.target.style.color = '#f093fb'}
            onMouseLeave={(e) => e.target.style.color = '#f5576c'}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

