import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Component }) => {
  return window.localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) ? (
    <Component />
  ) : (
    <Navigate to="/auth/signin" reaplace />
  );
};

export default PrivateRoute;
