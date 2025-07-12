import React, { useState, useEffect } from 'react';
import { usersAPI } from '../services/api.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: ''
  });
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [roleCheckData, setRoleCheckData] = useState({
    username: '',
    password: '',
    role: ''
  });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRoleCheckForm, setShowRoleCheckForm] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [roleCheckMessage, setRoleCheckMessage] = useState('');

  const roles = ['USER', 'ADMIN', 'MODERATOR', 'DEVELOPER'];

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await usersAPI.getAll();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Search user by username
  const searchUserByUsername = async () => {
    if (!searchUsername.trim()) {
      fetchUsers();
      return;
    }
    setLoading(true);
    try {
      const user = await usersAPI.getByUsername(searchUsername);
      setUsers(user ? [user] : []);
      setError('');
    } catch (err) {
      setError('User not found');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Search user by email
  const searchUserByEmail = async () => {
    if (!searchEmail.trim()) {
      fetchUsers();
      return;
    }
    setLoading(true);
    try {
      const user = await usersAPI.getByEmail(searchEmail);
      setUsers(user ? [user] : []);
      setError('');
    } catch (err) {
      setError('User not found');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const registerUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await usersAPI.register(newUser);
      setNewUser({ username: '', email: '', password: '', firstName: '', lastName: '', role: '' });
      setShowRegisterForm(false);
      setError('');
      fetchUsers();
    } catch (err) {
      setError('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const loginUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginMessage('');
    try {
      const message = await usersAPI.login(loginData.username, loginData.password);
      setLoginMessage(message);
      setLoginData({ username: '', password: '' });
    } catch (err) {
      setLoginMessage('Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Check user role
  const checkUserRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoleCheckMessage('');
    try {
      const message = await usersAPI.checkRole(roleCheckData.username, roleCheckData.password, roleCheckData.role);
      setRoleCheckMessage(message);
      setRoleCheckData({ username: '', password: '', role: '' });
    } catch (err) {
      setRoleCheckMessage('Role check failed');
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(id);
        setError('');
        fetchUsers();
      } catch (err) {
        setError('Failed to delete user');
      }
    }
  };

  // Get role color
  const getRoleColor = (role) => {
    switch (role?.toUpperCase()) {
      case 'ADMIN': return '#dc3545';
      case 'MODERATOR': return '#fd7e14';
      case 'DEVELOPER': return '#6f42c1';
      case 'USER': return '#28a745';
      default: return '#6c757d';
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="users-container" style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h1>Users Management</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Action Buttons */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showRegisterForm ? 'Cancel Register' : 'Register User'}
        </button>
        
        <button 
          onClick={() => setShowLoginForm(!showLoginForm)}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          {showLoginForm ? 'Cancel Login' : 'Login'}
        </button>
        
        <button 
          onClick={() => setShowRoleCheckForm(!showRoleCheckForm)}
          style={{ padding: '8px 16px', backgroundColor: '#ffc107', color: 'black', border: 'none' }}
        >
          {showRoleCheckForm ? 'Cancel Role Check' : 'Check Role'}
        </button>
      </div>

      {/* Search Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <input
            type="text"
            placeholder="Search by username..."
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={searchUserByUsername} style={{ padding: '8px 16px' }}>
            Search Username
          </button>
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={searchUserByEmail} style={{ padding: '8px 16px' }}>
            Search Email
          </button>
        </div>
        
        <button onClick={fetchUsers} style={{ padding: '8px 16px' }}>
          Show All Users
        </button>
      </div>

      {/* Register Form */}
      {showRegisterForm && (
        <form onSubmit={registerUser} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Register New User</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
              style={{ padding: '8px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              style={{ padding: '8px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              required
              style={{ padding: '8px' }}
            />
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              style={{ padding: '8px' }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              style={{ padding: '8px' }}
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              style={{ padding: '8px' }}
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Registering...' : 'Register User'}
          </button>
        </form>
      )}

      {/* Login Form */}
      {showLoginForm && (
        <form onSubmit={loginUser} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>User Login</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Username"
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
              style={{ padding: '8px', flex: '1', minWidth: '200px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
              style={{ padding: '8px', flex: '1', minWidth: '200px' }}
            />
            <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {loginMessage && (
            <div style={{ 
              color: loginMessage.includes('successful') ? 'green' : 'red',
              marginTop: '10px',
              padding: '10px',
              backgroundColor: loginMessage.includes('successful') ? '#d4edda' : '#f8d7da',
              border: `1px solid ${loginMessage.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px'
            }}>
              {loginMessage}
            </div>
          )}
        </form>
      )}

      {/* Role Check Form */}
      {showRoleCheckForm && (
        <form onSubmit={checkUserRole} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Check User Role</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Username"
              value={roleCheckData.username}
              onChange={(e) => setRoleCheckData({ ...roleCheckData, username: e.target.value })}
              required
              style={{ padding: '8px', flex: '1', minWidth: '150px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={roleCheckData.password}
              onChange={(e) => setRoleCheckData({ ...roleCheckData, password: e.target.value })}
              required
              style={{ padding: '8px', flex: '1', minWidth: '150px' }}
            />
            <select
              value={roleCheckData.role}
              onChange={(e) => setRoleCheckData({ ...roleCheckData, role: e.target.value })}
              required
              style={{ padding: '8px', flex: '1', minWidth: '120px' }}
            >
              <option value="">Select Role to Check</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#ffc107', color: 'black', border: 'none' }}>
              {loading ? 'Checking...' : 'Check Role'}
            </button>
          </div>
          {roleCheckMessage && (
            <div style={{ 
              color: roleCheckMessage.includes('has the') ? 'green' : 'red',
              marginTop: '10px',
              padding: '10px',
              backgroundColor: roleCheckMessage.includes('has the') ? '#d4edda' : '#f8d7da',
              border: `1px solid ${roleCheckMessage.includes('has the') ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '4px'
            }}>
              {roleCheckMessage}
            </div>
          )}
        </form>
      )}

      {/* Users List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="users-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => (
              <div key={user.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>
                      {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username}
                    </h3>
                    <p style={{ margin: '0 0 5px 0', color: '#666', fontSize: '14px' }}>
                      @{user.username}
                    </p>
                    {user.role && (
                      <span 
                        style={{ 
                          backgroundColor: getRoleColor(user.role), 
                          color: 'white', 
                          padding: '4px 8px', 
                          borderRadius: '12px', 
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}
                      >
                        {user.role}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p style={{ margin: '5px 0', color: '#666' }}>
                    <strong>User ID:</strong> {user.id}
                  </p>
                  {user.createdDate && (
                    <p style={{ margin: '5px 0', color: '#999', fontSize: '12px' }}>
                      <strong>Created:</strong> {new Date(user.createdDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Roles Legend */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4 style={{ marginBottom: '10px' }}>User Roles:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {roles.map(role => (
            <span 
              key={role}
              style={{ 
                backgroundColor: getRoleColor(role), 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;