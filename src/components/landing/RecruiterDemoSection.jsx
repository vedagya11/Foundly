import React, { useState } from 'react';
import { Briefcase, Eye, Filter } from 'lucide-react';

export default function RecruiterDemoSection({ onNavigateToDiscovery }) {
  const [selectedTags, setSelectedTags] = useState(['Python', 'Machine Learning', 'Problem Solving']);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      if (selectedTags.length > 1) {
        setSelectedTags(selectedTags.filter(t => t !== tag));
      }
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const availableTags = ['Python', 'Machine Learning', 'Problem Solving', 'Computer Vision', 'UI/UX Design'];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div className="section-eyebrow">
          <Briefcase size={14} />
          <span>Opportunity Provider Experience</span>
        </div>

        <h2 className="section-title">
          Discover Ability, <span className="gradient-text">Not Just Profiles</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '640px' }}>
          Filter top talent by verified skill requirements and inspect proof points instead of parsing static resumes.
        </p>
      </div>

      {/* Recruiter Search Card Mockup */}
      <div className="glass-panel" style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: 'var(--space-32)',
        background: 'var(--bg-surface)'
      }}>

        {/* Filter Input Header */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--primary-purple)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={15} />
              FIND TALENT WITH DEMONSTRATED SKILLS:
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              SAMPLE RECRUITER SEARCH
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availableTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    border: `1px solid ${active ? 'var(--primary-purple)' : 'var(--border-color)'}`,
                    background: active ? 'rgba(168, 85, 247, 0.18)' : 'var(--bg-elevated)',
                    color: active ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {active ? `✓ ${tag}` : `+ ${tag}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Candidate Match Result Card */}
        <div style={{
          padding: 'var(--space-24)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: '1fr 220px',
          gap: '24px',
          alignItems: 'center'
        }}>
          {/* Candidate Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'var(--primary-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.95rem',
                color: '#ffffff'
              }}>
                RS
              </div>

              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>Riya Sharma</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  AI/ML • Python • Computer Vision
                </div>
              </div>
            </div>

            {/* WHY THIS CANDIDATE MATCHED TABLE */}
            <div style={{
              background: 'var(--bg-surface)',
              padding: '12px 14px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--color-success)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                WHY THIS CANDIDATE MATCHED
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', gap: '8px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', paddingBottom: '4px', borderBottom: '1px solid var(--border-color)' }}>
                <span>Skill</span>
                <span style={{ textAlign: 'center' }}>Requirement</span>
                <span style={{ textAlign: 'right' }}>Candidate</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px', fontSize: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Pitch Accuracy</span>
                  <span style={{ textAlign: 'center', color: 'var(--text-muted)' }}>≥ 8.5</span>
                  <span style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: '700' }}>9.1</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Voice Quality</span>
                  <span style={{ textAlign: 'center', color: 'var(--text-muted)' }}>≥ 8.5</span>
                  <span style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: '700' }}>8.7</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Expression</span>
                  <span style={{ textAlign: 'center', color: 'var(--text-muted)' }}>≥ 8.0</span>
                  <span style={{ textAlign: 'right', color: 'var(--color-success)', fontWeight: '700' }}>8.4</span>
                </div>
              </div>
            </div>
          </div>

          {/* Match Score & CTA Column */}
          <div style={{
            textAlign: 'center',
            padding: '20px 16px',
            borderRadius: '12px',
            background: 'rgba(34, 197, 94, 0.08)',
            border: '1px solid rgba(34, 197, 94, 0.25)'
          }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '700' }}>
              SKILL MATCH
            </div>

            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)', margin: '4px 0' }}>
              94% MATCH
            </div>

            <button
              onClick={onNavigateToDiscovery}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '8px 12px',
                fontSize: '0.8rem',
                marginTop: '8px'
              }}
            >
              <Eye size={13} />
              <span>View Evidence →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
