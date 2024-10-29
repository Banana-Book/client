import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './LoginForm.css';

import { Link, useNavigate } from 'react-router-dom';
import Register from '../../../Register/Register';
import axios from 'axios';
import instance, { setToken } from '../../../../api/instance';
import { useMutation } from 'react-query';
import { AuthContext } from '../../../../contexts/AuthContext';

// {email: 'email', password: 'password'}

const login = async (credentials) => {
  const { data } = await instance.post('auth/signin', credentials);
  return data;
};

export const LoginForm = () => {
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [emailField, setEmail] = useState('');
  const [passwordField, setPassword] = useState('');

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      window.localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.token);
      setToken(data.token);
      setIsAuthenticated(true);
      navigate('/');
    },
  });

  const errors = {
    email: !emailField,
    password: !passwordField,
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (hasErrors()) {
      alert('Los campos estan incorrectos o incompletos');
      return;
    }

    mutate({ email: emailField, password: passwordField });
  };

  return (
    <form method="get" onSubmit={onSubmitHandler} className="login-form">
      <label>
        Correo electrónico
        <div>
          <input
            type="text"
            name="email"
            value={emailField}
            placeholder="Ingrese su correo electronico"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </label>
      <label>
        Contraseña
        <div>
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={passwordField}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </label>
      <div>
        <button id="login" type="submit" disabled={hasErrors() || isLoading}>
          Iniciar Sesión
        </button>
        <button id="register">
          <Link to={'/auth/signup'}> Registrarse </Link>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
