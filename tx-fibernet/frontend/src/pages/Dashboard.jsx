import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wifi, Gauge, Calendar, CreditCard, LifeBuoy, LogOut, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = ({ onOpenConnectionModal }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await api.get('/subscriptions/my');
        setSubscriptions(res.data);
      } catch (err) {
        console.error('Failed to fetch subscriptions', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  const activeSubscription = subscriptions.find(s => s.status === 'Active') || subscriptions[0];

  return (
    <div className="section">
      <div className="container">
        {/* Welcome Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--dark-heading)' }}>
              Welcome, {user?.name || 'Customer'}!
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Manage your broadband connection, pay bills, and track support tickets.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/my-plans" className="btn btn-outline">
              My Subscriptions
            </Link>
            <Link to="/payments" className="btn btn-primary">
              <CreditCard size={16} /> Pay Bill
            </Link>
          </div>
        </div>

        {/* 4 Cards Overview */}
        <div className="dashboard-grid">
          <div className="dash-card">
            <div className="dash-card-title">Current Plan</div>
            <div className="dash-card-value" style={{ fontSize: '1.25rem' }}>
              {activeSubscription ? activeSubscription.planId?.name : 'No Active Plan'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {activeSubscription ? `₹${activeSubscription.planId?.price} / month` : 'Select a plan to start'}
            </p>
          </div>

          <div className="dash-card">
            <div className="dash-card-title">Internet Speed</div>
            <div className="dash-card-value" style={{ color: 'var(--primary-color)' }}>
              {activeSubscription ? activeSubscription.planId?.speed : '0 Mbps'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Symmetric Fiber Speed</p>
          </div>

          <div className="dash-card">
            <div className="dash-card-title">Subscription Status</div>
            <div style={{ marginTop: '6px' }}>
              {activeSubscription ? (
                <span className={`badge ${
                  activeSubscription.status === 'Active' ? 'badge-success' :
                  activeSubscription.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                }`}>
                  {activeSubscription.status}
                </span>
              ) : (
                <span className="badge badge-info">Inactive</span>
              )}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {activeSubscription?.status === 'Pending' ? 'Awaiting Payment' : 'Active Connection'}
            </p>
          </div>

          <div className="dash-card">
            <div className="dash-card-title">Expiry Date</div>
            <div className="dash-card-value" style={{ fontSize: '1.15rem' }}>
              {activeSubscription && activeSubscription.expiryDate
                ? new Date(activeSubscription.expiryDate).toLocaleDateString()
                : 'N/A'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Auto-Renewal Status</p>
          </div>
        </div>

        {/* Actions & Quick Navigation */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginTop: '20px' }}>
          {/* Active Plan Detail */}
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Active Broadband Connection</h3>

            {activeSubscription ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Customer ID / Ref</span>
                    <p style={{ fontWeight: 600 }}>TX-{activeSubscription._id.substring(18).toUpperCase()}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Installation Address</span>
                    <p style={{ fontWeight: 600 }}>{activeSubscription.address}, {activeSubscription.city}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Start Date</span>
                    <p style={{ fontWeight: 600 }}>{new Date(activeSubscription.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Data Allowance</span>
                    <p style={{ fontWeight: 600 }}>Unlimited High-Speed</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {activeSubscription.status === 'Pending' ? (
                    <Link to="/payments" className="btn btn-primary">
                      Pay Now & Activate Plan
                    </Link>
                  ) : (
                    <Link to="/payments" className="btn btn-primary">
                      Renew Plan
                    </Link>
                  )}
                  <Link to="/plans" className="btn btn-outline">
                    Change Plan
                  </Link>
                  <Link to="/support" className="btn btn-secondary">
                    <LifeBuoy size={16} /> Raise Support Ticket
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>You do not have an active broadband plan subscription.</p>
                <Link to="/plans" className="btn btn-primary">
                  Browse Fiber Plans
                </Link>
              </div>
            )}
          </div>

          {/* Quick Account Links */}
          <div style={{ background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '28px' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Quick Management</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li>
                <Link to="/my-plans" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--dark-heading)', fontWeight: 500 }}>
                  <span>My Subscriptions</span>
                  <ArrowRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/payments" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--dark-heading)', fontWeight: 500 }}>
                  <span>Payment History</span>
                  <ArrowRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/support" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--dark-heading)', fontWeight: 500 }}>
                  <span>Support Tickets</span>
                  <ArrowRight size={16} />
                </Link>
              </li>
              <li>
                <button
                  className="btn btn-danger btn-block"
                  style={{ marginTop: '10px' }}
                  onClick={() => { logout(); navigate('/login'); }}
                >
                  <LogOut size={16} /> Logout Account
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
