import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Heart, CreditCard, Loader2 } from 'lucide-react';
import { donationService, campaignService } from '../services/api';

const DonationForm = ({ campaignId, campaignTitle, onClose, onSuccess }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState(campaignId || '');
  const [amount, setAmount] = useState('1000');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await campaignService.getCampaigns();
        if (res.success) {
          setCampaigns(res.data);
        }
      } catch (err) {
        console.error('Failed to load campaigns list', err);
      }
    };
    if (!campaignId) {
      fetchCampaigns();
    }
  }, [campaignId]);

  const handlePredefinedAmount = (val) => {
    setAmount(val);
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      // Simulate Payment Gateway delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const donationData = {
        campaign: selectedCampaignId || undefined,
        donorName,
        donorEmail,
        amount: Number(amount),
      };

      const res = await donationService.createDonation(donationData);
      if (res.success) {
        setStatusMsg({
          type: 'success',
          text: `Thank you! Your donation of ₹${amount} was successful. Transaction ID: ${res.data.transactionId}`,
        });
        setDonorName('');
        setDonorEmail('');
        if (onSuccess) onSuccess();
        setTimeout(() => onClose(), 4000);
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Payment recording failed.' });
      }
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong during payment processing.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(5, 8, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
    }}>
      <div className="glassmorphism animate-fade" style={{
        width: '100%',
        maxWidth: '500px',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top bar header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 700 }}>
            <Heart size={20} fill="var(--color-primary)" color="var(--color-primary)" /> Make a Donation
          </h3>
          <button onClick={onClose} style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleDonateSubmit} style={{ padding: '24px' }}>
          {statusMsg.text && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              lineHeight: '1.5',
              background: statusMsg.type === 'success' ? 'rgba(0, 204, 131, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              border: statusMsg.type === 'success' ? '1px solid rgba(0, 204, 131, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)',
              color: statusMsg.type === 'success' ? 'var(--color-primary)' : '#ef4444',
            }}>
              {statusMsg.text}
            </div>
          )}

          {/* Campaign Selection */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Support Cause</label>
            {campaignTitle ? (
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '12px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
              }}>
                {campaignTitle}
              </div>
            ) : (
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                style={inputStyle}
              >
                <option value="">General Support (Pooled Funds)</option>
                {campaigns.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Predefined Amounts */}
          <div style={{ marginBottom: '20px' }}>
            <label style={labelStyle}>Select Amount (INR)</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {['500', '1000', '2000', '5000'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePredefinedAmount(amt)}
                  style={{
                    flex: '1 1 80px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: amount === amt ? 'var(--color-primary)' : 'var(--border-light)',
                    background: amount === amt ? 'var(--color-primary-glow)' : 'rgba(255,255,255,0.02)',
                    color: amount === amt ? 'var(--color-primary)' : 'var(--text-secondary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  ₹{amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              required
              min="10"
              placeholder="Or enter custom amount (e.g. 1500)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Personal Info */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={labelStyle}>Your Name</label>
              <input
                type="text"
                required
                placeholder="John Doe"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Your Email</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Secure transaction notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.02)',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid var(--border-light)',
            marginBottom: '24px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}>
            <ShieldCheck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
            <span>This is a simulated secure check out. Your test transaction will update the charity goals locally.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 700,
              gap: '8px',
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Processing Secure Payment...
              </>
            ) : (
              <>
                <CreditCard size={16} /> Pay & Donate ₹{Number(amount || 0).toLocaleString('en-IN')}
              </>
            )}
          </button>
        </form>

      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--border-light)',
  borderRadius: '8px',
  padding: '12px 16px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s ease',
};

export default DonationForm;
