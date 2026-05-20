import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Bridging the Literacy Gap: How Project Bachpanshala is changing rural classrooms',
    excerpt: 'Access to quality schooling and basic computer learning can transform lives. We break down the syllabus and digital training structures we introduced last quarter.',
    date: 'May 12, 2026',
    author: 'Govind Shukla',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
    category: 'Education'
  },
  {
    title: 'The Critical Need for Stray Animal Care during summer months',
    excerpt: 'With rising heatwaves in Central India, stray animals face severe dehydration. Here is a report on our street drinking water tub placements and collars placement under Project Jeev.',
    date: 'April 28, 2026',
    author: 'Dr. Kritika Sharma',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
    category: 'Animal Welfare'
  },
  {
    title: 'Celebrating Women Leadership in Tailoring & Handicrafts',
    excerpt: 'Under Project Udaan, we finished a 6-week training camp for 45 rural women, enabling them with tools to begin small tailoring businesses. Discover their stories of resilience.',
    date: 'April 15, 2026',
    author: 'Aishwarya Sen',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=600&q=80',
    category: 'Women Empowerment'
  },
  {
    title: 'Green Cover Expansion: Planting 10,000 Saplings in Chhattisgarh',
    excerpt: 'Our recent afforestation drive under Project Prakriti. Check out details on species selected, community maintenance structures, and volunteer statistics.',
    date: 'March 30, 2026',
    author: 'Rohan Deshmukh',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    category: 'Environment'
  }
];

const Blog = () => {
  return (
    <div style={{ padding: '60px 0 80px 0' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span className="badge badge-primary" style={{ marginBottom: '12px' }}>News & Updates</span>
          <h1 style={{ fontSize: '38px', fontWeight: 800 }}>InAmigos <span className="text-gradient">Blog</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '600px', margin: '10px auto 0' }}>
            Stories of change, ground updates, activity reports, and volunteer contributions.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid-2" style={{ gap: '30px' }}>
          {blogPosts.map((post, idx) => (
            <div
              key={idx}
              className="glassmorphism"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--border-light)',
                transition: 'var(--transition)',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              
              {/* Image */}
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <span className="badge badge-primary" style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  zIndex: 2,
                }}>
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                
                {/* Meta details */}
                <div style={{
                  display: 'flex',
                  gap: '15px',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  marginBottom: '12px',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} color="var(--color-primary)" /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} color="var(--color-primary)" /> By {post.author}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: '1.4',
                  marginBottom: '12px',
                }}>
                  {post.title}
                </h3>

                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  flexGrow: 1,
                }}>
                  {post.excerpt}
                </p>

                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  width: 'fit-content',
                  transition: 'var(--transition)',
                }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--color-primary)'}>
                  Read Article <ArrowRight size={14} />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
