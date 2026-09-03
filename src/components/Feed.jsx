import React, { useState } from 'react';
import { 
  Heart, MessageCircle, Share2, Sparkles, ChevronDown, ChevronUp, 
  MapPin, Users, Award, Send, Zap, ArrowRight, ShieldCheck, AlertCircle, UserPlus, UserCheck 
} from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { CREATORS } from '../data/mockData';

export default function Feed({ 
  posts, 
  userRole,
  onSelectCreator, 
  onNavigateToDiscovery, 
  isAnonymousRecruiter, 
  onOpenInquiryModal 
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedAI, setExpandedAI] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [followingState, setFollowingState] = useState({});
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

  const toggleFollow = (creatorId) => {
    setFollowingState(prev => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment = {
      id: 'c_' + Date.now(),
      author: userRole === 'provider' && isAnonymousRecruiter ? 'Verified Opportunity Provider' : 'You',
      text: text.trim()
    };

    setPostComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const getCreator = (creatorId) => {
    return CREATORS.find(c => c.id === creatorId) || CREATORS[0];
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      
      {/* Foundly Concept Spotlight Hero Banner */}
      <div className="glass-panel" style={{
        padding: '24px 28px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(99, 102, 241, 0.15))',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sparkles size={18} color="#818cf8" />
              <span style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#a5b4fc' }}>
                Visibility vs Talent Gap
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', lineHeight: '1.3', marginBottom: '8px' }}>
              Rahul from Kolkata has 300 followers.<br />
              <span className="gradient-text">AI Skill Insights evaluated his pitch accuracy at 9.1/10.</span>
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Foundly enables creators to build community while helping opportunity providers discover talent based on demonstrated skills.
            </p>
          </div>

          {userRole === 'provider' && (
            <button 
              onClick={onNavigateToDiscovery}
              className="btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.92rem' }}
            >
              <Zap size={18} />
              Open Talent Discovery
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        {[
          { id: 'all', label: 'All Community Posts' },
          { id: 'music', label: '🎵 Music & Vocals' },
          { id: 'design', label: '🎨 Design & UI/UX' },
          { id: 'technology', label: '💻 Code & Tech' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '99px',
              border: `1px solid ${activeCategory === cat.id ? 'rgba(99, 102, 241, 0.6)' : 'rgba(255, 255, 255, 0.1)'}`,
              background: activeCategory === cat.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.04)',
              color: activeCategory === cat.id ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'var(--transition-smooth)'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filteredPosts.map(post => {
          const creator = getCreator(post.creatorId);
          const isLiked = likedPosts[post.id];
          const isFollowing = followingState[creator.id];
          const isExpanded = expandedAI[post.id];
          const commentsList = postComments[post.id] || [];

          return (
            <article key={post.id} className="glass-panel" style={{ padding: '24px' }}>
              
              {/* Creator Card Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => onSelectCreator(creator)}>
                  <img 
                    src={creator.avatar} 
                    alt={creator.name} 
                    style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(99, 102, 241, 0.4)' }} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>{creator.name}</h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{creator.handle}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2px' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={12} color="var(--primary-400)" /> {creator.location}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={12} /> {creator.followers.toLocaleString()} followers
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Follow Action / AI Skill Pill */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {userRole === 'creator' && (
                    <button
                      onClick={() => toggleFollow(creator.id)}
                      className="btn-secondary"
                      style={{ padding: '5px 12px', fontSize: '0.78rem' }}
                    >
                      {isFollowing ? <UserCheck size={14} color="#34d399" /> : <UserPlus size={14} />}
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  )}

                  <div className="score-badge high">
                    <Award size={15} />
                    <span>AI Skill: {post.aiAnalysis.overall}/10</span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6', marginBottom: '16px' }}>
                {post.caption}
              </p>

              {/* Media Container */}
              {post.mediaType === 'audio' && (
                <AudioPlayer 
                  audioUrl={post.mediaUrl}
                  title={post.audioTitle}
                  artist={creator.name}
                  pitchScore={post.aiAnalysis.parameters.find(p => p.label.includes('Pitch'))?.score || 9.1}
                />
              )}

              {post.mediaType === 'image' && (
                <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', border: '1px solid var(--border-glass)' }}>
                  <img src={post.mediaUrl} alt="Design Showcase" style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }} />
                </div>
              )}

              {post.mediaType === 'code' && (
                <div style={{
                  background: '#0d1117',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '0.82rem',
                  color: '#e6edf3',
                  overflowX: 'auto',
                  marginBottom: '16px'
                }}>
                  <pre>{post.codeSnippet}</pre>
                </div>
              )}

              {/* AI Skill Insights Bar */}
              <div style={{
                background: 'rgba(99, 102, 241, 0.06)',
                border: '1px solid rgba(99, 102, 241, 0.2)',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '18px'
              }}>
                <div 
                  onClick={() => toggleAIBreakdown(post.id)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#818cf8" />
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#e0e7ff' }}>
                      AI Skill Insights Available
                    </span>
                  </div>
                  <button style={{ background: 'none', border: 'none', color: '#818cf8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '600' }}>
                    {isExpanded ? 'Collapse' : 'Inspect Insights'}
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <p style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic', marginBottom: '12px' }}>
                      "{post.aiAnalysis.insight}"
                    </p>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                      {post.aiAnalysis.parameters.map((param, i) => (
                        <div key={i} style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '8px 12px', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            <span>{param.label}</span>
                            <strong style={{ color: '#38bdf8' }}>{param.score}/10</strong>
                          </div>
                          <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                            <div style={{ width: `${(param.score / 10) * 100}%`, height: '100%', background: 'linear-gradient(to right, #6366f1, #06b6d4)', borderRadius: '2px' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      <AlertCircle size={13} color="#a5b4fc" />
                      <span>AI-generated insights based on submitted content. Scores are intended as guidance and should not be treated as an absolute measure of ability.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Actions Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <button 
                    onClick={() => toggleLike(post.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: isLiked ? '#f43f5e' : 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.88rem',
                      fontWeight: '600'
                    }}
                  >
                    <Heart size={18} fill={isLiked ? '#f43f5e' : 'none'} />
                    {post.likes + (isLiked ? 1 : 0)}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>
                    <MessageCircle size={18} />
                    {commentsList.length} Comments
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '600' }}>
                    <Share2 size={18} />
                    {post.shares}
                  </div>
                </div>

                {/* Direct Action */}
                <button
                  onClick={() => onOpenInquiryModal(creator)}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '6px 14px', borderRadius: '99px' }}
                >
                  {userRole === 'provider' ? <ShieldCheck size={14} color="#34d399" /> : <Send size={14} />}
                  {userRole === 'provider' ? 'Inquire Anonymously' : 'Message Creator'}
                </button>
              </div>

              {/* Comments */}
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                {commentsList.map(c => (
                  <div key={c.id} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <strong style={{ color: '#e0e7ff', marginRight: '6px' }}>{c.author}:</strong>
                    <span>{c.text}</span>
                  </div>
                ))}

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Write a supportive comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    style={{
                      flex: 1,
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    style={{
                      background: 'var(--primary-600)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '600'
                    }}
                  >
                    Post
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
