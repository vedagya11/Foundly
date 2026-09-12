import React, { useState } from 'react';
import { Search, MapPin, UserPlus, UserCheck, Eye, Check } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function DiscoverPeople({ 
  creators, 
  currentUser, 
  onSelectCreator, 
  connections = {}, 
  onToggleConnect 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter out current user from discover list
  const filteredCreators = creators.filter(creator => {
    if (creator.id === currentUser?.id) return false;

    const matchesCategory = selectedCategory === 'all' || creator.category === selectedCategory;
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = !searchTerm || 
      creator.name.toLowerCase().includes(searchLower) ||
      (creator.username && creator.username.toLowerCase().includes(searchLower)) ||
      (creator.handle && creator.handle.toLowerCase().includes(searchLower)) ||
      (creator.bio && creator.bio.toLowerCase().includes(searchLower)) ||
      (creator.categoryLabel && creator.categoryLabel.toLowerCase().includes(searchLower)) ||
      (creator.interests && creator.interests.some(i => i.toLowerCase().includes(searchLower))) ||
      (creator.topSkills && creator.topSkills.some(s => s.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <span className="score-badge" style={{ fontSize: '0.72rem', padding: '3px 10px', textTransform: 'uppercase' }}>
          CREATOR NETWORK
        </span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', margin: '6px 0 4px 0', fontFamily: 'var(--font-heading)' }}>
          Discover People
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Meet people who create, learn, and build like you.
        </p>
      </div>

      {/* Search & Category Filter Control Bar */}
      <div className="glass-panel" style={{ padding: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Search Box */}
          <div style={{
            flex: 1,
            minWidth: '260px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
            <input 
              type="text"
              placeholder="Search creators, skills, or interests (e.g. AI, Figma, Audio)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '9px 12px 9px 36px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }}>
            <button 
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: selectedCategory === 'all' ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                color: selectedCategory === 'all' ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Categories
            </button>

            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: selectedCategory === cat.id ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-elevated)',
                  color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.78rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Creators Grid */}
      {filteredCreators.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            No creators found matching "{searchTerm}". Try clearing your search or selecting another category.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
            className="btn-secondary" 
            style={{ marginTop: '16px' }}
          >
            Reset Search Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '20px' }}>
          {filteredCreators.map(creator => {
            const connStatus = connections[creator.id] || 'none';
            const hasScore = creator.overallScore != null && creator.overallScore !== undefined;

            return (
              <div 
                key={creator.id} 
                className="glass-panel glass-panel-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  {/* Top Creator Header */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '12px' }}>
                    <img 
                      src={creator.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} 
                      alt={creator.name}
                      style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid var(--border-color)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', lineHeight: 1.2 }}>
                        {creator.name}
                      </h3>
                      <div style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: '600', marginTop: '2px' }}>
                        {creator.username || creator.handle}
                      </div>
                      <span className="score-badge" style={{ fontSize: '0.68rem', padding: '1px 6px', marginTop: '4px', display: 'inline-block' }}>
                        {creator.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Demonstrated Skill Score Badge OR Unanalyzed Badge */}
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>
                      {hasScore ? 'Demonstrated Ability' : 'Skill Insights'}
                    </span>
                    {hasScore ? (
                      <div>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                          {creator.overallScore}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}> / 10</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                        No skill insights yet
                      </span>
                    )}
                  </div>

                  {/* Bio */}
                  <p style={{ fontSize: '0.82rem', color: creator.bio ? 'var(--text-secondary)' : 'var(--text-muted)', lineHeight: '1.5', marginBottom: '14px', height: '3.0em', overflow: 'hidden', fontStyle: creator.bio ? 'normal' : 'italic' }}>
                    {creator.bio || 'No bio provided yet.'}
                  </p>

                  {/* Skills / Interests Tags */}
                  {((creator.topSkills && creator.topSkills.length > 0) || (creator.interests && creator.interests.length > 0)) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                      {(creator.topSkills || creator.interests).slice(0, 3).map((item, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-secondary)'
                        }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Meta Location */}
                  {creator.location && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="#818cf8" />
                      <span>{creator.location}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    onClick={() => onSelectCreator(creator)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '6px 10px', fontSize: '0.8rem' }}
                  >
                    <Eye size={14} />
                    View Profile
                  </button>

                  <button 
                    onClick={() => onToggleConnect(creator.id)}
                    className={connStatus === 'connected' ? 'btn-secondary' : 'btn-primary'}
                    style={{ 
                      flex: 1, 
                      padding: '6px 10px', 
                      fontSize: '0.8rem',
                      background: connStatus === 'connected' ? 'rgba(34, 197, 94, 0.15)' : connStatus === 'pending' ? 'rgba(245, 158, 11, 0.15)' : undefined,
                      borderColor: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : undefined,
                      color: connStatus === 'connected' ? 'var(--color-success)' : connStatus === 'pending' ? 'var(--color-warning)' : '#ffffff'
                    }}
                  >
                    {connStatus === 'connected' ? (
                      <>
                        <Check size={14} />
                        Connected
                      </>
                    ) : connStatus === 'pending' ? (
                      <>
                        <UserCheck size={14} />
                        Pending
                      </>
                    ) : (
                      <>
                        <UserPlus size={14} />
                        Connect
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
