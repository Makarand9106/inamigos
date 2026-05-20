import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { campaignService, donationService, volunteerService } from '../services/api';
import { 
  Lock, User, Mail, ShieldAlert, PlusCircle, Trash2, Heart, Users, Calendar, 
  CheckCircle, XCircle, LayoutGrid, ListFilter, CreditCard, Layers, LogOut, Check, ArrowRight
} from 'lucide-react';

const Admin = () => {
  const { user, login, logout } = useAuth();
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Dashboard Tabs: 'overview' | 'campaigns' | 'donations' | 'volunteers'
  const [activeTab, setActiveTab] = useState('overview');

  // Backend Data State
  const [campaigns, setCampaigns] = useState([]);
  const [donations, setDonations] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [stats, setStats] = useState({
    totalRaised: 0,
    totalDonationsCount: 0,
    totalCampaignsCount: 0
  });

  // Create Campaign Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState('Education');
  const [newTarget, setNewTarget] = useState('');
  const [newImg, setNewImg] = useState('');
  const [campMsg, setCampMsg] = useState('');

  const loadDashboardData = async () => {
    try {
      const campRes = await campaignService.getCampaigns();
      if (campRes.success) setCampaigns(campRes.data);

      const donRes = await donationService.getDonations();
      if (donRes.success) setDonations(donRes.data);

      const volRes = await volunteerService.getVolunteers();
      if (volRes.success) setVolunteers(volRes.data);

      const statsRes = await donationService.getStats();
      if (statsRes.success) setStats(statsRes.data);

    } catch (err) {
      console.error('Failed to load dashboard statistics', err);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      loadDashboardData();
    }
  }, [user]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    const res = await login({ email, password });
    if (!res.success) {
      setAuthError(res.message || 'Authentication failed. Please verify credentials.');
    }
    setAuthLoading(false);
  };

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc || !newTarget) {
      setCampMsg('Please fill in required fields.');
      return;
    }

    try {
      const payload = {
        title: newTitle,
        description: newDesc,
        category: newCategory,
        targetAmount: Number(newTarget),
        image: newImg || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      };
      
      const res = await campaignService.createCampaign(payload);
      if (res.success) {
        setCampMsg('Campaign successfully created!');
        setNewTitle('');
        setNewDesc('');
        setNewTarget('');
        setNewImg('');
        loadDashboardData();
        setTimeout(() => setCampMsg(''), 3000);
      }
    } catch (err) {
      setCampMsg(err.response?.data?.message || 'Failed to add campaign.');
    }
  };

  const handleDeleteCampaign = async (id) => {
    if (window.confirm('Are you sure you want to remove this campaign?')) {
      try {
        const res = await campaignService.deleteCampaign(id);
        if (res.success) {
          loadDashboardData();
        }
      } catch (err) {
        alert(err.response?.data?.message || 'Error deleting campaign.');
      }
    }
  };

  const handleVolunteerStatus = async (id, status) => {
    try {
      const res = await volunteerService.updateStatus(id, status);
      if (res.success) {
        loadDashboardData();
      }
    } catch (err) {
      alert('Error updating volunteer status.');
    }
  };

  // If not logged in as Admin, show login card
  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div className="glassmorphism animate-fade" style={{
          width: '100%',
          maxWidth: '440px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-light)',
          padding: '40px 30px',
          boxShadow: 'var(--shadow-lg)',
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '12px',
              background: 'var(--color-primary-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 15px',
              color: 'var(--color-primary)',
            }}>
              <ShieldAlert size={28} />
            </div>
            <h2 style={{ fontSize: '24px', color: '#fff', fontWeight: 700 }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '6px' }}>
              Authentication required to access the dashboard panels.
            </p>
          </div>

          {authError && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              fontSize: '13px',
              marginBottom: '20px',
            }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Admin Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  placeholder="admin@inamigosfoundation.org.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: '40px' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: '8px',
                fontWeight: 700,
                marginTop: '10px',
              }}
            >
              {authLoading ? 'Verifying profile...' : 'Sign In as Admin'}
            </button>

          </form>

          {/* Seed hint */}
          {/* <div style={{
            marginTop: '25px',
            padding: '12px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid var(--border-light)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
          }}>
            <p style={{ fontWeight: 600, color: 'var(--color-primary)', marginBottom: '4px' }}>Demo Credentials:</p>
            <p>Email: <code>admin@inamigosfoundation.org.in</code></p>
            <p>Password: <code>adminpassword123</code></p>
          </div> */}

        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Header Dashboard Banner */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          paddingBottom: '30px',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '40px',
        }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#fff', fontWeight: 800 }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Welcome back, <strong>{user.name}</strong>. Monitor and manage all campaigns, donations and volunteers.
            </p>
          </div>
          <button onClick={logout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Outer Layout Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px' }} className="admin-grid">
          
          {/* Sidebar Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { id: 'overview', name: 'Overview', icon: <LayoutGrid size={18} /> },
              { id: 'campaigns', name: 'Manage Causes', icon: <Layers size={18} /> },
              { id: 'donations', name: 'Donations Log', icon: <CreditCard size={18} /> },
              { id: 'volunteers', name: 'Volunteers List', icon: <Users size={18} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? 'var(--color-primary-glow)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) e.target.style.color = 'var(--text-secondary)';
                }}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>

          {/* Right Panels Content */}
          <div>
            
            {/* 1. OVERVIEW PANEL */}
            {activeTab === 'overview' && (
              <div className="animate-fade">
                <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#fff' }}>Impact Summary</h2>
                
                {/* Stats row */}
                <div className="grid-3" style={{ gap: '20px', marginBottom: '40px' }}>
                  
                  <div className="glassmorphism" style={overviewBoxStyle}>
                    <div style={iconBgStyle('var(--color-primary-glow)', 'var(--color-primary)')}>
                      <Heart size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>₹{stats.totalRaised.toLocaleString('en-IN')}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Total Funds Raised</p>
                    </div>
                  </div>

                  <div className="glassmorphism" style={overviewBoxStyle}>
                    <div style={iconBgStyle('rgba(59, 130, 246, 0.1)', '#3b82f6')}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{stats.totalDonationsCount}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Transaction Log Count</p>
                    </div>
                  </div>

                  <div className="glassmorphism" style={overviewBoxStyle}>
                    <div style={iconBgStyle('rgba(139, 92, 246, 0.1)', '#8b5cf6')}>
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{stats.totalCampaignsCount}</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Active Impact Campaigns</p>
                    </div>
                  </div>

                </div>

                {/* Info block */}
                <div className="glassmorphism" style={{
                  padding: '30px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-light)',
                }}>
                  <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '15px' }}>Operations Board</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '14px', marginBottom: '20px' }}>
                    This database keeps track of transactions and volunteer forms submitted by visitors. Use the navigation sidebar on the left to add campaigns, view payment transactions, and change volunteer approval states.
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => setActiveTab('campaigns')} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      Add Cause <ArrowRight size={14} />
                    </button>
                    <button onClick={() => setActiveTab('volunteers')} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px' }}>
                      Applications <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 2. CAMPAIGNS PANEL */}
            {activeTab === 'campaigns' && (
              <div className="animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                
                {/* Create campaign form */}
                <div className="glassmorphism" style={{ padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
                  <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={20} color="var(--color-primary)" /> Create New Cause
                  </h3>
                  
                  {campMsg && (
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(0, 204, 131, 0.1)',
                      border: '1px solid rgba(0, 204, 131, 0.2)',
                      color: 'var(--color-primary)',
                      fontSize: '13px',
                      marginBottom: '20px',
                    }}>
                      {campMsg}
                    </div>
                  )}

                  <form onSubmit={handleCreateCampaign} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="camp-form">
                    
                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Campaign Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Project Seva: Winter Clothes distribution"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Category *</label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={inputStyle}
                      >
                        <option value="Education">Education</option>
                        <option value="Women Empowerment">Women Empowerment</option>
                        <option value="Food & Clothing">Food & Clothing</option>
                        <option value="Animal Welfare">Animal Welfare</option>
                        <option value="Environment">Environment</option>
                        <option value="Skill Development">Skill Development</option>
                      </select>
                    </div>

                    <div>
                      <label style={labelStyle}>Target Goal (INR) *</label>
                      <input
                        type="number"
                        required
                        min="1000"
                        placeholder="e.g. 150000"
                        value={newTarget}
                        onChange={(e) => setNewTarget(e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Image URL (Unsplash/Web Link)</label>
                      <input
                        type="text"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        value={newImg}
                        onChange={(e) => setNewImg(e.target.value)}
                        style={inputStyle}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={labelStyle}>Campaign Description *</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Describe the cause, timeline, target and supplies required..."
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                      <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '8px' }}>
                        Create Campaign
                      </button>
                    </div>

                  </form>
                </div>

                {/* Campaigns List */}
                <div>
                  <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px' }}>Active Campaigns</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {campaigns.map((c) => (
                      <div key={c._id} className="glassmorphism" style={{
                        padding: '16px 20px',
                        borderRadius: '12px',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '20px',
                      }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <img 
                            src={c.image} 
                            alt={c.title}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }}
                          />
                          <div>
                            <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>{c.title}</h4>
                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                              Goal: ₹{c.targetAmount.toLocaleString()} | Raised: ₹{c.raisedAmount.toLocaleString()} ({c.category})
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteCampaign(c._id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '6px',
                            transition: 'var(--transition)',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 3. DONATIONS LOG */}
            {activeTab === 'donations' && (
              <div className="animate-fade">
                <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#fff' }}>Donation Log</h2>
                
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--border-light)', color: '#fff' }}>
                        <th style={thStyle}>Date</th>
                        <th style={thStyle}>Donor</th>
                        <th style={thStyle}>Cause</th>
                        <th style={thStyle}>Amount</th>
                        <th style={thStyle}>Transaction ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map((d) => (
                        <tr key={d._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                          <td style={tdStyle}>{new Date(d.date || d.createdAt).toLocaleDateString()}</td>
                          <td style={tdStyle}>
                            <div style={{ fontWeight: 600, color: '#fff' }}>{d.donorName}</div>
                            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{d.donorEmail}</div>
                          </td>
                          <td style={tdStyle}>
                            {d.campaign ? d.campaign.title : <span style={{ color: 'var(--text-muted)' }}>General Support</span>}
                          </td>
                          <td style={{ ...tdStyle, fontWeight: 700, color: 'var(--color-primary)' }}>
                            ₹{d.amount.toLocaleString()}
                          </td>
                          <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '12px' }}>
                            {d.transactionId}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {donations.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                      No donations recorded in database.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. VOLUNTEERS PANEL */}
            {activeTab === 'volunteers' && (
              <div className="animate-fade">
                <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#fff' }}>Volunteer & Intern Applications</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {volunteers.map((vol) => (
                    <div key={vol._id} className="glassmorphism" style={{
                      padding: '24px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-light)',
                    }}>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '15px',
                        marginBottom: '15px',
                      }}>
                        <div>
                          <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>{vol.name}</h4>
                          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                            Email: {vol.email} | Phone: {vol.phone}
                          </p>
                          <span className="badge badge-primary" style={{ marginTop: '8px' }}>
                            {vol.project}
                          </span>
                        </div>

                        {/* Current status display */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '50px',
                            fontSize: '12px',
                            fontWeight: 600,
                            background: vol.status === 'Approved' ? 'rgba(0, 204, 131, 0.1)' : vol.status === 'Rejected' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                            color: vol.status === 'Approved' ? 'var(--color-primary)' : vol.status === 'Rejected' ? '#ef4444' : 'var(--text-secondary)',
                          }}>
                            {vol.status}
                          </span>
                        </div>
                      </div>

                      {/* Cover letter */}
                      <p style={{
                        background: 'rgba(0,0,0,0.2)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'var(--text-secondary)',
                        marginBottom: '20px',
                      }}>
                        {vol.message}
                      </p>

                      {/* Approval buttons */}
                      {vol.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => handleVolunteerStatus(vol._id, 'Approved')}
                            className="btn btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', gap: '4px' }}
                          >
                            <Check size={14} /> Approve
                          </button>
                          <button
                            onClick={() => handleVolunteerStatus(vol._id, 'Rejected')}
                            style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.3)', background: 'none', color: '#ef4444' }}
                            className="btn"
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      )}

                    </div>
                  ))}

                  {volunteers.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
                      No applications submitted in database.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
      <style>{`
        @media (max-width: 900px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
          .camp-form {
            grid-template-columns: 1fr !important;
          }
          .camp-form > div {
            grid-column: span 1 !important;
          }
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

const overviewBoxStyle = {
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid var(--border-light)',
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
};

const iconBgStyle = (bg, color) => ({
  width: '44px',
  height: '44px',
  borderRadius: '10px',
  background: bg,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const thStyle = {
  padding: '12px 16px',
  fontWeight: 600,
};

const tdStyle = {
  padding: '16px',
  verticalAlign: 'middle',
  color: 'var(--text-secondary)',
};

export default Admin;
