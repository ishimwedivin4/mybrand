import React, { useState } from 'react';
import { usersAPI } from '../services/api';

const Login = ({ onLoginSuccess, onBackClick = () => window.history.back() }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await usersAPI.login(loginData.username, loginData.password);
      
      if (response && response.includes('successful')) {
        // Store login status in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminUsername', loginData.username);
        
        // Call success callback
        onLoginSuccess();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const loginStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    },
    loginBox: {
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '3rem',
      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#2d3748',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      color: '#718096',
      marginBottom: '2rem',
      fontSize: '1.1rem'
    },
    form: {
      textAlign: 'left'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#2d3748',
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem'
    },
    error: {
      color: '#e53e3e',
      backgroundColor: '#fed7d7',
      padding: '0.75rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      fontSize: '0.9rem',
      textAlign: 'center'
    },
    adminNote: {
      backgroundColor: '#e6fffa',
      border: '1px solid #38b2ac',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      color: '#234e52'
    },
    demoCredentials: {
      backgroundColor: '#f7fafc',
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem',
      fontSize: '0.85rem',
      color: '#4a5568',
      textAlign: 'center'
    }
  };

  return (
    <div style={loginStyles.container}>
      {/* Back Button */}
      <button
        onClick={onBackClick}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          borderRadius: '25px',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#2d3748',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '0.9rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.backgroundColor = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        }}
      >
        ← Back to Portfolio
      </button>
      
      <div style={loginStyles.loginBox}>
        <h1 style={loginStyles.title}>Admin Login</h1>
        <p style={loginStyles.subtitle}>Access your portfolio dashboard</p>
        
        <div style={loginStyles.adminNote}>
          <strong>🔐 Admin Access Only</strong><br/>
          This area is restricted to portfolio administrators only.
        </div>

        {error && (
          <div style={loginStyles.error}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={loginStyles.form}>
          <div style={loginStyles.formGroup}>
            <label style={loginStyles.label}>Username</label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
              style={loginStyles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your username"
            />
          </div>

          <div style={loginStyles.formGroup}>
            <label style={loginStyles.label}>Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
              style={loginStyles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={loginStyles.button}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? (
              <span>
                🔄 Signing In...
              </span>
            ) : (
              <span>
                🚀 Sign In to Dashboard
              </span>
            )}
          </button>
        </form>

        <div style={loginStyles.demoCredentials}>
          <strong>Demo Credentials:</strong><br/>
          Username: divin<br/>
          Password: 123<br/>
          <em style={{ fontSize: '0.8rem', color: '#718096' }}>
            (or admin/admin123 if available)
          </em>
        </div>
      </div>
    </div>
  );
};

export default Login;
