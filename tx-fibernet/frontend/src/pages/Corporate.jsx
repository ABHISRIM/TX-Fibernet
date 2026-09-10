import React, { useState } from 'react';
import { Building2, Shield, Zap, Send, CheckCircle } from 'lucide-react';
import api from '../services/api';

const Corporate = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    companyAddress: '',
    requiredSpeed: '100 Mbps',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.contactName || !formData.companyName || !formData.email || !formData.phone || !formData.companyAddress) {
      setError('Please fill all required business details.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/corporate', formData);
      setSuccess(true);
      setFormData({
        contactName: '',
        companyName: '',
        email: '',
        phone: '',
        companyAddress: '',
        requiredSpeed: '100 Mbps',
        message: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Business Internet Solutions</h1>
        <p className="section-subtitle">
          Dedicated fiber leased lines, enterprise Wi-Fi, and custom bandwidth for companies of all sizes.
        </p>

        {/* Corporate Solutions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', margin: '40px 0' }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <Building2 size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Business Broadband</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High-speed internet tailored for small offices and retail stores.</p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <Zap size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Dedicated Internet</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>1:1 unthrottled dedicated bandwidth for mission critical work.</p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <Shield size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Enterprise Connectivity</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Managed network infrastructure and multi-branch networking.</p>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '20px' }}>
            <Building2 size={28} color="#0284c7" style={{ marginBottom: '10px' }} />
            <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Leased Line</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High throughput gigabit fiber leased lines with 99.9% uptime SLA.</p>
          </div>
        </div>

        {/* Corporate Inquiry Form */}
        <div style={{ maxWidth: '750px', margin: '0 auto', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '36px' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '10px', textAlign: 'center' }}>Request Corporate Quote</h3>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Fill in your organization details and our enterprise account manager will reach out within 2 hours.
          </p>

          {success && (
            <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={18} /> Corporate inquiry submitted successfully! Our team will contact you shortly.
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Contact Name *</label>
                <input
                  type="text"
                  name="contactName"
                  className="form-input"
                  placeholder="Full Name"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company / Organization Name *</label>
                <input
                  type="text"
                  name="companyName"
                  className="form-input"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Work Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="10-digit mobile"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Company Address *</label>
              <input
                type="text"
                name="companyAddress"
                className="form-input"
                placeholder="Office Location / City"
                value={formData.companyAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Required Bandwidth Speed *</label>
              <select name="requiredSpeed" className="form-select" value={formData.requiredSpeed} onChange={handleChange}>
                <option value="100 Mbps">100 Mbps Leased Line</option>
                <option value="300 Mbps">300 Mbps Dedicated Fiber</option>
                <option value="500 Mbps">500 Mbps High Speed</option>
                <option value="1 Gbps">1 Gbps Gigabit Enterprise</option>
                <option value="Custom">Custom Solution / Multi-location</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Special Requirements / Message</label>
              <textarea
                name="message"
                className="form-textarea"
                rows="3"
                placeholder="Describe your network requirements..."
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Inquiry'} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Corporate;
