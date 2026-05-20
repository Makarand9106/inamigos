import React, { useState } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Aishwarya Sen',
    role: 'Volunteer Intern (Content & PR)',
    text: 'Working with Project Bachpanshala opened my eyes to the incredible capacity of child-led learning. Teaching digital literacy to students in rural Bilaspur has been the highlight of my college life.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Rohan Deshmukh',
    role: 'Active Volunteer (Project Seva)',
    text: 'Project Seva has allowed me to join hands with peers to distribute hot meals and warm clothes to street workers. The transparency of InAmigos is what motivates us to give 100% every single Sunday.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80'
  },
  {
    name: 'Dr. Kritika Sharma',
    role: 'Supporter & CSR Partner',
    text: 'We partnered with InAmigos Foundation for our company\'s tree plantation drive. Their meticulous planning under Project Prakriti—tracking every single sapling planted—was highly professional.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const { name, role, text, image } = testimonialsData[activeIndex];

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Testimonials</span>
          <h2 style={{ fontSize: '32px', fontWeight: 800 }}>Voices from Our <span className="text-gradient">Community</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            Hear from the volunteers, interns, and partners who make our collective on-ground action possible.
          </p>
        </div>

        {/* Carousel Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          
          {/* Main Card */}
          <div className="glassmorphism" style={{
            padding: '40px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            width: '100%',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
            position: 'relative',
          }}>
            
            <Quote size={48} style={{
              color: 'var(--color-primary-glow)',
              position: 'absolute',
              top: '20px',
              left: '40px',
              opacity: 0.3,
            }} />

            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: 'var(--text-primary)',
              fontStyle: 'italic',
              marginBottom: '30px',
              position: 'relative',
              zIndex: 2,
            }}>
              "{text}"
            </p>

            {/* Author Profile */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}>
              <img 
                src={image} 
                alt={name}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-primary)',
                }}
              />
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--color-primary)' }}>{role}</p>
              </div>
            </div>

          </div>

          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            style={navBtnStyle({ left: '-25px' })}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--bg-primary)'}
          >
            <ArrowLeft size={16} />
          </button>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            style={navBtnStyle({ right: '-25px' })}
            onMouseEnter={(e) => e.target.style.background = 'var(--color-primary)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--bg-primary)'}
          >
            <ArrowRight size={16} />
          </button>

        </div>

        {/* Indicator dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '30px',
        }}>
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: activeIndex === idx ? 'var(--color-primary)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

const navBtnStyle = (pos) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-light)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'var(--transition)',
  boxShadow: 'var(--shadow-sm)',
  zIndex: 10,
  ...pos,
});

export default Testimonials;
