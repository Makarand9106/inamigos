import React, { useState, useEffect } from 'react';
import DonationForm from '../components/DonationForm';
import { donationService } from '../services/api';
import { Heart, ShieldCheck, Sparkles, Receipt, CheckCircle } from 'lucide-react';

const Donate = () => {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    totalRaised: 185000,
    totalDonationsCount: 128
  });

  const fetchStats = async () => {
    try {
      const res = await donationService.getStats();
      if (res.success) {
        setStats({
          totalRaised: res.data.totalRaised > 0 ? res.data.totalRaised : 185000,
          totalDonationsCount: res.data.totalDonationsCount > 0 ? res.data.totalDonationsCount : 128
        });
      }
    } catch (err) {
      console.warn('Could not load donation statistics, using default seed values.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Support Us</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>Empower Communities, <span className="text-gradient">Save Lives</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            We work at the grass-roots level. Your contributions fund food, books, medicine, clean water, and tree saplings.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '50px', alignItems: 'center' }}>
          
          {/* Left Text and Details */}
          <div>
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '20px' }}>Your Donation's Journey</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '25px' }}>
              At InAmigos Foundation, transparency is at the center of our work. Over 90% of all public contributions are directly allocated towards purchasing campaign supplies, meals, blankets, animal food, and tree maintenance on-ground.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '35px' }}>
              
              <div style={benefitStyle}>
                <Receipt size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Tax Deductions (80G Status)</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.4' }}>
                    All donors receive official tax exemption certificates under section 80G of the Income Tax Act.
                  </p>
                </div>
              </div>

              <div style={benefitStyle}>
                <ShieldCheck size={20} color="#3b82f6" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>CSR Partnerships</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.4' }}>
                    We partner with corporate houses under CSR-1 approval, producing detailed reports of impact outcomes.
                  </p>
                </div>
              </div>

              <div style={benefitStyle}>
                <CheckCircle size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Audited Statements</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.4' }}>
                    We publish annual reports detailing all receipts, and funds utilized, maintaining strict corporate standards.
                  </p>
                </div>
              </div>

            </div>

            {/* Micro Dashboard */}
            <div style={{
              display: 'flex',
              gap: '20px',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-light)',
            }}>
              <div>
                <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Funds Raised</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>₹{stats.totalRaised.toLocaleString('en-IN')}</h3>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-light)', paddingLeft: '20px' }}>
                <p style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '4px' }}>Total Transactions</p>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{stats.totalDonationsCount}</h3>
              </div>
            </div>

          </div>

          {/* Right Action Box */}
          <div className="glassmorphism animate-fade" style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '150px',
              height: '150px',
              background: 'var(--color-primary-glow)',
              filter: 'blur(50px)',
              borderRadius: '50%',
              zIndex: 1,
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(0, 204, 131, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <Heart size={30} fill="var(--color-primary)" color="var(--color-primary)" />
              </div>
              
              <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>Make a General Contribution</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '30px' }}>
                General donations are pooled together and allocated dynamically towards campaigns that need immediate assistance or are close to their deadlines.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '16px',
                  gap: '8px',
                }}
              >
                Donate Now (General Pool)
              </button>

              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '15px' }}>
                Contributions are secure. Official tax exemption slips are auto-emailed post checkout verification.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Donation Modal overlay */}
      {showModal && (
        <DonationForm
          onClose={() => setShowModal(false)}
          onSuccess={fetchStats}
        />
      )}
    </div>
  );
};

const benefitStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'flex-start',
  padding: '12px',
  borderRadius: '8px',
  background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(255,255,255,0.03)',
};

export default Donate;
