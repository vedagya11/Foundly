import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, Compass, User, MessageSquare, Zap, Bookmark, 
  ChevronDown, Check, ArrowLeftRight, UserPlus, Users, LogOut, UserCheck
} from 'lucide-react';

export default function Header({ 
  isAuthenticated,
  userRole, 
  setUserRole, 
  activeTab, 
  setActiveTab, 
  onOpenAuth,
  currentUser,
  unreadCount = 1,
  onOpenOwnProfile,
  onLogoutAccount,
  onSwitchAccount
}) {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const roleDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (role) => {
    setUserRole(role);
    setIsRoleDropdownOpen(false);
    if (role === 'provider' && (activeTab === 'profile' || activeTab === 'evaluator' || activeTab === 'discover_people' || activeTab === 'communities')) {
      setActiveTab('discovery');
    } else if (role === 'creator' && (activeTab === 'discovery' || activeTab === 'saved')) {
      setActiveTab('feed');
    }
  };

  return (
    <header className="header-glass">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        
        {/* LOGO ON LEFT */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} 
          onClick={() => setActiveTab(isAuthenticated ? 'feed' : 'landing')}
          title="Foundly — Home"
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--primary-indigo)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={16} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.03em', fontFamily: 'var(--font-heading)', color: '#ffffff', lineHeight: 1 }}>
              FOUNDLY
            </div>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: '500', marginTop: '2px' }}>
              beyond followers. beyond connections.
            </p>
          </div>
        </div>

        {/* PUBLIC WEBSITE NAVIGATION (LOGGED OUT) */}
        {!isAuthenticated && (
          <>
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: 'var(--text-secondary)'
            }}>
              <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', color: activeTab === 'landing' ? '#ffffff' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
                Product
              </button>
              <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
                How It Works
              </button>
              <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
                For Talent
              </button>
              <button onClick={() => setActiveTab('landing')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
                For Providers
              </button>
              <button onClick={() => onOpenAuth('login')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '600' }}>
                Communities
              </button>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => onOpenAuth('login')} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                Log In
              </button>
              <button onClick={() => onOpenAuth('signup')} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                <UserPlus size={14} />
                Join Foundly
              </button>
            </div>
          </>
        )}

        {/* AUTHENTICATED APP NAVIGATION (LOGGED IN) */}
        {isAuthenticated && (
          <>
            <nav style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'var(--bg-dark)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflowX: 'auto'
            }}>
              {/* CREATOR SPECIFIC TABS */}
              {userRole === 'creator' && (
                <>
                  {/* HOME / FEED */}
                  <button 
                    onClick={() => setActiveTab('feed')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'feed' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'feed' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Compass size={13} color={activeTab === 'feed' ? '#818cf8' : 'currentColor'} />
                    Home
                  </button>

                  {/* DISCOVER PEOPLE */}
                  <button 
                    onClick={() => setActiveTab('discover_people')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'discover_people' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'discover_people' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Users size={13} color={activeTab === 'discover_people' ? '#818cf8' : 'currentColor'} />
                    Discover
                  </button>

                  {/* COMMUNITIES */}
                  <button 
                    onClick={() => setActiveTab('communities')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'communities' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'communities' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Compass size={13} color={activeTab === 'communities' ? '#818cf8' : 'currentColor'} />
                    Communities
                  </button>

                  {/* MY PROFILE */}
                  <button 
                    onClick={onOpenOwnProfile}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'profile' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
                      color: activeTab === 'profile' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <User size={13} color={activeTab === 'profile' ? 'var(--color-success)' : 'currentColor'} />
                    My Profile
                  </button>
                </>
              )}

              {/* OPPORTUNITY PROVIDER SPECIFIC TABS */}
              {userRole === 'provider' && (
                <>
                  <button 
                    onClick={() => setActiveTab('discovery')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'discovery' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'discovery' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Zap size={13} color={activeTab === 'discovery' ? '#a5b4fc' : 'currentColor'} />
                    Discover Talent
                  </button>

                  <button 
                    onClick={() => setActiveTab('saved')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '5px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)',
                      background: activeTab === 'saved' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                      color: activeTab === 'saved' ? '#ffffff' : 'var(--text-secondary)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Bookmark size={13} color={activeTab === 'saved' ? 'var(--color-warning)' : 'currentColor'} />
                    Saved Talent
                  </button>
                </>
              )}

              {/* MESSAGES TAB */}
              <button 
                onClick={() => setActiveTab('messages')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  background: activeTab === 'messages' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                  color: activeTab === 'messages' ? '#ffffff' : 'var(--text-secondary)',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
              >
                <MessageSquare size={13} color={activeTab === 'messages' ? 'var(--color-error)' : 'currentColor'} />
                Messages
                {unreadCount > 0 && (
                  <span style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--color-error)'
                  }} />
                )}
              </button>
            </nav>

            {/* RIGHT CONTROLS: ROLE SWITCHER & USER ACCOUNT MENU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              
              {/* Role Switcher */}
              <div style={{ position: 'relative' }} ref={roleDropdownRef}>
                <button
                  onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    color: userRole === 'provider' ? '#c084fc' : '#a5b4fc',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                  title="Switch Product Experience"
                >
                  <ArrowLeftRight size={12} />
                  <span>{userRole === 'provider' ? 'Recruiter View' : 'Creator View'}</span>
                  <ChevronDown size={12} style={{ transform: isRoleDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {isRoleDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    width: '180px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '4px',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 200
                  }}>
                    <div 
                      onClick={() => handleRoleSelect('creator')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: userRole === 'creator' ? '#ffffff' : 'var(--text-secondary)',
                        background: userRole === 'creator' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Creator View</span>
                      {userRole === 'creator' && <Check size={13} color="#a5b4fc" />}
                    </div>

                    <div 
                      onClick={() => handleRoleSelect('provider')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: userRole === 'provider' ? '#ffffff' : 'var(--text-secondary)',
                        background: userRole === 'provider' ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
                        cursor: 'pointer'
                      }}
                    >
                      <span>Opportunity Provider</span>
                      {userRole === 'provider' && <Check size={13} color="#c084fc" />}
                    </div>
                  </div>
                )}
              </div>

              {/* User Account Menu Dropdown */}
              {currentUser && (
                <div style={{ position: 'relative' }} ref={userMenuRef}>
                  <div 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer'
                    }}
                    title="User Account Options"
                  >
                    <img 
                      src={currentUser.avatar} 
                      alt={currentUser.name} 
                      style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#ffffff' }}>
                      {currentUser.name}
                    </span>
                    <ChevronDown size={12} color="var(--text-secondary)" />
                  </div>

                  {isUserMenuOpen && (
                    <div style={{
                      position: 'absolute',
                      top: 'calc(100% + 6px)',
                      right: 0,
                      width: '190px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '6px',
                      boxShadow: 'var(--shadow-md)',
                      zIndex: 200
                    }}>
                      <div style={{ padding: '6px 10px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>{currentUser.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#a5b4fc' }}>{currentUser.username || currentUser.handle}</div>
                      </div>

                      <div 
                        onClick={() => { setIsUserMenuOpen(false); onOpenOwnProfile(); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        <User size={13} />
                        <span>My Profile</span>
                      </div>

                      <div 
                        onClick={() => { setIsUserMenuOpen(false); onSwitchAccount(); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--text-secondary)',
                          cursor: 'pointer'
                        }}
                      >
                        <UserCheck size={13} />
                        <span>Switch / New User</span>
                      </div>

                      <div 
                        onClick={() => { setIsUserMenuOpen(false); onLogoutAccount(); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: 'var(--color-error)',
                          cursor: 'pointer',
                          marginTop: '4px',
                          borderTop: '1px solid var(--border-color)'
                        }}
                      >
                        <LogOut size={13} />
                        <span>Log Out</span>
                      </div>

                    </div>
                  )}

                </div>
              )}

            </div>
          </>
        )}

      </div>
    </header>
  );
}
