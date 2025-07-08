import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.all.auth);

  return isAuthenticated ? children : <Navigate to="/auth/signin" replace />;
};

export default PrivateRoute;
