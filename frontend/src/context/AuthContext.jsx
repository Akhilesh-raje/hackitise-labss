import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('hackitise_token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        if (response.success) {
          setUser(response.data);
        } else {
          localStorage.removeItem('hackitise_token');
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('hackitise_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.success) {
        localStorage.setItem('hackitise_token', response.token);
        setUser(response.user);
        return { success: true };
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('hackitise_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
