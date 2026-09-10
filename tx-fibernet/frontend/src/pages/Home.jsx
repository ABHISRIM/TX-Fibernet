import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wifi, 
  Infinity, 
  Headphones, 
  ShieldCheck, 
  Tv, 
  Briefcase, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Radio
} from 'lucide-react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import PlanCard from '../components/PlanCard';
import api from '../services/api';

const Home = ({ onSelectPlan }) => {
  const [selectedLocation, setSelectedLocation] = useState('Tiruppur');
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  const locations = ['Tiruppur', 'Erode', 'Palladam', 'Sulur', 'Palani', 'Kodaikanal'];

  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      try {
        const res = await api.get(`/plans?location=${selectedLocation}`);
        setPlans(res.data);
      } catch (err) {
        console.error('Failed to load plans', err);
      } finally {
        setLoadingPlans(false);
      }
    };
    fetchPlans();
  }, [selectedLocation]);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is fiber internet?",
      a: "Fiber internet uses optical fiber cables made of glass strands to transmit data using light pulses. This delivers significantly higher speeds, symmetric upload/download bandwidth, and lower latency."
    },
    {
      q: "What speeds does TX Fibernet provide?",
      a: "TX Fibernet offers a wide range of plans with speeds from 30 Mbps up to 500 Mbps."
    },
    {
      q: "Do you offer unlimited data?",
      a: "Yes! All home and commercial TX Fibernet plans come with truly unlimited data with zero daily limits or hidden throttling."
    },
    {
      q: "Which areas are covered?",
      a: "TX Fibernet currently serves Tiruppur, Erode, Palladam, Sulur, Palani, and Kodaikanal across Tamil Nadu."
    },
    {
      q: "Which plan is suitable for my home?",
      a: "For basic web browsing, 30-50 Mbps plans are ideal. For multi-device households, 4K streaming, and working from home, we recommend 100 Mbps or 200 Mbps plans."
    },
    {
      q: "Do you provide business internet?",
      a: "Yes! We offer dedicated leased lines, static IP addresses, custom bandwidth solutions, and SLAs for offices and businesses."
    },
    {
      q: "How can I contact TX Fibernet?",
      a: "You can reach our team via phone at +91 98765 43210, email support@txfibernet.com, or submit an inquiry directly through our Contact page."
    }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Information (4 Stats/Features) */}
      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="highlights-grid">
            <div className="highlight-item">
              <div className="highlight-icon">
                <Wifi size={22} />
              </div>
              <div className="highlight-text">
                <h4>High-Speed Fiber</h4>
                <p>Up to 500 Mbps symmetric speed</p>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <Infinity size={22} />
              </div>
              <div className="highlight-text">
                <h4>Unlimited Data</h4>
                <p>No FUP limits or throttling</p>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <MapPin size={22} />
              </div>
              <div className="highlight-text">
                <h4>Wide Coverage</h4>
                <p>Serving major Tamil Nadu cities</p>
              </div>
            </div>

            <div className="highlight-item">
              <div className="highlight-icon">
                <Headphones size={22} />
              </div>
              <div className="highlight-text">
                <h4>Customer Support</h4>
                <p>24/7 dedicated assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About TX Fibernet */}
      <section className="section section-gray">
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 className="section-title">Connecting People with Reliable Fiber Internet</h2>
            <p className="section-subtitle">
              TX Fibernet provides reliable and affordable fiber broadband services designed for homes, businesses and growing communities across Tamil Nadu.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}>50,000+</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Connected Subscribers</p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}>99.9%</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Network Uptime SLA</p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--primary-color)' }}>6+</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Major Cities Covered</p>
              </div>
            </div>

            <Link to="/about" className="btn btn-primary">
              Read More <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Services (4 Services) */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive fiber connectivity and digital solutions for every user.
          </p>

          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <ServiceCard
              icon={Wifi}
              title="Home Broadband"
              description="Fast and reliable internet for everyday browsing, streaming, studying and working from home."
              linkTo="/services"
            />
            <ServiceCard
              icon={Briefcase}
              title="Business Internet"
              description="Reliable connectivity for offices, shops, startups and commercial enterprises."
              linkTo="/services"
            />
            <ServiceCard
              icon={Radio}
              title="Fiber Connectivity"
              description="High-speed fiber infrastructure designed for stable and consistent internet performance."
              linkTo="/services"
            />
            <ServiceCard
              icon={Tv}
              title="Entertainment"
              description="Internet plans with entertainment and OTT options where applicable."
              linkTo="/services"
            />
          </div>
        </div>
      </section>

      {/* 5. Internet Plans Section */}
      <section className="section section-gray" id="plans">
        <div className="container">
          <h2 className="section-title">Choose the Speed That Fits Your Needs</h2>
          <p className="section-subtitle">
            Select your location to explore transparent broadband plans tailored for your area.
          </p>

          {/* Location Selector */}
          <div className="location-selector-wrapper">
            <span className="location-label">
              <MapPin size={18} color="#0284c7" /> Select Location:
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

          {/* Plans Grid */}
          {loadingPlans ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Loading plans...
            </div>
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

      {/* 6. Coverage Area Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Where We Provide Service</h2>
          <p className="section-subtitle">
            Explore our expanding optical fiber network footprint across Tamil Nadu.
          </p>

          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '30px',
            textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {locations.map((loc) => (
                <div key={loc} style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  padding: '12px 24px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  color: 'var(--dark-heading)'
                }}>
                  <MapPin size={16} color="#0284c7" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
              TX Fibernet services are active in all listed areas with symmetrical high-speed connectivity.
            </p>

            <Link to="/coverage" className="btn btn-outline">
              Explore Coverage Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Why Choose TX Fibernet */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">Why Choose TX Fibernet?</h2>
          <p className="section-subtitle">
            We deliver optical fiber performance backed by customer-focused service.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <ShieldCheck size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Reliable Connectivity</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Stable optical fiber internet for everyday use with high network uptime.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Wifi size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>High-Speed Plans</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Flexible plans designed for different usage requirements from 30 Mbps to 500 Mbps.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Infinity size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Unlimited Data</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Enjoy internet without worrying about daily data limits or FUP caps.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Headphones size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Customer Support</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Responsive assistance whenever customers need help with their connection.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <CheckCircle size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Affordable Pricing</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Transparent pricing starting from ₹399/month with zero hidden charges.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Radio size={28} color="#0284c7" style={{ marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Fiber Technology</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Modern optical fiber infrastructure directly connected for high performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. OTT / Entertainment Section */}
      <section className="section">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Sparkles size={16} /> Entertainment Upgrade
              </div>
              <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '14px' }}>
                Internet + Entertainment
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '24px' }}>
                Selected TX Fibernet plans come bundled with complimentary access to top streaming apps, live TV channels, and movies.
              </p>
              <Link to="/plans" className="btn btn-primary">
                Explore Plans <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: '12px', textAlign: 'center', minWidth: '120px' }}>
                <Tv size={32} color="#38bdf8" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontWeight: '600' }}>Streaming</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 24px', borderRadius: '12px', textAlign: 'center', minWidth: '120px' }}>
                <Sparkles size={32} color="#38bdf8" style={{ margin: '0 auto 8px auto' }} />
                <div style={{ fontWeight: '600' }}>Movies & TV</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. How It Works (3 Steps) */}
      <section className="section section-gray">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Getting connected with TX Fibernet is simple and straightforward.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            <div style={{ background: '#ffffff', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '12px' }}>01</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark-heading)' }}>Choose a Plan</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Explore available speeds and pricing to select the plan that fits your requirements.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '12px' }}>02</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark-heading)' }}>Check Coverage</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                See whether TX Fibernet services are active in your city or residential locality.
              </p>
            </div>

            <div style={{ background: '#ffffff', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', position: 'relative' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: '12px' }}>03</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--dark-heading)' }}>Contact Us</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Contact TX Fibernet for more information or connection assistance in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ Accordion */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Got questions? We've got answers.
          </p>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-header" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp size={20} color="#0284c7" /> : <ChevronDown size={20} />}
                </div>
                {activeFaq === idx && (
                  <div className="faq-body">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Contact / CTA */}
      <section className="section section-gray">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '12px' }}>Ready to Experience High-Speed Fiber?</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px auto' }}>
            Get in touch with our local team to discuss internet plans and coverage for your location.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <Link to="/plans" className="btn btn-primary">
              Explore Plans <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
