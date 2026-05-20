import React, { useState } from 'react';
import { volunteerService } from '../services/api';
import { Send, CheckCircle, ShieldAlert, Award, FileSpreadsheet, Loader2 } from 'lucide-react';

const Volunteer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [project, setProject] = useState('Project Bachpanshala');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !project || !message) {
      setErrorMsg('Please fill in all the required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await volunteerService.registerVolunteer({
        name,
        email,
        phone,
        project,
        message,
      });

      if (res.success) {
        setFormSubmitted(true);
      } else {
        setErrorMsg(res.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Something went wrong. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <div style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="glassmorphism" style={{ padding: '50px 40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
            <CheckCircle size={64} color="var(--color-primary)" style={{ marginBottom: '20px' }} />
            <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '15px' }}>Application Submitted!</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '30px' }}>
              Thank you, <strong>{name}</strong>, for applying to join <strong>{project}</strong>. Our team will review your application details and get in touch with you at <strong>{email}</strong> or phone soon.
            </p>
            <button onClick={() => {
              setFormSubmitted(false);
              setName('');
              setEmail('');
              setPhone('');
              setMessage('');
            }} className="btn btn-primary">
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Join the Movement</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>Become a <span className="text-gradient">Volunteer / Intern</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            We recruit students and young professionals to drive our local programs. Sign up below to join our next campaign or apply for a certified internship.
          </p>
        </div>

        <div className="grid-2" style={{ gap: '50px', alignItems: 'flex-start' }}>
          
          {/* Info Side */}
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 700, marginBottom: '20px', color: '#fff' }}>Why Volunteer with Us?</h2>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '35px' }}>
              InAmigos Foundation provides beginners and college students with opportunities to contribute directly to social development work. Whether you want to feed stray animals, teach children, plant trees, or manage digital campaigns, there is a place for you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <Award size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', color: '#fff', marginBottom: '5px' }}>Internship Certificate</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                    Gain verified certificates of completion for internships under Project Vikas, helping you build your professional resume.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <FileSpreadsheet size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', color: '#fff', marginBottom: '5px' }}>Real Skill Building</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                    Develop leadership, content creation, event planning, data analysis, and communication skills by leading local teams.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={iconBoxStyle}>
                  <CheckCircle color="var(--color-primary)" size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '18px', color: '#fff', marginBottom: '5px' }}>Flexible Operations</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                    Choose between on-ground physical drives (weekends) or online support tasks (content writing, marketing, database management).
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form Side */}
          <div className="glassmorphism" style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-md)',
          }}>
            <h3 style={{ marginBottom: '25px', color: '#fff' }}>Registration Form</h3>

            {errorMsg && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                fontSize: '14px',
                marginBottom: '20px',
              }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Select Project / Focus Area *</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  style={inputStyle}
                >
                  <option value="Project Bachpanshala">Project Bachpanshala (Education)</option>
                  <option value="Project Seva">Project Seva (Hunger & Material Relief)</option>
                  <option value="Project Jeev">Project Jeev (Animal Welfare)</option>
                  <option value="Project Udaan">Project Udaan (Women Empowerment)</option>
                  <option value="Project Prakriti">Project Prakriti (Environment)</option>
                  <option value="Project Vikas">Project Vikas (Professional Internships)</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Why do you want to join? (Short Statement) *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Tell us about your background and why you want to support InAmigos..."
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
                disabled={loading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  gap: '8px',
                  marginTop: '10px',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} /> Submitting details...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Submit Application
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

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

const iconBoxStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  background: 'rgba(0, 204, 131, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export default Volunteer;
