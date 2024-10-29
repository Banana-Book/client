import React, { useEffect } from 'react';
import './Register.css';
import ProfilePic from './Components/profilePic/profilePic';
import RegisterForm from './Components/registerForm/registerForm';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_TOKEN_KEY)) {
      navigate('/');
    }
  }, []);

  return (
    <div className="register">
      <ProfilePic />
      <RegisterForm />
    </div>
  );
};

export default Register;
