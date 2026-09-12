import React, { useState } from 'react';
import { X, Send, ShieldCheck, Briefcase } from 'lucide-react';

export default function InquiryModal({ targetCreator, isAnonymousRecruiter, onSendInquiry, onClose }) {
  const [opportunityType, setOpportunityType] = useState('Music Production / Vocal Performance');
  const [messageText, setMessageText] = useState(
    `Hi ${targetCreator?.name || 'Rahul'}, we came across your work on Foundly and were impressed by your demonstrated AI skill insights (Pitch Accuracy 9.1/10). We have an upcoming project opportunity and would like to connect!`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    onSendInquiry({
      creator: targetCreator,
      opportunityType,
      messageText: messageText.trim(),
      isAnonymous: isAnonymousRecruiter
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '520px',
        padding: 'var(--space-24)',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-md)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Briefcase size={18} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>Contact {targetCreator?.name}</h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {isAnonymousRecruiter ? 'Identity remains hidden while browsing until you reveal it.' : 'Direct Opportunity Provider Outreach'}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Creator Snapshot Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 14px',
          borderRadius: '8px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-color)',
          marginBottom: '16px'
        }}>
          <img
            src={targetCreator?.avatar}
            alt={targetCreator?.name}
            style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff' }}>{targetCreator?.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{targetCreator?.categoryLabel} • Demonstrated Score {targetCreator?.overallScore}/10</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              OPPORTUNITY TYPE
            </label>
            <select
              value={opportunityType}
              onChange={(e) => setOpportunityType(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            >
              <option value="Music Production / Vocal Performance">Music Production / Vocal Performance</option>
              <option value="UI/UX Product Design Contract">UI/UX Product Design Contract</option>
              <option value="Software Architecture / Rust Dev Role">Software Architecture / Rust Dev Role</option>
              <option value="Creative Studio Collaboration">Creative Studio Collaboration</option>
              <option value="General Opportunity Inquiry">General Opportunity Inquiry</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '4px' }}>
              INITIAL MESSAGE
            </label>
            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '8px 12px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Privacy Note */}
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-success)',
            background: 'rgba(34, 197, 94, 0.1)',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <ShieldCheck size={15} color="var(--color-success)" />
            <span>
              {isAnonymousRecruiter ? 'Your identity is hidden as "Verified Opportunity Provider".' : 'Sending as public profile.'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>
              <Send size={15} />
              Send Inquiry
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
