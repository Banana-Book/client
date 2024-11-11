import React, { useState } from 'react';
import './registerForm.css';

import { toast } from 'react-toastify';

import instance from '../../../../api/instance';
import { useConfigContext } from '../../../../contexts/ConfigContext';
import { validateEmail, validatePassword, validateUsername } from '../../../../utils/validators';

const RegisterForm = () => {
  const [nameField, setName] = useState('');
  const [lastNameField, setLastName] = useState('');
  const [emailField, setEmail] = useState('');
  const [passwordField, setPassword] = useState('');

  const { startLoading, stopLoading } = useConfigContext();

  const errors = {
    name: !nameField || !validateUsername(nameField),
    lastName: !lastNameField || !validateUsername(lastNameField),
    email: !emailField || !validateEmail(emailField),
    password: !passwordField || !validatePassword(passwordField),
  };

  const hasErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (hasErrors()) {
      const errorMessages = [];
      if (errors.name) errorMessages.push('Nombre no válido');
      if (errors.lastName) errorMessages.push('Apellido no válido');
      if (errors.email) errorMessages.push('Correo electrónico no válido');
      if (errors.password) errorMessages.push('Contraseña no válida');
      toast.warn(`Datos rellenados incorrectamente: ${errorMessages.join(', ')}`);
      return;
    }

    onRegisterUserHandler(nameField, lastNameField, emailField, passwordField);
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
    try {
      startLoading();

      const response = await instance.post('/auth/signup', { name, lastName, email, password });
      console.log(response);

      toast.success('Usuario registrado correctamente');

    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
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
