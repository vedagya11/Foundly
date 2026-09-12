import React from 'react';
import { User, Briefcase, ArrowRight, UserPlus } from 'lucide-react';

export default function PlatformSection({ onOpenOnboarding, onDiscoverTalent }) {
  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">
          <span>Two-Sided Infrastructure</span>
        </div>

        <h2 className="section-title">
          Built for <span className="gradient-text">Creators</span> & <span className="gradient-text">Opportunity Providers</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '600px' }}>
          Empowering creators to get recognized for their work, while equipping recruiters to hire on proof.
        </p>
      </div>

      {/* Two Side-by-Side Panels */}
      <div className="grid-2-col">
        
        {/* Panel 1: FOR TALENT */}
        <div className="glass-panel" style={{ padding: 'var(--space-32)', background: 'var(--bg-surface)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: '700',
            marginBottom: '14px'
          }}>
            <User size={14} />
            <span>FOR TALENT</span>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
            Show what you can do.
          </h3>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>• Create your profile</div>
            <div>• Showcase live work & projects</div>
            <div>• Build skill evidence</div>
            <div>• Get discovered by recruiters</div>
            <div>• Find high-impact opportunities</div>
          </div>

          <button onClick={onOpenOnboarding} className="btn-primary">
            <UserPlus size={16} />
            <span>Join as Talent</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Panel 2: FOR RECRUITERS */}
        <div className="glass-panel" style={{ padding: 'var(--space-32)', background: 'var(--bg-surface)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(34, 197, 94, 0.12)',
            color: 'var(--color-success)',
            fontSize: '0.75rem',
            fontWeight: '700',
            marginBottom: '14px'
          }}>
            <Briefcase size={14} />
            <span>FOR OPPORTUNITY PROVIDERS</span>
          </div>

          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px' }}>
            Discover who can do it.
          </h3>

          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>• Define skill requirements</div>
            <div>• Discover matching talent</div>
            <div>• Review evidence proof points</div>
            <div>• Shortlist candidates</div>
            <div>• Contact verified creators directly</div>
          </div>

          <button onClick={onDiscoverTalent} className="btn-secondary">
            <Briefcase size={16} />
            <span>Discover Talent</span>
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
