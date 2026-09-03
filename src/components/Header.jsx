import React from 'react';
import { 
  Sparkles, Compass, Cpu, User, EyeOff, ShieldCheck, 
  MessageSquare, Zap, Bookmark, Briefcase, RefreshCw 
} from 'lucide-react';

export default function Header({ 
  userRole, 
  setUserRole, 
  activeTab, 
  setActiveTab, 
  isAnonymousRecruiter, 
  setIsAnonymousRecruiter,
  unreadCount = 2
}) {
  const toggleRole = () => {
    const nextRole = userRole === 'creator' ? 'provider' : 'creator';
    setUserRole(nextRole);
    // If switching to provider and currently on profile, switch tab to discovery
    if (nextRole === 'provider' && (activeTab === 'profile' || activeTab === 'evaluator')) {
      setActiveTab('discovery');
    } else if (nextRole === 'creator' && (activeTab === 'discovery' || activeTab === 'saved')) {
      setActiveTab('feed');
    }
  };

  return (
    <header className="header-glass">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('feed')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
                FOUNDLY
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '99px',
                background: userRole === 'provider' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                color: userRole === 'provider' ? '#38bdf8' : '#818cf8',
                border: `1px solid ${userRole === 'provider' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(99, 102, 241, 0.4)'}`
              }}>
                {userRole === 'provider' ? 'OPPORTUNITY PROVIDER' : 'CREATOR PLATFORM'}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>
              Beyond Followers. Beyond Connections.
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs based on Role */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
          
          <button 
            onClick={() => setActiveTab('feed')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              background: activeTab === 'feed' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'feed' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <Compass size={16} color={activeTab === 'feed' ? '#818cf8' : 'currentColor'} />
            Community Feed
          </button>

          {/* CREATOR NAV ITEMS */}
          {userRole === 'creator' && (
            <>
              <button 
                onClick={() => setActiveTab('evaluator')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  background: activeTab === 'evaluator' ? 'rgba(168, 85, 247, 0.25)' : 'transparent',
                  color: activeTab === 'evaluator' ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                <Cpu size={16} color={activeTab === 'evaluator' ? '#c084fc' : 'currentColor'} />
                AI Evaluator
              </button>

              <button 
                onClick={() => setActiveTab('profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  background: activeTab === 'profile' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                  color: activeTab === 'profile' ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                <User size={16} color={activeTab === 'profile' ? '#34d399' : 'currentColor'} />
                Skill Profile
              </button>
            </>
          )}

          {/* PROVIDER NAV ITEMS */}
          {userRole === 'provider' && (
            <>
              <button 
                onClick={() => setActiveTab('discovery')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  background: activeTab === 'discovery' ? 'rgba(6, 182, 212, 0.25)' : 'transparent',
                  color: activeTab === 'discovery' ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                <Zap size={16} color={activeTab === 'discovery' ? '#38bdf8' : 'currentColor'} />
                Talent Discovery
              </button>

              <button 
                onClick={() => setActiveTab('saved')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  background: activeTab === 'saved' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                  color: activeTab === 'saved' ? '#ffffff' : 'var(--text-muted)'
                }}
              >
                <Bookmark size={16} color={activeTab === 'saved' ? '#fbbf24' : 'currentColor'} />
                Saved Talent
              </button>
            </>
          )}

          {/* COMMON MESSAGES TAB */}
          <button 
            onClick={() => setActiveTab('messages')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
              background: activeTab === 'messages' ? 'rgba(244, 63, 94, 0.25)' : 'transparent',
              color: activeTab === 'messages' ? '#ffffff' : 'var(--text-muted)',
              position: 'relative'
            }}
          >
            <MessageSquare size={16} color={activeTab === 'messages' ? '#fb7185' : 'currentColor'} />
            Messages
            {unreadCount > 0 && (
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#f43f5e',
                boxShadow: '0 0 6px #f43f5e'
              }} />
            )}
          </button>

        </nav>

        {/* Right Section: Role Switcher & Anonymous Mode Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Role Switcher Pill */}
          <button
            onClick={toggleRole}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 14px',
              borderRadius: '99px',
              background: userRole === 'provider' 
                ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(99, 102, 241, 0.25))' 
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(168, 85, 247, 0.25))',
              border: `1px solid ${userRole === 'provider' ? 'rgba(6, 182, 212, 0.5)' : 'rgba(168, 85, 247, 0.5)'}`,
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
            title="Click to switch between Creator Experience and Opportunity Provider Experience"
          >
            <RefreshCw size={14} color={userRole === 'provider' ? '#38bdf8' : '#c084fc'} />
            <span>Switch Experience: <strong>{userRole === 'provider' ? 'Opportunity Provider' : 'Creator'}</strong></span>
          </button>

          {/* Anonymous Provider Stealth Toggle (Only in Provider mode) */}
          {userRole === 'provider' && (
            <button
              onClick={() => setIsAnonymousRecruiter(!isAnonymousRecruiter)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '99px',
                background: isAnonymousRecruiter ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${isAnonymousRecruiter ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: isAnonymousRecruiter ? '#a7f3d0' : 'var(--text-muted)',
                fontSize: '0.78rem',
                fontWeight: '700',
                cursor: 'pointer'
              }}
              title="Toggle Anonymous Opportunity Provider Browsing Mode"
            >
              <EyeOff size={15} color={isAnonymousRecruiter ? '#34d399' : 'currentColor'} />
              <span>{isAnonymousRecruiter ? 'Anonymous Mode Active' : 'Public Profile'}</span>
            </button>
          )}

        </div>

      </div>

      {/* Role Banner Notification */}
      <div style={{
        marginTop: '10px',
        padding: '6px 14px',
        borderRadius: '8px',
        background: userRole === 'provider' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(99, 102, 241, 0.08)',
        border: `1px solid ${userRole === 'provider' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(99, 102, 241, 0.2)'}`,
        fontSize: '0.78rem',
        color: userRole === 'provider' ? '#7dd3fc' : '#a5b4fc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {userRole === 'provider' ? <Briefcase size={14} color="#38bdf8" /> : <Sparkles size={14} color="#a5b4fc" />}
          <span>
            <strong>{userRole === 'provider' ? 'OPPORTUNITY PROVIDER MODE:' : 'CREATOR MODE:'}</strong> {userRole === 'provider' ? 'Discovering talent based on demonstrated skills, not popularity alone.' : 'Showcasing work, gaining AI skill insights, and connecting with opportunities.'}
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
          Prototype Role Switch
        </span>
      </div>
    </header>
  );
}
