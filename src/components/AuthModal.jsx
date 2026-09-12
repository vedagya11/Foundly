import React, { useState } from 'react';
import { 
  X, Sparkles, ArrowRight, User, Briefcase, Code, Palette, Music, Film, Feather, Lightbulb, CheckCircle2 
} from 'lucide-react';
import { signUpUser, signInUser } from '../services/api';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onRegisterAccount, 
  onLoginAccount,
  onNavigateToProfile,
  onNavigateToFeed
}) {
  const [authMode, setAuthMode] = useState('signup'); // 'signup' | 'login'
  const [step, setStep] = useState(1); // 1: Auth credentials, 2: Role choice, 3: Profile Details, 4: Ready
  
  // Auth fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Role choice
  const [role, setRole] = useState('creator');

  // Profile creation fields
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('technology');
  const [categoryLabel, setCategoryLabel] = useState('Technology / AI');

  // Optional Profile Fields
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80');
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Form & Supabase error state
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const categoriesList = [
    { id: 'technology', name: 'Technology / AI', icon: Code },
    { id: 'design', name: 'Design & Visual Arts', icon: Palette },
    { id: 'music', name: 'Music & Audio', icon: Music },
    { id: 'entertainment', name: 'Film & Media', icon: Film },
    { id: 'writing', name: 'Creative Writing', icon: Feather },
    { id: 'business', name: 'Business & Startups', icon: Lightbulb }
  ];

  const availableInterests = [
    'Artificial Intelligence', 'Web Development', 'UI/UX Design', 
    'Startups', 'Music Production', 'Machine Learning', 'Video Editing', 
    'Photography', 'System Architecture', 'Screenwriting'
  ];

  const handleToggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (authMode === 'login') {
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please enter your email and password.');
        return;
      }
      
      setIsLoading(true);
      const { user, error } = await signInUser({ email: email.trim(), password: password.trim() });
      setIsLoading(false);

      if (error) {
        // Fallback to local login if Supabase not yet configured
        const fallbackSuccess = onLoginAccount(email.trim(), password.trim());
        if (!fallbackSuccess) {
          setErrorMsg(error.message || 'Invalid credentials or user not found.');
        } else {
          onClose();
        }
      } else {
        onClose();
      }
    } else {
      // Sign up mode: validate credentials then proceed to profile creation
      if (!email.trim() || !password.trim()) {
        setErrorMsg('Please enter an email and password.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      setStep(2);
    }
  };

  const handleRoleSelect = (chosenRole) => {
    setRole(chosenRole);
    if (chosenRole === 'creator') {
      setStep(3);
    } else {
      // Direct provider quick setup
      handleFinalizeProfileRegistration('provider');
    }
  };

  const handleCreateProfileSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!username.trim()) {
      setErrorMsg('Please enter a username.');
      return;
    }

    await handleFinalizeProfileRegistration('creator');
  };

  const handleFinalizeProfileRegistration = async (userRoleType) => {
    setIsLoading(true);
    const cleanHandle = username.trim().startsWith('@') ? username.trim() : `@${username.trim()}`;
    
    const profilePayload = {
      email: email.trim(),
      password: password.trim(),
      name: fullName.trim() || email.split('@')[0],
      username: cleanHandle,
      category: category,
      avatar: avatarUrl,
      bio: bio.trim(),
      location: location.trim(),
      interests: selectedInterests
    };

    const { user, error } = await signUpUser(profilePayload);
    setIsLoading(false);

    if (error) {
      setErrorMsg(error.message || 'Could not complete registration.');
      return;
    }

    // Also update local application state
    const newUserRecord = {
      id: user?.id || 'user_' + Date.now(),
      email: email.trim(),
      name: fullName.trim() || email.split('@')[0],
      username: cleanHandle,
      role: userRoleType,
      category: category,
      categoryLabel: categoryLabel,
      avatar: avatarUrl,
      bio: bio.trim(),
      location: location.trim(),
      interests: selectedInterests,
      work: [],
      posts: [],
      joinedCommunities: [],
      connections: {},
      overallScore: null,
      created_at: new Date().toISOString()
    };

    onRegisterAccount(newUserRecord);

    if (userRoleType === 'creator') {
      setStep(4);
    } else {
      onClose();
    }
  };

  const handleFinishOnboarding = (action) => {
    onClose();
    if (action === 'profile') {
      onNavigateToProfile();
    } else {
      onNavigateToFeed();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(8, 9, 11, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '560px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: 'var(--space-32)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)'
      }}>
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'var(--primary-indigo)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={14} color="#ffffff" />
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
              FOUNDLY
            </span>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* ERROR NOTIFICATION */}
        {errorMsg && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid var(--color-error)',
            color: 'var(--color-error)',
            fontSize: '0.82rem',
            marginBottom: '16px'
          }}>
            {errorMsg}
          </div>
        )}

        {/* STEP 1: AUTHENTICATION (SIGN UP OR LOG IN) */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
              {authMode === 'signup' ? 'WELCOME TO FOUNDLY' : 'LOG IN TO FOUNDLY'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {authMode === 'signup' 
                ? 'Create your account and start building your identity around what you can actually do.' 
                : 'Enter your credentials to access your creator account.'}
            </p>

            <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Email Address
                </label>
                <input 
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Password
                </label>
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    padding: '9px 12px',
                    color: '#ffffff',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              {authMode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Confirm Password
                  </label>
                  <input 
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '9px 12px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ width: '100%', marginTop: '8px', padding: '10px' }}>
                {isLoading ? 'Processing...' : authMode === 'signup' ? 'Create Account' : 'Log In'}
                <ArrowRight size={16} />
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {authMode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button 
                    onClick={() => { setAuthMode('login'); setErrorMsg(''); }} 
                    style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button 
                    onClick={() => { setAuthMode('signup'); setErrorMsg(''); }} 
                    style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Join Foundly
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE ROLE */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
              What brings you to Foundly?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Choose your primary role on the platform:
            </p>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '20px' }}>
              <div 
                onClick={() => handleRoleSelect('creator')}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} color="#818cf8" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>I’m a Creator</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Build an identity around what you can do, share work, join communities, and connect.
                  </p>
                </div>
              </div>

              <div 
                onClick={() => handleRoleSelect('provider')}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '18px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Briefcase size={20} color="var(--color-success)" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>I’m Looking for Talent</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Discover creators based on verified demonstrated skills rather than popularity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CREATOR PROFILE CREATION */}
        {step === 3 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase' }}>CREATOR PROFILE CREATION</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 6px 0' }}>
              Create Your Profile
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
              Tell the Foundly community who you are.
            </p>

            <form onSubmit={handleCreateProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Ved Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Username *
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. @vedsharma"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  What do you create? *
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
                  {categoriesList.map(cat => {
                    const active = category === cat.id;
                    const IconComp = cat.icon;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => { setCategory(cat.id); setCategoryLabel(cat.name); }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          borderRadius: '6px',
                          background: active ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                          border: `1px solid ${active ? 'var(--primary-indigo)' : 'var(--border-color)'}`,
                          color: active ? '#ffffff' : 'var(--text-secondary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <IconComp size={14} color={active ? '#818cf8' : 'currentColor'} />
                        <span>{cat.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Short Bio <span style={{ color: 'var(--text-muted)', textTransform: 'none' }}>(Optional)</span>
                </label>
                <textarea 
                  placeholder="Share a short summary of what you are working on..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem', outline: 'none', resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Location <span style={{ color: 'var(--text-muted)', textTransform: 'none' }}>(Optional)</span>
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Bengaluru, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Interests <span style={{ color: 'var(--text-muted)', textTransform: 'none' }}>(Optional)</span>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {availableInterests.map(interest => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleToggleInterest(interest)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: `1px solid ${isSelected ? 'var(--primary-indigo)' : 'var(--border-color)'}`,
                          background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                          color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        {isSelected ? '✓ ' : '+ '} {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn-primary" style={{ width: '100%', marginTop: '12px', padding: '10px' }}>
                {isLoading ? 'Creating Profile...' : 'Create My Profile'}
                <ArrowRight size={16} />
              </button>

            </form>
          </div>
        )}

        {/* STEP 4: PROFILE READY CONFIRMATION */}
        {step === 4 && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
              <CheckCircle2 size={28} color="var(--color-success)" />
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#ffffff', marginBottom: '6px' }}>
              Welcome to Foundly, {fullName}!
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Your creator profile is ready. You can now explore the community, connect with other creators, and share your work.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleFinishOnboarding('feed')} className="btn-primary" style={{ flex: 1, padding: '10px' }}>
                Explore Foundly
              </button>
              <button onClick={() => handleFinishOnboarding('profile')} className="btn-secondary" style={{ flex: 1, padding: '10px' }}>
                View My Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
