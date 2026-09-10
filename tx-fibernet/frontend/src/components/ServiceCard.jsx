import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, linkTo = '/services' }) => {
  return (
    <div className="service-card">
      <div className="service-icon">
        <Icon size={26} />
      </div>
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{description}</p>
      <Link to={linkTo} className="btn btn-outline" style={{ width: 'fit-content', marginTop: 'auto' }}>
        Learn More <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default ServiceCard;
