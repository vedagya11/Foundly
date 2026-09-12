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
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { 
  getCurrentUserSession, signOutUser, fetchAllProfiles, 
  fetchPosts, createPostInSupabase, fetchCommunities, 
  toggleCommunityJoinInSupabase, fetchUserJoinedCommunities,
  fetchUserConnections, toggleConnectionInSupabase, updateUserProfile
} from './services/api';
import { COMMUNITIES, INITIAL_POSTS, SAMPLE_USERS_SEED } from './data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState('creator'); // 'creator' | 'provider'
  
  const isAuthenticated = Boolean(currentUser);
  
  const [activeTab, setActiveTab] = useState('landing');
  const [isAnonymousRecruiter, setIsAnonymousRecruiter] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState('signup');
  
  // Real-time Supabase Data State
  const [creatorsList, setCreatorsList] = useState(SAMPLE_USERS_SEED);
  const [communitiesList, setCommunitiesList] = useState(COMMUNITIES);
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [connections, setConnections] = useState({});
  const [joinedCommunities, setJoinedCommunities] = useState({});
  
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [shortlisted, setShortlisted] = useState({});

  // Inquiry Modal State
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetCreator, setInquiryTargetCreator] = useState(null);
  const [unreadCount, setUnreadCount] = useState(1);

  // 1. Initial Load & Supabase Auth Listener
  useEffect(() => {
    async function initSession() {
      // Fetch initial datasets
      const [profiles, dbPosts, dbCommunities] = await Promise.all([
        fetchAllProfiles(),
        fetchPosts(),
        fetchCommunities()
      ]);

      setCreatorsList(profiles);
      setPosts(dbPosts);
      setCommunitiesList(dbCommunities);

      if (isSupabaseConfigured && supabase) {
        const sessionUser = await getCurrentUserSession();
        if (sessionUser) {
          setCurrentUser(sessionUser);
          setActiveTab('feed');
          
          const [userConn, userComm] = await Promise.all([
            fetchUserConnections(sessionUser.id),
            fetchUserJoinedCommunities(sessionUser.id)
          ]);
          setConnections(userConn);
          setJoinedCommunities(userComm);
        }

        // Listen for Auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (session?.user) {
            const userProfile = await getCurrentUserSession();
            setCurrentUser(userProfile);
          } else {
            setCurrentUser(null);
          }
        });

        return () => authListener?.subscription?.unsubscribe();
      }
    }

    initSession();
  }, []);

  // Refresh feed posts helper
  const reloadPosts = async () => {
    const updatedPosts = await fetchPosts();
    setPosts(updatedPosts);
  };

  // Refresh creators helper
  const reloadCreators = async () => {
    const updatedProfiles = await fetchAllProfiles();
    setCreatorsList(updatedProfiles);
  };

  // AUTHENTICATION HANDLERS
  const handleRegisterAccount = async (newUser) => {
    setCurrentUser(newUser);
    setUserRole(newUser.role || 'creator');
    setActiveTab('feed');
    await reloadCreators();
  };

  const handleLoginAccount = (email, password) => {
    const matchedUser = creatorsList.find(
      u => u.email && u.email.toLowerCase() === email.toLowerCase()
    );

    if (matchedUser) {
      setCurrentUser(matchedUser);
      setUserRole(matchedUser.role || 'creator');
      setActiveTab('feed');
      return true;
    }
    return false;
  };

  const handleLogoutAccount = async () => {
    await signOutUser();
    setCurrentUser(null);
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
  const handleToggleConnect = async (targetUserId) => {
    if (!currentUser) {
      handleOpenAuth('signup');
      return;
    }

    const currentStatus = connections[targetUserId];
    setConnections(prev => {
      let nextStatus = 'pending';
      if (currentStatus === 'pending') nextStatus = 'connected';
      else if (currentStatus === 'connected') nextStatus = undefined;
      
      const updated = { ...prev };
      if (!nextStatus) delete updated[targetUserId];
      else updated[targetUserId] = nextStatus;
      return updated;
    });

    await toggleConnectionInSupabase(currentUser.id, targetUserId, currentStatus);
  };

  const handleToggleJoinCommunity = async (communityId) => {
    if (!currentUser) {
      handleOpenAuth('signup');
      return;
    }

    const isJoined = joinedCommunities[communityId];
    setJoinedCommunities(prev => ({
      ...prev,
      [communityId]: !isJoined
    }));

    await toggleCommunityJoinInSupabase(communityId, currentUser.id, isJoined);
  };

  const handleToggleShortlist = (creatorId) => {
    setShortlisted(prev => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };

  const handleOpenInquiryModal = (creator) => {
    setInquiryTargetCreator(creator || creatorsList[0]);
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

  const handleUpdateCurrentUser = async (updatedProfile) => {
    if (!currentUser) return;
    setCurrentUser(updatedProfile);
    await updateUserProfile(currentUser.id, updatedProfile);
    await reloadCreators();
  };

  const handlePublishPost = async ({ caption, category }) => {
    if (!currentUser) return;

    const newPostObj = {
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
        insight: currentUser.bio || 'Demonstrated execution in core category parameters.'
      } : null,
      comments: []
    };

    setPosts([newPostObj, ...posts]);

    await createPostInSupabase({
      authorId: currentUser.id,
      content: caption,
      category: category || currentUser.category || 'technology',
      aiAnalysis: newPostObj.aiAnalysis
    });

    await reloadPosts();
  };

  const handlePublishToFeedFromEvaluator = async (evalResult) => {
    if (!currentUser) return;

    const scoreVal = evalResult.overallScore || 8.7;
    
    // Update currentUser profile score
    const updatedUser = {
      ...currentUser,
      overallScore: scoreVal,
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

    await handleUpdateCurrentUser(updatedUser);

    await handlePublishPost({
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
            communities={communitiesList}
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
            communities={communitiesList}
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
            allCommunities={communitiesList}
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
          Foundly Skill Engine & Supabase Multi-User Backend • Prototype Validation Build
        </p>
      </footer>

    </div>
  );
}
