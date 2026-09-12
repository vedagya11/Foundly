import React, { useState } from 'react';
import { ShieldCheck, CheckSquare, Eye, Code2, Layers, Database, FileCode } from 'lucide-react';

export default function EvidenceSection() {
  const [showEvidence, setShowEvidence] = useState(true);

  const evidenceItems = [
    { icon: Code2, title: 'Built Flask REST API', desc: 'Modular backend endpoints with structured request validation and JWT auth.' },
    { icon: Layers, title: 'Implemented ML Pipeline', desc: 'Data preprocessing, feature engineering, and model inference loops.' },
    { icon: Database, title: 'Integrated MySQL Database', desc: 'Relational schema design, optimized indexing, and ORM query mapping.' },
    { icon: FileCode, title: 'Documented Project Architecture', desc: 'Comprehensive API documentation, setup guide, and system diagrams.' }
  ];

  return (
    <section className="landing-section">
      <div className="grid-2-col" style={{ alignItems: 'center' }}>
        
        {/* Left Column: Copy */}
        <div>
          <div className="section-eyebrow">
            <ShieldCheck size={14} />
            <span>The Foundly Difference</span>
          </div>

          <h2 className="section-title">
            Built around <span className="gradient-text">evidence.</span>
          </h2>

          <p className="section-subtitle" style={{ marginBottom: '20px' }}>
            A skill score alone is meaningless without proof. Foundly connects every skill signal directly to the verified work that demonstrates it.
          </p>

          <div style={{
            padding: '16px',
            borderRadius: '10px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            <strong style={{ color: '#ffffff' }}>Don't just trust the score. See the evidence.</strong><br />
            Recruiters can inspect the actual code, designs, or performance output backing every score.
          </div>
        </div>

        {/* Right Column: Visual Evidence Breakdown Card */}
        <div>
          <div className="glass-panel" style={{ padding: 'var(--space-24)', background: 'var(--bg-surface)' }}>
            
            {/* Score Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-color)',
              marginBottom: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SKILL SIGNAL</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>Python Capability</div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>9.1</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>/ 10</span>
              </div>
            </div>

            <button 
              className="btn-evidence-trigger" 
              onClick={() => setShowEvidence(!showEvidence)}
              style={{ marginBottom: '14px' }}
            >
              <Eye size={14} />
              <span>{showEvidence ? 'Hide Evidence Breakdown' : 'View Evidence →'}</span>
            </button>

            {showEvidence && (
              <div className="evidence-card" style={{ marginTop: 0 }}>
                <div className="evidence-title">
                  <CheckSquare size={14} />
                  <span>LINKED DEMONSTRATED EVIDENCE (4 PROOF POINTS)</span>
                </div>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {evidenceItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span>•</span>
                      <div>
                        <strong style={{ color: '#ffffff' }}>{item.title}:</strong> {item.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
