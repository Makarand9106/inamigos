import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Calendar, Award } from 'lucide-react';
import { donationService } from '../services/api';

const Hero = () => {
  const [stats, setStats] = useState({
    totalRaised: 185000,
    volunteersCount: 450,
    activeProjects: 6,
    treesPlanted: 22000
  });

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await donationService.getStats();
        if (res.success) {
          setStats(prev => ({
            ...prev,
            totalRaised: res.data.totalRaised > 0 ? res.data.totalRaised : prev.totalRaised,
          }));
        }
      } catch (err) {
        console.warn('Could not load live donation stats for Hero, using seeded defaults.');
      }
    };
    fetchLiveStats();
  }, []);

  return (
    <div style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      padding: '80px 0',
      overflow: 'hidden',
    }}>
      {/* Decorative Blur Spheres */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '400px',
        height: '400px',
        background: 'var(--color-primary-glow)',
        filter: 'blur(150px)',
        borderRadius: '50%',
        zIndex: -1,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '-10%',
        width: '400px',
        height: '400px',
        background: 'rgba(59, 130, 246, 0.1)',
        filter: 'blur(150px)',
        borderRadius: '50%',
        zIndex: -1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="grid-2" style={{ alignItems: 'center' }}>
          
          {/* Hero Left Content */}
          <div className="animate-fade">
            <span className="badge badge-primary" style={{ marginBottom: '20px' }}>
              Empowering India's Youth & Communities
            </span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              marginBottom: '20px',
              lineHeight: 1.1,
              fontWeight: 800,
            }}>
              Fostering Inclusion <br />
              & <span className="text-gradient">Social Change</span>
            </h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '18px',
              lineHeight: '1.7',
              marginBottom: '35px',
              maxWidth: '520px',
            }}>
              InAmigos Foundation is a Section 8 non-profit organization driving local solutions in hunger relief, underprivileged education, women empowerment, animal welfare, and environment conservation.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <Link to="/campaigns" className="btn btn-primary" style={{ padding: '14px 30px' }}>
                Explore Causes <ArrowRight size={18} />
              </Link>
              <Link to="/volunteer" className="btn btn-secondary" style={{ padding: '14px 30px' }}>
                Be a Volunteer
              </Link>
            </div>
          </div>

          {/* Hero Right: Modern Glassmorphic Stats and Impact Dashboard */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div className="glassmorphism" style={{
              padding: '40px',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
              zIndex: 3,
            }}>
              <h3 style={{ marginBottom: '25px', fontSize: '22px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Heart size={22} color="var(--color-primary)" fill="var(--color-primary)" /> Live Impact Board
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Stat 1 */}
                <div style={statContainerStyle}>
                  <div style={iconBgStyle('#00cc83')}>
                    <Heart size={20} color="#0b0f19" />
                  </div>
                  <div>
                    <h4 style={statValStyle}>₹{(stats.totalRaised).toLocaleString('en-IN')}</h4>
                    <p style={statLabelStyle}>Total Funds Raised</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div style={statContainerStyle}>
                  <div style={iconBgStyle('#3b82f6')}>
                    <Users size={20} color="#0b0f19" />
                  </div>
                  <div>
                    <h4 style={statValStyle}>{stats.volunteersCount}+</h4>
                    <p style={statLabelStyle}>Volunteers & Interns</p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div style={statContainerStyle}>
                  <div style={iconBgStyle('#8b5cf6')}>
                    <Calendar size={20} color="#0b0f19" />
                  </div>
                  <div>
                    <h4 style={statValStyle}>{stats.activeProjects}</h4>
                    <p style={statLabelStyle}>Core Projects Running</p>
                  </div>
                </div>

                {/* Stat 4 */}
                <div style={statContainerStyle}>
                  <div style={iconBgStyle('#00cc83')}>
                    <Award size={20} color="#0b0f19" />
                  </div>
                  <div>
                    <h4 style={statValStyle}>{(stats.treesPlanted).toLocaleString('en-IN')}+</h4>
                    <p style={statLabelStyle}>Trees Planted across India</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Glowing Backdrop Behind Stats Board */}
            <div style={{
              position: 'absolute',
              width: '105%',
              height: '105%',
              background: 'linear-gradient(135deg, var(--color-primary-glow) 0%, rgba(59, 130, 246, 0.1) 100%)',
              filter: 'blur(30px)',
              borderRadius: 'var(--radius-lg)',
              zIndex: 1,
            }} />
          </div>

        </div>
      </div>
    </div>
  );
};

const statContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  padding: '12px',
  borderRadius: 'var(--radius-md)',
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
};

const iconBgStyle = (color) => ({
  width: '42px',
  height: '42px',
  borderRadius: '8px',
  background: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 4px 10px ${color}40`,
});

const statValStyle = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#fff',
};

const statLabelStyle = {
  fontSize: '13px',
  color: 'var(--text-secondary)',
};

export default Hero;
