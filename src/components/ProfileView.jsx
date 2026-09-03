import React, { useState } from 'react';
import { 
  MapPin, Users, Award, Sparkles, TrendingUp, Send, ShieldCheck, 
  UserPlus, UserCheck, Edit3, Upload, Info, Star, AlertCircle 
} from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import EditProfileModal from './EditProfileModal';
import { CATEGORIES } from '../data/mockData';

export default function ProfileView({ 
  creator, 
  userRole, 
  isAnonymousRecruiter, 
  onOpenInquiryModal,
  onNavigateToEvaluator,
  onUpdateCreator,
  isShortlisted,
  onToggleShortlist
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!creator) return null;

  const isOwnProfile = userRole === 'creator' && creator.id === 'rahul-singh';
  const categoryObj = CATEGORIES.find(c => c.id === creator.category) || CATEGORIES[0];
  const graphData = creator.skillsGraphData || [
    { month: 'Jan', score: 7.8 },
    { month: 'Mar', score: 8.0 },
    { month: 'May', score: 8.2 },
    { month: 'Jul', score: 8.4 },
    { month: 'Sep', score: 8.5 }
  ];

  // SVG Chart points calculation
  const maxScore = 10;
  const chartHeight = 120;
  const chartWidth = 500;
  const points = graphData.map((d, i) => {
    const x = (i / (graphData.length - 1)) * chartWidth;
    const y = chartHeight - (d.score / maxScore) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Profile Header Container */}
      <div className="glass-panel" style={{ overflow: 'hidden', padding: 0, marginBottom: '28px' }}>
        
        {/* Cover Banner */}
        <div style={{
          height: '180px',
          backgroundImage: `url(${creator.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent 80%)' }} />
        </div>

        {/* Profile Content Details */}
        <div style={{ padding: '0 28px 24px 28px', marginTop: '-50px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '18px' }}>
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-dark)', boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' }} 
              />
              <div style={{ paddingBottom: '6px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ffffff' }}>{creator.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                  <span style={{ fontSize: '0.85rem', color: '#818cf8', fontWeight: '600' }}>{creator.handle}</span>
                  <span className="tag-pill">{creator.categoryLabel}</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS DEPENDING ON ROLE AND OWN PROFILE */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              
              {/* 1. CREATOR VIEW: OWN PROFILE */}
              {isOwnProfile && (
                <>
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>

                  <button 
                    onClick={onNavigateToEvaluator}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Upload size={16} />
                    Upload Work & AI Analyze
                  </button>
                </>
              )}

              {/* 2. CREATOR VIEW: OTHER CREATOR'S PROFILE */}
              {userRole === 'creator' && !isOwnProfile && (
                <>
                  <button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    {isFollowing ? <UserCheck size={16} color="#34d399" /> : <UserPlus size={16} />}
                    {isFollowing ? 'Following' : 'Follow Creator'}
                  </button>

                  <button 
                    onClick={() => onOpenInquiryModal(creator)}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Send size={16} />
                    Message Creator
                  </button>
                </>
              )}

              {/* 3. OPPORTUNITY PROVIDER VIEW (RECRUITER CONTROLS) */}
              {userRole === 'provider' && (
                <>
                  <button
                    onClick={() => onToggleShortlist && onToggleShortlist(creator.id)}
                    className="btn-secondary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <Star size={16} fill={isShortlisted ? '#f59e0b' : 'none'} color={isShortlisted ? '#f59e0b' : 'currentColor'} />
                    {isShortlisted ? 'Shortlisted' : 'Shortlist Candidate'}
                  </button>

                  <button 
                    onClick={() => onOpenInquiryModal(creator)}
                    className="btn-primary"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <ShieldCheck size={16} color="#34d399" />
                    Inquire Anonymously
                  </button>
                </>
              )}

            </div>

          </div>

          {/* Meta Info Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={15} color="#818cf8" /> {creator.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a5b4fc', fontWeight: '700' }}>
              <Users size={15} /> {creator.followers.toLocaleString()} Social Followers
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#38bdf8', fontWeight: '700' }}>
              <Award size={15} /> AI Overall Rating: {creator.overallScore}/10
            </span>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: '1.6', maxWidth: '780px' }}>
            {creator.bio}
          </p>

        </div>
      </div>

      {/* Grid: Cumulative Skill Graph & AI Skill Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* Cumulative Skill Graph Over Time */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Long-Term Skill Synthesis
              </span>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={18} color="#c084fc" /> Cumulative Skill Graph
              </h3>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: '700', background: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: '99px' }}>
              +0.7 Growth
            </span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            AI-assisted evaluation synthesizes patterns across {creator.name}'s work submissions to construct a long-term skill graph.
          </p>

          {/* SVG Smooth Curve Graph */}
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '12px', overflow: 'hidden' }}>
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: '120px', overflow: 'visible' }}>
              <defs>
                <linearGradient id="skillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <polygon
                points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
                fill="url(#skillGrad)"
              />

              <polyline
                fill="none"
                stroke="#c084fc"
                strokeWidth="3"
                points={points}
              />

              {graphData.map((d, i) => {
                const x = (i / (graphData.length - 1)) * chartWidth;
                const y = chartHeight - (d.score / maxScore) * chartHeight;
                return (
                  <circle key={i} cx={x} cy={y} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                );
              })}
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {graphData.map((d, i) => (
                <span key={i}>{d.month} ({d.score})</span>
              ))}
            </div>
          </div>
        </div>

        {/* AI Skill Insights Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sparkles size={18} color="#38bdf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>
              AI Skill Insights ({categoryObj.name})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categoryObj.parameters.map(param => {
              const score = creator.parameters[param.key] || 8.0;
              return (
                <div key={param.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{param.label}</span>
                    <strong style={{ color: '#38bdf8' }}>{score}/10</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(score / 10) * 100}%`, height: '100%', background: 'linear-gradient(to right, #6366f1, #06b6d4)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Qualitative Feedback Note */}
          <div style={{ marginTop: '18px', padding: '12px', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.2)', fontSize: '0.8rem', color: '#e0e7ff', lineHeight: '1.5' }}>
            <strong>AI Feedback Insight:</strong> "{creator.aiFeedback}"
          </div>

          {/* Guidance Disclaimer */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <AlertCircle size={13} color="#a5b4fc" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>AI-generated insights based on submitted content. Scores are intended as guidance and should not be treated as an absolute measure of ability.</span>
          </div>

        </div>

      </div>

      {/* Featured Showcase Work */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>
          Demonstrated Work Portfolio
        </h3>

        {creator.category === 'music' && (
          <AudioPlayer 
            audioUrl={creator.audioSampleUrl || 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3'}
            title={creator.highlightWorkTitle}
            artist={creator.name}
            pitchScore={creator.parameters.pitchAccuracy || 9.1}
          />
        )}

        {creator.category !== 'music' && (
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
              {creator.highlightWorkTitle}
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Verified work sample analyzed and validated by Foundly AI Skill Engine.
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal Dialog */}
      {isEditModalOpen && (
        <EditProfileModal 
          creator={creator}
          onSave={onUpdateCreator}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

    </div>
  );
}
