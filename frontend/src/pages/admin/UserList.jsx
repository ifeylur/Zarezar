import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, admin, user

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
      }
    }
  };

  const toggleAdminStatus = async (id, currentStatus, userName) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'make admin' : 'remove admin privileges';
    
    if (window.confirm(`Are you sure you want to ${action} for "${userName}"?`)) {
      try {
        await axios.put(`http://localhost:5000/api/users/${id}`, {
          isAdmin: newStatus
        });
        fetchUsers();
        alert(`User ${newStatus ? 'promoted to admin' : 'removed from admin'} successfully`);
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Error updating user');
      }
    }
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : filter === 'admin' 
      ? users.filter(u => u.isAdmin || u.role === 'admin')
      : users.filter(u => !u.isAdmin && u.role !== 'admin');

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading users...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            User Management
          </h1>
          <p style={{ color: '#666', fontSize: '1rem' }}>
            Manage all users and administrators
          </p>
        </div>
        <Link
          to="/admin/users/add"
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '30px',
            fontWeight: '600',
            fontSize: '1rem',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s ease',
            display: 'inline-block'
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
          + Add New User
        </Link>
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '1rem'
      }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '0.8rem 1.5rem',
            background: filter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
            color: filter === 'all' ? 'white' : '#666',
            border: filter === 'all' ? 'none' : '2px solid #e0e0e0',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}
        >
          All Users ({users.length})
        </button>
        <button
          onClick={() => setFilter('admin')}
          style={{
            padding: '0.8rem 1.5rem',
            background: filter === 'admin' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
            color: filter === 'admin' ? 'white' : '#666',
            border: filter === 'admin' ? 'none' : '2px solid #e0e0e0',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}
        >
          Admins ({users.filter(u => u.isAdmin || u.role === 'admin').length})
        </button>
        <button
          onClick={() => setFilter('user')}
          style={{
            padding: '0.8rem 1.5rem',
            background: filter === 'user' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
            color: filter === 'user' ? 'white' : '#666',
            border: filter === 'user' ? 'none' : '2px solid #e0e0e0',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            transition: 'all 0.3s ease'
          }}
        >
          Regular Users ({users.filter(u => !u.isAdmin && u.role !== 'admin').length})
        </button>
      </div>

      {/* Users Table */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <th style={{ padding: '1.2rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Name</th>
                <th style={{ padding: '1.2rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '1.2rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Role</th>
                <th style={{ padding: '1.2rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1.2rem', textAlign: 'left', color: 'white', fontWeight: '600' }}>Joined</th>
                <th style={{ padding: '1.2rem', textAlign: 'center', color: 'white', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr 
                    key={user._id} 
                    style={{ 
                      borderBottom: index < filteredUsers.length - 1 ? '1px solid #f0f0f0' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                    }}
                  >
                    <td style={{ padding: '1.2rem', fontWeight: '600', color: '#333' }}>
                      {user.name}
                    </td>
                    <td style={{ padding: '1.2rem', color: '#666' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <span style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        background: (user.isAdmin || user.role === 'admin') 
                          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                          : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        color: 'white'
                      }}>
                        {(user.isAdmin || user.role === 'admin') ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <span style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        background: '#e8f5e9',
                        color: '#2e7d32'
                      }}>
                        Active
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem', color: '#666', fontSize: '0.9rem' }}>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.2rem' }}>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 10px rgba(102, 126, 234, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleAdminStatus(user._id, user.isAdmin || user.role === 'admin', user.name)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: (user.isAdmin || user.role === 'admin')
                              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                              : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {(user.isAdmin || user.role === 'admin') ? 'Remove Admin' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 10px rgba(238, 90, 111, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;

