import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const GlobalContainer = ({ children }) => {
  const { isAunthenticated, setIsAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN_KEY)) {
      setIsAuthenticated(true);
      return;
    }
  }, [isAunthenticated]);

  return <>{children}</>;
};

export default GlobalContainer;
