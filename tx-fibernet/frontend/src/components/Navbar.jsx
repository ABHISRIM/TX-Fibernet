import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Wifi, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMobile}>
          <Wifi size={24} color="#0284c7" />
          <span>TX</span> FIBERNET
        </Link>

        {/* Desktop Nav Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/plans" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Plans
              </NavLink>
            </li>
            <li>
              <NavLink to="/coverage" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Coverage
              </NavLink>
            </li>
            <li>
              <NavLink to="/why-us" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Why Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Action Button: Get in Touch */}
        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button className="hamburger-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-menu open">
          <Link to="/" onClick={closeMobile}>Home</Link>
          <Link to="/about" onClick={closeMobile}>About Us</Link>
          <Link to="/services" onClick={closeMobile}>Services</Link>
          <Link to="/plans" onClick={closeMobile}>Plans</Link>
          <Link to="/coverage" onClick={closeMobile}>Coverage</Link>
          <Link to="/why-us" onClick={closeMobile}>Why Us</Link>
          <Link to="/faq" onClick={closeMobile}>FAQ</Link>
          <Link to="/contact" onClick={closeMobile}>Contact</Link>

          <div className="mobile-menu-actions">
            <Link to="/contact" className="btn btn-primary btn-block" onClick={closeMobile}>
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
