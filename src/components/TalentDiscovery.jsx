import React, { useState } from 'react';
import { Sparkles, Sliders, Search, ShieldCheck, MapPin, Users, Award, Send, Star, Zap, Briefcase } from 'lucide-react';
import { CATEGORIES, CREATORS } from '../data/mockData';

export default function TalentDiscovery({ 
  isAnonymousRecruiter, 
  onOpenInquiryModal, 
  onSelectCreator,
  shortlisted,
  onToggleShortlist
}) {
  const [selectedCatId, setSelectedCatId] = useState('music');
  const [searchQuery, setSearchQuery] = useState('');

  const [sliderThresholds, setSliderThresholds] = useState({
    pitchAccuracy: 8.5,
    expression: 8.0,
    voiceQuality: 8.5,
    visualComposition: 8.5,
    typography: 8.0,
    codeQuality: 9.0,
    problemSolving: 9.0
  });

  const activeCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0];

  const handleSliderChange = (paramKey, value) => {
    setSliderThresholds(prev => ({ ...prev, [paramKey]: parseFloat(value) }));
  };

  const categoryCreators = CREATORS.filter(c => c.category === selectedCatId);

  const matchedCreators = categoryCreators.filter(creator => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = creator.name.toLowerCase().includes(q) || creator.location.toLowerCase().includes(q) || creator.bio.toLowerCase().includes(q);
      if (!matchName) return false;
    }

    return activeCategory.parameters.every(param => {
      const threshold = sliderThresholds[param.key] || 7.0;
      const creatorScore = creator.parameters[param.key] || 7.0;
      return creatorScore >= threshold - 0.2;
    });
  }).sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(6, 182, 212, 0.15))', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Briefcase size={18} color="#38bdf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7dd3fc' }}>
                OPPORTUNITY PROVIDER MODE
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>
              Discover talent based on demonstrated skills, not popularity alone.
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Set your category skill criteria below. Discover creators whose proven work matches your requirements regardless of follower count.
            </p>
          </div>

          {isAnonymousRecruiter && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)' }}>
              <ShieldCheck size={20} color="#34d399" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#a7f3d0' }}>Anonymous Provider Active</div>
                <div style={{ fontSize: '0.7rem', color: '#7dd3fc' }}>Prototype: provider identity remains hidden while browsing until you choose to contact a creator.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: '28px' }}>
        
        {/* Left Filter Matrix */}
        <aside className="glass-panel" style={{ padding: '22px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <Sliders size={18} color="#818cf8" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700' }}>Recruiter Filter Matrix</h3>
          </div>

          {/* Category Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
              1. Choose Discipline:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${selectedCatId === cat.id ? 'rgba(6, 182, 212, 0.5)' : 'transparent'}`,
                    background: selectedCatId === cat.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    color: selectedCatId === cat.id ? '#ffffff' : 'var(--text-muted)',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Keyword Search */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
              2. Search by Keyword / Location:
            </label>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '10px' }} />
              <input
                type="text"
                placeholder="e.g. Kolkata, Acoustic, Rust..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  padding: '8px 12px 8px 36px',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* AI Skill Score Sliders */}
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#38bdf8', marginBottom: '12px' }}>
              3. Minimum AI Skill Thresholds:
            </label>

            {activeCategory.parameters.map(param => {
              const val = sliderThresholds[param.key] || 8.0;
              return (
                <div key={param.key} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>{param.label}</span>
                    <strong style={{ color: '#ffffff' }}>≥ {val.toFixed(1)}/10</strong>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="9.8"
                    step="0.1"
                    value={val}
                    onChange={(e) => handleSliderChange(param.key, e.target.value)}
                  />
                </div>
              );
            })}
          </div>

        </aside>

        {/* Candidate Search Results */}
        <main>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
              Matched Candidates ({matchedCreators.length})
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Sorted by demonstrated skill score match
            </span>
          </div>

          {matchedCreators.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No candidates currently meet all threshold filters. Try adjusting the skill sliders to broaden your search.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {matchedCreators.map(creator => {
                const isShort = shortlisted && shortlisted[creator.id];

                return (
                  <div key={creator.id} className="glass-panel glass-panel-interactive" style={{ padding: '24px' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        <img 
                          src={creator.avatar} 
                          alt={creator.name} 
                          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1', cursor: 'pointer' }}
                          onClick={() => onSelectCreator(creator)}
                        />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 
                              style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff', cursor: 'pointer' }}
                              onClick={() => onSelectCreator(creator)}
                            >
                              {creator.name}
                            </h3>
                            <span className="tag-pill">{creator.categoryLabel}</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '4px' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={13} color="#818cf8" /> {creator.location}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={13} /> {creator.followers.toLocaleString()} Followers
                            </span>
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div className="score-badge high" style={{ fontSize: '1rem' }}>
                          <Award size={16} />
                          <span>AI Overall: {creator.overallScore}/10</span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: '700', marginTop: '4px' }}>
                          ✓ Meets Provider Criteria
                        </div>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.5' }}>
                      {creator.bio}
                    </p>

                    {/* Skill Breakdown */}
                    <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px 18px', borderRadius: '12px', marginBottom: '18px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#818cf8', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Demonstrated Skill Breakdown:
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                        {activeCategory.parameters.map(param => {
                          const score = creator.parameters[param.key] || 8.0;
                          return (
                            <div key={param.key} style={{ fontSize: '0.78rem', display: 'flex', justifyContent: 'space-between', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 10px', borderRadius: '6px' }}>
                              <span style={{ color: 'var(--text-muted)' }}>{param.label}</span>
                              <strong style={{ color: score >= 9.0 ? '#38bdf8' : '#e2e8f0' }}>{score}/10</strong>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recruiter Action Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                      <button
                        onClick={() => onToggleShortlist(creator.id)}
                        className="btn-secondary"
                        style={{ fontSize: '0.82rem', padding: '8px 16px' }}
                      >
                        <Star size={15} fill={isShort ? '#f59e0b' : 'none'} color={isShort ? '#f59e0b' : 'currentColor'} />
                        {isShort ? 'Shortlisted' : 'Shortlist Candidate'}
                      </button>

                      <button
                        onClick={() => onOpenInquiryModal(creator)}
                        className="btn-primary"
                        style={{ fontSize: '0.85rem', padding: '8px 18px', background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
                      >
                        <ShieldCheck size={16} color="#34d399" />
                        Inquire Anonymously
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
