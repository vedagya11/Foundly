import React from 'react';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';

export default function VisionSection() {
  const flywheelNodes = [
    { title: 'WORK', color: '#38bdf8', desc: 'Raw Creations & Projects' },
    { title: 'SKILLS', color: '#818cf8', desc: 'Extracted Capability Signals' },
    { title: 'EVIDENCE', color: '#c084fc', desc: 'Verifiable Proof Points' },
    { title: 'OPPORTUNITIES', color: '#34d399', desc: 'Targeted Recruiter Match' },
    { title: 'OUTCOMES', color: '#fbbf24', desc: 'Successful Talent Placement' }
  ];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
        <div className="section-eyebrow">
          <Layers size={14} />
          <span>Long-Term Product Vision</span>
        </div>

        <h2 className="section-title">
          The Talent <span className="gradient-text">Intelligence Layer</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '680px' }}>
          Foundly aims to build an intelligence layer connecting demonstrated work to skills and opportunities.
        </p>
      </div>

      {/* Moat Flywheel Container */}
      <div className="glass-panel" style={{
        padding: '36px 24px',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {flywheelNodes.map((node, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                textAlign: 'center',
                padding: '16px 20px',
                borderRadius: '14px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${node.color}40`,
                flex: '1',
                minWidth: '150px'
              }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '800',
                  color: node.color,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '0.05em',
                  marginBottom: '4px'
                }}>
                  {node.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {node.desc}
                </div>
              </div>

              {idx < flywheelNodes.length - 1 && (
                <div style={{ color: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center' }}>
                  <ArrowRight size={18} color="#818cf8" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
