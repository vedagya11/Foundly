import React, { useState } from 'react';
import Header from './components/Header';
import Feed from './components/Feed';
import TalentDiscovery from './components/TalentDiscovery';
import SavedTalent from './components/SavedTalent';
import AIEvaluator from './components/AIEvaluator';
import ProfileView from './components/ProfileView';
import MessagesView from './components/MessagesView';
import InquiryModal from './components/InquiryModal';
import { INITIAL_POSTS, CREATORS } from './data/mockData';

export default function App() {
  const [userRole, setUserRole] = useState('creator'); // 'creator' | 'provider'
  const [activeTab, setActiveTab] = useState('feed');
  const [isAnonymousRecruiter, setIsAnonymousRecruiter] = useState(false);
  
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [creatorsList, setCreatorsList] = useState(CREATORS);
  const [selectedCreator, setSelectedCreator] = useState(CREATORS[0]); // Rahul Sharma
  
  // Shortlisted Candidates state for Opportunity Providers
  const [shortlisted, setShortlisted] = useState({ 'rahul-singh': true });

  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetCreator, setInquiryTargetCreator] = useState(CREATORS[0]);
  
  const [unreadCount, setUnreadCount] = useState(1);

  const handleToggleShortlist = (creatorId) => {
    setShortlisted(prev => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };

  const handleOpenInquiryModal = (creator) => {
    setInquiryTargetCreator(creator || CREATORS[0]);
    setIsInquiryModalOpen(true);
  };

  const handleSendInquiry = ({ creator, opportunityType, messageText, isAnonymous }) => {
    setIsInquiryModalOpen(false);
    setUnreadCount(0);
    setActiveTab('messages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCreator = (creator) => {
    setSelectedCreator(creator);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCreator = (updatedCreator) => {
    setCreatorsList(prev => prev.map(c => c.id === updatedCreator.id ? updatedCreator : c));
    setSelectedCreator(updatedCreator);
  };

  const handlePublishToFeed = (evalResult) => {
    const newPost = {
      id: 'post_' + Date.now(),
      creatorId: 'rahul-singh',
      timestamp: 'Just now',
      caption: `Published new ${evalResult.category.name} submission evaluated by Foundly AI! Overall skill score of ${evalResult.overall}/10. 🚀`,
      category: evalResult.category.id,
      mediaType: evalResult.category.id === 'music' ? 'audio' : 'image',
      mediaUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3',
      audioTitle: evalResult.fileName,
      likes: 1,
      commentsCount: 0,
      shares: 0,
      aiAnalysis: {
        overall: evalResult.overall,
        badgeText: `Top Skill ${evalResult.overall >= 9.0 ? '1%' : '5%'} Benchmark`,
        parameters: evalResult.category.parameters.map(p => ({
          label: p.label,
          score: evalResult.parameters[p.key] || 8.5
        })),
        insight: evalResult.feedback
      },
      comments: []
    };

    setPosts([newPost, ...posts]);
    setActiveTab('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      
      {/* Header with Navigation & Role Switcher */}
      <Header 
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAnonymousRecruiter={isAnonymousRecruiter}
        setIsAnonymousRecruiter={setIsAnonymousRecruiter}
        unreadCount={unreadCount}
      />

      {/* Main View Router */}
      <main>
        {activeTab === 'feed' && (
          <Feed 
            posts={posts}
            userRole={userRole}
            onSelectCreator={handleSelectCreator}
            onNavigateToDiscovery={() => setActiveTab('discovery')}
            isAnonymousRecruiter={isAnonymousRecruiter}
            onOpenInquiryModal={handleOpenInquiryModal}
          />
        )}

        {activeTab === 'discovery' && (
          <TalentDiscovery 
            isAnonymousRecruiter={isAnonymousRecruiter}
            onOpenInquiryModal={handleOpenInquiryModal}
            onSelectCreator={handleSelectCreator}
            shortlisted={shortlisted}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {activeTab === 'saved' && (
          <SavedTalent
            shortlisted={shortlisted}
            onToggleShortlist={handleToggleShortlist}
            onOpenInquiryModal={handleOpenInquiryModal}
            onSelectCreator={handleSelectCreator}
          />
        )}

        {activeTab === 'evaluator' && (
          <AIEvaluator 
            onPublishToFeed={handlePublishToFeed}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView 
            creator={selectedCreator}
            userRole={userRole}
            isAnonymousRecruiter={isAnonymousRecruiter}
            onOpenInquiryModal={handleOpenInquiryModal}
            onNavigateToEvaluator={() => setActiveTab('evaluator')}
            onUpdateCreator={handleUpdateCreator}
            isShortlisted={shortlisted[selectedCreator.id]}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {activeTab === 'messages' && (
          <MessagesView 
            userRole={userRole}
            isAnonymousRecruiter={isAnonymousRecruiter}
          />
        )}
      </main>

      {/* Opportunity Inquiry Modal */}
      {isInquiryModalOpen && (
        <InquiryModal 
          targetCreator={inquiryTargetCreator}
          isAnonymousRecruiter={isAnonymousRecruiter}
          onSendInquiry={handleSendInquiry}
          onClose={() => setIsInquiryModalOpen(false)}
        />
      )}

      {/* Footer Tagline Bar */}
      <footer style={{
        marginTop: '60px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-glass)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem'
      }}>
        <div style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff', letterSpacing: '-0.02em', fontSize: '1.05rem', marginBottom: '4px' }}>
          FOUNDLY
        </div>
        <p style={{ fontWeight: '600', color: '#a5b4fc' }}>Beyond Followers. Beyond Connections.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--text-dim)' }}>
          Foundly AI Skill Engine & Social Platform • Refined Prototype
        </p>
      </footer>

    </div>
  );
}
