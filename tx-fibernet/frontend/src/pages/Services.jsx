import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Briefcase, Radio, Tv, CheckCircle, ArrowRight } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      id: 'home-broadband',
      icon: Wifi,
      title: 'Home Broadband',
      tagline: 'High-speed fiber for modern households',
      description: 'Fast and reliable internet for everyday browsing, streaming, studying and working from home. Enjoy symmetric upload and download speeds with unlimited data.',
      benefits: [
        'Symmetric Download & Upload Speeds up to 500 Mbps',
        'Truly Unlimited Data with Zero Daily FUP Caps',
        'Free Gigabit Wi-Fi Router Installation',
        'Optimized for Multi-Device Simultaneous Use'
      ]
    },
    {
      id: 'business-internet',
      icon: Briefcase,
      title: 'Business Internet',
      tagline: 'Enterprise-grade leased lines & office bandwidth',
      description: 'Reliable connectivity for offices, shops, startups and commercial businesses. Ensure high productivity with dedicated SLAs and static IP options.',
      benefits: [
        'Dedicated Leased Line Bandwidth & Static IP',
        '99.9% Network Uptime Guarantee SLA',
        '24/7 Priority Support & Dedicated Account Manager',
        'Custom Bandwidth Packages Tailored for Enterprises'
      ]
    },
    {
      id: 'fiber-connectivity',
      icon: Radio,
      title: 'Fiber Connectivity',
      tagline: '100% Optical Fiber-to-the-Home (FTTH) infrastructure',
      description: 'High-speed fiber infrastructure designed for stable and consistent internet performance. Fiber cables deliver immunity to electrical interference and weather issues.',
      benefits: [
        'Direct Optical Fiber Connection straight to Premises',
        'Ultra-Low Ping & Latency for Online Gaming & VoIP',
        'Weather-Resistant Optical Architecture',
        'Future-Proof Network Ready for Gigabit Speeds'
      ]
    },
    {
      id: 'entertainment',
      icon: Tv,
      title: 'Entertainment & OTT',
      tagline: 'Bundled streaming platforms & HD TV entertainment',
      description: 'Internet plans with entertainment and OTT options where applicable. Stream movies, web series, and live sports seamlessly in 4K HDR.',
      benefits: [
        'Access to Top OTT Entertainment Apps',
        '300+ Live HD Channels Bundled with Select Plans',
        'Zero Buffering High-Bitrate Video Streaming',
        'Single Bill for Internet and Entertainment'
      ]
    }
  ];

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Our Services</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Explore our comprehensive broadband and connectivity solutions designed for homes and commercial businesses.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {servicesList.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div key={srv.id} style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '32px',
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '24px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-light)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComp size={32} />
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--dark-heading)', marginBottom: '4px' }}>{srv.title}</h3>
                    <p style={{ color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>{srv.tagline}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '20px', lineHeight: '1.6' }}>{srv.description}</p>

                    <div style={{ marginBottom: '20px' }}>
                      <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--dark-heading)' }}>Service Benefits:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {srv.benefits.map((b, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                            <CheckCircle size={16} color="#10b981" style={{ flexShrink: 0 }} />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <Link to="/plans" className="btn btn-primary">
                        Explore Plans <ArrowRight size={16} />
                      </Link>
                      <Link to="/contact" className="btn btn-outline">
                        Contact Sales
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
