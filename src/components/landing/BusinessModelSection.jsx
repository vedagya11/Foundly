import React from 'react';
import { Check, User, Briefcase, Zap } from 'lucide-react';

export default function BusinessModelSection() {
  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div className="section-eyebrow section-eyebrow-emerald">
          <Zap size={14} />
          <span>Sustainable Model</span>
        </div>

        <h2 className="section-title">
          Simple <span className="gradient-text-cyan">Two-Tier Structure</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '600px' }}>
          Free for creators to demonstrate skill; subscription & seat-based for recruiters to discover verified talent.
        </p>
      </div>

      {/* 2 Tier Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '28px',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        
        {/* Talent Tier */}
        <div className="glass-panel" style={{
          padding: '36px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          background: 'rgba(15, 23, 42, 0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '700', fontSize: '0.85rem' }}>
              <User size={16} />
              <span>FOR TALENT</span>
            </div>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: '#34d399',
              fontFamily: 'var(--font-heading)',
              padding: '4px 12px',
              borderRadius: '99px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              FREE
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Creators can build profiles, upload work, and get evaluated without any paywalls.
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {['Build a skill profile', 'Showcase work & projects', 'Build AI skill signals', 'Get discovered by recruiters'].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#e0e7ff' }}>
                <Check size={16} color="#34d399" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Tier */}
        <div className="glass-panel" style={{
          padding: '36px',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
          boxShadow: 'var(--glow-cyan)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: '700', fontSize: '0.85rem' }}>
              <Briefcase size={16} />
              <span>FOR OPPORTUNITY PROVIDERS</span>
            </div>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: '800',
              color: '#38bdf8',
              fontFamily: 'var(--font-heading)',
              padding: '4px 12px',
              borderRadius: '99px',
              background: 'rgba(6, 182, 212, 0.15)',
              border: '1px solid rgba(6, 182, 212, 0.3)'
            }}>
              PAID
            </span>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Subscribed recruiters and organizations gain access to discovery and candidate tools.
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {['Talent discovery pipeline', 'Advanced skill search filters', 'AI candidate skill matching', 'Granular candidate evidence insights', 'Direct hiring & inquiry tools'].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#ffffff', fontWeight: '500' }}>
                <Check size={16} color="#38bdf8" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
