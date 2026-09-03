import React from 'react';
import { Bookmark, Star, MapPin, Users, Award, ShieldCheck, Trash2 } from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function SavedTalent({ shortlisted, onToggleShortlist, onOpenInquiryModal, onSelectCreator }) {
  const shortlistedCreators = CREATORS.filter(c => shortlisted && shortlisted[c.id]);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px 28px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(245, 158, 11, 0.15))', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #f59e0b, #fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bookmark size={24} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Saved & Shortlisted Talent</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Opportunity Provider workspace for tracking candidate shortlists and sending inquiries.
            </p>
          </div>
        </div>
      </div>

      {shortlistedCreators.length === 0 ? (
        <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Star size={36} color="var(--text-dim)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>No Shortlisted Candidates Yet</h3>
          <p style={{ fontSize: '0.85rem', maxWidth: '440px', margin: '0 auto' }}>
            Browse the Talent Discovery tab and click "Shortlist Candidate" to save promising creators to your recruiter shortlist.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {shortlistedCreators.map(creator => (
            <div key={creator.id} className="glass-panel glass-panel-interactive" style={{ padding: '22px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '12px', cursor: 'pointer' }} onClick={() => onSelectCreator(creator)}>
                  <img src={creator.avatar} alt={creator.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>{creator.name}</h3>
                    <span className="tag-pill" style={{ marginTop: '2px', display: 'inline-block' }}>{creator.categoryLabel}</span>
                  </div>
                </div>

                <button
                  onClick={() => onToggleShortlist(creator.id)}
                  style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '4px' }}
                  title="Remove from Shortlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                <span>📍 {creator.location}</span>
                <strong style={{ color: '#38bdf8' }}>AI Rating: {creator.overallScore}/10</strong>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.4' }}>
                {creator.bio}
              </p>

              <button
                onClick={() => onOpenInquiryModal(creator)}
                className="btn-primary"
                style={{ width: '100%', padding: '8px 14px', fontSize: '0.82rem', background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}
              >
                <ShieldCheck size={16} color="#34d399" />
                Send Opportunity Inquiry
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
