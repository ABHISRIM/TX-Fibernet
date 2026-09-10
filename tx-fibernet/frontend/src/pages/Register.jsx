import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wifi, UserPlus } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '480px', margin: '0 auto', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
              <Wifi size={28} color="#0284c7" />
              <span>TX</span> FIBERNET
            </div>
            <h2 style={{ fontSize: '1.4rem', marginTop: '12px' }}>Create New Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Register to manage subscriptions and make bill payments online.</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Ramesh Kumar"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="name@domain.com"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="At least 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '10px' }} disabled={loading}>
              {loading ? 'Creating Account...' : 'Register Account'} <UserPlus size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.88rem', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <span>Already have an account?</span>
            <Link to="/login" style={{ fontWeight: 600 }}>Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
