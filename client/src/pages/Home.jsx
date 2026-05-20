import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CampaignCard from '../components/CampaignCard';
import Testimonials from '../components/Testimonials';
import DonationForm from '../components/DonationForm';
import { campaignService } from '../services/api';
import { ShieldCheck, Heart, Sparkles, BookOpen, Compass, TreePine } from 'lucide-react';

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const fetchCampaigns = async () => {
    try {
      const res = await campaignService.getCampaigns();
      if (res.success) {
        // Show top 3 campaigns on the homepage
        setCampaigns(res.data.slice(0, 3));
      }
    } catch (err) {
      console.error('Error fetching campaigns for homepage:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleDonateSuccess = () => {
    fetchCampaigns();
  };

  return (
    <div>
      {/* Hero Banner */}
      <Hero />

      {/* Quick Project Pillars */}
      <section className="section" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Areas of Focus</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Our Pillars of <span className="text-gradient">Impact</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
              We address critical issues facing underprivileged children, women, animals, and the environment through direct collective action.
            </p>
          </div>

          <div className="grid-3">
            {/* Pillar 1 */}
            <div className="glassmorphism" style={pillarCardStyle}>
              <div style={pillarIconStyle('rgba(16, 185, 129, 0.1)', 'var(--color-primary)')}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '20px', margin: '15px 0 10px 0' }}>Project Bachpanshala</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Bridging educational gaps for kids with quality lessons, basic digital literacy, and core life skills workshops.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glassmorphism" style={pillarCardStyle}>
              <div style={pillarIconStyle('rgba(59, 130, 246, 0.1)', '#3b82f6')}>
                <Heart size={24} />
              </div>
              <h3 style={{ fontSize: '20px', margin: '15px 0 10px 0' }}>Project Seva</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Delivering cooked food, clean water, blankets, and clothing items directly to laborers and homeless individuals.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glassmorphism" style={pillarCardStyle}>
              <div style={pillarIconStyle('rgba(139, 92, 246, 0.1)', '#8b5cf6')}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '20px', margin: '15px 0 10px 0' }}>Project Udaan</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Fostering financial independence for rural women through vocational skill workshops and sanitary distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Campaigns Grid */}
      <section className="section" style={{ borderTop: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Urgent Campaigns</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Donate to <span className="text-gradient">Active Causes</span></h2>
            </div>
            <Link to="/campaigns" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '14px' }}>
              View All Campaigns
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-secondary)' }}>
              Loading active campaigns...
            </div>
          ) : campaigns.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-secondary)' }}>
              No active campaigns at this time. Check back soon!
            </div>
          ) : (
            <div className="grid-3">
              {campaigns.map((c) => (
                <CampaignCard
                  key={c._id}
                  campaign={c}
                  onDonateClick={(selected) => setSelectedCampaign(selected)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mini Join CTA section */}
      <section className="section" style={{ borderTop: '1px solid var(--border-light)', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="glassmorphism" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '60px 40px',
            textAlign: 'center',
            border: '1px solid var(--border-light)',
            position: 'relative',
            zIndex: 3,
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-20%',
              width: '300px',
              height: '300px',
              background: 'var(--color-primary-glow)',
              filter: 'blur(100px)',
              borderRadius: '50%',
            }} />

            <span className="badge badge-primary" style={{ marginBottom: '20px' }}>Make a Difference</span>
            <h2 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '20px' }}>
              Become part of the <span className="text-gradient">InAmigos Family</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '16px',
              lineHeight: '1.7',
              maxWidth: '650px',
              margin: '0 auto 35px',
            }}>
              Join as a volunteer or intern to build professional skills, lead programs, and support projects directly in your area. Together we can shape a brighter future.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
              <Link to="/volunteer" className="btn btn-primary" style={{ padding: '14px 30px' }}>
                Join as Volunteer
              </Link>
              <Link to="/contact" className="btn btn-secondary" style={{ padding: '14px 30px' }}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <Testimonials />

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

const pillarCardStyle = {
  padding: '30px',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--border-light)',
  transition: 'var(--transition)',
};

const pillarIconStyle = (bg, color) => ({
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  background: bg,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default Home;
