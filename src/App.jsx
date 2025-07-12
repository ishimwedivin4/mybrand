import React, { useState, useEffect } from 'react';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import TechStack from './pages/TechStack';

const App = () => {
  const [currentView, setCurrentView] = useState('portfolio'); // 'portfolio', 'login', 'dashboard'
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Check login status on app load
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('isAdminLoggedIn');
    if (savedLoginStatus === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminUsername');
    setIsAdminLoggedIn(false);
    setCurrentView('portfolio');
  };

  const getAdminButton = () => {
    const buttonStyle = {
      padding: '8px 16px',
      borderRadius: '20px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '0.85rem',
      textDecoration: 'none',
      display: 'inline-block'
    };

    if (currentView === 'portfolio') {
      return (
        <button 
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
          }}
          onClick={() => setCurrentView('login')}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 10px rgba(102, 126, 234, 0.3)';
          }}
        >
          🔐 Admin Login
        </button>
      );
    }

    if (currentView === 'dashboard' && isAdminLoggedIn) {
      return (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            style={{
              ...buttonStyle,
              background: 'rgba(45, 55, 72, 0.1)',
              color: '#2d3748',
              border: '1px solid #e2e8f0'
            }}
            onClick={() => setCurrentView('portfolio')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(45, 55, 72, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(45, 55, 72, 0.1)';
            }}
          >
            🏠 View Portfolio
          </button>
          <button 
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
              color: 'white',
              boxShadow: '0 2px 10px rgba(229, 62, 62, 0.3)'
            }}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 15px rgba(229, 62, 62, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 10px rgba(229, 62, 62, 0.3)';
            }}
          >
            🚪 Logout
          </button>
        </div>
      );
    }

    return null;
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'portfolio':
        return <Portfolio adminButton={getAdminButton()} />;
      case 'login':
        return <Login onLoginSuccess={handleLoginSuccess} onBackClick={() => setCurrentView('portfolio')} />;
      case 'dashboard':
        if (isAdminLoggedIn) {
          return <TechStack adminButton={getAdminButton()} />;
        } else {
          // If not logged in but trying to access dashboard, redirect to login
          setCurrentView('login');
          return <Login onLoginSuccess={handleLoginSuccess} onBackClick={() => setCurrentView('portfolio')} />;
        }
      default:
        return <Portfolio adminButton={getAdminButton()} />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  );
};

export default App;