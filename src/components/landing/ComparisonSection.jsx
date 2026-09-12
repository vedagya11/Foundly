import React from 'react';
import { X, Check, ArrowRightLeft } from 'lucide-react';

export default function ComparisonSection() {
  const traditionalPoints = [
    'Followers ≠ Ability',
    'Popularity ≠ Proof',
    'Connections ≠ Potential',
    'Static PDF Resumes',
    'Keyphrase Parsing Filters'
  ];

  const foundlyPoints = [
    'Demonstrated Ability & Proof',
    'Verified Execution Evidence',
    'Skill Signal Matching',
    'Live Code, Design & Audio Output',
    'Zero Follower / Pedigree Bias'
  ];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">
          <ArrowRightLeft size={14} />
          <span>Why Foundly</span>
        </div>

        <h2 className="section-title">
          From <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>visibility</span> to <span className="gradient-text">ability.</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '600px' }}>
          Comparing how talent is evaluated today versus how Foundly changes the discovery paradigm.
        </p>
      </div>

      {/* Comparison Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        maxWidth: '860px',
        margin: '0 auto'
      }}>
        
        {/* Left: Traditional */}
        <div className="glass-panel" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-error)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            TRADITIONAL DISCOVERY
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {traditionalPoints.map((pt, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <X size={15} color="var(--color-error)" style={{ flexShrink: 0 }} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Foundly */}
        <div className="glass-panel" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '14px' }}>
            FOUNDLY APPROACH
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {foundlyPoints.map((pt, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#ffffff', fontWeight: '600' }}>
                <Check size={15} color="var(--color-success)" style={{ flexShrink: 0 }} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
