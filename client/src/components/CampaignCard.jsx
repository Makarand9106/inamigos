import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Target, TrendingUp } from 'lucide-react';

const CampaignCard = ({ campaign, onDonateClick }) => {
  const { _id, title, description, category, targetAmount, raisedAmount, image } = campaign;

  // Calculate percentage raised
  const percentRaised = Math.min(Math.round((raisedAmount / targetAmount) * 100), 100);

  return (
    <div className="glassmorphism" style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.borderColor = 'rgba(0, 204, 131, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = 'var(--border-light)';
    }}>
      
      {/* Category Tag overlay */}
      <span className="badge badge-primary" style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        zIndex: 10,
        backdropFilter: 'blur(10px)',
      }}>
        {category}
      </span>

      {/* Campaign Image */}
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
        <img 
          src={image} 
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        {/* Subtle bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'linear-gradient(to top, rgba(11, 15, 25, 0.6), transparent)',
        }} />
      </div>

      {/* Card Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h4 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '10px',
          lineHeight: '1.4',
        }}>
          {title}
        </h4>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          lineHeight: '1.6',
          marginBottom: '20px',
          flexGrow: 1,
        }}>
          {description.length > 120 ? `${description.substring(0, 117)}...` : description}
        </p>

        {/* Donation Tracker metrics */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-primary)' }}>
              <TrendingUp size={14} /> {percentRaised}% Raised
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              Target: ₹{targetAmount.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '6px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '50px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${percentRaised}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-primary) 0%, #3b82f6 100%)',
              borderRadius: '50px',
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: '6px', color: 'var(--text-muted)' }}>
            <span>Raised: ₹{raisedAmount.toLocaleString('en-IN')}</span>
            <span>Remaining: ₹{Math.max(0, targetAmount - raisedAmount).toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => onDonateClick(campaign)}
            className="btn btn-primary" 
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '13px',
              borderRadius: '8px',
              gap: '4px',
            }}
          >
            <Heart size={14} fill="currentColor" /> Donate
          </button>
          
          <Link 
            to={`/campaigns?id=${_id}`}
            className="btn btn-secondary"
            style={{
              padding: '10px 16px',
              fontSize: '13px',
              borderRadius: '8px',
            }}
          >
            View Details
          </Link>
        </div>

      </div>

    </div>
  );
};

export default CampaignCard;
