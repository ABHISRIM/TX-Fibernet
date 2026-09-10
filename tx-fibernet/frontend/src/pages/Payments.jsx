import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CreditCard, CheckCircle, Smartphone, Globe, Banknote, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Payments = () => {
  const { user } = useContext(AuthContext);
  const locationState = useLocation().state;

  const [subscriptions, setSubscriptions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedSubId, setSelectedSubId] = useState(locationState?.subscriptionId || '');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [subRes, payRes] = await Promise.all([
          api.get('/subscriptions/my'),
          api.get('/payments/my')
        ]);
        setSubscriptions(subRes.data);
        setPayments(payRes.data);

        if (!selectedSubId && subRes.data.length > 0) {
          setSelectedSubId(subRes.data[0]._id);
        }
      } catch (err) {
        console.error('Error loading payment data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const selectedSub = subscriptions.find(s => s._id === selectedSubId);
  const amountToPay = selectedSub?.planId?.price || 499;

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg(null);

    if (!selectedSubId) {
      setError('Please select a subscription to pay for.');
      return;
    }

    setProcessing(true);
    try {
      const res = await api.post('/payments', {
        subscriptionId: selectedSubId,
        amount: amountToPay,
        paymentMethod
      });

      setSuccessMsg(`Payment successful! Transaction ID: ${res.data.payment.transactionId}`);
      
      // Refresh subscriptions & payments
      const [subRes, payRes] = await Promise.all([
        api.get('/subscriptions/my'),
        api.get('/payments/my')
      ]);
      setSubscriptions(subRes.data);
      setPayments(payRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Online Payment & Billing</h1>
        <p className="section-subtitle">
          Pay your monthly broadband subscription safely using UPI, Card, Net Banking, or Cash.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '30px 0' }}>
          {/* Pay Now Demo Box */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={22} color="#0284c7" /> Pay Bill Online
            </h3>

            {successMsg && (
              <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={20} /> {successMsg}
              </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {subscriptions.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>You do not have any active or pending subscriptions to pay for.</p>
            ) : (
              <form onSubmit={handlePayNow}>
                <div className="form-group">
                  <label className="form-label">Select Subscription</label>
                  <select
                    className="form-select"
                    value={selectedSubId}
                    onChange={(e) => setSelectedSubId(e.target.value)}
                  >
                    {subscriptions.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.planId?.name} (₹{sub.planId?.price}) - {sub.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Plan Price:</span>
                    <strong>₹{amountToPay}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>GST & Taxes:</span>
                    <strong>Included</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '1.1rem', color: 'var(--primary-color)' }}>
                    <strong>Total Amount Payable:</strong>
                    <strong>₹{amountToPay}</strong>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Payment Method</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      className={`btn ${paymentMethod === 'UPI' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPaymentMethod('UPI')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <Smartphone size={16} /> UPI / QR Code
                    </button>

                    <button
                      type="button"
                      className={`btn ${paymentMethod === 'Card' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPaymentMethod('Card')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <CreditCard size={16} /> Debit / Credit Card
                    </button>

                    <button
                      type="button"
                      className={`btn ${paymentMethod === 'Net Banking' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPaymentMethod('Net Banking')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <Globe size={16} /> Net Banking
                    </button>

                    <button
                      type="button"
                      className={`btn ${paymentMethod === 'Cash' ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setPaymentMethod('Cash')}
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <Banknote size={16} /> Cash on Delivery
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '20px' }} disabled={processing}>
                  {processing ? 'Processing Payment...' : `Pay ₹${amountToPay} Now`}
                </button>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
                  <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> 256-bit SSL Demo Secured Payment
                </p>
              </form>
            )}
          </div>

          {/* Payment Info Card */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '14px' }}>Billing FAQs</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
              <div>
                <strong>When is my bill generated?</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Bills are generated 3 days before your monthly subscription expiry date.</p>
              </div>
              <div>
                <strong>Can I get a payment invoice?</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Yes, your payment receipts with Transaction IDs are listed in the history table below.</p>
              </div>
              <div>
                <strong>Is online payment instant?</strong>
                <p style={{ color: 'var(--text-muted)', marginTop: '2px' }}>Yes, successful payments instantly renew your broadband validity for 30 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Table */}
        <h2 style={{ fontSize: '1.5rem', margin: '40px 0 16px 0', color: 'var(--dark-heading)' }}>Payment History</h2>

        {loading ? (
          <div style={{ color: 'var(--text-muted)', padding: '20px 0' }}>Loading payment history...</div>
        ) : payments.length === 0 ? (
          <div style={{ background: '#fff', padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No past transactions found.
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Plan Name</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id}>
                    <td><code>{p.transactionId}</code></td>
                    <td>{p.subscriptionId?.planId?.name || 'Broadband Plan'}</td>
                    <td><strong>₹{p.amount}</strong></td>
                    <td>{p.paymentMethod}</td>
                    <td>{new Date(p.createdAt).toLocaleString()}</td>
                    <td>
                      <span className="badge badge-success">
                        {p.status}
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

export default Payments;
