import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/ishimwedivin2',
      icon: '📂',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/ishimwedivin2',
      icon: '💼',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/username',
      icon: '🐦',
      color: '#1da1f2'
    },
    {
      name: 'Email',
      url: 'mailto:ishimwedivin2@gmail.com',
      icon: '📧',
      color: '#ea4335'
    },
    {
      name: 'Portfolio',
      url: 'https://ishimwedivin.vercel.app',
      icon: '🌐',
      color: '#667eea'
    }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

const services = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'API Development',
  'Database Design & Management',
  'DevOps, Docker & Deployment',
  'Network Configuration & Security'
];


  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const footerStyles = {
    footer: {
      backgroundColor: '#1a202c',
      color: '#e2e8f0',
      marginTop: '4rem'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 20px 1rem'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem'
    },
    section: {
      marginBottom: '1.5rem'
    },
    heading: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#f7fafc',
      borderBottom: '2px solid #667eea',
      paddingBottom: '0.5rem',
      display: 'inline-block'
    },
    description: {
      lineHeight: '1.6',
      marginBottom: '1.5rem',
      color: '#cbd5e0'
    },
    socialGrid: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      textDecoration: 'none',
      color: '#cbd5e0',
      padding: '0.5rem',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: '1px solid transparent'
    },
    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    linkItem: {
      marginBottom: '0.5rem'
    },
    link: {
      color: '#cbd5e0',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    serviceItem: {
      color: '#cbd5e0',
      marginBottom: '0.5rem',
      paddingLeft: '1rem',
      position: 'relative'
    },
    bottomBar: {
      borderTop: '1px solid #2d3748',
      paddingTop: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    copyright: {
      color: '#a0aec0',
      fontSize: '0.9rem'
    },
    backToTop: {
      color: '#667eea',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer style={footerStyles.footer}>
      <div style={footerStyles.container}>
        <div style={footerStyles.grid}>
          {/* About Section */}
          <div style={footerStyles.section}>
            <h3 style={footerStyles.heading}>About Me</h3>
            <p style={footerStyles.description}>
              Passionate full-stack developer with expertise in modern web technologies. 
              I create innovative solutions that bridge the gap between design and functionality, 
              delivering exceptional user experiences.
            </p>
            <div style={footerStyles.socialGrid}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={footerStyles.socialLink}
                  onMouseEnter={(e) => {
                    e.target.style.color = social.color;
                    e.target.style.borderColor = social.color;
                    e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#cbd5e0';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.backgroundColor = 'transparent';
                  }}
                  title={social.name}
                >
                  <span style={{ fontSize: '1.2rem' }}>{social.icon}</span>
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={footerStyles.section}>
            <h3 style={footerStyles.heading}>Quick Links</h3>
            <ul style={footerStyles.linkList}>
              {quickLinks.map((link, index) => (
                <li key={index} style={footerStyles.linkItem}>
                  <a
                    href={link.href}
                    style={footerStyles.link}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#667eea';
                      e.target.style.paddingLeft = '0.5rem';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#cbd5e0';
                      e.target.style.paddingLeft = '0';
                    }}
                  >
                    <span>→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div style={footerStyles.section}>
            <h3 style={footerStyles.heading}>Services</h3>
            <ul style={footerStyles.linkList}>
              {services.map((service, index) => (
                <li key={index} style={footerStyles.serviceItem}>
                  <span style={{ 
                    position: 'absolute', 
                    left: 0, 
                    color: '#667eea',
                    fontWeight: 'bold'
                  }}>
                    ●
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div style={footerStyles.section}>
            <h3 style={footerStyles.heading}>Get In Touch</h3>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ color: '#cbd5e0', marginBottom: '0.5rem' }}>
                📍 Kigali, Rwanda
              </p>
              <p style={{ color: '#cbd5e0', marginBottom: '0.5rem' }}>
                📞 +(250) 788-955-906
              </p>
              <p style={{ color: '#cbd5e0', marginBottom: '0.5rem' }}>
                📧 ishimwedivin2@gmail.com
              </p>
            </div>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#2d3748', 
              borderRadius: '8px',
              border: '1px solid #4a5568'
            }}>
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                color: '#e2e8f0',
                textAlign: 'center'
              }}>
                {/* 💡 "Code is like humor. When you have to explain it, it's bad." */}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={footerStyles.bottomBar}>
          <div style={footerStyles.copyright}>
            <p style={{ margin: 0 }}>
              © {currentYear} Ishimwe Divin. All rights reserved. Built using React(vite) & Spring Boot
            </p>
          </div>
          <a
            href="#"
            style={footerStyles.backToTop}
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#5a67d8';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>↑</span>
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
