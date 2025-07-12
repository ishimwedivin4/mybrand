import React, { useState, useEffect } from 'react';
import { techStacksAPI } from '../services/api.js';

const TechStacks = () => {
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [newTechStack, setNewTechStack] = useState({
    name: '',
    description: '',
    category: '',
    version: '',
    user: { id: '' }
  });
  const [showForm, setShowForm] = useState(false);

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Desktop', 'Testing', 'Other'];

  // Fetch all tech stacks
  const fetchTechStacks = async () => {
    setLoading(true);
    try {
      const data = await techStacksAPI.getAll();
      setTechStacks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tech stacks');
    } finally {
      setLoading(false);
    }
  };

  // Search tech stacks by name
  const searchTechStacks = async () => {
    if (!searchName.trim()) {
      fetchTechStacks();
      return;
    }
    setLoading(true);
    try {
      const data = await techStacksAPI.searchByName(searchName);
      setTechStacks(data);
      setError('');
    } catch (err) {
      setError('Failed to search tech stacks');
    } finally {
      setLoading(false);
    }
  };

  // Get tech stacks by user
  const fetchTechStacksByUser = async () => {
    if (!selectedUserId) {
      fetchTechStacks();
      return;
    }
    setLoading(true);
    try {
      const data = await techStacksAPI.getByUser(selectedUserId);
      setTechStacks(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tech stacks by user');
    } finally {
      setLoading(false);
    }
  };

  // Create new tech stack
  const createTechStack = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const techStackData = {
        ...newTechStack,
        user: { id: parseInt(newTechStack.user.id) }
      };
      
      await techStacksAPI.save(techStackData);
      setNewTechStack({ name: '', description: '', category: '', version: '', user: { id: '' } });
      setShowForm(false);
      setError('');
      fetchTechStacks();
    } catch (err) {
      setError('Failed to create tech stack');
    } finally {
      setLoading(false);
    }
  };

  // Delete tech stack
  const deleteTechStack = async (id) => {
    if (window.confirm('Are you sure you want to delete this tech stack?')) {
      try {
        await techStacksAPI.delete(id);
        setError('');
        fetchTechStacks();
      } catch (err) {
        setError('Failed to delete tech stack');
      }
    }
  };

  // Get category color
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

  useEffect(() => {
    fetchTechStacks();
  }, []);

  return (
    <div className="techstacks-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Tech Stacks Management</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <input
            type="text"
            placeholder="Search tech stacks by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={searchTechStacks} style={{ padding: '8px 16px' }}>
            Search
          </button>
        </div>
        
        <div>
          <input
            type="number"
            placeholder="Filter by User ID"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={fetchTechStacksByUser} style={{ padding: '8px 16px' }}>
            Filter by User
          </button>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showForm ? 'Cancel' : 'Add New Tech Stack'}
        </button>
        
        <button onClick={fetchTechStacks} style={{ padding: '8px 16px' }}>
          Show All
        </button>
      </div>

      {/* New Tech Stack Form */}
      {showForm && (
        <form onSubmit={createTechStack} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Create New Tech Stack</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Tech Stack Name"
              value={newTechStack.name}
              onChange={(e) => setNewTechStack({ ...newTechStack, name: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <select
              value={newTechStack.category}
              onChange={(e) => setNewTechStack({ ...newTechStack, category: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Version (optional)"
              value={newTechStack.version}
              onChange={(e) => setNewTechStack({ ...newTechStack, version: e.target.value })}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Description"
              value={newTechStack.description}
              onChange={(e) => setNewTechStack({ ...newTechStack, description: e.target.value })}
              rows="3"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="User ID"
              value={newTechStack.user.id}
              onChange={(e) => setNewTechStack({ ...newTechStack, user: { id: e.target.value } })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Creating...' : 'Create Tech Stack'}
          </button>
        </form>
      )}

      {/* Tech Stacks Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="techstacks-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {techStacks.length === 0 ? (
            <p>No tech stacks found.</p>
          ) : (
            techStacks.map((techStack) => (
              <div key={techStack.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>{techStack.name}</h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {techStack.category && (
                        <span 
                          style={{ 
                            backgroundColor: getCategoryColor(techStack.category), 
                            color: 'white', 
                            padding: '4px 8px', 
                            borderRadius: '12px', 
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}
                        >
                          {techStack.category}
                        </span>
                      )}
                      {techStack.version && (
                        <span 
                          style={{ 
                            backgroundColor: '#6c757d', 
                            color: 'white', 
                            padding: '2px 6px', 
                            borderRadius: '8px', 
                            fontSize: '11px'
                          }}
                        >
                          v{techStack.version}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTechStack(techStack.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
                
                {techStack.description && (
                  <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '15px' }}>
                    {techStack.description}
                  </p>
                )}
                
                {/* Tech Stack Icon/Visual */}
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: getCategoryColor(techStack.category), 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '15px',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  {techStack.name ? techStack.name.charAt(0).toUpperCase() : '?'}
                </div>
                
                {techStack.user && (
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
                    User ID: {techStack.user.id}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Categories Legend */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4 style={{ marginBottom: '10px' }}>Categories:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map(category => (
            <span 
              key={category}
              style={{ 
                backgroundColor: getCategoryColor(category), 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStacks;