// src/components/Signup.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      // Redirect to a protected route
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '80vh',
        justifyContent: 'center',
      }}
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
        <h2 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Create an Account</h2>
        <p style={{ marginBottom: '1.5rem', textAlign: 'center', color: '#666' }}>
          Sign up to save your favorite recipes and get started!
        </p>
        <form
          onSubmit={handleSignup}
          autoComplete="off"
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
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
            autoComplete="new-password"
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
            Sign Up
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ marginBottom: '0.5rem', color: '#888' }}>Already have an account?</p>
          <button
            onClick={() => navigate('/login')}
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
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
