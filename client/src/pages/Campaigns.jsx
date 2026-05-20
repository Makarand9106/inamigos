import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { campaignService } from '../services/api';
import CampaignCard from '../components/CampaignCard';
import DonationForm from '../components/DonationForm';
import { Heart, Calendar, Target, Award, UserCheck } from 'lucide-react';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchParams] = useSearchParams();
  const [detailedCampaign, setDetailedCampaign] = useState(null);
  
  const campaignIdParam = searchParams.get('id');

  const fetchAllCampaigns = async () => {
    try {
      const res = await campaignService.getCampaigns();
      if (res.success) {
        setCampaigns(res.data);
        
        // If a campaign ID query parameter exists, find it and set it as detailed
        if (campaignIdParam) {
          const found = res.data.find(c => c._id === campaignIdParam);
          if (found) {
            setDetailedCampaign(found);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCampaigns();
  }, [campaignIdParam]);

  const handleDonateSuccess = () => {
    fetchAllCampaigns();
  };

  const categories = [
    'All',
    'Education',
    'Women Empowerment',
    'Food & Clothing',
    'Animal Welfare',
    'Environment',
    'Skill Development'
  ];

  // Filter campaigns
  const filteredCampaigns = filter === 'All' 
    ? campaigns 
    : campaigns.filter(c => c.category === filter);

  if (detailedCampaign) {
    const percent = Math.min(Math.round((detailedCampaign.raisedAmount / detailedCampaign.targetAmount) * 100), 100);
    return (
      <div style={{ padding: '60px 0 80px 0' }}>
        <div className="container">
          
          <button 
            onClick={() => setDetailedCampaign(null)} 
            className="btn btn-secondary"
            style={{ marginBottom: '30px', padding: '8px 16px', fontSize: '13px' }}
          >
            ← Back to All Causes
          </button>

          <div className="grid-2" style={{ gap: '50px', alignItems: 'flex-start' }}>
            
            {/* Left side: Image and description */}
            <div>
              <img 
                src={detailedCampaign.image} 
                alt={detailedCampaign.title}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  marginBottom: '30px',
                }}
              />
              
              <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <span className="badge badge-primary" style={{ marginBottom: '15px' }}>{detailedCampaign.category}</span>
                <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '15px' }}>{detailedCampaign.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '16px', whiteSpace: 'pre-line' }}>
                  {detailedCampaign.description}
                </p>
              </div>
            </div>

            {/* Right side: Donation Tracker card */}
            <div className="glassmorphism" style={{
              padding: '40px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-md)',
              position: 'sticky',
              top: '120px',
            }}>
              <h3 style={{ marginBottom: '25px', color: '#fff' }}>Donation Progress</h3>

              {/* Progress bar info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{percent}% Raised</span>
                <span style={{ color: 'var(--text-secondary)' }}>Target: ₹{detailedCampaign.targetAmount.toLocaleString('en-IN')}</span>
              </div>

              <div style={{
                height: '10px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '50px',
                overflow: 'hidden',
                marginBottom: '20px',
              }}>
                <div style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--color-primary) 0%, #3b82f6 100%)',
                }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div style={trackerBoxStyle}>
                  <p style={trackerLabelStyle}>Amount Raised</p>
                  <h4 style={trackerValStyle}>₹{detailedCampaign.raisedAmount.toLocaleString('en-IN')}</h4>
                </div>
                <div style={trackerBoxStyle}>
                  <p style={trackerLabelStyle}>Amount Needed</p>
                  <h4 style={trackerValStyle}>₹{Math.max(0, detailedCampaign.targetAmount - detailedCampaign.raisedAmount).toLocaleString('en-IN')}</h4>
                </div>
              </div>

              <button 
                onClick={() => setSelectedCampaign(detailedCampaign)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  gap: '8px',
                  marginBottom: '20px',
                }}
              >
                <Heart size={16} fill="currentColor" /> Support This Cause
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Award size={16} color="var(--color-primary)" />
                  <span>80G tax-exempt eligibility on this donation</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <UserCheck size={16} color="var(--color-primary)" />
                  <span>100% of contributions fund materials and on-ground setups</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal display inside detail view */}
        {selectedCampaign && (
          <DonationForm
            campaignId={selectedCampaign._id}
            campaignTitle={selectedCampaign.title}
            onClose={() => setSelectedCampaign(null)}
            onSuccess={handleDonateSuccess}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Page title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Impact Campaigns</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>Explore Our Active <span className="text-gradient">Causes</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            Choose a campaign below to allocate your support. Every donation assists in providing direct supplies and on-ground project operations.
          </p>
        </div>

        {/* Filters bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '40px',
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--color-primary)' : 'var(--border-light)',
                background: filter === cat ? 'var(--color-primary-glow)' : 'rgba(255,255,255,0.02)',
                color: filter === cat ? 'var(--color-primary)' : 'var(--text-secondary)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                if (filter !== cat) e.target.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              onMouseLeave={(e) => {
                if (filter !== cat) e.target.style.borderColor = 'var(--border-light)';
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Loading campaigns...
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            No campaigns found matching "{filter}". Check back soon!
          </div>
        ) : (
          <div className="grid-3">
            {filteredCampaigns.map((c) => (
              <CampaignCard
                key={c._id}
                campaign={c}
                onDonateClick={(selected) => setSelectedCampaign(selected)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Donation Form Modal */}
      {selectedCampaign && (
        <DonationForm
          campaignId={selectedCampaign._id}
          campaignTitle={selectedCampaign.title}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={handleDonateSuccess}
        />
      )}
    </div>
  );
};

const trackerBoxStyle = {
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid var(--border-light)',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
};

const trackerLabelStyle = {
  fontSize: '12px',
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const trackerValStyle = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#fff',
};

export default Campaigns;
