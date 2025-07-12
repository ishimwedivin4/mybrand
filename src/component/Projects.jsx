import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../services/api.js';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState('');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    deployedLink: '',
    user: { id: '' }
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  // Get projects by user
  const fetchProjectsByUser = async () => {
    if (!selectedUserId) {
      fetchProjects();
      return;
    }
    setLoading(true);
    try {
      const data = await projectsAPI.getByUser(selectedUserId);
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects by user');
    } finally {
      setLoading(false);
    }
  };

  // Get projects by tech stack
  const fetchProjectsByTechStack = async () => {
    if (!selectedTechStack) {
      fetchProjects();
      return;
    }
    setLoading(true);
    try {
      const data = await projectsAPI.getByTechStack(selectedTechStack);
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch projects by tech stack');
    } finally {
      setLoading(false);
    }
  };

  // Create new project
  const createProject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = {
        ...newProject,
        user: { id: parseInt(newProject.user.id) }
      };
      
      await projectsAPI.save(projectData);
      setNewProject({ title: '', description: '', techStack: '', githubLink: '', deployedLink: '', user: { id: '' } });
      setShowForm(false);
      setError('');
      fetchProjects();
    } catch (err) {
      setError('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        setError('');
        fetchProjects();
      } catch (err) {
        setError('Failed to delete project');
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="projects-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Projects Management</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <input
            type="number"
            placeholder="Filter by User ID"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={fetchProjectsByUser} style={{ padding: '8px 16px' }}>
            Filter by User
          </button>
        </div>
        
        <div>
          <input
            type="text"
            placeholder="Filter by Tech Stack"
            value={selectedTechStack}
            onChange={(e) => setSelectedTechStack(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={fetchProjectsByTechStack} style={{ padding: '8px 16px' }}>
            Filter by Tech
          </button>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showForm ? 'Cancel' : 'Add New Project'}
        </button>
        
        <button onClick={fetchProjects} style={{ padding: '8px 16px' }}>
          Show All
        </button>
      </div>

      {/* New Project Form */}
      {showForm && (
        <form onSubmit={createProject} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Create New Project</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Project Title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              required
              rows="3"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Tech Stack (e.g., React, Node.js, MongoDB)"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="url"
              placeholder="GitHub Link"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="url"
              placeholder="Deployed Link"
              value={newProject.deployedLink}
              onChange={(e) => setNewProject({ ...newProject, deployedLink: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="User ID"
              value={newProject.user.id}
              onChange={(e) => setNewProject({ ...newProject, user: { id: e.target.value } })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </form>
      )}

      {/* Projects Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h3 style={{ margin: '0', color: '#333' }}>{project.title}</h3>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
                
                <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '15px' }}>{project.description}</p>
                
                <div style={{ marginBottom: '15px' }}>
                  <strong>Tech Stack:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '5px' }}>
                    {project.techStack && project.techStack.split(',').map((tech, index) => (
                      <span key={index} style={{ 
                        backgroundColor: '#007bff', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px' 
                      }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#333', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      GitHub
                    </a>
                  )}
                  {project.deployedLink && (
                    <a 
                      href={project.deployedLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        padding: '6px 12px', 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
                
                {project.user && (
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
                    Created by User ID: {project.user.id}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;