import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, UserPlus, Eye } from 'lucide-react';

export default function HeroSection({ onOpenOnboarding, onExplore }) {
  return (
    <section className="landing-section" style={{ paddingTop: '20px' }}>
      <div className="hero-grid">
        
        {/* Left Column: Messaging & CTAs */}
        <div>
          <div className="section-eyebrow">
            <span>Skill-based Talent Infrastructure</span>
          </div>

          <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '18px' }}>
            Talent deserves to be discovered by <span className="gradient-text">what it can do.</span>
          </h1>

          <p className="section-subtitle" style={{ marginBottom: '24px' }}>
            Foundly helps opportunity providers discover talent through demonstrated skills and evidence — not followers or personal connections.
          </p>

          {/* Brand Tagline Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            marginBottom: '28px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-indigo)' }}></span>
            <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
              beyond followers. beyond connections.
            </span>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenOnboarding}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.95rem' }}
            >
              <UserPlus size={16} />
              <span>Join Foundly</span>
              <ArrowRight size={16} />
            </button>

            <button 
              onClick={onExplore}
              className="btn-secondary"
              style={{ padding: '12px 20px', fontSize: '0.95rem' }}
            >
              <Eye size={16} />
              <span>Explore Talent</span>
            </button>
          </div>

          {/* Key Differentiator Badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>Demonstrated Work</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Proven execution proof</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-success)' }}>Skill Signals</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Category benchmarks</div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }}></div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#a5b4fc' }}>Zero Bias</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Beyond followers</div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Product Loop Demonstration Mockup */}
        <div>
          <div className="glass-panel" style={{
            padding: 'var(--space-24)',
            background: 'var(--bg-surface)'
          }}>
            {/* Header bar of mockup */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-color)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-indigo)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  color: '#ffffff'
                }}>
                  AM
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>Aarav Mehta</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>AI/ML Engineer Candidate</div>
                </div>
              </div>

              <div style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(34, 197, 94, 0.12)',
                color: 'var(--color-success)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                <span>Verified Signal</span>
              </div>
            </div>

            {/* Core Loop Flow Pill */}
            <div style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '12px'
            }}>
              WORK → SKILLS → EVIDENCE → MATCH
            </div>

            {/* Skill Scores Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', borderRadius: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Python</span>
                  <strong style={{ color: 'var(--color-success)' }}>9.1</strong>
                </div>
                <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '91%', height: '100%', background: 'var(--color-success)' }} />
                </div>
              </div>

              <div style={{ padding: '10px', borderRadius: '6px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Machine Learning</span>
                  <strong style={{ color: '#ffffff' }}>8.7</strong>
                </div>
                <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '87%', height: '100%', background: 'var(--primary-indigo)' }} />
                </div>
              </div>
            </div>

            {/* Evidence Card */}
            <div className="evidence-card" style={{ marginTop: 0 }}>
              <div className="evidence-title">
                <CheckCircle2 size={13} />
                <span>EVIDENCE DETECTED FROM SUBMITTED WORK</span>
              </div>
              <div className="evidence-list" style={{ fontSize: '0.78rem' }}>
                <div className="evidence-item">• Implemented computer vision pipeline using OpenCV & Python</div>
                <div className="evidence-item">• Optimized inference throughput on custom dataset</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
