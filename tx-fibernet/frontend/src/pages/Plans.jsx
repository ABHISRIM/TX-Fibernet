import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, PhoneCall } from 'lucide-react';
import api from '../services/api';
import PlanCard from '../components/PlanCard';

const Plans = ({ onSelectPlan }) => {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedSpeedFilter, setSelectedSpeedFilter] = useState('All');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const locations = ['All', 'Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'];
  const speedFilters = ['All', 'Under 100 Mbps', '100 Mbps - 200 Mbps', '300 Mbps+'];

  useEffect(() => {
    let isMounted = true;

    const fetchPlans = async () => {
      setLoading(true);
      setError('');

      try {
        const params = selectedLocation === 'All' ? {} : { location: selectedLocation };
        const res = await api.get('/plans', { params });
        const allPlans = Array.isArray(res?.data) ? res.data : [];

        if (isMounted) {
          setPlans(allPlans.filter((plan) => plan && plan.active !== false));
        }
      } catch (err) {
        console.error('Failed to load plans', err);

        if (isMounted) {
          setPlans([]);
          setError('Unable to load plans right now. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlans();

    return () => {
      isMounted = false;
    };
  }, [selectedLocation]);

  const filteredPlans = plans.filter((plan) => {
    const speedNum = Number.parseInt(plan?.speed ?? '0', 10) || 0;

    if (selectedSpeedFilter === 'Under 100 Mbps') return speedNum < 100;
    if (selectedSpeedFilter === '100 Mbps - 200 Mbps') return speedNum >= 100 && speedNum <= 200;
    if (selectedSpeedFilter === '300 Mbps+') return speedNum >= 300;
    return true;
  });

  return (
    <div>
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Choose the Speed That Fits Your Needs</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Browse our transparent high-speed fiber broadband offerings. All plans include truly unlimited data and symmetric speeds.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="location-selector-wrapper">
            <span className="location-label">
              <MapPin size={18} color="#0284c7" /> Location:
            </span>
            {locations.map((loc) => (
              <button
                key={loc}
                className={`location-btn ${selectedLocation === loc ? 'active' : ''}`}
                onClick={() => setSelectedLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {speedFilters.map((sf) => (
              <button
                key={sf}
                className="btn btn-secondary"
                style={{
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  padding: '6px 16px',
                  background: selectedSpeedFilter === sf ? 'var(--dark-heading)' : undefined,
                  color: selectedSpeedFilter === sf ? '#ffffff' : undefined
                }}
                onClick={() => setSelectedSpeedFilter(sf)}
              >
                {sf}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading broadband plans...
            </div>
          ) : error ? (
            <div style={{ padding: '50px', textAlign: 'center', color: '#991b1b', background: '#fee2e2', borderRadius: '12px' }}>
              {error}
            </div>
          ) : filteredPlans.length === 0 ? (
            <div style={{ padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No plans found matching selected filters.
            </div>
          ) : (
            <div className="plans-grid">
              {filteredPlans.map((plan, index) => (
                <PlanCard
                  key={plan._id || index}
                  plan={plan}
                  isFeatured={plan.price === 699 || plan.price === 999}
                  onSelectPlan={onSelectPlan}
                />
              ))}
            </div>
          )}

          <div style={{ marginTop: '70px' }}>
            <h2 className="section-title">Plan Speed Comparison Guide</h2>
            <p className="section-subtitle">
              Find out which internet speed matches your daily household or business usage.
            </p>

            <div className="table-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Speed</th>
                    <th>Price (Monthly)</th>
                    <th>Best For</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>30 Mbps</strong></td>
                    <td>₹399</td>
                    <td>Basic browsing, emails, and messaging</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                  <tr>
                    <td><strong>50 Mbps</strong></td>
                    <td>₹499</td>
                    <td>Small families & HD video streaming</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                  <tr>
                    <td><strong>100 Mbps</strong></td>
                    <td>₹699</td>
                    <td>Streaming + work from home + online classes</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                  <tr>
                    <td><strong>200 Mbps</strong></td>
                    <td>₹999</td>
                    <td>Multiple devices, 4K streaming & gaming</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                  <tr>
                    <td><strong>300 Mbps</strong></td>
                    <td>₹1299</td>
                    <td>Heavy usage, multi-user households & downloads</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                  <tr>
                    <td><strong>500 Mbps</strong></td>
                    <td>₹1999</td>
                    <td>Large homes, smart offices & commercial enterprises</td>
                    <td><Link to="/contact" className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.8rem' }}>Inquire</Link></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Need a Custom Plan for Your Enterprise?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
            We provide dedicated leased lines, static IP allocations, and custom bandwidth for commercial offices.
          </p>
          <Link to="/contact" className="btn btn-primary">
            <PhoneCall size={16} /> Contact Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Plans;
