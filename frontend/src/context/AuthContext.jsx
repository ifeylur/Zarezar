import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // Optionally verify token with backend
        try {
          // You can add a verify endpoint if needed
          // For now, we'll just set the token
          const userData = JSON.parse(localStorage.getItem('user') || 'null');
          setUser(userData);
        } catch (error) {
          console.error('Auth check error:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const signup = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password
      });
      
      // Don't automatically log in after signup
      // Just return success - user needs to login manually
      return { success: true, message: 'Signup successful! Please login to continue.' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Signup failed';
      return { success: false, message: errorMessage };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { user: userData, token: newToken } = response.data;
      setUser(userData);
      setToken(newToken);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', newToken);
      return { success: true, message: 'Login successful' };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Login failed';
      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.isAdmin || user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signup,
      login,
      logout,
      isAdmin,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

