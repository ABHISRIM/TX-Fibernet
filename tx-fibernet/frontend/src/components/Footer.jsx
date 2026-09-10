import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Phone, Mail, MapPin, Globe, Share2, MessageSquare, Send } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wifi size={22} color="#0284c7" />
              <span>TX</span> FIBERNET
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '16px' }}>
              Reliable Fiber Internet for a Connected Life. Delivering lightning-fast optical broadband for homes, businesses, and enterprises across Tamil Nadu.
            </p>
            <div style={{ display: 'flex', gap: '14px', color: '#94a3b8' }}>
              <Globe size={18} style={{ cursor: 'pointer' }} title="Website" />
              <Share2 size={18} style={{ cursor: 'pointer' }} title="Social Share" />
              <MessageSquare size={18} style={{ cursor: 'pointer' }} title="Support Inquiry" />
              <Send size={18} style={{ cursor: 'pointer' }} title="Contact" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/plans">Plans</Link></li>
              <li><Link to="/coverage">Coverage</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services Offered */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">Home Broadband</Link></li>
              <li><Link to="/services">Business Internet</Link></li>
              <li><Link to="/services">Fiber Connectivity</Link></li>
              <li><Link to="/services">Entertainment & OTT</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-links" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                <Phone size={16} color="#0284c7" style={{ marginTop: '3px' }} />
                <span>933433 99432</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                <Mail size={16} color="#0284c7" style={{ marginTop: '3px' }} />
                <span>info@txfibernet.com</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.9rem' }}>
                <MapPin size={18} color="#0284c7" style={{ marginTop: '3px' }} />
                <span>42/4A, SHOP NO 11, Eswari Complex,  Rakkiapalayam Pirivu ,Kangeyam Road, Nallur, Tiruppur - 641606</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 TX Fibernet. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
