import React, { useState } from 'react';
import { Cpu, ShieldCheck, CheckCircle2, Play, Info, Sparkles } from 'lucide-react';

export default function AIDemoSection() {
  const [analyzed, setAnalyzed] = useState(true);

  const skills = [
    { name: 'Python', score: 91, color: 'var(--color-success)' },
    { name: 'Machine Learning', score: 87, color: 'var(--primary-indigo)' },
    { name: 'Computer Vision', score: 88, color: 'var(--primary-purple)' },
    { name: 'Problem Solving', score: 94, color: 'var(--color-success)' }
  ];

  const evidenceList = [
    'Implemented image-processing pipeline',
    'Built ML model for facial metric recognition',
    'Used Python / OpenCV libraries effectively',
    'Evaluated model performance and optimized latency'
  ];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">
          <Cpu size={14} />
          <span>Interactive Product Showcase</span>
        </div>

        <h2 className="section-title">
          Show the <span className="gradient-text">AI Skill Analysis</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '640px' }}>
          See how Foundly turns raw project submissions into granular skill benchmarks and extracted evidence.
        </p>
      </div>

      {/* Main Interactive Demo Box */}
      <div className="glass-panel" style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: 'var(--space-32)',
        background: 'var(--bg-surface)'
      }}>

        {/* Demo Label Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="score-badge high" style={{ fontSize: '0.78rem' }}>
              <ShieldCheck size={14} />
              AI SKILL ASSESSMENT
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-elevated)', padding: '3px 10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              PRODUCT DEMO / SAMPLE DATA
            </span>
          </div>

          <button 
            onClick={() => setAnalyzed(!analyzed)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          >
            <Play size={12} color="var(--primary-indigo)" />
            <span>{analyzed ? 'Re-run AI Analysis' : 'Show Analysis Result'}</span>
          </button>
        </div>

        {/* Candidate & Project Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          background: 'var(--bg-elevated)',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#ffffff' }}>Aarav Mehta</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Project: <strong style={{ color: 'var(--primary-purple)' }}>Computer Vision Attendance System</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>DEMONSTRATED SKILL SCORE</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
              9.0 <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ 10</span>
            </div>
          </div>
        </div>

        {/* Skill Scores Grid */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
            EXTRACTED SKILL BENCHMARKS
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
            {skills.map((s, idx) => (
              <div key={idx} style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                position: 'relative'
              }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  {s.name}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: s.color, fontFamily: 'var(--font-heading)', marginBottom: '8px' }}>
                  {analyzed ? s.score : '...'}
                </div>

                <div style={{ height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    width: analyzed ? `${s.score}%` : '0%',
                    height: '100%',
                    background: s.color,
                    transition: 'width 0.8s ease-in-out'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evidence Detected Section */}
        <div className="evidence-card" style={{ padding: '20px' }}>
          <div className="evidence-title">
            <Sparkles size={16} color="var(--color-success)" />
            <span>EVIDENCE DETECTED IN WORK SUBMISSION</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {evidenceList.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} color="var(--color-success)" style={{ flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer footer */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Info size={13} />
          <span>Demonstration widget based on representative sample data.</span>
        </div>

      </div>
    </section>
  );
}
