import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import api from '../services/api';

const GetConnectionModal = ({ isOpen, onClose, defaultPlan = 'Standard Fiber' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: 'Tiruppur',
    pincode: '',
    preferredPlan: defaultPlan,
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.fullName || !formData.mobile || !formData.email || !formData.address || !formData.pincode) {
      setError('Please fill all required fields.');
      return;
    }

    if (formData.mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/connection', formData);
      setSuccess(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit request. Please try again.');
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError('');
    setFormData({
      fullName: '',
      mobile: '',
      email: '',
      address: '',
      city: 'Tiruppur',
      pincode: '',
      preferredPlan: defaultPlan,
      message: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Request Submitted!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your connection request has been submitted successfully. Our technical team will get in touch with you shortly.
            </p>
            <button className="btn btn-primary btn-block" onClick={handleReset}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Get New Fiber Connection</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Fill in your details below and experience ultra-fast optical fiber broadband.
            </p>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-input"
                    placeholder="10-digit mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Installation Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Door No, Street, Landmark"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <select name="city" className="form-select" value={formData.city} onChange={handleChange}>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Erode">Erode</option>
                    <option value="Palladam">Palladam</option>
                    <option value="Sulur">Sulur</option>
                    <option value="Palani">Palani</option>
                    <option value="Kodaikanal">Kodaikanal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-input"
                    placeholder="600000"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Plan</label>
                <input
                  type="text"
                  name="preferredPlan"
                  className="form-input"
                  value={formData.preferredPlan}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Message (Optional)</label>
                <textarea
                  name="message"
                  className="form-textarea"
                  rows="2"
                  placeholder="Any special installation instructions..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Submitting...' : 'Request Connection'} <Send size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default GetConnectionModal;
