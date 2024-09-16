import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import * as authValidation from '../utils/authValidation';
import { TooltipContainer, TooltipText } from '../styles/AuthStyles';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({ email: '', password: '', auth: '' });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '', auth: '' });

    try {
      // console.log("Errors : ", errors)
      if (isLogin) {
        const response = await axios.post(`${config.API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', response.data.token);
        // Ensure token is fully set before navigating
        setTimeout(() => {
          navigate('/home');  // Redirect to the desired page after successful login
        }, 100); 
      } else {
        // Move validation logic outside of the try-catch block
        if (!authValidation.isValidEmail(email)) {
          setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
          return;
        }

        if (!authValidation.isValidPassword(password)) {
          setErrors(prev => ({ ...prev, password: 'Password does not meet the requirements.' }));
          return;
        }

        // Remove this condition as it's always true and might cause unnecessary re-renders
        // if(!errors.auth && !errors.email && !errors.password){
        // Handle sign up login   
        const signupResponse = await axios.post(`${config.API_URL}/auth/signup`, { name, email, password });
        console.log('Sign up successful:', signupResponse.data);
        
        // Automatically log in the user after successful signup
        const loginResponse = await axios.post(`${config.API_URL}/auth/login`, { email, password });
        localStorage.setItem('token', loginResponse.data.token);
        // Ensure token is fully set before navigating
        setTimeout(() => {
          navigate('/home');  // Redirect to the desired page after successful login
        }, 100); 
        // }
      }
    } catch (error) {
      console.error(isLogin ? 'Login failed:' : 'Signup failed:', error);
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error messages from the server
        setErrors(prev => ({ ...prev, auth: error.response?.data?.message ?? 'Authentication failed. Please try again.' }));
      } else {
        setErrors(prev => ({ ...prev, auth: 'An unexpected error occurred. Please try again.' }));
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>{isLogin ? 'Welcome!' : 'Create account!'}</h2>
        {errors.auth && <p style={styles.error}>{errors.auth}</p>}
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
          {errors.email && <p className="error">{errors.email}</p>}
          <TooltipContainer>
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
            />
            {showTooltip && (
              <TooltipText>
                {authValidation.getPasswordRequirements().split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </TooltipText>
            )}
          </TooltipContainer>
          {errors.password && <p className="error">{errors.password}</p>}
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
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;
