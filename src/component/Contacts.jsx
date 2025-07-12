import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api.js';

const Contacts = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [newMessage, setNewMessage] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    user: { id: '' }
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch all messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const data = await contactAPI.getAll();
      setMessages(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  // Get messages by user
  const fetchMessagesByUser = async () => {
    if (!selectedUserId) {
      fetchMessages();
      return;
    }
    setLoading(true);
    try {
      const data = await contactAPI.getByUser(selectedUserId);
      setMessages(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch messages by user');
    } finally {
      setLoading(false);
    }
  };

  // Get messages by email
  const fetchMessagesByEmail = async () => {
    if (!selectedEmail) {
      fetchMessages();
      return;
    }
    setLoading(true);
    try {
      const data = await contactAPI.getByEmail(selectedEmail);
      setMessages(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch messages by email');
    } finally {
      setLoading(false);
    }
  };

  // Create new message
  const createMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const messageData = {
        ...newMessage,
        user: newMessage.user.id ? { id: parseInt(newMessage.user.id) } : null
      };
      
      await contactAPI.save(messageData);
      setNewMessage({ name: '', email: '', subject: '', message: '', user: { id: '' } });
      setShowForm(false);
      setError('');
      fetchMessages();
    } catch (err) {
      setError('Failed to create message');
    } finally {
      setLoading(false);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactAPI.delete(id);
        setError('');
        fetchMessages();
      } catch (err) {
        setError('Failed to delete message');
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="contacts-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Contact Messages Management</h1>
      
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
          <button onClick={fetchMessagesByUser} style={{ padding: '8px 16px' }}>
            Filter by User
          </button>
        </div>
        
        <div>
          <input
            type="email"
            placeholder="Filter by Email"
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            style={{ padding: '8px', marginRight: '5px' }}
          />
          <button onClick={fetchMessagesByEmail} style={{ padding: '8px 16px' }}>
            Filter by Email
          </button>
        </div>
        
        <button 
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          {showForm ? 'Cancel' : 'Add New Message'}
        </button>
        
        <button onClick={fetchMessages} style={{ padding: '8px 16px' }}>
          Show All
        </button>
      </div>

      {/* New Message Form */}
      {showForm && (
        <form onSubmit={createMessage} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '15px' }}>
          <h3>Create New Contact Message</h3>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={newMessage.name}
              onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newMessage.email}
              onChange={(e) => setNewMessage({ ...newMessage, email: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="text"
              placeholder="Subject"
              value={newMessage.subject}
              onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
              required
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <textarea
              placeholder="Message"
              value={newMessage.message}
              onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
              required
              rows="4"
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
            <input
              type="number"
              placeholder="User ID (optional)"
              value={newMessage.user.id}
              onChange={(e) => setNewMessage({ ...newMessage, user: { id: e.target.value } })}
              style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      {/* Messages List */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="messages-grid" style={{ display: 'grid', gap: '20px' }}>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            messages.map((message) => (
              <div key={message.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>{message.subject}</h3>
                    <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                      From: {message.name} ({message.email})
                      {message.user && ` | User ID: ${message.user.id}`}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteMessage(message.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px' }}
                  >
                    Delete
                  </button>
                </div>
                <p style={{ marginTop: '10px', lineHeight: '1.5' }}>{message.message}</p>
                {message.sentDate && (
                  <p style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                    Sent: {new Date(message.sentDate).toLocaleString()}
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

export default Contacts;