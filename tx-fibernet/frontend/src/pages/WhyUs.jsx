import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Infinity, Headphones, DollarSign, Cpu, ArrowRight } from 'lucide-react';

const WhyUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Reliable Connectivity',
      desc: 'Stable optical fiber internet backed by a 99.9% uptime SLA guarantee for seamless daily browsing, streaming, and business operations.'
    },
    {
      icon: Zap,
      title: 'High-Speed Plans',
      desc: 'Symmetric download and upload speeds ranging from 30 Mbps to 500 Mbps designed to meet diverse household and enterprise needs.'
    },
    {
      icon: Infinity,
      title: 'Unlimited Data',
      desc: 'Enjoy true unlimited internet access without hidden FUP caps, daily limits, or speed throttling.'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: '24/7 technical and customer support from dedicated regional specialists to resolve inquiries promptly.'
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      desc: 'Transparent and competitive pricing starting from ₹399/month with zero hidden charges or setup gimmicks.'
    },
    {
      icon: Cpu,
      title: 'Fiber Technology',
      desc: 'Direct optical fiber cabling right to your premises (FTTH) ensuring low latency and resistance to weather disruptions.'
    }
  ];

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Why Choose TX Fibernet?</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            We combine ultra-fast optical fiber infrastructure with local customer care for an unmatched internet experience.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} style={{
                  background: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--primary-light)',
                    color: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComp size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--dark-heading)' }}>{feat.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>{feat.desc}</p>
                </div>
              );
            })}
          </div>

          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid #bae6fd',
            borderRadius: 'var(--radius-md)',
            padding: '36px',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-hover)', marginBottom: '10px' }}>
              Experience Next-Level Fiber Broadband
            </h3>
            <p style={{ color: 'var(--text-dark)', maxWidth: '600px', margin: '0 auto 20px auto' }}>
              Explore our range of flexible plans or get in touch with our team to find out how TX Fibernet can empower your home or business.
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
        </div>
      </section>
    </div>
  );
};

export default WhyUs;
