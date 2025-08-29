// src/components/Login.jsx
import React, { useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isErrorLoggingIn, setErrorLoggingIn] = useState(false);
  const navigate = useNavigate();

  const { user, loginUser, logoutUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      loginUser({ email: response.user.email });
      // Redirect to a protected route
      navigate('/');
    } catch (error) {
      setErrorLoggingIn(true);
      console.log('Error logging in: ', error);
      setError(error.message);
    }
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <div
        style={{
          background: 'white',
          padding: '2.5rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          minWidth: '320px',
          maxWidth: '90vw',
        }}
      >
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Welcome Back!</h2>
        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#666' }}>
          Sign in to your account to access your favorite recipes and more.
        </p>
        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: '0.8rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.8rem',
              borderRadius: '6px',
              background: '#4f46e5',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              marginTop: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        {isErrorLoggingIn && (
          <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>Unlucky, try again</p>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem', color: '#888' }}>Don't have an account?</p>
          <button
            onClick={() => navigate('/signup')}
            style={{
              padding: '0.7rem 1.5rem',
              borderRadius: '6px',
              background: '#e0e7ff',
              color: '#3730a3',
              fontWeight: 'bold',
              fontSize: '1rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
