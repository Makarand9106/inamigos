import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ShieldCheck } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && subject && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      }, 5000);
    }
  };

  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Contact</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>Get in <span className="text-gradient">Touch</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            Have questions about volunteer openings, tax certificates, or corporate sponsorship? Fill out the form or reach out directly.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '50px', alignItems: 'flex-start', marginBottom: '60px' }}>
          
          {/* Left Details */}
          <div>
            <h2 style={{ fontSize: '26px', color: '#fff', marginBottom: '20px' }}>Contact Information</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '30px' }}>
              We are headquartered in Bilaspur, Chhattisgarh. Our lines are open for support, partnerships, and public inquiries.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={detailBoxStyle}>
                <div style={iconBgStyle}>
                  <MapPin size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Office Address</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.4' }}>
                    Mangla, Bilaspur, Chhattisgarh - 495001, India
                  </p>
                </div>
              </div>

              <div style={detailBoxStyle}>
                <div style={iconBgStyle}>
                  <Phone size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Call / WhatsApp</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.4' }}>
                    +91 91795 24050
                  </p>
                </div>
              </div>

              <div style={detailBoxStyle}>
                <div style={iconBgStyle}>
                  <Mail size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Email Support</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.4' }}>
                    support@inamigosfoundation.org.in
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="glassmorphism" style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <h3 style={{ marginBottom: '25px', color: '#fff' }}>Send a Message</h3>

            {submitted && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(0, 204, 131, 0.1)',
                border: '1px solid rgba(0, 204, 131, 0.2)',
                color: 'var(--color-primary)',
                fontSize: '14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <CheckCircle size={18} /> Message sent successfully! We will get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 80G Receipt Query"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Your message details..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  gap: '8px',
                }}
              >
                <Send size={16} /> Send Message
              </button>

            </form>
          </div>

        </div>

        {/* Map placeholder */}
        <div className="glassmorphism" style={{
          height: '350px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(11,15,25,0.7) 0%, rgba(25,34,56,0.3) 100%)',
        }}>
          <MapPin size={40} color="var(--color-primary)" />
          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>InAmigos Foundation Headquarters</h4>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', fontSize: '14px' }}>
            Mangla, Bilaspur, Chhattisgarh - 495001, India. <br />
            (Map View is simulated for testing. Contact us for direct coordinate routing)
          </p>
        </div>

      </div>
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

const detailBoxStyle = {
  display: 'flex',
  gap: '15px',
  alignItems: 'center',
  padding: '16px',
  borderRadius: 'var(--radius-md)',
  background: 'rgba(255,255,255,0.01)',
  border: '1px solid rgba(255,255,255,0.03)',
};

const iconBgStyle = {
  width: '44px',
  height: '44px',
  borderRadius: '10px',
  background: 'rgba(0, 204, 131, 0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export default Contact;
