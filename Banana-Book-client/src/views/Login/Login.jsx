import React, { useEffect } from 'react';
import './Login.css';

import BananaPP from './Components/BananaPP/BananaPP';
import LoginForm from './Components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN_KEY)) {
      navigate('/');
    }
  }, []);

  return (
    <section className="login-page">
      <BananaPP />
      <LoginForm />
    </section>
  );
};

export default Login;
