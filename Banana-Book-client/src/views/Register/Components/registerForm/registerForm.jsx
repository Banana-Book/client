import React, { useState } from 'react';
import './registerForm.css';

import { toast } from 'react-toastify';

import instance from '../../../../api/instance';
import { useConfigContext } from '../../../../contexts/ConfigContext';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [nameField, setName] = useState('');
  const [lastNameField, setLastName] = useState('');
  const [emailField, setEmail] = useState('');
  const [passwordField, setPassword] = useState('');

  const { startLoading, stopLoading } = useConfigContext();

  const errors = {
    name: !nameField,
    lastName: !lastNameField,
    email: !emailField,
    password: !passwordField,
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    onRegisterUserHandler(nameField, lastNameField, emailField, passwordField);

    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
    if (hasErrors()) {
      toast.warn('Datos rellenados incorrectamente');
      return;
    }

    registerUser(nameField, lastNameField, emailField, password);

    setName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const saveUser = async (name, lastName, email, password) => {
    startLoading();

    const response = await instance.post('/auth/signup', { name, lastName, email, password });
    toast.success('Usuario registrado correctamente');
  };

  const onRegisterUserHandler = async (name, lastName, email, password) => {
    await saveUser(name, lastName, email, password);
  };

  return (
    <form className="register-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <div className="name">
          <input
            type="text"
            name="name"
            className="name"
            value={nameField}
            placeholder="Nombre"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="last-name">
          <input
            type="text"
            name="lastName"
            className="lastName"
            value={lastNameField}
            placeholder="Apellido"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="email">
          <input
            type="text"
            name="email"
            className="email"
            value={emailField}
            placeholder="Correo electrónico"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="password">
          <input
            type="password"
            name="password"
            className="password"
            value={passwordField}
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn-register">
            Registrarse
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
