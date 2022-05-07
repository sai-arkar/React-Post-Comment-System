import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth.userInfo) {
    return <Navigate to="/login" />;
  }
  return children;
};
