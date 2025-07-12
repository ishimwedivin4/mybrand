import React, { useState, useEffect } from 'react';
import { skillsAPI } from '../services/api.js';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [searchName, setSearchName] = useState('');
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: '',
    description: '',
    user: { id: '' }
  });
  const [showForm, setShowForm] = useState(false);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  // Fetch all skills
  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await skillsAPI.getAll();
      setSkills(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch skills');
    } finally {
      setLoading(false);
    }
  };

  // Search skills by name
  const searchSkills = async () => {
    if (!searchName.trim()) {
      fetchSkills();
      return;
    }
    setLoading(true);
    try {
      const data = await skillsAPI.searchByName(searchName);
      setSkills(data);
      setError('');
    } catch (err) {
      setError('Failed to search skills');
    } finally {
      setLoading(false);
    }
  };

  // Get skills by user
  const fetchSkillsByUser = async () => {
    if (!selectedUserId) {
      fetchSkills();
      return;
    }
    setLoading(true);
    try {
      const data = await skillsAPI.getByUser(selectedUserId);
      setSkills(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch skills by user');
    } finally {
      setLoading(false);
    }
  };

  // Get skills by level
  const fetchSkillsByLevel = async () => {
    if (!selectedLevel) {
      fetchSkills();
      return;
    }
    setLoading(true);
    try {
      const data = await skillsAPI.getByLevel(selectedLevel);
      setSkills(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch skills by level');
    } finally {
      setLoading(false);
    }
  };

  // Create new skill
  const createSkill = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skillData = {
        ...newSkill,
        user: { id: parseInt(newSkill.user.id) }
      };
      
      await skillsAPI.save(skillData);
      setNewSkill({ name: '', level: '', description: '', user: { id: '' } });
      setShowForm(false);
      setError('');
      fetchSkills();
    } catch (err) {
      setError('Failed to create skill');
    } finally {
      setLoading(false);
    }
  };

  // Delete skill
  const deleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await skillsAPI.delete(id);
        setError('');
        fetchSkills();
      } catch (err) {
        setError('Failed to delete skill');
      }
    }
  };

  // Get level color
  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '#ffc107';
      case 'intermediate': return '#fd7e14';
      case 'advanced': return '#20c997';
      case 'expert': return '#6f42c1';
      default: return '#6c757d';
    }
  };

  // Get level width for progress bar
  const getLevelWidth = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return '25%';
      case 'intermediate': return '50%';
      case 'advanced': return '75%';
      case 'expert': return '100%';
      default: return '0%';
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="skills-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Skills Management</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <input
            type="text"
            placeholder="Search skills by name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={searchSkills} style={{ padding: '8px 16px' }}>
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
          <button onClick={fetchSkillsByUser} style={{ padding: '8px 16px' }}>
            Filter by User
          </button>
        </div>
        
        <div>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          >
            <option value="">Select Level</option>
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <button onClick={fetchSkillsByLevel} style={{ padding: '8px 16px' }}>
            Filter by Level
          </button>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showForm ? 'Cancel' : 'Add New Skill'}
        </button>
        
        <button onClick={fetchSkills} style={{ padding: '8px 16px' }}>
          Show All
        </button>
      </div>

      {/* New Skill Form */}
      {showForm && (
        <form onSubmit={createSkill} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Create New Skill</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            >
              <option value="">Select Level</option>
              {skillLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <textarea
              placeholder="Description"
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              rows="3"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="User ID"
              value={newSkill.user.id}
              onChange={(e) => setNewSkill({ ...newSkill, user: { id: e.target.value } })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Creating...' : 'Create Skill'}
          </button>
        </form>
      )}

      {/* Skills Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {skills.length === 0 ? (
            <p>No skills found.</p>
          ) : (
            skills.map((skill) => (
              <div key={skill.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{skill.name}</h3>
                    <span 
                      style={{ 
                        backgroundColor: getLevelColor(skill.level), 
                        color: 'white', 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    >
                      {skill.level}
                    </span>
                  </div>
                  <button 
                    onClick={() => deleteSkill(skill.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
                
                {/* Progress Bar */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ 
                    width: '100%', 
                    backgroundColor: '#e9ecef', 
                    borderRadius: '4px', 
                    overflow: 'hidden',
                    height: '8px'
                  }}>
                    <div 
                      style={{ 
                        width: getLevelWidth(skill.level), 
                        height: '100%', 
                        backgroundColor: getLevelColor(skill.level),
                        transition: 'width 0.3s ease'
                      }}
                    ></div>
                  </div>
                </div>
                
                {skill.description && (
                  <p style={{ color: '#666', lineHeight: '1.5', marginBottom: '15px' }}>
                    {skill.description}
                  </p>
                )}
                
                {skill.user && (
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>
                    User ID: {skill.user.id}
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

export default Skills;