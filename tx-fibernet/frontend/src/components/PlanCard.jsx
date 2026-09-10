import React from 'react';
import { Wifi, Check, ArrowRight } from 'lucide-react';

const PlanCard = ({ plan, isFeatured, onSelectPlan }) => {
  return (
    <div className={`plan-card ${isFeatured ? 'featured' : ''}`}>
      {isFeatured && <div className="plan-badge">Most Popular</div>}
      
      <h3 className="plan-name">{plan.name}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', minHeight: '38px' }}>
        {plan.description}
      </p>
      
      <div className="plan-price-box">
        <span className="plan-price">₹{plan.price}</span>
        <span className="plan-period">/ {plan.validity}</span>
      </div>

      <div className="plan-speed-badge">
        <Wifi size={18} color="#0284c7" />
        <span>{plan.speed} Download & Upload</span>
      </div>

      <ul className="plan-benefits">
        {plan.benefits.map((benefit, idx) => (
          <li key={idx} className="plan-benefit-item">
            <Check size={16} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <button 
        className={`btn ${isFeatured ? 'btn-primary' : 'btn-outline'} btn-block`} 
        onClick={() => onSelectPlan(plan)}
      >
        View Details <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default PlanCard;
