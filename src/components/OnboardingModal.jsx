import React, { useState } from 'react';
import { 
  X, Sparkles, Upload, Link as LinkIcon, ArrowRight, 
  User, Briefcase, Music, Palette, Code, Film, Feather, Lightbulb, Eye, CheckCircle2
} from 'lucide-react';

export default function OnboardingModal({ 
  isOpen, 
  onClose, 
  setUserRole, 
  onCompleteOnboarding,
  onNavigateToProfile, 
  onNavigateToFeed,
  onNavigateToDiscovery 
}) {
  const [path, setPath] = useState(null); // 'talent' | 'provider'
  const [step, setStep] = useState(1);

  // Talent state
  const [selectedCategory, setSelectedCategory] = useState('technology');
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('Technology & Code');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showEvidence, setShowEvidence] = useState(false);
  const [calculatedScore, setCalculatedScore] = useState(8.8);
  
  // Profile Form state
  const [fullName, setFullName] = useState('Ved');
  const [username, setUsername] = useState('@ved123');
  const [bio, setBio] = useState('Building AI talent infrastructure and full-stack applications. Focused on demonstrated skill signals.');
  const [location, setLocation] = useState('Bengaluru, India');
  const [topSkillsInput, setTopSkillsInput] = useState('React, Python, Machine Learning, System Design');

  // Provider state
  const [providerCategory, setProviderCategory] = useState('Technology & Code');
  const [requiredScore, setRequiredScore] = useState(8.5);

  if (!isOpen) return null;

  const handleSelectPath = (chosenPath) => {
    setPath(chosenPath);
    if (chosenPath === 'talent') {
      setUserRole('creator');
      setStep(2);
    } else {
      setUserRole('provider');
      setStep(2);
    }
  };

  const handleSelectCatObj = (cat) => {
    setSelectedCategory(cat.id);
    setSelectedCategoryLabel(cat.name);
  };

  const handleSimulateUpload = () => {
    setUploadedFile('Demonstration_Work_Sample.zip');
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setCalculatedScore(8.9);
      setStep(4);
    }, 1600);
  };

  const handleFinalizeProfile = (destination) => {
    const skillsArr = topSkillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const newProfile = {
      id: 'user_' + Date.now(),
      name: fullName,
      handle: username.startsWith('@') ? username : `@${username}`,
      username: username.replace('@', ''),
      location: location,
      category: selectedCategory,
      categoryLabel: selectedCategoryLabel,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      bio: bio,
      overallScore: calculatedScore,
      demonstratedSkillScore: calculatedScore,
      followers: 0,
      following: 0,
      parameters: {
        codeQuality: 9.1,
        problemSolving: 8.8,
        efficiency: 8.7,
        architecture: 8.9,
        technicalImplementation: 8.6
      },
      skills: skillsArr,
      aiFeedback: `Demonstrated high structural discipline and precision in ${selectedCategoryLabel}. Zero critical execution flaws detected.`,
      skillsGraphData: [
        { month: 'Jul', score: 8.2 },
        { month: 'Aug', score: 8.5 },
        { month: 'Sep', score: calculatedScore }
      ],
      highlightWorkTitle: uploadedFile ? `Verified Submission: ${uploadedFile}` : 'Initial Talent Showcase',
      work: [
        {
          id: 'w_' + Date.now(),
          title: uploadedFile ? `Submission: ${uploadedFile}` : 'Initial Skill Sample',
          description: `Verified ${selectedCategoryLabel} work sample analyzed by Foundly AI.`,
          score: calculatedScore,
          date: 'Just now'
        }
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };

    if (onCompleteOnboarding) {
      onCompleteOnboarding(newProfile);
    }

    onClose();

    if (destination === 'profile') {
      onNavigateToProfile();
    } else {
      onNavigateToFeed();
    }
  };

  const handleFinishProviderSetup = () => {
    onClose();
    onNavigateToDiscovery();
  };

  const talentCategories = [
    { id: 'technology', name: 'Technology & Code', icon: Code },
    { id: 'design', name: 'Design & Visual Arts', icon: Palette },
    { id: 'music', name: 'Music & Audio', icon: Music },
    { id: 'entertainment', name: 'Film & Media', icon: Film },
    { id: 'writing', name: 'Creative Writing', icon: Feather },
    { id: 'business', name: 'Business & Leadership', icon: Lightbulb }
  ];

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
        maxWidth: '580px',
        padding: 'var(--space-32)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)'
      }}>
        
        {/* Modal Close Header */}
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

        {/* STEP 1: PATH SELECTION */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
              What are you here to do?
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Foundly connects talent and opportunity providers based on demonstrated ability.
            </p>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div 
                onClick={() => handleSelectPath('talent')}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
                className="glass-panel-interactive"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} color="#818cf8" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>Showcase My Talent</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Upload work, build an evidence-backed skill profile, and join creator communities.</p>
                  </div>
                </div>
              </div>

              <div 
                onClick={() => handleSelectPath('provider')}
                style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
                className="glass-panel-interactive"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={20} color="var(--color-success)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>Discover Talent</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Filter candidate skill requirements and review verified proof points.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TALENT FLOW STEP 2: CATEGORY SELECT */}
        {path === 'talent' && step === 2 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase' }}>STEP 1 OF 4</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 8px 0' }}>
              What do you create?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Select your primary creative or technical discipline:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              {talentCategories.map(cat => {
                const IconComp = cat.icon;
                const active = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectCatObj(cat)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: active ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-elevated)',
                      border: `1px solid ${active ? 'var(--primary-indigo)' : 'var(--border-color)'}`,
                      color: active ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    <IconComp size={16} color={active ? '#818cf8' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '0.82rem', fontWeight: '600' }}>{cat.name}</span>
                  </div>
                );
              })}
            </div>

            <button onClick={() => setStep(3)} className="btn-primary" style={{ width: '100%' }}>
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* TALENT FLOW STEP 3: WORK SUBMISSION */}
        {path === 'talent' && step === 3 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase' }}>STEP 2 OF 4</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 8px 0' }}>
              Show us what you can do.
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Foundly uses your submitted work to extract demonstrated skill signals.
            </p>

            <div style={{
              padding: '28px',
              borderRadius: '12px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                <Upload size={20} color="#818cf8" />
              </div>

              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                Upload {selectedCategoryLabel} Work Sample
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Upload audio, code repositories, UI designs, or media files for AI analysis.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={handleSimulateUpload} disabled={isAnalyzing} className="btn-primary" style={{ fontSize: '0.82rem' }}>
                  <Upload size={14} />
                  {isAnalyzing ? 'Analyzing Work...' : 'Upload Work Sample'}
                </button>
                <button onClick={handleSimulateUpload} disabled={isAnalyzing} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
                  <LinkIcon size={14} />
                  Add Project Link
                </button>
              </div>
            </div>

            <button onClick={() => setStep(4)} className="btn-secondary" style={{ width: '100%', fontSize: '0.8rem' }}>
              Skip for now, continue to profile →
            </button>
          </div>
        )}

        {/* TALENT FLOW STEP 4: DEMONSTRATED SKILL SCORE REPORT */}
        {path === 'talent' && step === 4 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-success)', textTransform: 'uppercase' }}>STEP 3 OF 4 • WORK ANALYZED</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 16px 0' }}>
              Demonstrated Skill Profile Generated
            </h2>

            <div style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>INITIAL DEMONSTRATED SCORE</div>
                <div style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>Demonstrated Skill Score</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Category: {selectedCategoryLabel}</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                  {calculatedScore}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}> / 10</span>
              </div>
            </div>

            <button className="btn-evidence-trigger" onClick={() => setShowEvidence(!showEvidence)} style={{ marginBottom: '16px' }}>
              <Eye size={14} />
              <span>{showEvidence ? 'Hide Evidence Details' : 'View Evidence →'}</span>
            </button>

            {showEvidence && (
              <div className="evidence-card" style={{ marginBottom: '16px', marginTop: 0 }}>
                <div className="evidence-title">
                  <CheckCircle2 size={14} />
                  <span>EVIDENCE DETECTED IN SUBMISSION</span>
                </div>
                <div className="evidence-list">
                  <div className="evidence-item">• Structural execution in core category parameters: High precision</div>
                  <div className="evidence-item">• Verified consistency across component syntax & complexity boundaries</div>
                </div>
              </div>
            )}

            <button onClick={() => setStep(5)} className="btn-primary" style={{ width: '100%' }}>
              Set Up Profile Details
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* TALENT FLOW STEP 5: FINAL PROFILE CREATION */}
        {path === 'talent' && step === 5 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase' }}>STEP 4 OF 4 • FINALIZE IDENTITY</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 16px 0' }}>
              Welcome to Foundly, {fullName}!
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Full Name</label>
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Location</label>
                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Bio</label>
                <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem', resize: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Top Skills (comma-separated)</label>
                <input type="text" value={topSkillsInput} onChange={(e) => setTopSkillsInput(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleFinalizeProfile('profile')} className="btn-primary" style={{ flex: 1 }}>
                View My Profile
              </button>
              <button onClick={() => handleFinalizeProfile('feed')} className="btn-secondary" style={{ flex: 1 }}>
                Explore Foundly
              </button>
            </div>
          </div>
        )}

        {/* OPPORTUNITY PROVIDER FLOW STEP 2 */}
        {path === 'provider' && step === 2 && (
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-success)', textTransform: 'uppercase' }}>RECRUITER ONBOARDING</span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', margin: '4px 0 8px 0' }}>
              What talent are you discovering?
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Discover talent based on demonstrated skills, not social popularity.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Target Category</label>
                <select value={providerCategory} onChange={(e) => setProviderCategory(e.target.value)} style={{ width: '100%', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 12px', color: '#ffffff', fontSize: '0.85rem' }}>
                  <option value="Technology & Code">Technology & Code</option>
                  <option value="Design & Visual Arts">Design & Visual Arts</option>
                  <option value="Music & Audio">Music & Audio</option>
                  <option value="Film & Media">Film & Media</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>Minimum Required Score: ≥ {requiredScore}</label>
                <input type="range" min="6.0" max="9.5" step="0.1" value={requiredScore} onChange={(e) => setRequiredScore(parseFloat(e.target.value))} />
              </div>
            </div>

            <button onClick={handleFinishProviderSetup} className="btn-primary" style={{ width: '100%' }}>
              Discover Talent
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
