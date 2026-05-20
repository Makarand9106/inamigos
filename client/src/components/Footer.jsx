import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-light)',
      padding: '70px 0 30px 0',
      color: 'var(--text-secondary)',
      fontSize: '14px',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'space-between',
          marginBottom: '50px',
        }} className="footer-grid">
          
          {/* Logo & Description */}
          <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <img 
                src="https://inamigosfoundation.org.in/public/storage/settings/174421468011.jpg" 
                alt="InAmigos Foundation" 
                style={{ height: '36px', borderRadius: '4px' }}
              />
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#fff',
              }}>
                InAmigos
              </span>
            </div>
            <p style={{ lineHeight: '1.7', marginBottom: '25px' }}>
              InAmigos Foundation is a Section 8 registered non-profit organization dedicated to fostering social welfare, youth empowerment, education, and community development across India.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="https://www.facebook.com/inamigos.inamigos" target="_blank" rel="noopener noreferrer" style={socialIconStyle}><Facebook size={18} /></a>
              <a href="https://www.instagram.com/inamigos/" target="_blank" rel="noopener noreferrer" style={socialIconStyle}><Instagram size={18} /></a>
              <a href="#" style={socialIconStyle}><Twitter size={18} /></a>
              <a href="#" style={socialIconStyle}><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ flex: '1 1 150px' }}>
            <h5 style={{ color: '#fff', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Quick Links</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/about" style={linkStyle}>About Us</Link></li>
              <li><Link to="/campaigns" style={linkStyle}>Our Causes</Link></li>
              <li><Link to="/volunteer" style={linkStyle}>Join as Volunteer</Link></li>
              <li><Link to="/gallery" style={linkStyle}>Media Gallery</Link></li>
              <li><Link to="/blog" style={linkStyle}>Read Blog</Link></li>
              <li><Link to="/contact" style={linkStyle}>Get In Touch</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div style={{ flex: '1 1 200px' }}>
            <h5 style={{ color: '#fff', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Contact Info</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Mangla, Bilaspur, Chhattisgarh - 495001, India</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>+91 91795 24050</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <a href="mailto:support@inamigosfoundation.org.in" style={{ color: 'inherit' }}>
                  support@inamigosfoundation.org.in
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div style={{ flex: '1 1 250px' }}>
            <h5 style={{ color: '#fff', marginBottom: '20px', fontSize: '16px', fontWeight: 600 }}>Stay Updated</h5>
            <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
              Subscribe to our newsletter to receive updates on campaigns, stories, and activities.
            </p>
            <form onSubmit={handleSubscribe} style={{ position: 'relative', display: 'flex' }}>
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-light)',
                  padding: '12px 50px 12px 16px',
                  borderRadius: '8px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  right: '5px',
                  top: '5px',
                  bottom: '5px',
                  background: 'var(--color-primary)',
                  border: 'none',
                  borderRadius: '6px',
                  width: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#0b0f19',
                }}
              >
                <Send size={16} />
              </button>
            </form>
            {subscribed && (
              <p style={{ color: 'var(--color-primary)', marginTop: '8px', fontSize: '13px', fontWeight: 500 }}>
                Thanks for subscribing!
              </p>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
        }}>
          <p>© {new Date().getFullYear()} InAmigos Foundation. All Rights Reserved. (Registered Section 8 NGO)</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            Made with <Heart size={14} fill="var(--color-primary)" color="var(--color-primary)" /> for community development.
          </p>
        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            flex-direction: column !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
};

const socialIconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '38px',
  height: '38px',
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid var(--border-light)',
  color: 'var(--text-secondary)',
  transition: 'var(--transition)',
};

const linkStyle = {
  color: 'inherit',
  transition: 'var(--transition)',
};

export default Footer;
