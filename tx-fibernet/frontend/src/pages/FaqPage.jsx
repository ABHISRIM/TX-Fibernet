import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, HelpCircle, ArrowRight } from 'lucide-react';

const FaqPage = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is fiber internet?",
      a: "Fiber internet uses optical fiber cables made of glass strands to transmit data using light pulses. This delivers significantly higher speeds, symmetric upload/download bandwidth, and lower latency compared to traditional copper or cable connections."
    },
    {
      q: "What speeds does TX Fibernet provide?",
      a: "TX Fibernet offers a wide range of plans with speeds from 30 Mbps up to 500 Mbps. All plans deliver equal download and upload speeds."
    },
    {
      q: "Do you offer unlimited data?",
      a: "Yes! All home and commercial TX Fibernet plans come with truly unlimited data with zero daily limits or hidden throttling."
    },
    {
      q: "Which areas are covered?",
      a: "TX Fibernet currently serves Tiruppur, Erode, Palladam, Sulur, Palani, and Kodaikanal across Tamil Nadu, with network expansion continuously ongoing."
    },
    {
      q: "Which plan is suitable for my home?",
      a: "For basic web browsing and light streaming, our 30-50 Mbps plans are ideal. For multi-device households, 4K streaming, and working from home, we recommend our 100 Mbps or 200 Mbps plans."
    },
    {
      q: "Do you provide business internet?",
      a: "Yes! We offer dedicated leased lines, static IP addresses, custom bandwidth solutions, and SLAs for offices, retail stores, and enterprise businesses."
    },
    {
      q: "How can I contact TX Fibernet?",
      a: "You can reach our team via phone at +91 98765 43210, email support@txfibernet.com, or submit an inquiry directly through our Contact Us page."
    }
  ];

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
            <HelpCircle size={16} /> Knowledge & Help
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Find answers to common questions about TX Fibernet services, speeds, coverage, and broadband technology.
          </p>
        </div>
      </section>

      {/* Accordion List */}
      <section className="section">
        <div className="container">
          <div className="faq-accordion" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item">
                <div className="faq-header" onClick={() => toggleFaq(idx)}>
                  <span style={{ fontSize: '1.05rem' }}>{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp size={20} color="#0284c7" /> : <ChevronDown size={20} />}
                </div>
                {activeFaq === idx && (
                  <div className="faq-body" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '50px', background: 'var(--bg-secondary)', padding: '30px', borderRadius: 'var(--radius-sm)' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Have more questions?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Our support specialists are happy to answer any questions you have about TX Fibernet.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Contact Sales & Support <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
