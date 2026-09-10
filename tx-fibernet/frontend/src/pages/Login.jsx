import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Wifi, LogIn, Lock, Mail } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/dashboard';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      setLoading(false);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.');
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ maxWidth: '440px', margin: '0 auto', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '36px', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.5rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
              <Wifi size={28} color="#0284c7" />
              <span>TX</span> FIBERNET
            </div>
            <h2 style={{ fontSize: '1.4rem', marginTop: '12px' }}>Customer Login</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Access your account dashboard and active subscriptions.</p>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
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
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '10px' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} <LogIn size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', fontSize: '0.88rem', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <span>Don't have an account?</span>
            <Link to="/register" style={{ fontWeight: 600 }}>Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
