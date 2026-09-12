import React from 'react';
import { Globe, Cpu, Lightbulb, Sparkles } from 'lucide-react';

export default function WhyNowSection() {
  return (
    <section className="landing-section">
      <div className="glass-panel" style={{
        padding: '48px 40px',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 27, 75, 0.5))',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
      }}>
        
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-eyebrow">
            <Lightbulb size={14} />
            <span>Market Evolution & Narrative</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '24px', lineHeight: '1.2' }}>
            The internet created a <span style={{ color: '#fb7185' }}>visibility economy</span>.<br />
            AI can create an <span className="gradient-text">ability economy</span>.
          </h2>

          <div style={{
            fontSize: '1.05rem',
            color: 'var(--text-muted)',
            lineHeight: '1.8',
            display: 'grid',
            gap: '20px',
            textAlign: 'left'
          }}>
            <p>
              Over the past decade, social media, open-source platforms, design portfolios, and content ecosystems enabled millions of creators and developers to build and share extraordinary work online.
            </p>
            <p>
              However, traditional hiring and opportunity discovery mechanisms failed to evolve. Companies still filter millions of applicants using shallow keyphrase matching on resumes, university pedigree, or follower engagement metrics.
            </p>
            <p style={{
              color: '#ffffff',
              fontWeight: '600',
              padding: '16px 20px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderLeft: '4px solid #6366f1'
            }}>
              Foundly leverages modern multimodal AI to bridge this fundamental gap—parsing complex digital output directly into verifiable skill signals so that anyone, anywhere can be discovered based on capability.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
