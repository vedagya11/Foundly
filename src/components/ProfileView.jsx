import React, { useState } from 'react';
import { 
  MapPin, Users, ShieldCheck, 
  UserPlus, UserCheck, Edit3, Upload, Star, Eye, Send, CheckCircle2, Check, Compass, Cpu
} from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import EditProfileModal from './EditProfileModal';
import { CATEGORIES } from '../data/mockData';

export default function ProfileView({ 
  creator, 
  currentUser,
  userRole, 
  onOpenInquiryModal,
  onNavigateToEvaluator,
  onNavigateToCommunities,
  onUpdateCreator,
  isShortlisted,
  onToggleShortlist,
  connections = {},
  onToggleConnect,
  joinedCommunities = {},
  allCommunities = []
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeEvidenceParam, setActiveEvidenceParam] = useState(null);

  if (!creator) return null;

  const isOwnProfile = creator.id === currentUser?.id || creator.isCurrentUser;
  const targetCreator = isOwnProfile ? (currentUser || creator) : creator;
  
  const categoryObj = CATEGORIES.find(c => c.id === targetCreator.category) || CATEGORIES[0];
  const connStatus = connections[targetCreator.id] || 'none';

  // Check if work has been analyzed for this user
  const hasScore = targetCreator.overallScore != null && targetCreator.overallScore !== undefined;
  const hasWork = targetCreator.work && targetCreator.work.length > 0;

  const graphData = targetCreator.skillsGraphData || [];

  // Joined communities filter
  const userCommunities = allCommunities.filter(c => joinedCommunities[c.id]);

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto' }}>
      
      {/* Profile Header Container */}
      <div className="glass-panel" style={{ overflow: 'hidden', padding: 0, marginBottom: '24px' }}>
        
        {/* Cover Banner */}
        <div style={{
          height: '150px',
          backgroundImage: `url(${targetCreator.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-surface), transparent 70%)' }} />
        </div>

        {/* Profile Content Details */}
        <div style={{ padding: '0 24px 24px 24px', marginTop: '-44px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
              <img 
                src={targetCreator.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                alt={targetCreator.name} 
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--bg-surface)',
                  boxShadow: 'var(--shadow-md)'
                }} 
              />
              <div style={{ paddingBottom: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ffffff' }}>{targetCreator.name}</h2>
                  {isOwnProfile && <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', background: 'rgba(34, 197, 94, 0.12)', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>Your Profile</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#a5b4fc', fontWeight: '600' }}>{targetCreator.username || targetCreator.handle}</span>
                  <span className="score-badge" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>{targetCreator.categoryLabel || categoryObj.name}</span>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {isOwnProfile && (
                <>
                  <button onClick={() => setIsEditModalOpen(true)} className="btn-secondary">
                    <Edit3 size={15} />
                    Edit Profile
                  </button>
                  <button onClick={onNavigateToEvaluator} className="btn-primary">
                    <Upload size={15} />
                    Upload Work & Analyze
                  </button>
                </>
              )}

              {userRole === 'creator' && !isOwnProfile && (
                <>
                  <button 
                    onClick={() => onToggleConnect(targetCreator.id)}
                    className={connStatus === 'connected' ? 'btn-secondary' : 'btn-primary'}
                    style={{
                      background: connStatus === 'connected' ? 'rgba(34, 197, 94, 0.15)' : connStatus === 'pending' ? 'rgba(245, 158, 11, 0.15)' : undefined,
                      borderColor: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : undefined,
                      color: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : '#ffffff'
                    }}
                  >
                    {connStatus === 'connected' ? <Check size={15} /> : connStatus === 'pending' ? <UserCheck size={15} /> : <UserPlus size={15} />}
                    {connStatus === 'connected' ? 'Connected' : connStatus === 'pending' ? 'Pending' : 'Connect'}
                  </button>

                  <button onClick={() => onOpenInquiryModal(targetCreator)} className="btn-secondary">
                    <Send size={15} />
                    Message
                  </button>
                </>
              )}

              {userRole === 'provider' && (
                <>
                  <button onClick={() => onToggleShortlist && onToggleShortlist(targetCreator.id)} className="btn-secondary">
                    <Star size={15} fill={isShortlisted ? 'var(--color-warning)' : 'none'} color={isShortlisted ? 'var(--color-warning)' : 'currentColor'} />
                    {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                  </button>
                  <button onClick={() => onOpenInquiryModal(targetCreator)} className="btn-primary">
                    <ShieldCheck size={15} color="var(--color-success)" />
                    Inquire Anonymously
                  </button>
                </>
              )}
            </div>

          </div>

          {/* PRIMARY METRIC CARD: SCORE OR UNANALYZED STATE */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 18px',
            borderRadius: '12px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-color)',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PRIMARY METRIC
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff' }}>
                DEMONSTRATED SKILL SCORE
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {hasScore ? 'Based on analyzed work submissions' : 'Your score will appear after Foundly analyzes submitted work.'}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                {hasScore ? (
                  <>
                    <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                      {targetCreator.overallScore}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}> / 10</span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
                      —
                    </span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>No score yet</div>
                  </>
                )}
              </div>
              
              {hasScore ? (
                <button 
                  className="btn-evidence-trigger"
                  onClick={() => setActiveEvidenceParam(activeEvidenceParam === 'overall' ? null : 'overall')}
                >
                  <Eye size={14} />
                  <span>View Evidence →</span>
                </button>
              ) : isOwnProfile ? (
                <button onClick={onNavigateToEvaluator} className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                  <Cpu size={13} />
                  Analyze Work
                </button>
              ) : null}
            </div>
          </div>

          {/* Evidence Details Dropdown for Overall Score */}
          {hasScore && activeEvidenceParam === 'overall' && (
            <div className="evidence-card" style={{ marginBottom: '16px' }}>
              <div className="evidence-title">
                <CheckCircle2 size={14} />
                <span>EVIDENCE FOR DEMONSTRATED SKILL SCORE ({targetCreator.overallScore}/10)</span>
              </div>
              <div className="evidence-list">
                <div className="evidence-item">• Verified structural execution in core category parameters</div>
                <div className="evidence-item">• Demonstrated technical quality and problem-solving structure</div>
              </div>
            </div>
          )}

          {/* Meta Info Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={14} color="#818cf8" /> {targetCreator.location || 'Location not specified'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Users size={14} color="var(--text-secondary)" /> {targetCreator.followers || 0} Followers
            </span>
          </div>

          {/* Bio */}
          <p style={{ fontSize: '0.9rem', color: targetCreator.bio ? 'var(--text-primary)' : 'var(--text-muted)', lineHeight: '1.6', maxWidth: '780px', marginBottom: '16px', fontStyle: targetCreator.bio ? 'normal' : 'italic' }}>
            {targetCreator.bio || 'No bio provided yet.'}
          </p>

          {/* Interests Tags */}
          {targetCreator.interests && targetCreator.interests.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {targetCreator.interests.map((interest, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid var(--border-color)',
                  color: '#a5b4fc',
                  fontWeight: '600'
                }}>
                  {interest}
                </span>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* SKILL INSIGHTS / PARAMETERS SECTION */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--primary-indigo)', textTransform: 'uppercase', marginBottom: '4px' }}>
          DEMONSTRATED SKILL SIGNALS
        </div>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', marginBottom: '14px' }}>
          Skill Insights ({categoryObj.name})
        </h3>

        {hasScore ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categoryObj.parameters.map(param => {
              const score = (targetCreator.parameters && targetCreator.parameters[param.key]) || 8.5;
              const isParamActive = activeEvidenceParam === param.key;
              return (
                <div key={param.key} style={{ background: 'var(--bg-elevated)', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{param.label}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <strong style={{ color: '#ffffff' }}>{score} / 10</strong>
                      <button 
                        className="btn-evidence-trigger" 
                        onClick={() => setActiveEvidenceParam(isParamActive ? null : param.key)}
                        style={{ fontSize: '0.75rem' }}
                      >
                        Evidence →
                      </button>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${(score / 10) * 100}%`, height: '100%', background: 'var(--primary-gradient)' }} />
                  </div>

                  {isParamActive && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      ✓ Verified in submitted work sample: High precision execution for {param.label.toLowerCase()}.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
              No demonstrated skill insights yet.
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', maxWidth: '420px', margin: '0 auto 16px auto' }}>
              Submit your work to generate evidence-based skill insights and extract verified category signals.
            </p>
            {isOwnProfile && (
              <button onClick={onNavigateToEvaluator} className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.8rem' }}>
                <Upload size={14} />
                Analyze My Work
              </button>
            )}
          </div>
        )}
      </div>

      {/* DEMONSTRATED WORK PORTFOLIO */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>
            Demonstrated Work Portfolio
          </h3>
          {isOwnProfile && (
            <button onClick={onNavigateToEvaluator} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              + Add Work
            </button>
          )}
        </div>

        {hasWork ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {targetCreator.work.map(w => (
              <div key={w.id} style={{ background: 'var(--bg-elevated)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>{w.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{w.description}</p>
                </div>
                {w.score && (
                  <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                    {w.score} / 10
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ background: 'var(--bg-elevated)', padding: '24px', borderRadius: '10px', textAlign: 'center', border: '1px dashed var(--border-color)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
              No work uploaded yet.
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Your work can become the evidence behind your Foundly profile.
            </p>
            {isOwnProfile && (
              <button onClick={onNavigateToEvaluator} className="btn-primary" style={{ padding: '7px 16px', fontSize: '0.8rem' }}>
                <Upload size={14} />
                Upload Your First Work
              </button>
            )}
          </div>
        )}
      </div>

      {/* JOINED COMMUNITIES SECTION */}
      {isOwnProfile && (
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="#818cf8" />
              Joined Communities ({userCommunities.length})
            </h3>
            <button onClick={onNavigateToCommunities} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              Explore Communities →
            </button>
          </div>

          {userCommunities.length === 0 ? (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              You haven't joined any creator communities yet. Find spaces matching what you create.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px' }}>
              {userCommunities.map(c => (
                <div key={c.id} style={{ background: 'var(--bg-elevated)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>{c.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>{c.membersCount} members</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Edit Profile Modal Dialog */}
      {isEditModalOpen && (
        <EditProfileModal 
          creator={targetCreator}
          onSave={onUpdateCreator}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

    </div>
  );
}
