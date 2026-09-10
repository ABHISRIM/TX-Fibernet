import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import api from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', formData);
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      console.error('Contact submit error', err);
      setError(err.response?.data?.message || 'Failed to submit inquiry. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header Banner */}
      <section style={{ background: 'var(--bg-secondary)', padding: '50px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>Let's Connect</h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem' }}>
            Have questions about TX Fibernet services, coverage, or plans? Reach out to our local support and sales team.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '40px', alignItems: 'flex-start' }}>
            {/* Contact Details Card */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: 'var(--dark-heading)' }}>Get in Touch</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '30px', lineHeight: '1.6' }}>
                Whether you need information on new fiber broadband setup, speed upgrades, or network coverage in your locality, we are here to assist.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--dark-heading)', marginBottom: '2px' }}>Phone Line</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>+91 99433 99432</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--dark-heading)', marginBottom: '2px' }}>Email Address</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>info@txfibernet.com</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--dark-heading)', marginBottom: '2px' }}>Office Address</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                      42/4A, SHOP NO 11, Eswari Complex, Rakkiapalayam Pirivu , Kangeyam Road, Nallur, Tiruppur - 641606
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', color: 'var(--dark-heading)', marginBottom: '2px' }}>Working Hours</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                      Monday – Saturday: 9:00 AM – 8:00 PM<br />
                      Sunday: 10:00 AM – 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
