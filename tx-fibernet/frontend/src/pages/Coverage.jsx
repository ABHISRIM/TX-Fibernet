import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, PhoneCall, Wifi, ArrowRight } from 'lucide-react';
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Coverage = ({ onSelectPlan }) => {
  const [selectedLocation, setSelectedLocation] = useState('Tiruppur');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const locations = [
    { name: 'Tiruppur', status: 'Full Fiber Coverage', speed: 'Up to 500 Mbps' },
    { name: 'Erode', status: 'Full Fiber Coverage', speed: 'Up to 500 Mbps' },
    { name: 'Palladam', status: 'Full Fiber Coverage', speed: 'Up to 300 Mbps' },
    { name: 'Sulur', status: 'Full Fiber Coverage', speed: 'Up to 300 Mbps' },
    { name: 'Palani', status: 'Full Fiber Coverage', speed: 'Up to 200 Mbps' },
    { name: 'Kodaikanal', status: 'Full Fiber Coverage', speed: 'Up to 200 Mbps' }
  ];

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/plans?location=${selectedLocation}`);
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to load plans for location', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [selectedLocation]);

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
            <MapPin size={16} /> Tamil Nadu Network Coverage
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Where We Provide Service</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            TX Fibernet delivers high-speed optical fiber connectivity across major cities and growing towns in Tamil Nadu.
          </p>
        </div>
      </section>

      {/* Location Selector & Coverage Info */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Select Your Area</h2>
          <p className="section-subtitle">
            Choose your city to verify coverage status and explore available internet plans.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
            {locations.map((loc) => (
              <div
                key={loc.name}
                onClick={() => setSelectedLocation(loc.name)}
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-sm)',
                  border: selectedLocation === loc.name ? '2px solid var(--primary-color)' : '1px solid var(--border-color)',
                  background: selectedLocation === loc.name ? 'var(--primary-light)' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: selectedLocation === loc.name ? 'var(--primary-color)' : '#f1f5f9',
                  color: selectedLocation === loc.name ? '#ffffff' : 'var(--primary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{loc.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: selectedLocation === loc.name ? 'var(--primary-hover)' : 'var(--text-muted)' }}>
                    {loc.status} • {loc.speed}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Active Location Details Card */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#ffffff',
            padding: '30px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 600, fontSize: '0.9rem', marginBottom: '6px' }}>
                <CheckCircle2 size={18} /> Coverage Active
              </div>
              <h3 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '6px' }}>
                TX Fibernet services are available in {selectedLocation}.
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                Enjoy symmetrical fiber speeds, 99.9% uptime, and 24/7 dedicated support in {selectedLocation}.
              </p>
            </div>

            <Link to="/contact" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>
              <PhoneCall size={18} /> Contact Us for Connection
            </Link>
          </div>

          {/* Location Available Plans */}
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--dark-heading)' }}>
            Available Plans in {selectedLocation}
          </h3>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading local plans...</div>
          ) : (
            <div className="plans-grid">
              {plans.map((plan, index) => (
                <PlanCard
                  key={plan._id || index}
                  plan={plan}
                  isFeatured={plan.price === 699 || plan.price === 999}
                  onSelectPlan={onSelectPlan}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section section-gray">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Is your area not listed?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            We are rapidly expanding our optical fiber network across Tamil Nadu. Contact us to inquire about bringing TX Fibernet to your locality.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Inquire About Network Expansion <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Coverage;
