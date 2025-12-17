import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    isAdmin: false
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      const user = response.data;
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || 'user',
        isAdmin: user.isAdmin || false
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      alert('Error fetching user details');
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
      role: name === 'isAdmin' && checked ? 'admin' : (name === 'isAdmin' && !checked ? 'user' : formData.role)
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    // Validation
    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    // If password is provided, validate it
    if (formData.password) {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setSubmitting(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setSubmitting(false);
        return;
      }
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.isAdmin ? 'admin' : 'user',
        isAdmin: formData.isAdmin
      };

      // Only include password if it's being changed
      if (formData.password) {
        updateData.password = formData.password;
      }

      await axios.put(`http://localhost:5000/api/users/${id}`, updateData);
      alert('User updated successfully!');
      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
      const errorMessage = error.response?.data?.error || 'Error updating user';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading user details...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '0.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Edit User
        </h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Update user information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          {error && (
            <div style={{
              padding: '1rem',
              background: '#ffebee',
              color: '#c62828',
              borderRadius: '10px',
              marginBottom: '1.5rem',
              border: '1px solid #ef5350'
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#333',
              fontSize: '0.95rem'
            }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
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
              color: '#333',
              fontSize: '0.95rem'
            }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="user@example.com"
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

          <div style={{
            padding: '1rem',
            background: '#fff3e0',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #ffb74d'
          }}>
            <p style={{
              color: '#e65100',
              fontSize: '0.9rem',
              margin: 0,
              fontWeight: '600'
            }}>
              💡 Leave password fields empty to keep the current password
            </p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: '#333',
              fontSize: '0.95rem'
            }}>
              New Password (optional)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              placeholder="Leave empty to keep current password"
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
              color: '#333',
              fontSize: '0.95rem'
            }}>
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter new password"
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

          <div style={{
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '10px',
            marginBottom: '1.5rem'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              fontWeight: '600',
              color: '#333',
              fontSize: '1rem'
            }}>
              <input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                style={{
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer',
                  accentColor: '#667eea'
                }}
              />
              <span>Make this user an Administrator</span>
            </label>
            <p style={{
              marginTop: '0.5rem',
              marginLeft: '2.8rem',
              color: '#666',
              fontSize: '0.85rem'
            }}>
              Administrators have access to the admin panel and can manage products and users.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'flex-end',
          paddingTop: '2rem',
          borderTop: '2px solid #f0f0f0'
        }}>
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
            style={{
              padding: '1rem 2.5rem',
              background: 'white',
              color: '#666',
              border: '2px solid #e0e0e0',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f8f9fa';
              e.target.style.borderColor = '#ccc';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#e0e0e0';
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: '1rem 2.5rem',
              background: submitting 
                ? '#ccc' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              boxShadow: submitting ? 'none' : '0 10px 30px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!submitting) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {submitting ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;

