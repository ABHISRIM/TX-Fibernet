import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Calendar, CreditCard, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const MyPlans = () => {
  const { user } = useContext(AuthContext);
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

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>My Broadband Subscriptions</h1>
            <p style={{ color: 'var(--text-muted)' }}>View all active, pending, and past fiber subscriptions.</p>
          </div>
          <Link to="/plans" className="btn btn-primary">
            Browse All Plans <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            Loading your subscriptions...
          </div>
        ) : subscriptions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
            <AlertCircle size={48} color="#f59e0b" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No Active Subscription</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              You have not subscribed to any broadband plan yet.
            </p>
            <Link to="/plans" className="btn btn-primary">
              Browse Plans
            </Link>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Speed</th>
                  <th>Monthly Price</th>
                  <th>Start Date</th>
                  <th>Expiry Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub._id}>
                    <td>
                      <strong>{sub.planId?.name || 'Fiber Plan'}</strong>
                    </td>
                    <td>{sub.planId?.speed || 'N/A'}</td>
                    <td>₹{sub.planId?.price || 0}</td>
                    <td>{sub.startDate ? new Date(sub.startDate).toLocaleDateString() : 'N/A'}</td>
                    <td>{sub.expiryDate ? new Date(sub.expiryDate).toLocaleDateString() : 'N/A'}</td>
                    <td>
                      <span className={`badge ${
                        sub.status === 'Active' ? 'badge-success' :
                        sub.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {sub.status}
                      </span>
                    </td>
                    <td>
                      {sub.status === 'Pending' ? (
                        <Link to="/payments" state={{ subscriptionId: sub._id, amount: sub.planId?.price }} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                          Pay Now
                        </Link>
                      ) : (
                        <Link to="/payments" className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                          Renew
                        </Link>
                      )}
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

export default MyPlans;
