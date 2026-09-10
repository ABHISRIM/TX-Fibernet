import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Target, Eye, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Connecting People with Reliable Fiber Internet</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            TX Fibernet is a leading regional Internet Service Provider dedicated to delivering high-speed optical broadband for homes, businesses, and communities.
          </p>
        </div>
      </section>

      {/* Main Company Story */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '850px', margin: '0 auto', lineHeight: '1.8', color: 'var(--text-dark)' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--dark-heading)' }}>About TX Fibernet</h2>
            <p style={{ fontSize: '1.05rem', marginBottom: '20px' }}>
              Founded with the goal of bridging the digital divide across Tamil Nadu, TX Fibernet provides cutting-edge Fiber-to-the-Home (FTTH) and commercial leased-line internet solutions. We empower households with uninterrupted streaming and gaming, while helping enterprises accelerate digital transformation.
            </p>
            <p style={{ fontSize: '1.05rem', marginBottom: '30px' }}>
              We believe high-speed internet is an essential utility for modern living, education, and business growth. By deploying 100% optical fiber technology directly to our subscribers' premises, we deliver symmetric speeds, ultra-low latency, and reliable connectivity year-round.
            </p>

            {/* Mission, Vision & Values Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', margin: '40px 0' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <Target size={32} color="#0284c7" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Mission</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  To deliver dependable, affordable, and high-speed fiber internet to every home and commercial business in our region.
                </p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <Eye size={32} color="#0284c7" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Vision</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  To become the most trusted internet service provider known for network uptime, customer transparency, and technology innovation.
                </p>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <HeartHandshake size={32} color="#0284c7" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Values</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Customer-first support, transparent pricing without hidden fees, and continuous network infrastructure upgrades.
                </p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '14px', color: 'var(--dark-heading)' }}>Why We Exist</h3>
            <p style={{ fontSize: '1rem', marginBottom: '30px' }}>
              Traditional copper broadband and legacy wireless providers often fail to meet modern demands for high bandwidth, remote work, and 4K streaming. TX Fibernet exists to deliver pure fiber connectivity that gives communities consistent performance without daily data caps or throttling.
            </p>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Link to="/plans" className="btn btn-primary">
                Explore Our Plans <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
