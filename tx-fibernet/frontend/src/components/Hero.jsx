import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'var(--primary-light)',
              color: 'var(--primary-color)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '16px'
            }}>
              <Zap size={14} /> Next-Gen Optical Fiber Broadband
            </div>
            
            <h1 className="hero-title">
              Fast Internet. Better Connections.
            </h1>
            
            <p className="hero-subtitle">
              Reliable high-speed fiber internet for homes, businesses and communities.
            </p>
            
            <div className="hero-cta">
              <Link to="/plans" className="btn btn-primary">
                Explore Plans <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Learn About Us
              </Link>
            </div>

            <div style={{
              display: 'flex',
              gap: '20px',
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              flexWrap: 'wrap'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10b981" /> 99.9% Network Uptime
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10b981" /> Truly Unlimited Data
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10b981" /> Free Modem Setup
              </span>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img src="/hero.png" alt="TX Fibernet High Speed Router" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
