import React, { useState } from 'react';
import { 
  Users, MessageSquare, BookOpen, UserPlus, Check, ArrowLeft, Send, 
  ThumbsUp, Bookmark
} from 'lucide-react';
import { COMMUNITY_DISCUSSIONS, COMMUNITY_RESOURCES } from '../data/mockData';

export default function CommunitiesView({ 
  communities, 
  joinedCommunities = {}, 
  onToggleJoinCommunity, 
  currentUser, 
  creators, 
  onSelectCreator, 
  connections = {}, 
  onToggleConnect 
}) {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [activeTab, setActiveTab] = useState('discussion'); // 'discussion' | 'resources' | 'members'
  
  // Local discussions state allowing new posts
  const [discussions, setDiscussions] = useState(COMMUNITY_DISCUSSIONS);
  const [newPostText, setNewPostText] = useState('');
  const [savedResources, setSavedResources] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim() || !selectedCommunity) return;

    const newPost = {
      id: 'disc_' + Date.now(),
      communityId: selectedCommunity.id,
      authorName: currentUser?.name || 'Creator',
      authorHandle: currentUser?.username || currentUser?.handle || '@creator',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      timestamp: 'Just now',
      title: newPostText.length > 50 ? newPostText.substring(0, 50) + '...' : newPostText,
      content: newPostText,
      likes: 1,
      comments: []
    };

    setDiscussions(prev => ({
      ...prev,
      [selectedCommunity.id]: [newPost, ...(prev[selectedCommunity.id] || [])]
    }));

    setNewPostText('');
  };

  const handleLikePost = (commId, postId) => {
    setDiscussions(prev => ({
      ...prev,
      [commId]: (prev[commId] || []).map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p)
    }));
  };

  const handleToggleSaveResource = (resId) => {
    setSavedResources(prev => ({ ...prev, [resId]: !prev[resId] }));
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      
      {/* OVERVIEW / DISCOVERY HEADER */}
      {!selectedCommunity ? (
        <div>
          <div style={{ marginBottom: '24px' }}>
            <span className="score-badge" style={{ fontSize: '0.72rem', padding: '3px 10px', textTransform: 'uppercase' }}>
              CREATOR COMMUNITIES
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', margin: '6px 0 4px 0', fontFamily: 'var(--font-heading)' }}>
              Find your people.
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Join communities where creators share, learn, collaborate, and grow together.
            </p>
          </div>

          {/* Communities Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {communities.map(comm => {
              const isJoined = joinedCommunities[comm.id];
              return (
                <div 
                  key={comm.id} 
                  className="glass-panel glass-panel-interactive"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 0
                  }}
                >
                  {/* Community Cover Banner */}
                  <div style={{
                    height: '110px',
                    backgroundImage: `url(${comm.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 60%)' }} />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      fontSize: '0.7rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: 'rgba(8, 9, 11, 0.8)',
                      color: '#ffffff',
                      border: '1px solid var(--border-color)'
                    }}>
                      {comm.category}
                    </span>
                  </div>

                  {/* Community Card Body */}
                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px' }}>
                        {comm.name}
                      </h3>
                      
                      <div style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} />
                        <span>{comm.membersCount} members</span>
                      </div>

                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {comm.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                      <button 
                        onClick={() => { setSelectedCommunity(comm); setActiveTab('discussion'); }}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '7px 12px', fontSize: '0.8rem' }}
                      >
                        Enter Space
                      </button>

                      <button 
                        onClick={() => onToggleJoinCommunity(comm.id)}
                        className={isJoined ? 'btn-secondary' : 'btn-primary'}
                        style={{ 
                          flex: 1, 
                          padding: '7px 12px', 
                          fontSize: '0.8rem',
                          background: isJoined ? 'rgba(34, 197, 94, 0.15)' : undefined,
                          borderColor: isJoined ? 'var(--color-success)' : undefined,
                          color: isJoined ? 'var(--color-success)' : '#ffffff'
                        }}
                      >
                        {isJoined ? (
                          <>
                            <Check size={14} />
                            Joined
                          </>
                        ) : (
                          <>
                            <UserPlus size={14} />
                            Join Community
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* COMMUNITY DETAIL VIEW */
        <div>
          {/* Back Navigation Bar */}
          <button 
            onClick={() => setSelectedCommunity(null)}
            className="btn-secondary"
            style={{ marginBottom: '16px', fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <ArrowLeft size={14} />
            Back to All Communities
          </button>

          {/* Header Banner & Meta */}
          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', marginBottom: '24px' }}>
            <div style={{
              height: '140px',
              backgroundImage: `url(${selectedCommunity.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 50%)' }} />
            </div>

            <div style={{ padding: '20px', marginTop: '-30px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span className="score-badge" style={{ fontSize: '0.7rem', padding: '2px 8px', marginBottom: '6px', display: 'inline-block' }}>
                    {selectedCommunity.category}
                  </span>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff', margin: '2px 0 4px 0' }}>
                    {selectedCommunity.name}
                  </h1>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
                    {selectedCommunity.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#a5b4fc', fontWeight: '600' }}>
                    <Users size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {selectedCommunity.membersCount} members
                  </div>

                  <button 
                    onClick={() => onToggleJoinCommunity(selectedCommunity.id)}
                    className={joinedCommunities[selectedCommunity.id] ? 'btn-secondary' : 'btn-primary'}
                    style={{ 
                      padding: '8px 16px',
                      background: joinedCommunities[selectedCommunity.id] ? 'rgba(34, 197, 94, 0.15)' : undefined,
                      borderColor: joinedCommunities[selectedCommunity.id] ? 'var(--color-success)' : undefined,
                      color: joinedCommunities[selectedCommunity.id] ? 'var(--color-success)' : '#ffffff'
                    }}
                  >
                    {joinedCommunities[selectedCommunity.id] ? 'Joined Space' : 'Join Space'}
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Tabs inside Community Detail */}
            <div style={{
              display: 'flex',
              gap: '4px',
              padding: '0 20px',
              borderTop: '1px solid var(--border-color)',
              background: 'var(--bg-dark)'
            }}>
              <button 
                onClick={() => setActiveTab('discussion')}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderBottom: activeTab === 'discussion' ? '2px solid var(--primary-indigo)' : '2px solid transparent',
                  background: 'transparent',
                  color: activeTab === 'discussion' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <MessageSquare size={14} color={activeTab === 'discussion' ? '#818cf8' : 'currentColor'} />
                Discussion
              </button>

              <button 
                onClick={() => setActiveTab('resources')}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderBottom: activeTab === 'resources' ? '2px solid var(--primary-indigo)' : '2px solid transparent',
                  background: 'transparent',
                  color: activeTab === 'resources' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <BookOpen size={14} color={activeTab === 'resources' ? '#818cf8' : 'currentColor'} />
                Resources & Learning
              </button>

              <button 
                onClick={() => setActiveTab('members')}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderBottom: activeTab === 'members' ? '2px solid var(--primary-indigo)' : '2px solid transparent',
                  background: 'transparent',
                  color: activeTab === 'members' ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Users size={14} color={activeTab === 'members' ? '#818cf8' : 'currentColor'} />
                Members
              </button>
            </div>
          </div>

          {/* TAB 1: DISCUSSION */}
          {activeTab === 'discussion' && (
            <div>
              {/* Post Creation Box */}
              <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px' }}>
                <form onSubmit={handleCreatePost}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                    <img 
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                      alt={currentUser?.name}
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <textarea 
                      placeholder={`Share something with ${selectedCommunity.name}...`}
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      rows={2}
                      style={{
                        flex: 1,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        padding: '10px 12px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
                      <Send size={14} />
                      Post as {currentUser?.name}
                    </button>
                  </div>
                </form>
              </div>

              {/* Discussions List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(discussions[selectedCommunity.id] || []).map(disc => (
                  <div key={disc.id} className="glass-panel" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <img 
                        src={disc.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                        alt={disc.authorName}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>{disc.authorName}</h4>
                        <span style={{ fontSize: '0.78rem', color: '#a5b4fc' }}>{disc.authorHandle} • {disc.timestamp}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                      {disc.title}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
                      {disc.content}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <button 
                        onClick={() => handleLikePost(selectedCommunity.id, disc.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
                      >
                        <ThumbsUp size={14} color="#818cf8" />
                        {disc.likes} Likes
                      </button>

                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MessageSquare size={14} />
                        {disc.comments.length} Comments
                      </span>
                    </div>

                    {/* Render existing comments */}
                    {disc.comments.length > 0 && (
                      <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {disc.comments.map(c => (
                          <div key={c.id} style={{ background: 'var(--bg-elevated)', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem' }}>
                            <strong style={{ color: '#a5b4fc', marginRight: '6px' }}>{c.author}:</strong>
                            <span style={{ color: 'var(--text-primary)' }}>{c.text}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: RESOURCES */}
          {activeTab === 'resources' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {(COMMUNITY_RESOURCES[selectedCommunity.id] || [
                { id: 'def1', title: 'Community Primer & Guidelines', category: 'Guide', readTime: '5 min read' },
                { id: 'def2', title: 'Curated Resource Matrix', category: 'Repository', readTime: 'Links' }
              ]).map(res => {
                const isSaved = savedResources[res.id];
                return (
                  <div key={res.id} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: '700', textTransform: 'uppercase' }}>{res.category}</span>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: '700', color: '#ffffff', margin: '4px 0 6px 0' }}>{res.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{res.readTime}</span>
                    </div>

                    <button 
                      onClick={() => handleToggleSaveResource(res.id)}
                      className={isSaved ? 'btn-secondary' : 'btn-primary'}
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.78rem',
                        background: isSaved ? 'rgba(245, 158, 11, 0.15)' : undefined,
                        borderColor: isSaved ? 'var(--color-warning)' : undefined,
                        color: isSaved ? 'var(--color-warning)' : '#ffffff'
                      }}
                    >
                      <Bookmark size={13} fill={isSaved ? 'var(--color-warning)' : 'none'} />
                      {isSaved ? 'Saved to My Resources' : 'Save Resource'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: MEMBERS */}
          {activeTab === 'members' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {/* Render Current User first */}
              {currentUser && (
                <div className="glass-panel" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>{currentUser.name} <span style={{ color: 'var(--color-success)', fontSize: '0.75rem' }}>(You)</span></h4>
                      <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{currentUser.categoryLabel}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Render Seed Creators */}
              {creators.map(c => (
                <div key={c.id} className="glass-panel" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={c.avatar} alt={c.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>{c.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{c.categoryLabel}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => onSelectCreator(c)}
                    className="btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
