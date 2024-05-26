// src/pages/Login.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const navigate = useNavigate(); // Use the useNavigate hook

  const { emailOrUsername, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/dashboard'); // Navigate to dashboard
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={onSubmit} className="auth-form">
        <h2>Login</h2>
        <input
          type="text"
          name="emailOrUsername"
          value={emailOrUsername}
          onChange={onChange}
          placeholder="Email or Username"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <div className="register-text">Don't have an account? <Link to="/register">Register</Link></div>
      </form>
    </div>
  );
};

export default Login;