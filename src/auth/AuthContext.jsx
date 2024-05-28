// src/auth/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    checkUserConnected();
  }, []);

  const checkUserConnected = async () => {
    try {
      const response = await fetch('http://localhost:2000/User-connected');
      let userData;
      if (response.statusCode === 200) {
        userData = await response.json();
      }
      if (response.ok && userData) {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:2000/parameter/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: user.userName }),
        credentials: 'include',
      });
    } catch (error) {
      console.error('Failed to log out:', error);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
