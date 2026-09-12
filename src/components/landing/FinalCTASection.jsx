import React from 'react';
import { ArrowRight, UserPlus } from 'lucide-react';

export default function FinalCTASection({ onOpenOnboarding }) {
  return (
    <section className="landing-section" style={{ paddingBottom: '32px' }}>
      <div className="glass-panel" style={{
        padding: 'var(--space-48) var(--space-24)',
        textAlign: 'center',
        background: 'var(--bg-surface)'
      }}>
        <h2 className="section-title" style={{ fontSize: '2.8rem', maxWidth: '720px', margin: '0 auto 12px auto' }}>
          Your work should <span className="gradient-text">speak for itself.</span>
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          marginBottom: '28px'
        }}>
          beyond followers. beyond connections.
        </p>

        <button 
          onClick={onOpenOnboarding}
          className="btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem' }}
        >
          <UserPlus size={18} />
          <span>Join Foundly</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
