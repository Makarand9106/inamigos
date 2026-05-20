import React from 'react';
import { ShieldCheck, Heart, Award, FileText, CheckCircle2 } from 'lucide-react';

const About = () => {
  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Header Banner */}
      <section className="section" style={{
        position: 'relative',
        textAlign: 'center',
        padding: '100px 0 60px 0',
        background: 'linear-gradient(to bottom, rgba(0, 204, 131, 0.05) 0%, transparent 100%)',
      }}>
        <div className="container">
          <span className="badge badge-primary" style={{ marginBottom: '15px' }}>Who We Are</span>
          <h1 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '20px' }}>
            About <span className="text-gradient">InAmigos Foundation</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '18px',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.7'
          }}>
            Established on September 23, 2020, InAmigos Foundation is a Section 8 non-profit organization focused on building communities, restoring hope, and empowering the youth of India.
          </p>
        </div>
      </section>

      {/* Founder & Mission Section */}
      <section className="section" style={{ borderTop: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '50px' }}>
            
            {/* Image Placeholder */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1559028112-f7241f2a1911?auto=format&fit=crop&w=800&q=80" 
                alt="Social Welfare Volunteers"
                style={{
                  width: '100%',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  border: '1px solid var(--border-light)',
                }}
              />
            </div>

            {/* Core Message */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '20px' }}>Our Mission & <span className="text-gradient">Vision</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.7' }}>
                Under the leadership of Mr. Govind Shukla, InAmigos Foundation was born from the belief that active citizenship and volunteerism among the youth can address the deepest roots of inequality. 
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '25px', lineHeight: '1.7' }}>
                We bridge structural gaps by providing food, schooling, hygiene awareness, skill workshops, and animal shelter support. Our objective is to mobilize students, transforming passive awareness into active ground-level contribution.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle2 color="var(--color-primary)" size={20} />
                  <span style={{ fontWeight: 600 }}>Registered under Section 8 (Companies Act, 2013)</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle2 color="var(--color-primary)" size={20} />
                  <span style={{ fontWeight: 600 }}>Active PAN-India volunteer network</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle2 color="var(--color-primary)" size={20} />
                  <span style={{ fontWeight: 600 }}>Audited transparent fund allocation</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications and Approvals Grid */}
      <section className="section" style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Legalities</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Certifications & <span className="text-gradient">Registrations</span></h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '0 auto' }}>
              We hold essential certifications validating our operations, ensuring donor tax benefits and corporate social responsibility (CSR) eligibility.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            
            {/* Cert 1 */}
            <div className="glassmorphism" style={certCardStyle}>
              <Award size={36} color="var(--color-primary)" style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>12A & 80G Status</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Registered with the Income Tax Department of India. All contributions made to InAmigos Foundation are eligible for tax exemption benefits under Section 80G.
              </p>
            </div>

            {/* Cert 2 */}
            <div className="glassmorphism" style={certCardStyle}>
              <ShieldCheck size={36} color="#3b82f6" style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>CSR-1 Registration</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Registered with the Ministry of Corporate Affairs (MCA) under CSR-1 (Registration Number available), authorizing corporate partnerships.
              </p>
            </div>

            {/* Cert 3 */}
            <div className="glassmorphism" style={certCardStyle}>
              <FileText size={36} color="#8b5cf6" style={{ marginBottom: '15px' }} />
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>ISO 9001:2015</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                ISO Certified for Quality Management Systems in social services, establishing operational standards for welfare execution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Deep Dive */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Projects</span>
            <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Our Structured <span className="text-gradient">Projects</span></h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {[
              {
                title: 'Project Seva (Hunger Relief & Relief Work)',
                desc: 'Focuses on the immediate distribution of nutrition, hot meals, drinking water, and seasonal clothing to daily wage earners, low-income groups, and street dwellers who struggle to meet their basic survival requirements.',
                image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Project Bachpanshala (Education for Underprivileged)',
                desc: 'Provides structured educational guidance, school support material, digital literacy courses, and critical soft skills development to children living in slums and rural locations to guarantee educational continuity.',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Project Udaan (Women Empowerment)',
                desc: 'Organizes skill-based sewing workshops, digital skills classes, financial literacy talks, and sanitary napkin distribution drives to promote female leadership and hygiene awareness in rural areas.',
                image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Project Jeev (Animal Protection)',
                desc: 'Coordinates rescue, basic veterinary aid, safety reflective collars placement, and structured feeding programs for stray animals and street dogs to assure their well-being and security.',
                image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Project Prakriti (Environment Conservation)',
                desc: 'Dedicated to fighting local global warming through tree plantation drives (with a target of 50,000+ trees), community park cleanups, water conservation assemblies, and promoting eco-friendly agriculture practices.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Project Vikas (Skill Development & Internships)',
                desc: 'Enrolls students and young graduates in real-world internships (data ops, digital outreach, event operations), coaching them with mentorship, team building skills, and certifications.',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80'
              }
            ].map((proj, idx) => (
              <div 
                key={idx} 
                className="glassmorphism"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '30px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                  padding: '24px',
                  alignItems: 'center',
                  flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                <img 
                  src={proj.image} 
                  alt={proj.title}
                  style={{
                    flex: '1 1 250px',
                    maxWidth: '350px',
                    height: '220px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                  }}
                />
                <div style={{ flex: '2 1 350px' }}>
                  <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#fff' }}>{proj.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '15px' }}>{proj.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

    </div>
  );
};

const certCardStyle = {
  padding: '30px',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-light)',
  transition: 'var(--transition)',
};

export default About;
