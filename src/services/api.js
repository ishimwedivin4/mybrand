// API Service for Portfolio Application
const API_BASE_URL = 'https://brandbackend.up.railway.app';

// Generic API request handler
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle different response types
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Articles API
export const articlesAPI = {
  // Get all articles
  getAll: () => apiRequest('/articles'),
  
  // Get article by ID
  getById: (id) => apiRequest(`/articles/${id}`),
  
  // Get articles by user
  getByUser: (userId) => apiRequest(`/articles/user/${userId}`),
  
  // Search articles by keyword
  searchByKeyword: (keyword) => apiRequest(`/articles/search?keyword=${encodeURIComponent(keyword)}`),
  
  // Get articles before date
  getBeforeDate: (date) => apiRequest(`/articles/before-date?date=${encodeURIComponent(date)}`),
  
  // Get articles after date
  getAfterDate: (date) => apiRequest(`/articles/after-date?date=${encodeURIComponent(date)}`),
  
  // Create or update article
  save: (article) => apiRequest('/articles', {
    method: 'POST',
    body: JSON.stringify(article),
  }),
  
  // Delete article
  delete: (id) => apiRequest(`/articles/${id}`, {
    method: 'DELETE',
  }),
};

// Contact Messages API
export const contactAPI = {
  // Get all messages
  getAll: () => apiRequest('/messages'),
  
  // Get message by ID
  getById: (id) => apiRequest(`/messages/${id}`),
  
  // Get messages by user
  getByUser: (userId) => apiRequest(`/messages/user/${userId}`),
  
  // Get messages by email
  getByEmail: (email) => apiRequest(`/messages/email/${encodeURIComponent(email)}`),
  
  // Create or update message
  save: (message) => apiRequest('/messages', {
    method: 'POST',
    body: JSON.stringify(message),
  }),
  
  // Delete message
  delete: (id) => apiRequest(`/messages/${id}`, {
    method: 'DELETE',
  }),
};

// Projects API
export const projectsAPI = {
  // Get all projects
  getAll: () => apiRequest('/projects'),
  
  // Get project by ID
  getById: (id) => apiRequest(`/projects/${id}`),
  
  // Get projects by user
  getByUser: (userId) => apiRequest(`/projects/user/${userId}`),
  
  // Get projects by tech stack
  getByTechStack: (techStack) => apiRequest(`/projects/techstack/${encodeURIComponent(techStack)}`),
  
  // Get projects by GitHub link
  getByGitHubLink: (githubLink) => apiRequest(`/projects/github/${encodeURIComponent(githubLink)}`),
  
  // Create or update project
  save: (project) => apiRequest('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  }),
  
  // Delete project
  delete: (id) => apiRequest(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Skills API
export const skillsAPI = {
  // Get all skills
  getAll: () => apiRequest('/skills'),
  
  // Get skill by ID
  getById: (id) => apiRequest(`/skills/${id}`),
  
  // Get skills by user
  getByUser: (userId) => apiRequest(`/skills/user/${userId}`),
  
  // Get skills by level
  getByLevel: (level) => apiRequest(`/skills/level/${encodeURIComponent(level)}`),
  
  // Search skills by name
  searchByName: (name) => apiRequest(`/skills/search?name=${encodeURIComponent(name)}`),
  
  // Create or update skill
  save: (skill) => apiRequest('/skills', {
    method: 'POST',
    body: JSON.stringify(skill),
  }),
  
  // Delete skill
  delete: (id) => apiRequest(`/skills/${id}`, {
    method: 'DELETE',
  }),
};

// Tech Stacks API
export const techStacksAPI = {
  // Get all tech stacks
  getAll: () => apiRequest('/techstacks'),
  
  // Get tech stack by ID
  getById: (id) => apiRequest(`/techstacks/${id}`),
  
  // Get tech stacks by user
  getByUser: (userId) => apiRequest(`/techstacks/user/${userId}`),
  
  // Search tech stacks by name
  searchByName: (name) => apiRequest(`/techstacks/search?name=${encodeURIComponent(name)}`),
  
  // Create or update tech stack
  save: (techStack) => apiRequest('/techstacks', {
    method: 'POST',
    body: JSON.stringify(techStack),
  }),
  
  // Delete tech stack
  delete: (id) => apiRequest(`/techstacks/${id}`, {
    method: 'DELETE',
  }),
};

// Users API
export const usersAPI = {
  // Get all users
  getAll: () => apiRequest('/users/getusers'),
  
  // Get user by ID
  getById: (id) => apiRequest(`/users/${id}`),
  
  // Get user by username
  getByUsername: (username) => apiRequest(`/users/username/${encodeURIComponent(username)}`),
  
  // Get user by email
  getByEmail: (email) => apiRequest(`/users/email/${encodeURIComponent(email)}`),
  
  // Register new user
  register: (user) => apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  
  // Login user - Using checkRole endpoint for authentication
  login: async (username, password) => {
    try {
      // Use checkRole to validate credentials
      // We'll check for any role - if credentials are valid, it will succeed
      const roleToCheck = 'USER'; // Default role to check
      
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('role', roleToCheck);
      
      const response = await fetch(`${API_BASE_URL}/users/checkRole`, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.text();
        // If user exists and credentials are valid, login successful
        return `Login successful for user: ${username}`;
      } else if (response.status === 400) {
        // Check if it's a missing parameter error or invalid credentials
        throw new Error('Invalid credentials');
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Check user role
  checkRole: (username, password, role) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('role', role);
    
    return apiRequest('/users/checkRole', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set it for FormData
      body: formData,
    });
  },
  
  // Delete user
  delete: (id) => apiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Configuration and utility functions
export const apiConfig = {
  baseURL: API_BASE_URL,
  
  // Update base URL (useful for different environments)
  setBaseURL: (url) => {
    API_BASE_URL = url;
  },
  
  // Get current base URL
  getBaseURL: () => API_BASE_URL,
};

// Export default object with all APIs
export default {
  articles: articlesAPI,
  contact: contactAPI,
  projects: projectsAPI,
  skills: skillsAPI,
  techStacks: techStacksAPI,
  users: usersAPI,
  config: apiConfig,
};
