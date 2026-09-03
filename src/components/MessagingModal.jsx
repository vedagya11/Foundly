import React, { useState } from 'react';
import { X, Send, ShieldCheck, Eye, Sparkles, UserCheck, MessageSquare } from 'lucide-react';

export default function MessagingModal({ targetCreator, isAnonymousRecruiter, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'them',
      senderName: targetCreator ? targetCreator.name : 'Rahul Sharma',
      text: targetCreator?.category === 'music'
        ? "Hi! Thanks for checking out my Kolkata acoustic vocal session. Happy to discuss any potential project or music release collabs."
        : "Hi there! Glad you liked my work profile. What kind of opportunity or project do you have in mind?",
      timestamp: '10:14 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [identityRevealed, setIdentityRevealed] = useState(!isAnonymousRecruiter);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const senderDisplayName = isAnonymousRecruiter && !identityRevealed
      ? 'Verified Music Industry Producer (Anonymous Mode)'
      : 'Vedagya (Senior Talent Producer / Recruiter)';

    const newMsg = {
      id: 'msg_' + Date.now(),
      sender: 'me',
      senderName: senderDisplayName,
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');
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
        maxWidth: '650px',
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '18px 24px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid var(--border-glass)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={targetCreator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={targetCreator?.name || 'Creator'}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
                Opportunity Inquiry to {targetCreator?.name || 'Rahul Sharma'}
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#818cf8' }}>
                {targetCreator?.categoryLabel || 'Singer & Songwriter'} • AI Skill: {targetCreator?.overallScore || 8.5}/10
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-glass)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Anonymous Mode Identity Reveal Control Banner */}
        {isAnonymousRecruiter && (
          <div style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.15))',
            borderBottom: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.78rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7dd3fc' }}>
              <ShieldCheck size={18} color="#34d399" />
              <span>
                <strong>Privacy Status:</strong> {identityRevealed ? 'Your identity is REVEALED to creator' : 'Browsing Anonymously as Verified Recruiter'}
              </span>
            </div>

            <button
              onClick={() => setIdentityRevealed(!identityRevealed)}
              style={{
                padding: '4px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(6, 182, 212, 0.5)',
                background: identityRevealed ? 'rgba(16, 185, 129, 0.25)' : 'rgba(6, 182, 212, 0.25)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {identityRevealed ? <UserCheck size={14} /> : <Eye size={14} />}
              {identityRevealed ? 'Hide Identity' : 'Reveal Identity to Creator'}
            </button>
          </div>
        )}

        {/* Messages Stream */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: 'rgba(7, 9, 14, 0.4)'
        }}>
          {messages.map(msg => {
            const isMe = msg.sender === 'me';
            return (
              <div
                key={msg.id}
                style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  marginBottom: '3px',
                  textAlign: isMe ? 'right' : 'left'
                }}>
                  {msg.senderName} • {msg.timestamp}
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '14px',
                  borderTopRightRadius: isMe ? '2px' : '14px',
                  borderTopLeftRadius: isMe ? '14px' : '2px',
                  background: isMe
                    ? 'linear-gradient(135deg, var(--primary-600), var(--accent-purple))'
                    : 'rgba(255, 255, 255, 0.08)',
                  border: isMe ? 'none' : '1px solid var(--border-glass)',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  lineHeight: '1.5'
                }}>
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Input Bar */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          gap: '12px'
        }}>
          <input
            type="text"
            placeholder="Type your project opportunity details, contract terms, or collaboration invite..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-glass)',
              borderRadius: '10px',
              padding: '10px 16px',
              color: '#ffffff',
              fontSize: '0.88rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSendMessage}
            className="btn-primary"
            style={{ padding: '10px 20px' }}
          >
            <Send size={16} />
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
