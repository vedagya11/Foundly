import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/landing/LandingPage';
import Feed from './components/Feed';
import DiscoverPeople from './components/DiscoverPeople';
import CommunitiesView from './components/CommunitiesView';
import TalentDiscovery from './components/TalentDiscovery';
import SavedTalent from './components/SavedTalent';
import AIEvaluator from './components/AIEvaluator';
import ProfileView from './components/ProfileView';
import MessagesView from './components/MessagesView';
import InquiryModal from './components/InquiryModal';
import AuthModal from './components/AuthModal';
import { INITIAL_POSTS, SAMPLE_USERS_SEED, COMMUNITIES } from './data/mockData';

export default function App() {
  // 1. Multi-User Database Layer (Stored in localStorage key 'foundly_users_db')
  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem('foundly_users_db');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Seed initial users map
    const seedMap = {};
    SAMPLE_USERS_SEED.forEach(u => { seedMap[u.id] = u; });
    return seedMap;
  });

  // 2. Active Session State (Stored in localStorage key 'foundly_session_id')
  const [sessionUserId, setSessionUserId] = useState(() => {
    try {
      return localStorage.getItem('foundly_session_id') || null;
    } catch (e) {
      return null;
    }
  });

  const isAuthenticated = Boolean(sessionUserId && usersDb[sessionUserId]);
  const currentUser = isAuthenticated ? usersDb[sessionUserId] : null;

  const [userRole, setUserRole] = useState('creator'); // 'creator' | 'provider'
  const [activeTab, setActiveTab] = useState(isAuthenticated ? 'feed' : 'landing'); // 'landing' | 'feed' | 'discover_people' | 'communities' | 'discovery' | 'saved' | 'evaluator' | 'profile' | 'messages'
  const [isAnonymousRecruiter, setIsAnonymousRecruiter] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState('signup'); // 'signup' | 'login'
  
  // Connections State: { [userId]: 'connected' | 'pending' }
  const [connections, setConnections] = useState(() => {
    try {
      const saved = localStorage.getItem('foundly_connections');
      return saved ? JSON.parse(saved) : { 'aarav-music': 'connected' };
    } catch (e) {
      return { 'aarav-music': 'connected' };
    }
  });

  // Joined Communities State: { [communityId]: true }
  const [joinedCommunities, setJoinedCommunities] = useState(() => {
    try {
      const saved = localStorage.getItem('foundly_joined_communities');
      return saved ? JSON.parse(saved) : { 'ai-ml': true, 'designers-collective': true };
    } catch (e) {
      return { 'ai-ml': true, 'designers-collective': true };
    }
  });

  // Posts State
  const [posts, setPosts] = useState(() => {
    try {
      const saved = localStorage.getItem('foundly_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch (e) {
      return INITIAL_POSTS;
    }
  });

  const [selectedCreator, setSelectedCreator] = useState(null); // null means viewing currentUser

  // Sync usersDb, session, connections, joinedCommunities, posts to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('foundly_users_db', JSON.stringify(usersDb));
    } catch (e) {}
  }, [usersDb]);

  useEffect(() => {
    try {
      if (sessionUserId) {
        localStorage.setItem('foundly_session_id', sessionUserId);
      } else {
        localStorage.removeItem('foundly_session_id');
      }
    } catch (e) {}
  }, [sessionUserId]);

  useEffect(() => {
    try {
      localStorage.setItem('foundly_connections', JSON.stringify(connections));
    } catch (e) {}
  }, [connections]);

  useEffect(() => {
    try {
      localStorage.setItem('foundly_joined_communities', JSON.stringify(joinedCommunities));
    } catch (e) {}
  }, [joinedCommunities]);

  useEffect(() => {
    try {
      localStorage.setItem('foundly_posts', JSON.stringify(posts));
    } catch (e) {}
  }, [posts]);

  // Shortlisted Candidates state for Opportunity Providers
  const [shortlisted, setShortlisted] = useState({ 'aarav-music': true });

  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetCreator, setInquiryTargetCreator] = useState(null);
  
  const [unreadCount, setUnreadCount] = useState(1);

  // AUTHENTICATION HANDLERS
  const handleRegisterAccount = (newUser) => {
    setUsersDb(prev => ({
      ...prev,
      [newUser.id]: newUser
    }));
    setSessionUserId(newUser.id);
    setUserRole(newUser.role || 'creator');
    setActiveTab('feed');
  };

  const handleLoginAccount = (email, password) => {
    const matchedUser = Object.values(usersDb).find(
      u => u.email && u.email.toLowerCase() === email.toLowerCase()
    );

    if (matchedUser) {
      setSessionUserId(matchedUser.id);
      setUserRole(matchedUser.role || 'creator');
      setActiveTab('feed');
      return true;
    }
    return false;
  };

  const handleLogoutAccount = () => {
    setSessionUserId(null);
    setSelectedCreator(null);
    setActiveTab('landing');
  };

  const handleSwitchAccount = () => {
    setAuthModalInitialMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenAuth = (mode = 'signup') => {
    setAuthModalInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  // CONNECTION & COMMUNITY HANDLERS
  const handleToggleConnect = (userId) => {
    setConnections(prev => {
      const currentStatus = prev[userId];
      let nextStatus = 'pending';
      if (currentStatus === 'pending') nextStatus = 'connected';
      else if (currentStatus === 'connected') nextStatus = undefined;
      
      const updated = { ...prev };
      if (!nextStatus) delete updated[userId];
      else updated[userId] = nextStatus;

      return updated;
    });
  };

  const handleToggleJoinCommunity = (communityId) => {
    setJoinedCommunities(prev => ({
      ...prev,
      [communityId]: !prev[communityId]
    }));
  };

  const handleToggleShortlist = (creatorId) => {
    setShortlisted(prev => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };

  const handleOpenInquiryModal = (creator) => {
    setInquiryTargetCreator(creator || Object.values(usersDb)[0]);
    setIsInquiryModalOpen(true);
  };

  const handleSendInquiry = () => {
    setIsInquiryModalOpen(false);
    setUnreadCount(0);
    setActiveTab('messages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCreator = (creator) => {
    if (currentUser && creator.id === currentUser.id) {
      setSelectedCreator(null);
    } else {
      setSelectedCreator(creator);
    }
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOwnProfile = () => {
    setSelectedCreator(null);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateCurrentUser = (updatedProfile) => {
    if (!currentUser) return;
    setUsersDb(prev => ({
      ...prev,
      [currentUser.id]: updatedProfile
    }));
  };

  const handlePublishPost = ({ caption, category }) => {
    if (!currentUser) return;

    const newPost = {
      id: 'post_' + Date.now(),
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      creatorHandle: currentUser.username || currentUser.handle,
      creatorAvatar: currentUser.avatar,
      timestamp: 'Just now',
      caption: caption,
      category: category || currentUser.category || 'technology',
      likes: 1,
      commentsCount: 0,
      shares: 0,
      aiAnalysis: currentUser.overallScore ? {
        overall: currentUser.overallScore,
        badgeText: `Demonstrated Score ${currentUser.overallScore}`,
        parameters: [
          { label: 'Technical Depth', score: currentUser.overallScore }
        ],
        insight: currentUser.aiFeedback || 'Demonstrated execution in core category parameters.'
      } : null,
      comments: []
    };

    setPosts([newPost, ...posts]);
  };

  const handlePublishToFeedFromEvaluator = (evalResult) => {
    if (!currentUser) return;

    const scoreVal = evalResult.overallScore || 8.7;
    
    // Update currentUser in usersDb
    const updatedUser = {
      ...currentUser,
      overallScore: scoreVal,
      demonstratedSkillScore: scoreVal,
      work: [
        {
          id: 'w_' + Date.now(),
          title: evalResult.fileName,
          description: `Evaluated by Foundly Skill Analysis. Score: ${scoreVal}/10.`,
          score: scoreVal,
          date: 'Just now'
        },
        ...(currentUser.work || [])
      ]
    };

    setUsersDb(prev => ({
      ...prev,
      [currentUser.id]: updatedUser
    }));

    handlePublishPost({
      caption: `Published new ${evalResult.category.name} submission analyzed by Foundly! Demonstrated Skill Score of ${scoreVal}/10. 🚀`,
      category: evalResult.category.id
    });

    setActiveTab('feed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab) => {
    if (tab === 'profile') {
      setSelectedCreator(null);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Creators list array for Discover & Feed
  const creatorsList = Object.values(usersDb);

  return (
    <div className="app-container">
      
      {/* Header with Public Navigation OR Authenticated Navigation & Role Switcher */}
      <Header 
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        unreadCount={unreadCount}
        onOpenOwnProfile={handleOpenOwnProfile}
        onLogoutAccount={handleLogoutAccount}
        onSwitchAccount={handleSwitchAccount}
      />

      {/* Main View Router */}
      <main style={{ minHeight: 'calc(100vh - 180px)', padding: '24px 16px' }}>
        
        {/* PUBLIC LANDING PAGE (Shown when logged out OR overview selected) */}
        {(!isAuthenticated || activeTab === 'landing' || activeTab === 'overview') && (
          <LandingPage 
            onNavigateToDiscovery={() => handleOpenAuth('signup')}
            onOpenOnboarding={() => handleOpenAuth('signup')}
          />
        )}

        {/* AUTHENTICATED CREATOR VIEWS */}
        {isAuthenticated && activeTab === 'feed' && (
          <Feed 
            posts={posts}
            currentUser={currentUser}
            creators={creatorsList}
            communities={COMMUNITIES}
            joinedCommunities={joinedCommunities}
            onToggleJoinCommunity={handleToggleJoinCommunity}
            connections={connections}
            onToggleConnect={handleToggleConnect}
            onSelectCreator={handleSelectCreator}
            onNavigateToDiscovery={() => handleNavigate('discover_people')}
            onNavigateToCommunities={() => handleNavigate('communities')}
            onOpenInquiryModal={handleOpenInquiryModal}
            onPublishPost={handlePublishPost}
          />
        )}

        {isAuthenticated && activeTab === 'discover_people' && (
          <DiscoverPeople 
            creators={creatorsList}
            currentUser={currentUser}
            onSelectCreator={handleSelectCreator}
            connections={connections}
            onToggleConnect={handleToggleConnect}
          />
        )}

        {isAuthenticated && activeTab === 'communities' && (
          <CommunitiesView 
            communities={COMMUNITIES}
            joinedCommunities={joinedCommunities}
            onToggleJoinCommunity={handleToggleJoinCommunity}
            currentUser={currentUser}
            creators={creatorsList}
            onSelectCreator={handleSelectCreator}
            connections={connections}
            onToggleConnect={handleToggleConnect}
          />
        )}

        {isAuthenticated && activeTab === 'discovery' && (
          <TalentDiscovery 
            isAnonymousRecruiter={isAnonymousRecruiter}
            onOpenInquiryModal={handleOpenInquiryModal}
            onSelectCreator={handleSelectCreator}
            shortlisted={shortlisted}
            onToggleShortlist={handleToggleShortlist}
          />
        )}

        {isAuthenticated && activeTab === 'saved' && (
          <SavedTalent
            shortlisted={shortlisted}
            onToggleShortlist={handleToggleShortlist}
            onOpenInquiryModal={handleOpenInquiryModal}
            onSelectCreator={handleSelectCreator}
          />
        )}

        {isAuthenticated && activeTab === 'evaluator' && (
          <AIEvaluator 
            onPublishToFeed={handlePublishToFeedFromEvaluator}
          />
        )}

        {isAuthenticated && activeTab === 'profile' && (
          <ProfileView 
            creator={selectedCreator || currentUser}
            currentUser={currentUser}
            userRole={userRole}
            isAnonymousRecruiter={isAnonymousRecruiter}
            onOpenInquiryModal={handleOpenInquiryModal}
            onNavigateToEvaluator={() => handleNavigate('evaluator')}
            onNavigateToCommunities={() => handleNavigate('communities')}
            onUpdateCreator={selectedCreator ? () => {} : handleUpdateCurrentUser}
            isShortlisted={shortlisted[(selectedCreator || currentUser).id]}
            onToggleShortlist={handleToggleShortlist}
            connections={connections}
            onToggleConnect={handleToggleConnect}
            joinedCommunities={joinedCommunities}
            allCommunities={COMMUNITIES}
          />
        )}

        {isAuthenticated && activeTab === 'messages' && (
          <MessagesView 
            userRole={userRole}
            isAnonymousRecruiter={isAnonymousRecruiter}
          />
        )}
      </main>

      {/* Account Authentication & Minimal Profile Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onRegisterAccount={handleRegisterAccount}
        onLoginAccount={handleLoginAccount}
        onNavigateToProfile={() => handleNavigate('profile')}
        onNavigateToFeed={() => handleNavigate('feed')}
      />

      {/* Opportunity Inquiry Modal */}
      {isInquiryModalOpen && inquiryTargetCreator && (
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
        paddingBottom: '32px',
        borderTop: '1px solid var(--border-color)',
        textAlign: 'center',
        color: 'var(--text-secondary)',
        fontSize: '0.82rem'
      }}>
        <div style={{ fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#ffffff', letterSpacing: '-0.02em', fontSize: '1.05rem', marginBottom: '4px' }}>
          FOUNDLY
        </div>
        <p style={{ fontWeight: '600', color: '#a5b4fc' }}>beyond followers. beyond connections.</p>
        <p style={{ fontSize: '0.75rem', marginTop: '6px', color: 'var(--text-muted)' }}>
          Foundly Skill Engine & Creator Ecosystem • Prototype Validation Build
        </p>
      </footer>

    </div>
  );
}
