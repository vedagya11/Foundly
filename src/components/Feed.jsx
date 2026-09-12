import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Sparkles, MapPin, Send, 
  UserPlus, UserCheck, Eye, CheckCircle2, Check, Compass, Users as UsersIcon
} from 'lucide-react';
import AudioPlayer from './AudioPlayer';

export default function Feed({ 
  posts, 
  currentUser,
  creators,
  communities,
  joinedCommunities = {},
  onToggleJoinCommunity,
  connections = {},
  onToggleConnect,
  onSelectCreator, 
  onNavigateToDiscovery,
  onNavigateToCommunities,
  onOpenInquiryModal,
  onPublishPost
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedAI, setExpandedAI] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [newPostContent, setNewPostContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [postComments, setPostComments] = useState(
    posts.reduce((acc, p) => ({ ...acc, [p.id]: p.comments || [] }), {})
  );

  const toggleAIBreakdown = (postId) => {
    setExpandedAI(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleLike = (postId) => {
    setLikedPosts(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      author: currentUser?.name || 'You',
      text: text.trim()
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const handleCreateNewFeedPost = (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    if (onPublishPost) {
      onPublishPost({
        caption: newPostContent.trim(),
        category: currentUser?.category || 'technology'
      });
    }

    setNewPostContent('');
  };

  // Recommended Creators (3 sample creators excluding current user)
  const recommendedCreators = creators.filter(c => c.id !== currentUser?.id).slice(0, 3);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const getCreatorForPost = (post) => {
    if (post.creatorId === currentUser?.id) return currentUser;
    return creators.find(c => c.id === post.creatorId) || {
      name: post.creatorName || 'Creator',
      handle: post.creatorHandle || '@creator',
      avatar: post.creatorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      location: 'India',
      followers: 120
    };
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* CREATOR ECOSYSTEM BANNER */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '24px',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="score-badge" style={{ fontSize: '0.72rem', padding: '2px 8px', textTransform: 'uppercase', marginBottom: '6px', display: 'inline-block' }}>
              CREATOR ECOSYSTEM
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
              Welcome back, {currentUser?.name || 'Creator'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Discover people. Share work. Learn together.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={onNavigateToDiscovery} className="btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
              <UsersIcon size={14} />
              Discover People
            </button>
            <button onClick={onNavigateToCommunities} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
              <Compass size={14} />
              Explore Communities
            </button>
          </div>
        </div>
      </div>

      {/* PEOPLE YOU MAY WANT TO CONNECT WITH */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
            People you may want to connect with
          </h3>
          <button 
            onClick={onNavigateToDiscovery} 
            style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}
          >
            View All Creators →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {recommendedCreators.map(creator => {
            const connStatus = connections[creator.id] || 'none';
            const hasScore = creator.overallScore != null && creator.overallScore !== undefined;

            return (
              <div 
                key={creator.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <img 
                      src={creator.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                      alt={creator.name}
                      style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', lineHeight: 1.2 }}>
                        {creator.name}
                      </h4>
                      <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{creator.categoryLabel}</span>
                    </div>
                  </div>

                  <div style={{
                    padding: '6px 10px',
                    borderRadius: '6px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.78rem'
                  }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{hasScore ? 'Demonstrated Score:' : 'Skill Insights:'}</span>
                    {hasScore ? (
                      <strong style={{ color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                        {creator.overallScore} / 10
                      </strong>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No insights yet</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => onSelectCreator(creator)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '5px 8px', fontSize: '0.75rem' }}
                  >
                    <Eye size={13} />
                    View Profile
                  </button>

                  <button 
                    onClick={() => onToggleConnect(creator.id)}
                    className={connStatus === 'connected' ? 'btn-secondary' : 'btn-primary'}
                    style={{ 
                      flex: 1, 
                      padding: '5px 8px', 
                      fontSize: '0.75rem',
                      background: connStatus === 'connected' ? 'rgba(34, 197, 94, 0.15)' : connStatus === 'pending' ? 'rgba(245, 158, 11, 0.15)' : undefined,
                      borderColor: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : undefined,
                      color: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : '#ffffff'
                    }}
                  >
                    {connStatus === 'connected' ? (
                      <>
                        <Check size={13} />
                        Connected
                      </>
                    ) : connStatus === 'pending' ? (
                      <>
                        <UserCheck size={13} />
                        Pending
                      </>
                    ) : (
                      <>
                        <UserPlus size={13} />
                        Connect
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE POST BOX AUTHORED BY CURRENT_USER */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
        <form onSubmit={handleCreateNewFeedPost}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
              alt={currentUser?.name}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <textarea 
              placeholder={`Share your latest project or thought with the community, ${currentUser?.name}...`}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <Send size={14} />
              Share to Community
            </button>
          </div>
        </form>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '20px' }}>
        {[
          { id: 'all', label: 'All Activity' },
          { id: 'technology', label: '💻 Code & AI' },
          { id: 'design', label: '🎨 Design & UI' },
          { id: 'music', label: '🎵 Music & Vocals' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '99px',
              border: `1px solid ${activeCategory === cat.id ? 'var(--primary-indigo)' : 'var(--border-color)'}`,
              background: activeCategory === cat.id ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-surface)',
              color: activeCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* POSTS STREAM */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredPosts.map(post => {
          const creator = getCreatorForPost(post);
          const isLiked = likedPosts[post.id];
          const isExpanded = expandedAI[post.id];
          const commentsList = postComments[post.id] || [];

          return (
            <article key={post.id} className="glass-panel" style={{ padding: '20px' }}>
              
              {/* Post Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} 
                  onClick={() => post.creatorId !== currentUser?.id && onSelectCreator(creator)}
                >
                  <img 
                    src={creator.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'} 
                    alt={creator.name} 
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
                        {creator.name} {post.creatorId === currentUser?.id && <span style={{ fontSize: '0.75rem', color: 'var(--color-success)' }}>(You)</span>}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{creator.username || creator.handle}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {post.timestamp}
                    </div>
                  </div>
                </div>

                {post.aiAnalysis?.overall && (
                  <div className="score-badge">
                    <span>Score: {post.aiAnalysis.overall} / 10</span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.6', marginBottom: '14px' }}>
                {post.caption}
              </p>

              {/* Audio player if applicable */}
              {post.mediaType === 'audio' && (
                <AudioPlayer 
                  audioUrl={post.mediaUrl}
                  title={post.audioTitle || 'Audio Sample'}
                  artist={creator.name}
                  pitchScore={post.aiAnalysis?.parameters?.find(p => p.label.includes('Pitch'))?.score || 9.1}
                />
              )}

              {/* Image if applicable */}
              {post.mediaType === 'image' && post.mediaUrl && (
                <div style={{ borderRadius: '10px', overflow: 'hidden', marginBottom: '14px', border: '1px solid var(--border-color)' }}>
                  <img src={post.mediaUrl} alt="Visual Work Showcase" style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
                </div>
              )}

              {/* AI Analysis Dropdown */}
              {post.aiAnalysis && (
                <div style={{
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  marginBottom: '14px'
                }}>
                  <div 
                    onClick={() => toggleAIBreakdown(post.id)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={15} color="var(--primary-indigo)" />
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>
                        DEMONSTRATED SKILL SCORE: {post.aiAnalysis.overall} / 10
                      </span>
                    </div>

                    <button className="btn-evidence-trigger" style={{ pointerEvents: 'none' }}>
                      <Eye size={13} />
                      <span>{isExpanded ? 'Hide Evidence' : 'View Evidence →'}</span>
                    </button>
                  </div>

                  {isExpanded && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '10px' }}>
                        "{post.aiAnalysis.insight}"
                      </p>

                      <div className="evidence-card" style={{ marginTop: '8px', padding: '10px' }}>
                        <div className="evidence-title">
                          <CheckCircle2 size={13} />
                          <span>DETECTED PROOF POINTS</span>
                        </div>
                        <div className="evidence-list" style={{ fontSize: '0.75rem', marginBottom: 0 }}>
                          <div className="evidence-item">• Verified parameter execution from uploaded work</div>
                          <div className="evidence-item">• Algorithmic proof analysis completed by Foundly Engine</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button 
                    onClick={() => toggleLike(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: isLiked ? 'var(--color-error)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '600'
                    }}
                  >
                    <Heart size={16} fill={isLiked ? 'var(--color-error)' : 'none'} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600' }}>
                    <MessageCircle size={16} />
                    {commentsList.length}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600' }}>
                    <Share2 size={16} />
                    {post.shares}
                  </div>
                </div>

                {post.creatorId !== currentUser?.id && (
                  <button
                    onClick={() => onOpenInquiryModal(creator)}
                    className="btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                  >
                    <Send size={13} />
                    Message Creator
                  </button>
                )}
              </div>

              {/* Comments Section */}
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                {commentsList.map(c => (
                  <div key={c.id} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <strong style={{ color: '#a5b4fc', marginRight: '6px' }}>{c.author}:</strong>
                    <span>{c.text}</span>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      padding: '6px 10px',
                      color: '#ffffff',
                      fontSize: '0.78rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    Comment
                  </button>
                </div>
              </div>

            </article>
          );
        })}
      </div>

    </div>
  );
}
