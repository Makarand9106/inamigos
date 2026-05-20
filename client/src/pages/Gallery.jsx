import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    title: 'Project Seva: Food Distribution Drive',
    category: 'Seva',
  },
  {
    src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
    title: 'Project Bachpanshala: Teaching Kids',
    category: 'Bachpanshala',
  },
  {
    src: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
    title: 'Project Udaan: Sewing/Tailoring Workshop',
    category: 'Udaan',
  },
  {
    src: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    title: 'Project Jeev: Animal Welfare Rescue',
    category: 'Jeev',
  },
  {
    src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    title: 'Project Prakriti: Tree Plantation',
    category: 'Prakriti',
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    title: 'Project Vikas: Intern Group Meeting',
    category: 'Vikas',
  },
  {
    src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    title: 'Project Bachpanshala: Digital Literacy',
    category: 'Bachpanshala',
  },
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    title: 'Project Seva: Clothes Distribution',
    category: 'Seva',
  },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [activeImage, setActiveImage] = useState(null);

  const categories = ['All', 'Seva', 'Bachpanshala', 'Udaan', 'Jeev', 'Prakriti', 'Vikas'];

  const filteredImages = filter === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === filter);

  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Media</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>On-Ground <span className="text-gradient">Impact Gallery</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            Visuals of InAmigos Foundation drives, education camps, tree plantation assemblies, and stray animal welfare drives.
          </p>
        </div>

        {/* Filter buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '45px',
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
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="glassmorphism"
              onClick={() => setActiveImage(img)}
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-light)',
                transition: 'var(--transition)',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
                e.currentTarget.querySelector('.zoom-overlay').style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.querySelector('.zoom-overlay').style.opacity = 0;
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              
              {/* Zoom overlay indicator */}
              <div
                className="zoom-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(5, 8, 16, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 2,
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0b0f19',
                }}>
                  <ZoomIn size={18} />
                </div>
              </div>

              <div style={{ padding: '16px' }}>
                <p style={{
                  fontSize: '12px',
                  color: 'var(--color-primary)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}>
                  Project {img.category}
                </p>
                <h4 style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}>{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox full-size screen view */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(5, 8, 16, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '800px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <button
              onClick={() => setActiveImage(null)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <X size={30} />
            </button>
            <img
              src={activeImage.src}
              alt={activeImage.title}
              style={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            />
            <h3 style={{ color: '#fff', marginTop: '20px', fontSize: '20px', fontWeight: 600 }}>
              {activeImage.title}
            </h3>
            <p style={{ color: 'var(--color-primary)', fontSize: '14px', marginTop: '5px' }}>
              Project {activeImage.category}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
