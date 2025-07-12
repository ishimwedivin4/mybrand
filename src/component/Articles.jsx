import React, { useState, useEffect } from 'react';
import { articlesAPI } from '../services/api.js';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    publishedDate: '',
    user: { id: '' }
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch all articles
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const data = await articlesAPI.getAll();
      setArticles(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch articles');
    } finally {
      setLoading(false);
    }
  };

  // Search articles by keyword
  const searchArticles = async () => {
    if (!searchKeyword.trim()) {
      fetchArticles();
      return;
    }
    setLoading(true);
    try {
      const data = await articlesAPI.searchByKeyword(searchKeyword);
      setArticles(data);
      setError('');
    } catch (err) {
      setError('Failed to search articles');
    } finally {
      setLoading(false);
    }
  };

  // Get articles by user
  const fetchArticlesByUser = async () => {
    if (!selectedUserId) {
      fetchArticles();
      return;
    }
    setLoading(true);
    try {
      const data = await articlesAPI.getByUser(selectedUserId);
      setArticles(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch articles by user');
    } finally {
      setLoading(false);
    }
  };

  // Create new article
  const createArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const articleData = {
        ...newArticle,
        user: { id: parseInt(newArticle.user.id) },
        publishedDate: new Date(newArticle.publishedDate).toISOString()
      };
      
      await articlesAPI.save(articleData);
      setNewArticle({ title: '', content: '', publishedDate: '', user: { id: '' } });
      setShowForm(false);
      setError('');
      fetchArticles();
    } catch (err) {
      setError('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  // Delete article
  const deleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await articlesAPI.delete(id);
        setError('');
        fetchArticles();
      } catch (err) {
        setError('Failed to delete article');
      }
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="articles-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Articles Management</h1>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      {/* Search and Filter Controls */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <div>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={searchArticles} style={{ padding: '8px 16px' }}>
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
          <button onClick={fetchArticlesByUser} style={{ padding: '8px 16px' }}>
            Filter
          </button>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showForm ? 'Cancel' : 'Add New Article'}
        </button>
        
        <button onClick={fetchArticles} style={{ padding: '8px 16px' }}>
          Show All
        </button>
      </div>

      {/* New Article Form */}
      {showForm && (
        <form onSubmit={createArticle} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Create New Article</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Content"
              value={newArticle.content}
              onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
              required
              rows="4"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="datetime-local"
              value={newArticle.publishedDate}
              onChange={(e) => setNewArticle({ ...newArticle, publishedDate: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="User ID"
              value={newArticle.user.id}
              onChange={(e) => setNewArticle({ ...newArticle, user: { id: e.target.value } })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Creating...' : 'Create Article'}
          </button>
        </form>
      )}

      {/* Articles List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="articles-grid" style={{ display: 'grid', gap: '20px' }}>
          {articles.length === 0 ? (
            <p>No articles found.</p>
          ) : (
            articles.map((article) => (
              <div key={article.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                <h3>{article.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  Published: {new Date(article.publishedDate).toLocaleDateString()}
                  {article.user && ` | User ID: ${article.user.id}`}
                </p>
                <p style={{ marginTop: '10px' }}>{article.content}</p>
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => deleteArticle(article.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Articles;