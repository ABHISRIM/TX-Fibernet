import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, Wifi, ShieldCheck, Zap, PhoneCall } from 'lucide-react';

const PlanDetailsModal = ({ plan, onClose }) => {
  const navigate = useNavigate();

  if (!plan) return null;

  const handleContactClick = () => {
    onClose();
    navigate('/contact');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary-color)',
            marginBottom: '12px'
          }}>
            <Wifi size={28} />
          </div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-heading)' }}>{plan.name}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.description}</p>
        </div>

        <div style={{
          background: 'var(--bg-secondary)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Monthly Price</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>
              ₹{plan.price} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ {plan.validity}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Speed</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--dark-heading)' }}>{plan.speed}</div>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--dark-heading)' }}>Key Plan Features:</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {plan.benefits && plan.benefits.map((benefit, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0 }} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <button className="btn btn-primary btn-block" onClick={handleContactClick}>
            <PhoneCall size={16} /> Contact Us to Get Connection
          </button>
          <button className="btn btn-secondary btn-block" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailsModal;
