import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post(`${config.API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        // Handle sign up logic here
        console.log('Sign up with:', name, email, password);
        // After successful sign up, you might want to automatically log in the user
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{isLogin ? 'Welcome!' : 'Create account!'}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              style={styles.input}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLogin && (
            <div style={styles.rememberForgot}>
              <label>
                <input type="checkbox" /> remember me?
              </label>
              <button onClick={() => {/* Handle forgot password */}} style={styles.forgotPassword}>
                forgot password?
              </button>
            </div>
          )}
          <button type="submit" style={styles.button}>
            {isLogin ? 'Login' : 'Create'}
          </button>
        </form>
        {!isLogin && (
          <div style={styles.socialLogin}>
            {/* <p>Or create account using social media!</p>
            <div>
              <button style={styles.socialButton}>f</button>
              <button style={styles.socialButton}>t</button>
              <button style={styles.socialButton}>G</button>
            </div> */}
          </div>
        )}
        <p onClick={() => setIsLogin(!isLogin)} style={styles.switchForm}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    textAlign: 'center' as const,
    color: '#4a4a4a',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#5468ff',
    color: 'white',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  rememberForgot: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: '0.8rem',
  },
  forgotPassword: {
    color: '#5468ff',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
  },
  socialLogin: {
    textAlign: 'center' as const,
    marginTop: '1rem',
  },
  socialButton: {
    margin: '0 0.5rem',
    padding: '0.5rem',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  switchForm: {
    textAlign: 'center' as const,
    marginTop: '1rem',
    color: '#5468ff',
    cursor: 'pointer',
  },
};

export default Login;
