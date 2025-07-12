import React from 'react';
import Header from '../component/nnn/Header';
import Footer from '../component/nnn/Footer';
import Articles from '../component/Articles';
import Contacts from '../component/Contacts';
import Projects from '../component/Projects';
import Skills from '../component/Skills';
import TechStacks from '../component/TechStacks';
import Users from '../component/Users';

const TechStack = ({ adminButton = null }) => {
  const pageStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    },
    main: {
      flex: 1,
      backgroundColor: '#f8f9fa'
    },
    hero: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '4rem 2rem',
      textAlign: 'center'
    },
    heroTitle: {
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      opacity: 0.9,
      maxWidth: '600px',
      margin: '0 auto'
    },
    section: {
      padding: '3rem 2rem',
      maxWidth: '1400px',
      margin: '0 auto'
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#2d3748',
      position: 'relative'
    },
    sectionSubtitle: {
      fontSize: '1.1rem',
      textAlign: 'center',
      color: '#718096',
      marginBottom: '3rem',
      maxWidth: '800px',
      margin: '0 auto 3rem'
    },
    divider: {
      height: '4px',
      background: 'linear-gradient(90deg, #667eea, #764ba2)',
      width: '100px',
      margin: '1rem auto 2rem',
      borderRadius: '2px'
    },
    tabContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    tab: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #e2e8f0',
      backgroundColor: 'white',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      fontSize: '1rem'
    },
    tabActive: {
      backgroundColor: '#667eea',
      color: 'white',
      borderColor: '#667eea',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    componentContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '1px solid #e2e8f0'
    }
  };

  const [activeTab, setActiveTab] = React.useState('projects');

  const tabs = [
    { id: 'projects', label: '🚀 Projects', component: Projects },
    { id: 'skills', label: '⚡ Skills', component: Skills },
    { id: 'techstacks', label: '🛠️ Tech Stacks', component: TechStacks },
    { id: 'articles', label: '📝 Articles', component: Articles },
    { id: 'contacts', label: '📬 Messages', component: Contacts },
    { id: 'users', label: '👥 Users', component: Users }
  ];

  const renderActiveComponent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (activeTabData) {
      const Component = activeTabData.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div style={pageStyles.container}>
      <Header adminButton={adminButton} />
      
      <main style={pageStyles.main}>
        {/* Hero Section */}
        <section style={pageStyles.hero}>
          <h1 style={pageStyles.heroTitle}>Portfolio Management Dashboard</h1>
          <p style={pageStyles.heroSubtitle}>
            Comprehensive platform to manage your professional portfolio, 
            showcase projects, skills, and connect with your audience.
          </p>
        </section>

        {/* Main Content Section */}
        <section style={pageStyles.section}>
          <h2 style={pageStyles.sectionTitle}>Management Console</h2>
          <div style={pageStyles.divider}></div>
          <p style={pageStyles.sectionSubtitle}>
            Select a category below to manage your portfolio content. 
            Create, edit, and organize your professional information with ease.
          </p>

          {/* Tab Navigation */}
          <div style={pageStyles.tabContainer}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                style={{
                  ...pageStyles.tab,
                  ...(activeTab === tab.id ? pageStyles.tabActive : {})
                }}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.color = '#667eea';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.color = 'inherit';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Component */}
          <div style={pageStyles.componentContainer}>
            {renderActiveComponent()}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default TechStack;