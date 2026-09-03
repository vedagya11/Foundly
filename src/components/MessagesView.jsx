import React, { useState } from 'react';
import { 
  Search, Send, ShieldCheck, Eye, EyeOff, UserCheck, 
  Award, Sparkles, MessageSquare, Check, CheckCheck 
} from 'lucide-react';
import { CREATORS } from '../data/mockData';

export default function MessagesView({ 
  userRole, 
  isAnonymousRecruiter, 
  activeConversations = [], 
  onSendMessage 
}) {
  // Pre-seed conversation threads if none passed
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

  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];

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
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Messages 2-Pane Box */}
      <div className="glass-panel" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 340px) 1fr',
        height: '680px',
        overflow: 'hidden',
        padding: 0
      }}>
        
        {/* LEFT SIDEBAR: Conversation Threads List */}
        <aside style={{
          borderRight: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(11, 15, 25, 0.6)'
        }}>
          
          {/* Header */}
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="#818cf8" />
              Opportunity Messages
            </h3>

            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '9px' }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '8px',
                  padding: '7px 12px 7px 32px',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Conversation List Stream */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredThreads.map(thread => {
              const isSelected = thread.id === selectedThreadId;
              const creator = thread.creator;

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  style={{
                    padding: '14px 18px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {creator.name}
                        </h4>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{thread.lastTime}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '600' }}>
                          AI {creator.overallScore}/10
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>• {creator.categoryLabel}</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '4px' }}>
                        {thread.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </aside>

        {/* RIGHT PANEL: Active Conversation & Chat Stream */}
        <main style={{ display: 'flex', flexDirection: 'column', background: 'rgba(7, 9, 14, 0.7)' }}>
          
          {/* Chat Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--border-glass)',
            background: 'rgba(15, 23, 42, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img
                src={activeThread.creator.avatar}
                alt={activeThread.creator.name}
                style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #6366f1' }}
              />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>
                    {activeThread.creator.name}
                  </h3>
                  <span className="score-badge high" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                    AI Score {activeThread.creator.overallScore}/10
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {activeThread.creator.categoryLabel} • {activeThread.creator.location}
                </p>
              </div>
            </div>

            {/* Recruiter Identity Reveal Toggle (If Provider) */}
            {userRole === 'provider' && isAnonymousRecruiter && (
              <button
                onClick={() => setIdentityRevealed(!identityRevealed)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  background: identityRevealed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {identityRevealed ? <UserCheck size={14} color="#34d399" /> : <Eye size={14} color="#38bdf8" />}
                {identityRevealed ? 'Identity Revealed to Creator' : 'Reveal Identity to Creator'}
              </button>
            )}
          </div>

          {/* Messages Scroll Area */}
          <div style={{
            flex: 1,
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
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
                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginBottom: '4px',
                    textAlign: isUserRoleMe ? 'right' : 'left'
                  }}>
                    {msg.senderName} • {msg.timestamp}
                  </div>
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '16px',
                    borderTopRightRadius: isUserRoleMe ? '2px' : '16px',
                    borderTopLeftRadius: isUserRoleMe ? '16px' : '2px',
                    background: isUserRoleMe
                      ? 'linear-gradient(135deg, var(--primary-600), var(--accent-purple))'
                      : 'rgba(255, 255, 255, 0.08)',
                    border: isUserRoleMe ? 'none' : '1px solid var(--border-glass)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Message Composer */}
          <div style={{
            padding: '18px 24px',
            background: 'rgba(15, 23, 42, 0.95)',
            borderTop: '1px solid var(--border-glass)',
            display: 'flex',
            gap: '12px'
          }}>
            <input
              type="text"
              placeholder={`Type a message to ${activeThread.creator.name}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
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
              onClick={handleSend}
              className="btn-primary"
              style={{ padding: '10px 22px' }}
            >
              <Send size={16} />
              Send
            </button>
          </div>

        </main>

      </div>

    </div>
  );
}
