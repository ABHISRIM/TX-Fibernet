import React, { useState, useEffect, useContext } from 'react';
import { LifeBuoy, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Support = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    issueType: 'Internet Not Working',
    subject: '',
    description: ''
  });

  const fetchTickets = async () => {
    try {
      const res = await api.get('/support/my');
      setTickets(res.data);
    } catch (err) {
      console.error('Error fetching tickets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.subject || !formData.description) {
      setError('Please provide a subject and description for your ticket.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/support', formData);
      setSuccess(true);
      setFormData({
        issueType: 'Internet Not Working',
        subject: '',
        description: ''
      });
      fetchTickets();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Customer Support & Tickets</h1>
        <p className="section-subtitle">
          Having network or billing issues? Raise a ticket and our technical team will assist you immediately.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '30px 0' }}>
          {/* Raise Support Ticket Form */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LifeBuoy size={22} color="#0284c7" /> Raise New Support Ticket
            </h3>

            {success && (
              <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} /> Support ticket created successfully!
              </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Issue Category *</label>
                <select
                  name="issueType"
                  className="form-select"
                  value={formData.issueType}
                  onChange={handleChange}
                >
                  <option value="Internet Not Working">Internet Not Working</option>
                  <option value="Slow Speed">Slow Speed</option>
                  <option value="Billing">Billing & Payment</option>
                  <option value="Connection Issue">Connection / Cable Fault</option>
                  <option value="Router Problem">Router / Wi-Fi Problem</option>
                  <option value="Other">Other Query</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Title *</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="Brief title of the issue"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Detailed Description *</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  rows="4"
                  placeholder="Explain the problem you are experiencing in detail..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Submitting Ticket...' : 'Submit Ticket'} <Send size={16} />
              </button>
            </form>
          </div>

          {/* Quick Help Card */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>24/7 Helpline</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
              For urgent connection loss or optical fiber breaks in your area, contact our toll-free phone support:
            </p>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)' }}>+91 98765 43210</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Toll-Free Technical Desk</div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Average response time for online support tickets: <strong>Under 30 Minutes</strong>.
            </p>
          </div>
        </div>

        {/* Previous Tickets List */}
        <h2 style={{ fontSize: '1.5rem', margin: '40px 0 16px 0', color: 'var(--dark-heading)' }}>My Support Tickets</h2>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>Loading tickets...</div>
        ) : tickets.length === 0 ? (
          <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
            You have not raised any support tickets yet.
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Category</th>
                  <th>Subject</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t._id}>
                    <td><code>TICK-{t._id.substring(18).toUpperCase()}</code></td>
                    <td>{t.issueType}</td>
                    <td>{t.subject}</td>
                    <td>{new Date(t.createdAt).toLocaleString()}</td>
                    <td>
                      <span className={`badge ${
                        t.status === 'Resolved' || t.status === 'Closed' ? 'badge-success' :
                        t.status === 'In Progress' ? 'badge-info' : 'badge-warning'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
