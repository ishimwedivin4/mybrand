import React, { useState } from 'react';

const Header = ({ adminButton = null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'techstacks', label: 'Tech Stack', href: '#techstacks' },
    { id: 'articles', label: 'Articles', href: '#articles' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headerStyles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #e2e8f0',
      zIndex: 1000,
      padding: '0 20px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 0'
    },
    logo: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#2d3748',
      textDecoration: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    navList: {
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '2rem'
    },
    navListMobile: {
      display: 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      listStyle: 'none',
      margin: 0
    },
    navItem: {
      margin: 0
    },
    navLink: {
      textDecoration: 'none',
      color: '#4a5568',
      fontWeight: '500',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    navLinkActive: {
      color: '#667eea',
      backgroundColor: 'rgba(102, 126, 234, 0.1)'
    },
    hamburger: {
      display: 'none',
      flexDirection: 'column',
      cursor: 'pointer',
      padding: '4px',
      gap: '4px'
    },
    hamburgerLine: {
      width: '25px',
      height: '3px',
      backgroundColor: '#4a5568',
      transition: 'all 0.3s ease',
      borderRadius: '2px'
    },
    hamburgerLineOpen1: {
      transform: 'rotate(45deg) translate(6px, 6px)'
    },
    hamburgerLineOpen2: {
      opacity: 0
    },
    hamburgerLineOpen3: {
      transform: 'rotate(-45deg) translate(6px, -6px)'
    },
    cta: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '0.5rem 1.5rem',
      borderRadius: '25px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer'
    }
  };

  // Media query styles for mobile
  const mobileStyles = `
    @media (max-width: 768px) {
      .nav-list {
        display: none !important;
      }
      .nav-list-mobile {
        display: ${isMenuOpen ? 'flex' : 'none'} !important;
      }
      .hamburger {
        display: flex !important;
      }
      .cta-desktop {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyles}</style>
      <header style={headerStyles.header}>
        <nav style={headerStyles.nav}>
          {/* Logo */}
          <a 
            href="#home" 
            style={headerStyles.logo}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
          >
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <ul className="nav-list" style={headerStyles.navList}>
            {navItems.map((item) => (
              <li key={item.id} style={headerStyles.navItem}>
                <a
                  href={item.href}
                  style={{
                    ...headerStyles.navLink,
                    ...(activeSection === item.id ? headerStyles.navLinkActive : {})
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.color = '#667eea';
                      e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.target.style.color = '#4a5568';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Admin Button (if provided) */}
            {adminButton}
            
            {/* CTA Button Desktop */}
            <a 
              className="cta-desktop"
              href="#contact"
              style={headerStyles.cta}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#5a67d8';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#667eea';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div 
            className="hamburger"
            style={headerStyles.hamburger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div 
              style={{
                ...headerStyles.hamburgerLine,
                ...(isMenuOpen ? headerStyles.hamburgerLineOpen1 : {})
              }}
            ></div>
            <div 
              style={{
                ...headerStyles.hamburgerLine,
                ...(isMenuOpen ? headerStyles.hamburgerLineOpen2 : {})
              }}
            ></div>
            <div 
              style={{
                ...headerStyles.hamburgerLine,
                ...(isMenuOpen ? headerStyles.hamburgerLineOpen3 : {})
              }}
            ></div>
          </div>

          {/* Mobile Navigation */}
          <ul className="nav-list-mobile" style={headerStyles.navListMobile}>
            {navItems.map((item) => (
              <li key={item.id} style={{ ...headerStyles.navItem, textAlign: 'center' }}>
                <a
                  href={item.href}
                  style={{
                    ...headerStyles.navLink,
                    display: 'block',
                    padding: '1rem',
                    ...(activeSection === item.id ? headerStyles.navLinkActive : {})
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li style={{ textAlign: 'center', padding: '1rem' }}>
              <a 
                href="#contact"
                style={{
                  ...headerStyles.cta,
                  display: 'inline-block'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
              >
                Get In Touch
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div style={{ height: '80px' }}></div>
    </>
  );
};

export default Header;
