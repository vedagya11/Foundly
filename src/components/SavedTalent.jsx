import React, { useState } from 'react';
import { Bookmark, Star, MapPin, ShieldCheck, Trash2, Eye, User, Calendar } from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function SavedTalent({ shortlisted, onToggleShortlist, onOpenInquiryModal, onSelectCreator }) {
  const shortlistedCreators = CREATORS.filter(c => shortlisted && shortlisted[c.id]);
  const [activeEvidenceId, setActiveEvidenceId] = useState(null);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: 'var(--space-20)',
        marginBottom: 'var(--space-24)',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '9px',
            background: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bookmark size={20} color="var(--color-warning)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800' }}>Saved & Shortlisted Talent</h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Opportunity Provider workspace for tracking candidate shortlists, evidence, and inquiries.
            </p>
          </div>
        </div>
      </div>

      {shortlistedCreators.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <Star size={32} color="var(--color-warning)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>No Shortlisted Candidates Yet</h3>
          <p style={{ fontSize: '0.82rem', maxWidth: '420px', margin: '0 auto' }}>
            Browse Talent Discovery and click "Save" to build your evidence-backed recruiter shortlist.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-16)' }}>
          {shortlistedCreators.map((creator, idx) => {
            const matchPct = 94 - idx * 2;
            const isEvidenceActive = activeEvidenceId === creator.id;

            return (
              <div key={creator.id} className="glass-panel" style={{ padding: 'var(--space-20)' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => onSelectCreator(creator)}>
                    <img 
                      src={creator.avatar} 
                      alt={creator.name} 
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} 
                    />
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>{creator.name}</h3>
                      <span className="score-badge" style={{ fontSize: '0.7rem', padding: '2px 6px', marginTop: '2px' }}>{creator.categoryLabel}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleShortlist(creator.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', padding: '4px' }}
                    title="Remove from Shortlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Candidate Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>MATCH</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                      {matchPct}% MATCH
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>DEMONSTRATED SCORE</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                      {creator.overallScore} <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>/ 10</span>
                    </div>
                  </div>
                </div>

                {/* Top Strengths */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    TOP DEMONSTRATED STRENGTHS
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div>• Top-tier pitch accuracy & acoustic sustain stability</div>
                    <div>• Verified zero memory leaks in production code</div>
                  </div>
                </div>

                {/* Saved Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                  <Calendar size={12} />
                  <span>Saved Sep 12, 2026</span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <button className="btn-evidence-trigger" onClick={() => setActiveEvidenceId(isEvidenceActive ? null : creator.id)}>
                    <Eye size={13} />
                    <span>{isEvidenceActive ? 'Hide Evidence' : 'View Evidence →'}</span>
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => onSelectCreator(creator)} className="btn-secondary" style={{ fontSize: '0.78rem', padding: '6px 10px' }}>
                      <User size={13} />
                      View Profile
                    </button>

                    <button onClick={() => onOpenInquiryModal(creator)} className="btn-primary" style={{ fontSize: '0.78rem', padding: '6px 12px' }}>
                      <ShieldCheck size={13} />
                      Contact
                    </button>
                  </div>
                </div>

                {/* Evidence Drawer */}
                {isEvidenceActive && (
                  <div className="evidence-card" style={{ marginTop: '10px' }}>
                    <div className="evidence-title">EVIDENCE PROOF POINTS</div>
                    <div className="evidence-list">
                      <div className="evidence-item">• Verified performance in submitted work sample</div>
                      <div className="evidence-item">• Baseline requirement match verified by Foundly AI</div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
