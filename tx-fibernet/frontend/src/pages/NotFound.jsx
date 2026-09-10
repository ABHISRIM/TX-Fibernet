import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 140px)', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <div className="container">
        <AlertTriangle size={64} color="#f59e0b" style={{ margin: '0 auto 16px auto' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>404 - Page Not Found</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          <Home size={16} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
