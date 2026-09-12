import React, { useState } from 'react';
import { Search, Send, ShieldCheck, Eye, UserCheck, MessageSquare, CheckCircle2 } from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function MessagesView({ 
  userRole, 
  isAnonymousRecruiter, 
  activeConversations = [], 
  onSendMessage 
}) {
  const initialThreads = [
    {
      id: 'conv-rahul',
      creator: CREATORS[0], // Rahul Sharma
      unread: true,
      lastTime: '10:14 AM',
      lastMessage: "Thank you! I'd be interested in hearing more about the acoustic project.",
      messages: [
        {
          id: 'm1',
          sender: 'provider',
          senderName: 'Verified Opportunity Provider',
          text: "Hi Rahul, we came across your acoustic performance on Foundly and were impressed by your pitch accuracy (9.1/10) and vocal expression.",
          timestamp: '10:10 AM'
        },
        {
          id: 'm2',
          sender: 'creator',
          senderName: 'Rahul Sharma',
          text: "Thank you! I'd be interested in hearing more about the acoustic project.",
          timestamp: '10:14 AM'
        }
      ]
    },
    {
      id: 'conv-ananya',
      creator: CREATORS[1], // Ananya Roy
      unread: false,
      lastTime: 'Yesterday',
      lastMessage: "I have uploaded my design system documentation on my Foundly profile.",
      messages: [
        {
          id: 'm3',
          sender: 'provider',
          senderName: 'Verified Opportunity Provider',
          text: "Hi Ananya, your spatial glassmorphism UI breakdown is stellar. Would you be open for a senior contract role?",
          timestamp: 'Yesterday 4:30 PM'
        },
        {
          id: 'm4',
          sender: 'creator',
          senderName: 'Ananya Roy',
          text: "I have uploaded my design system documentation on my Foundly profile.",
          timestamp: 'Yesterday 5:00 PM'
        }
      ]
    },
    {
      id: 'conv-vikram',
      creator: CREATORS[2], // Vikram Mehta
      unread: false,
      lastTime: '2 days ago',
      lastMessage: "Happy to demo the WebAssembly audio DSP kernel anytime.",
      messages: [
        {
          id: 'm5',
          sender: 'creator',
          senderName: 'Vikram Mehta',
          text: "Happy to demo the WebAssembly audio DSP kernel anytime.",
          timestamp: '2 days ago'
        }
      ]
    }
  ];

  const [threads, setThreads] = useState(initialThreads);
  const [selectedThreadId, setSelectedThreadId] = useState(initialThreads[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [identityRevealed, setIdentityRevealed] = useState(!isAnonymousRecruiter);
  const [showSnapshotEvidence, setShowSnapshotEvidence] = useState(false);

  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];
  const activeCreator = activeThread.creator;

  const handleSend = () => {
    if (!inputText.trim()) return;

    const senderRole = userRole === 'provider' ? 'provider' : 'creator';
    const senderDisplayName = userRole === 'provider'
      ? (isAnonymousRecruiter && !identityRevealed ? 'Verified Opportunity Provider' : 'Vedagya (Senior Talent Producer)')
      : 'Rahul Sharma';

    const newMsg = {
      id: 'm_' + Date.now(),
      sender: senderRole,
      senderName: senderDisplayName,
      text: inputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unread: false,
          lastTime: newMsg.timestamp,
          lastMessage: newMsg.text,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));

    setInputText('');
  };

  const filteredThreads = threads.filter(t => 
    t.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.creator.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      
      {/* Messages Container */}
      <div className="glass-panel" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 320px) 1fr',
        height: '660px',
        overflow: 'hidden',
        padding: 0
      }}>
        
        {/* LEFT SIDEBAR: Threads List */}
        <aside style={{
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-surface)'
        }}>
          
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={18} color="var(--primary-indigo)" />
              Opportunity Messages
            </h3>

            <div style={{ position: 'relative' }}>
              <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '9px' }} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '7px 10px 7px 30px',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredThreads.map(thread => {
              const isSelected = thread.id === selectedThreadId;
              const creator = thread.creator;

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--primary-indigo)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {creator.name}
                        </h4>
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{thread.lastTime}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Score {creator.overallScore} • {creator.categoryLabel}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </aside>

        {/* RIGHT PANEL: Chat Stream & Candidate Snapshot Banner */}
        <main style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
          
          {/* CANDIDATE SNAPSHOT BANNER ABOVE CONVERSATION */}
          <div style={{
            padding: '12px 20px',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img
                src={activeCreator.avatar}
                alt={activeCreator.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '800', color: '#ffffff' }}>{activeCreator.name}</span>
                  <span className="score-badge" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>{activeCreator.categoryLabel}</span>
                </div>

                {/* Candidate Metric Line */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span>Demonstrated Skill Score: <strong style={{ color: 'var(--color-success)' }}>{activeCreator.overallScore} / 10</strong></span>
                  <span>|</span>
                  <span>Pitch Accuracy: <strong>9.1</strong></span>
                  <span>|</span>
                  <span>Voice Quality: <strong>8.7</strong></span>
                  <span>|</span>
                  <span>Expression: <strong>8.4</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="btn-evidence-trigger" onClick={() => setShowSnapshotEvidence(!showSnapshotEvidence)}>
                <Eye size={13} />
                <span>View Evidence →</span>
              </button>

              {userRole === 'provider' && isAnonymousRecruiter && (
                <button
                  onClick={() => setIdentityRevealed(!identityRevealed)}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                >
                  {identityRevealed ? <UserCheck size={13} color="var(--color-success)" /> : <ShieldCheck size={13} />}
                  {identityRevealed ? 'Revealed' : 'Reveal Identity'}
                </button>
              )}
            </div>
          </div>

          {/* Evidence Drawer for Candidate Snapshot */}
          {showSnapshotEvidence && (
            <div className="evidence-card" style={{ margin: '12px var(--space-20) 0 var(--space-20)' }}>
              <div className="evidence-title">
                <CheckCircle2 size={14} />
                <span>EVIDENCE SNAPSHOT FOR {activeCreator.name.toUpperCase()}</span>
              </div>
              <div className="evidence-list">
                <div className="evidence-item">• Verified pitch accuracy stability ≥9.1 across acoustic dataset</div>
                <div className="evidence-item">• Zero red-flag vocal strain or artificial tuning detected</div>
              </div>
            </div>
          )}

          {/* Messages Scroll Stream */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {activeThread.messages.map(msg => {
              const isUserRoleMe = (userRole === 'provider' && msg.sender === 'provider') || (userRole === 'creator' && msg.sender === 'creator');

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isUserRoleMe ? 'flex-end' : 'flex-start',
                    maxWidth: '75%'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '3px', textAlign: isUserRoleMe ? 'right' : 'left' }}>
                    {msg.senderName} • {msg.timestamp}
                  </div>
                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '12px',
                    borderTopRightRadius: isUserRoleMe ? '2px' : '12px',
                    borderTopLeftRadius: isUserRoleMe ? '12px' : '2px',
                    background: isUserRoleMe ? 'var(--primary-gradient)' : 'var(--bg-elevated)',
                    border: isUserRoleMe ? 'none' : '1px solid var(--border-color)',
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

          {/* Message Input Bar */}
          <div style={{
            padding: '14px 20px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              placeholder={`Write message to ${activeCreator.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{
                flex: 1,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '9px 14px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button onClick={handleSend} className="btn-primary" style={{ padding: '9px 18px' }}>
              <Send size={15} />
              Send
            </button>
          </div>

        </main>

      </div>
    </div>
  );
}
