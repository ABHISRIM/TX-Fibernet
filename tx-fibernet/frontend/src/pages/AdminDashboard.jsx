import React, { useState, useEffect, useContext } from 'react';
import { 
  Users, 
  Package, 
  CreditCard, 
  LifeBuoy, 
  PhoneCall, 
  Building2, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  RefreshCw 
} from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [connections, setConnections] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Plan Add/Edit
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    name: '',
    price: '',
    speed: '',
    validity: '30 Days',
    data: 'Unlimited Data',
    description: '',
    benefits: 'Unlimited Data, Symmetric Speed, Free Router'
  });

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [uRes, pRes, sRes, payRes, tRes, cRes, corpRes] = await Promise.all([
        api.get('/auth/users'),
        api.get('/plans'),
        api.get('/subscriptions/all'),
        api.get('/payments/all'),
        api.get('/support/all'),
        api.get('/connection/all'),
        api.get('/corporate/all')
      ]);

      setUsers(uRes.data);
      setPlans(pRes.data);
      setSubscriptions(sRes.data);
      setPayments(payRes.data);
      setTickets(tRes.data);
      setConnections(cRes.data);
      setCorporates(corpRes.data);
    } catch (err) {
      console.error('Error fetching admin datasets', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handle Plan Submit (Create or Update)
  const handleSavePlan = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: planForm.name,
        price: Number(planForm.price),
        speed: planForm.speed,
        validity: planForm.validity,
        data: planForm.data,
        description: planForm.description,
        benefits: planForm.benefits.split(',').map(b => b.trim())
      };

      if (editingPlan) {
        await api.put(`/plans/${editingPlan._id}`, payload);
      } else {
        await api.post('/plans', payload);
      }

      setShowPlanModal(false);
      setEditingPlan(null);
      loadAllData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving plan');
    }
  };

  const handleDeletePlan = async (id) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    try {
      await api.delete(`/plans/${id}`);
      loadAllData();
    } catch (err) {
      alert('Failed to delete plan.');
    }
  };

  const handleOpenEditPlan = (plan) => {
    setEditingPlan(plan);
    setPlanForm({
      name: plan.name,
      price: plan.price,
      speed: plan.speed,
      validity: plan.validity,
      data: plan.data,
      description: plan.description || '',
      benefits: plan.benefits ? plan.benefits.join(', ') : ''
    });
    setShowPlanModal(true);
  };

  const handleOpenAddPlan = () => {
    setEditingPlan(null);
    setPlanForm({
      name: '',
      price: '',
      speed: '',
      validity: '30 Days',
      data: 'Unlimited Data',
      description: '',
      benefits: 'Unlimited Data, Symmetric Speed, Free Installation'
    });
    setShowPlanModal(true);
  };

  // Update Subscription Status
  const handleUpdateSubStatus = async (id, newStatus) => {
    try {
      await api.put(`/subscriptions/${id}`, { status: newStatus });
      loadAllData();
    } catch (err) {
      alert('Failed to update subscription status');
    }
  };

  // Update Support Ticket Status
  const handleUpdateTicketStatus = async (id, newStatus) => {
    try {
      await api.put(`/support/${id}`, { status: newStatus });
      loadAllData();
    } catch (err) {
      alert('Failed to update ticket status');
    }
  };

  // Update Connection Status
  const handleUpdateConnStatus = async (id, newStatus) => {
    try {
      await api.put(`/connection/${id}`, { status: newStatus });
      loadAllData();
    } catch (err) {
      alert('Failed to update connection request status');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '4px' }}>TX Fibernet Admin Panel</h1>
            <p style={{ color: 'var(--text-muted)' }}>Manage subscribers, broadband plans, support tickets, and service requests.</p>
          </div>
          <button className="btn btn-outline" onClick={loadAllData}>
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', marginBottom: '28px', overflowX: 'auto', paddingBottom: '8px' }}>
          <button className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={`btn ${activeTab === 'plans' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('plans')}>
            Plans ({plans.length})
          </button>
          <button className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('users')}>
            Users ({users.length})
          </button>
          <button className={`btn ${activeTab === 'subscriptions' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('subscriptions')}>
            Subscriptions ({subscriptions.length})
          </button>
          <button className={`btn ${activeTab === 'tickets' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('tickets')}>
            Support ({tickets.length})
          </button>
          <button className={`btn ${activeTab === 'connections' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('connections')}>
            Connections ({connections.length})
          </button>
          <button className={`btn ${activeTab === 'corporate' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('corporate')}>
            Corporate ({corporates.length})
          </button>
          <button className={`btn ${activeTab === 'payments' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveTab('payments')}>
            Payments ({payments.length})
          </button>
        </div>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', padding: '40px', textAlign: 'center' }}>Loading admin dashboard data...</div>
        ) : (
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div>
                <div className="dashboard-grid">
                  <div className="dash-card">
                    <div className="dash-card-title">Total Customers</div>
                    <div className="dash-card-value">{users.filter(u => u.role !== 'admin').length}</div>
                  </div>
                  <div className="dash-card">
                    <div className="dash-card-title">Active Subscriptions</div>
                    <div className="dash-card-value" style={{ color: '#10b981' }}>
                      {subscriptions.filter(s => s.status === 'Active').length}
                    </div>
                  </div>
                  <div className="dash-card">
                    <div className="dash-card-title">Pending Connection Requests</div>
                    <div className="dash-card-value" style={{ color: '#f59e0b' }}>
                      {connections.filter(c => c.status === 'Pending').length}
                    </div>
                  </div>
                  <div className="dash-card">
                    <div className="dash-card-title">Open Support Tickets</div>
                    <div className="dash-card-value" style={{ color: '#ef4444' }}>
                      {tickets.filter(t => t.status === 'Open').length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PLANS TAB */}
            {activeTab === 'plans' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1.2rem' }}>Broadband Internet Plans</h3>
                  <button className="btn btn-primary" onClick={handleOpenAddPlan}>
                    <Plus size={16} /> Add New Plan
                  </button>
                </div>

                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Plan Name</th>
                        <th>Price</th>
                        <th>Speed</th>
                        <th>Validity</th>
                        <th>Data</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plans.map((p) => (
                        <tr key={p._id}>
                          <td><strong>{p.name}</strong></td>
                          <td>₹{p.price}</td>
                          <td>{p.speed}</td>
                          <td>{p.validity}</td>
                          <td>{p.data}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button className="btn btn-secondary" style={{ padding: '4px 8px' }} onClick={() => handleOpenEditPlan(p)}>
                                <Edit3 size={14} />
                              </button>
                              <button className="btn btn-danger" style={{ padding: '4px 8px' }} onClick={() => handleDeletePlan(p._id)}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* USERS TAB */}
            {activeTab === 'users' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Joined Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td><strong>{u.name}</strong></td>
                        <td>{u.email}</td>
                        <td>{u.phone}</td>
                        <td>
                          <span className={`badge ${u.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUBSCRIPTIONS TAB */}
            {activeTab === 'subscriptions' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Plan</th>
                      <th>Address</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Change Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriptions.map((s) => (
                      <tr key={s._id}>
                        <td>
                          <strong>{s.customerName}</strong><br />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.phone}</span>
                        </td>
                        <td>{s.planId?.name} (₹{s.planId?.price})</td>
                        <td>{s.address}, {s.city}</td>
                        <td>{new Date(s.startDate).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${
                            s.status === 'Active' ? 'badge-success' :
                            s.status === 'Pending' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                            value={s.status}
                            onChange={(e) => handleUpdateSubStatus(s._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Active">Active</option>
                            <option value="Expired">Expired</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* SUPPORT TICKETS TAB */}
            {activeTab === 'tickets' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ticket Ref</th>
                      <th>Customer</th>
                      <th>Issue Type</th>
                      <th>Subject & Description</th>
                      <th>Status</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t._id}>
                        <td><code>TICK-{t._id.substring(18).toUpperCase()}</code></td>
                        <td>
                          <strong>{t.userId?.name || 'User'}</strong><br />
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.userId?.email}</span>
                        </td>
                        <td>{t.issueType}</td>
                        <td>
                          <strong>{t.subject}</strong><br />
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.description}</span>
                        </td>
                        <td>
                          <span className={`badge ${
                            t.status === 'Resolved' ? 'badge-success' :
                            t.status === 'In Progress' ? 'badge-info' : 'badge-warning'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                            value={t.status}
                            onChange={(e) => handleUpdateTicketStatus(t._id, e.target.value)}
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CONNECTIONS TAB */}
            {activeTab === 'connections' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Contact</th>
                      <th>City & Address</th>
                      <th>Preferred Plan</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {connections.map((c) => (
                      <tr key={c._id}>
                        <td><strong>{c.fullName}</strong></td>
                        <td>{c.mobile}<br />{c.email}</td>
                        <td>{c.address}, {c.city} - {c.pincode}</td>
                        <td>{c.preferredPlan}</td>
                        <td>
                          <span className={`badge ${
                            c.status === 'Installed' ? 'badge-success' :
                            c.status === 'Approved' ? 'badge-info' : 'badge-warning'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <select
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                            value={c.status}
                            onChange={(e) => handleUpdateConnStatus(c._id, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Installed">Installed</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* CORPORATE TAB */}
            {activeTab === 'corporate' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Contact Name</th>
                      <th>Email & Phone</th>
                      <th>Required Speed</th>
                      <th>Address</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {corporates.map((corp) => (
                      <tr key={corp._id}>
                        <td><strong>{corp.companyName}</strong></td>
                        <td>{corp.contactName}</td>
                        <td>{corp.email}<br />{corp.phone}</td>
                        <td><span className="badge badge-info">{corp.requiredSpeed}</span></td>
                        <td>{corp.companyAddress}</td>
                        <td>{new Date(corp.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PAYMENTS TAB */}
            {activeTab === 'payments' && (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Transaction ID</th>
                      <th>User</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((p) => (
                      <tr key={p._id}>
                        <td><code>{p.transactionId}</code></td>
                        <td>{p.userId?.name || 'User'}</td>
                        <td><strong>₹{p.amount}</strong></td>
                        <td>{p.paymentMethod}</td>
                        <td>{new Date(p.createdAt).toLocaleString()}</td>
                        <td><span className="badge badge-success">{p.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Plan Add/Edit Modal */}
        {showPlanModal && (
          <div className="modal-overlay" onClick={() => setShowPlanModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowPlanModal(false)}><X size={18} /></button>
              <h3>{editingPlan ? 'Edit Internet Plan' : 'Add New Internet Plan'}</h3>
              <form onSubmit={handleSavePlan} style={{ marginTop: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Plan Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={planForm.name}
                    onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Price (₹)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={planForm.price}
                      onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Speed</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 100 Mbps"
                      value={planForm.speed}
                      onChange={(e) => setPlanForm({ ...planForm, speed: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Benefits (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={planForm.benefits}
                    onChange={(e) => setPlanForm({ ...planForm, benefits: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Save Plan</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
