import React from 'react';
import { Users, FileText, Share2, Sparkles, XCircle } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Followers ≠ Ability',
      description: 'Social reach does not necessarily represent capability. Thousands of quiet builders create incredible work with zero social following.'
    },
    {
      title: 'Popularity ≠ Proof',
      description: 'Algorithm engagement favors flashiness over substance. A resume tells you what someone claims, not what they can execute.'
    },
    {
      title: 'Connections ≠ Potential',
      description: 'Great talent remains invisible without legacy personal connections. Opportunity providers miss top candidates hidden outside old networks.'
    }
  ];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">
          <XCircle size={14} />
          <span>The Traditional Discovery Gap</span>
        </div>

        <h2 className="section-title">
          Visibility isn't <span className="gradient-text">ability.</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '620px' }}>
          Traditional talent discovery relies heavily on legacy signals that obscure real capability.
        </p>
      </div>

      {/* Side-by-Side DEMO DATA Contrast Box */}
      <div className="glass-panel" style={{
        maxWidth: '800px',
        margin: '0 auto 40px auto',
        padding: 'var(--space-24)',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            DEMONSTRATION CASE STUDY
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'var(--bg-elevated)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
            DEMO DATA
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>TRADITIONAL SOCIAL SIGNAL</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', margin: '4px 0' }}>
              300 FOLLOWERS
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rahul from Kolkata • Zero industry connections</div>
          </div>

          <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-success)', fontWeight: '700', textTransform: 'uppercase' }}>FOUNDLY DEMONSTRATED SIGNAL</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)', margin: '4px 0' }}>
              9.1 / 10 DEMONSTRATED SKILL
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Verified acoustic pitch stability & natural resonance</div>
          </div>
        </div>
      </div>

      {/* 3 Problem Cards Grid */}
      <div className="grid-3-col">
        {problems.map((p, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '10px', color: '#ffffff' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              {p.description}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}
