import React, { useState } from 'react';
import { X, Send, ShieldCheck, Briefcase, FileText, CheckCircle2 } from 'lucide-react';

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
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel animate-scale-up" style={{
        width: '100%',
        maxWidth: '560px',
        padding: '28px',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Briefcase size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Contact {targetCreator?.name}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {isAnonymousRecruiter ? 'Prototype: Your identity remains hidden while browsing until you choose to reveal it.' : 'Direct Opportunity Provider Outreach'}
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Creator Snapshot Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-glass)',
          marginBottom: '20px'
        }}>
          <img
            src={targetCreator?.avatar}
            alt={targetCreator?.name}
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>{targetCreator?.name}</div>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8' }}>{targetCreator?.categoryLabel} • AI Score {targetCreator?.overallScore}/10</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Opportunity Category / Project Type:
            </label>
            <select
              value={opportunityType}
              onChange={(e) => setOpportunityType(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '0.88rem',
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
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '6px' }}>
              Initial Inquiry Message:
            </label>
            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-glass)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#ffffff',
                fontSize: '0.88rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Privacy Note */}
          <div style={{
            fontSize: '0.75rem',
            color: '#a7f3d0',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} color="#34d399" />
            <span>
              {isAnonymousRecruiter ? 'Your identity is hidden as "Verified Opportunity Provider". You can reveal your identity inside Messages at any time.' : 'Sending as your public profile.'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ background: 'linear-gradient(135deg, #06b6d4, #6366f1)' }}>
              <Send size={16} />
              Send Opportunity Inquiry
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
