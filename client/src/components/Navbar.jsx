import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="glassmorphism" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '15px 0',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src="https://inamigosfoundation.org.in/public/storage/settings/174421468011.jpg" 
            alt="InAmigos Foundation" 
            style={{
              height: '42px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #ffffff 0%, var(--color-primary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            InAmigos
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {[
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
            { name: 'Causes', path: '/campaigns' },
            { name: 'Volunteer', path: '/volunteer' },
            { name: 'Gallery', path: '/gallery' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 500,
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--text-secondary)',
                borderBottom: isActive(link.path) ? '2px solid var(--color-primary)' : '2px solid transparent',
                paddingBottom: '4px',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) e.target.style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) e.target.style.color = 'var(--text-secondary)';
              }}
            >
              {link.name}
            </Link>
          ))}

          {/* Admin link if logged in */}
          {user && (
            <Link
              to="/admin"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 600,
                color: isActive('/admin') ? 'var(--color-primary)' : 'var(--accent-purple)',
              }}
            >
              <ShieldAlert size={16} /> Admin Portal
            </Link>
          )}
        </div>

        {/* Action Button */}
        <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          {user ? (
            <button onClick={logout} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Sign Out
            </button>
          ) : (
            <Link to="/admin" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              Admin Login
            </Link>
          )}
          
          <Link to="/donate" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '8px', gap: '6px' }}>
            <Heart size={16} fill="currentColor" /> Donate Now
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
          className="mobile-toggle-btn"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(11, 15, 25, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-light)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 999,
        }}>
          {[
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
            { name: 'Causes', path: '/campaigns' },
            { name: 'Volunteer', path: '/volunteer' },
            { name: 'Gallery', path: '/gallery' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={toggleMenu}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--text-secondary)',
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
              }}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              onClick={toggleMenu}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                color: 'var(--accent-purple)',
                padding: '8px 0',
              }}
            >
              Admin Portal
            </Link>
          )}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <Link to="/donate" onClick={toggleMenu} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              Donate
            </Link>
            {user ? (
              <button onClick={() => { logout(); toggleMenu(); }} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                Logout
              </button>
            ) : (
              <Link to="/admin" onClick={toggleMenu} className="btn btn-secondary" style={{ flex: 1, padding: '12px' }}>
                Admin
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Inline styles for responsive toggle */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
