import React, { useState, useEffect } from 'react';
import Header from '../component/nnn/Header';
import Footer from '../component/nnn/Footer';
import { projectsAPI, skillsAPI, techStacksAPI, articlesAPI, contactAPI } from '../services/api';

const Portfolio = ({ adminButton = null }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [techStacks, setTechStacks] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState('');

  // Fetch portfolio data
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    try {
      const [projectsData, skillsData, techStacksData, articlesData] = await Promise.all([
        projectsAPI.getAll(),
        skillsAPI.getAll(),
        techStacksAPI.getAll(),
        articlesAPI.getAll()
      ]);
      
      setProjects(projectsData.slice(0, 6)); // Show only featured projects
      setSkills(skillsData);
      setTechStacks(techStacksData);
      setArticles(articlesData.slice(0, 3)); // Show latest 3 articles
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.save(contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setContactStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const portfolioStyles = {
    // Hero Section
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    heroContent: {
      maxWidth: '1200px',
      padding: '0 max(20px, min(4vw, 2rem))',
      zIndex: 2,
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)', // Responsive font size
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    heroSubtitle: {
      fontSize: 'clamp(1rem, 3vw, 1.5rem)', // Responsive font size
      marginBottom: '2rem',
      opacity: 0.9,
      lineHeight: '1.6'
    },
    ctaButton: {
      display: 'inline-block',
      padding: 'clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)', // Responsive padding
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '50px',
      border: '2px solid white',
      fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', // Responsive font size
      fontWeight: '600',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)'
    },

    // Section Styles
    section: {
      padding: 'clamp(3rem, 8vw, 5rem) max(20px, min(4vw, 2rem))',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 4vw, 3rem)', // Responsive font size
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#2d3748'
    },
    sectionSubtitle: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', // Responsive font size
      textAlign: 'center',
      color: '#718096',
      marginBottom: '3rem',
      maxWidth: '600px',
      margin: '0 auto 3rem',
      lineHeight: '1.6'
    },
    divider: {
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      width: '100px',
      margin: '1rem auto 2rem',
      borderRadius: '2px'
    },

    // Grid Layouts
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', // Better responsive grid
      gap: 'clamp(1rem, 3vw, 2rem)', // Responsive gap
      marginTop: '2rem'
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', // Better responsive grid
      gap: 'clamp(1rem, 2.5vw, 1.5rem)', // Responsive gap
      marginTop: '2rem'
    },
    techGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', // Better responsive grid
      gap: 'clamp(1rem, 2.5vw, 1.5rem)', // Responsive gap
      marginTop: '2rem'
    },

    // Card Styles
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: 'clamp(1.5rem, 4vw, 2rem)', // Responsive padding
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    },
    projectCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease'
    },
    skillCard: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: 'clamp(1rem, 3vw, 1.5rem)', // Responsive padding
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      textAlign: 'center'
    },

    // Contact Form
    contactForm: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '600',
      color: '#2d3748'
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease'
    },
    textarea: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical',
      transition: 'border-color 0.3s ease'
    },
    submitButton: {
      backgroundColor: '#667eea',
      color: 'white',
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '#ffc107';
      case 'intermediate': return '#fd7e14';
      case 'advanced': return '#20c997';
      case 'expert': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'frontend': return '#61dafb';
      case 'backend': return '#68d391';
      case 'database': return '#fc8181';
      case 'devops': return '#fbb6ce';
      case 'mobile': return '#9f7aea';
      case 'desktop': return '#4fd1c7';
      case 'testing': return '#f6ad55';
      default: return '#a0aec0';
    }
  };

  return (
    <div style={{ 
      '--container-padding': 'max(20px, min(4vw, 2rem))',
      '--container-max-width': '1200px',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <Header adminButton={adminButton} />
      
      {/* Hero Section */}
      <section id="home" style={portfolioStyles.hero}>
        <div style={portfolioStyles.heroContent}>
          <h1 style={portfolioStyles.heroTitle}>Full Stack Developer | Network & DevOps Enthusiast</h1>
          <p style={portfolioStyles.heroSubtitle}>
          Bridging development and infrastructure to build fast, scalable, and secure web apps using modern tech,
          Docker, and solid networking practices.
          </p>
          <a 
            href="#contact" 
            style={portfolioStyles.ctaButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#667eea';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
              e.target.style.color = 'white';
            }}
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={portfolioStyles.section}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>About Me</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            Passionate full-stack developer with expertise in modern web technologies,
              networks, and containerization tools like Docker. 
              I create innovative solutions that bridge the gap between design and functionality,
              ensuring robust backend systems and seamless user experiences. 
              Skilled in both frontend and backend development, DevOps practices, 
              and deploying scalable, secure applications.
          </p>
        </div>
        <div style={portfolioStyles.card}>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.1rem)', lineHeight: '1.8', color: '#4a5568', textAlign: 'center' }}> {/* Responsive font */}
            I specialize in building full-stack applications using React, Spring Boot, and modern databases like PostgreSQL.
             With a sharp eye for design, clean code practices, and a strong background in Docker and networking,
             I turn ideas into robust, scalable, and secure digital solutions. 
             My goal is to bridge the gap between design, functionality, and infrastructure — delivering apps that
              are not only beautiful and responsive but also high-performing and production-ready.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" style={{ ...portfolioStyles.section, backgroundColor: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>Featured Projects</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            Here are some of my recent projects that showcase my skills and creativity.
          </p>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</div>
        ) : (
          <div style={portfolioStyles.grid}>
            {projects.map((project) => (
              <div 
                key={project.id} 
                style={portfolioStyles.projectCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)' }}> {/* Responsive padding */}
                  <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}> {/* Responsive font */}
                    {project.title}
                  </h3>
                  <p style={{ color: '#718096', marginBottom: '1rem', lineHeight: '1.6', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}> {/* Responsive font */}
                    {project.description}
                  </p>
                  <div style={{ marginBottom: '1rem' }}>
                    {project.techStack && project.techStack.split(',').map((tech, index) => (
                      <span key={index} style={{
                        display: 'inline-block',
                        backgroundColor: '#e2e8f0',
                        color: '#2d3748',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem'
                      }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" 
                         style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                        GitHub →
                      </a>
                    )}
                    {project.deployedLink && (
                      <a href={project.deployedLink} target="_blank" rel="noopener noreferrer"
                         style={{ color: '#667eea', textDecoration: 'none', fontWeight: '600' }}>
                        Live Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Skills Section */}
      <section id="skills" style={portfolioStyles.section}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>Skills & Expertise</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            My technical skills and proficiency levels across various technologies.
          </p>
        </div>
        
        <div style={portfolioStyles.skillsGrid}>
          {skills.map((skill) => (
            <div key={skill.id} style={portfolioStyles.skillCard}>
              <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}> {/* Responsive font */}
                {skill.name}
              </h3>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: getLevelColor(skill.level),
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                {skill.level?.charAt(0)}
              </div>
              <span style={{
                backgroundColor: getLevelColor(skill.level),
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                {skill.level}
              </span>
              {skill.description && (
                <p style={{ color: '#718096', marginTop: '1rem', fontSize: '0.9rem' }}>
                  {skill.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="techstacks" style={{ ...portfolioStyles.section, backgroundColor: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>Technology Stack</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            Technologies and tools I use to build amazing applications.
          </p>
        </div>
        
        <div style={portfolioStyles.techGrid}>
          {techStacks.map((tech) => (
            <div key={tech.id} style={portfolioStyles.skillCard}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                backgroundColor: getCategoryColor(tech.category),
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                {tech.name?.charAt(0)}
              </div>
              <h3 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 'bold', marginBottom: '0.5rem', color: '#2d3748' }}> {/* Responsive font */}
                {tech.name}
              </h3>
              <span style={{
                backgroundColor: getCategoryColor(tech.category),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                {tech.category}
              </span>
              {tech.version && (
                <p style={{ color: '#718096', marginTop: '0.5rem', fontSize: '0.8rem' }}>
                  v{tech.version}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" style={portfolioStyles.section}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>Latest Articles</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            Recent thoughts and insights about technology and development.
          </p>
        </div>
        
        <div style={portfolioStyles.grid}>
          {articles.map((article) => (
            <div key={article.id} style={portfolioStyles.card}>
              <h3 style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)', fontWeight: 'bold', marginBottom: '1rem', color: '#2d3748' }}> {/* Responsive font */}
                {article.title}
              </h3>
              <p style={{ color: '#718096', marginBottom: '1rem', lineHeight: '1.6' }}>
                {article.content?.substring(0, 150)}...
              </p>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
                {new Date(article.publishedDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ ...portfolioStyles.section, backgroundColor: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={portfolioStyles.sectionTitle}>Get In Touch</h2>
          <div style={portfolioStyles.divider}></div>
          <p style={portfolioStyles.sectionSubtitle}>
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <form onSubmit={handleContactSubmit} style={portfolioStyles.contactForm}>
            <div style={portfolioStyles.formGroup}>
              <label style={portfolioStyles.label}>Name</label>
              <input
                type="text"
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
                style={portfolioStyles.input}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            
            <div style={portfolioStyles.formGroup}>
              <label style={portfolioStyles.label}>Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
                style={portfolioStyles.input}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            
            <div style={portfolioStyles.formGroup}>
              <label style={portfolioStyles.label}>Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                required
                style={portfolioStyles.input}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            
            <div style={portfolioStyles.formGroup}>
              <label style={portfolioStyles.label}>Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                required
                style={portfolioStyles.textarea}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={portfolioStyles.submitButton}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5a67d8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
            
            {contactStatus === 'success' && (
              <p style={{ color: '#48bb78', marginTop: '1rem', textAlign: 'center' }}>
                ✅ Message sent successfully! I'll get back to you soon.
              </p>
            )}
            
            {contactStatus === 'error' && (
              <p style={{ color: '#f56565', marginTop: '1rem', textAlign: 'center' }}>
                ❌ Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
