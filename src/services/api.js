import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SAMPLE_USERS_SEED, COMMUNITIES, INITIAL_POSTS } from '../data/mockData';

// Helper to sanitize Supabase error or fallback to mock
function handleSupabaseError(error, context) {
  if (error) {
    console.warn(`[Supabase API Warning - ${context}]:`, error.message);
  }
}

// 1. AUTHENTICATION SERVICES
export async function signUpUser({ email, password, name, username, category, avatar, bio, location, interests }) {
  if (!isSupabaseConfigured || !supabase) {
    // Local / Offline Fallback
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      name,
      username: username.startsWith('@') ? username : `@${username}`,
      category: category || 'technology',
      categoryLabel: category === 'design' ? 'Design & Visual Arts' : 'Technology / AI',
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: bio || '',
      location: location || '',
      interests: interests || [],
      work: [],
      overallScore: null,
      created_at: new Date().toISOString()
    };
    return { user: mockUser, error: null };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name, username, category, avatar, bio, location, interests }
    }
  });

  if (error) return { user: null, error };

  if (data.user) {
    // Upsert explicit profile record
    const profileObj = {
      id: data.user.id,
      email,
      name,
      username: username.startsWith('@') ? username : `@${username}`,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      bio: bio || '',
      location: location || '',
      creator_category: category || 'technology',
      interests: interests || []
    };

    const { error: profileError } = await supabase.from('profiles').upsert(profileObj);
    handleSupabaseError(profileError, 'upsertProfile');
  }

  return { user: data.user, error: null };
}

export async function signInUser({ email, password }) {
  if (!isSupabaseConfigured || !supabase) {
    return { user: null, error: new Error('Supabase credentials not configured in environment variables.') };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { user: data?.user || null, session: data?.session || null, error };
}

export async function signOutUser() {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentUserSession() {
  if (!isSupabaseConfigured || !supabase) return null;
  const { data } = await supabase.auth.getSession();
  if (!data?.session?.user) return null;

  const user = data.session.user;
  const profile = await fetchUserProfile(user.id);
  return profile || { id: user.id, email: user.email, name: user.email.split('@')[0], username: `@${user.email.split('@')[0]}` };
}

// 2. PROFILES SERVICES
export async function fetchUserProfile(userId) {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    handleSupabaseError(error, 'fetchUserProfile');
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    name: data.name,
    username: data.username,
    handle: data.username,
    avatar: data.avatar,
    bio: data.bio,
    location: data.location,
    category: data.creator_category,
    categoryLabel: data.creator_category === 'music' ? 'Music & Vocalists' : data.creator_category === 'design' ? 'Design & Visual Arts' : 'Technology / AI',
    interests: data.interests || [],
    overallScore: data.overall_score,
    created_at: data.created_at
  };
}

export async function fetchAllProfiles() {
  if (!isSupabaseConfigured || !supabase) return SAMPLE_USERS_SEED;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return SAMPLE_USERS_SEED;
  }

  return data.map(p => ({
    id: p.id,
    email: p.email,
    name: p.name,
    username: p.username,
    handle: p.username,
    avatar: p.avatar,
    bio: p.bio,
    location: p.location,
    category: p.creator_category,
    categoryLabel: p.creator_category === 'music' ? 'Music & Vocalists' : p.creator_category === 'design' ? 'Design & Visual Arts' : 'Technology / AI',
    interests: p.interests || [],
    overallScore: p.overall_score,
    followers: 120,
    following: 45
  }));
}

export async function updateUserProfile(userId, profileData) {
  if (!isSupabaseConfigured || !supabase) return;

  const updates = {
    name: profileData.name,
    username: profileData.username,
    bio: profileData.bio,
    location: profileData.location,
    creator_category: profileData.category,
    interests: profileData.interests || [],
    overall_score: profileData.overallScore
  };

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);

  handleSupabaseError(error, 'updateUserProfile');
}

// 3. POSTS & FEED SERVICES
export async function fetchPosts() {
  if (!isSupabaseConfigured || !supabase) return INITIAL_POSTS;

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles!author_id(id, name, username, avatar, creator_category),
      comments(id, content, created_at, author:profiles!author_id(name)),
      post_likes(user_id)
    `)
    .order('created_at', { ascending: false });

  if (error || !data || data.length === 0) {
    return INITIAL_POSTS;
  }

  return data.map(p => ({
    id: p.id,
    creatorId: p.author_id,
    creatorName: p.author?.name || 'Creator',
    creatorHandle: p.author?.username || '@creator',
    creatorAvatar: p.author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
    timestamp: new Date(p.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    caption: p.content,
    category: p.category,
    mediaType: p.media_type,
    mediaUrl: p.media_url,
    codeSnippet: p.code_snippet,
    audioTitle: p.audio_title,
    aiAnalysis: p.ai_analysis,
    likes: (p.post_likes || []).length,
    commentsCount: (p.comments || []).length,
    comments: (p.comments || []).map(c => ({
      id: c.id,
      author: c.author?.name || 'User',
      text: c.content
    }))
  }));
}

export async function createPostInSupabase({ authorId, communityId, content, category, mediaType, mediaUrl, codeSnippet, audioTitle, aiAnalysis }) {
  if (!isSupabaseConfigured || !supabase) return null;

  const postRecord = {
    author_id: authorId,
    community_id: communityId || null,
    content,
    category: category || 'technology',
    media_type: mediaType || 'text',
    media_url: mediaUrl || null,
    code_snippet: codeSnippet || null,
    audio_title: audioTitle || null,
    ai_analysis: aiAnalysis || null
  };

  const { data, error } = await supabase.from('posts').insert(postRecord).select().single();
  handleSupabaseError(error, 'createPostInSupabase');
  return data;
}

export async function togglePostLikeInSupabase(postId, userId, isLiked) {
  if (!isSupabaseConfigured || !supabase) return;

  if (isLiked) {
    const { error } = await supabase
      .from('post_likes')
      .delete()
      .eq('post_id', postId)
      .eq('user_id', userId);
    handleSupabaseError(error, 'unlikePost');
  } else {
    const { error } = await supabase
      .from('post_likes')
      .insert({ post_id: postId, user_id: userId });
    handleSupabaseError(error, 'likePost');
  }
}

export async function addCommentToPostInSupabase(postId, authorId, content) {
  if (!isSupabaseConfigured || !supabase) return;

  const { error } = await supabase
    .from('comments')
    .insert({ post_id: postId, author_id: authorId, content });

  handleSupabaseError(error, 'addCommentToPost');
}

// 4. COMMUNITIES SERVICES
export async function fetchCommunities() {
  if (!isSupabaseConfigured || !supabase) return COMMUNITIES;

  const { data, error } = await supabase.from('communities').select('*');
  if (error || !data || data.length === 0) return COMMUNITIES;

  return data.map(c => ({
    id: c.id,
    name: c.name,
    description: c.description,
    category: c.category,
    membersCount: c.members_count,
    coverImage: c.image
  }));
}

export async function toggleCommunityJoinInSupabase(communityId, userId, isJoined) {
  if (!isSupabaseConfigured || !supabase) return;

  if (isJoined) {
    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('user_id', userId);
    handleSupabaseError(error, 'leaveCommunity');
  } else {
    const { error } = await supabase
      .from('community_members')
      .insert({ community_id: communityId, user_id: userId });
    handleSupabaseError(error, 'joinCommunity');
  }
}

export async function fetchUserJoinedCommunities(userId) {
  if (!isSupabaseConfigured || !supabase) return { 'ai-ml': true, 'designers-collective': true };

  const { data, error } = await supabase
    .from('community_members')
    .select('community_id')
    .eq('user_id', userId);

  if (error || !data) return {};

  const map = {};
  data.forEach(row => { map[row.community_id] = true; });
  return map;
}

// 5. CONNECTIONS SERVICES
export async function fetchUserConnections(userId) {
  if (!isSupabaseConfigured || !supabase) return { 'aarav-music': 'connected' };

  const { data, error } = await supabase
    .from('connections')
    .select('*')
    .or(`requester_id.eq.${userId},recipient_id.eq.${userId}`);

  if (error || !data) return {};

  const map = {};
  data.forEach(c => {
    const otherId = c.requester_id === userId ? c.recipient_id : c.requester_id;
    map[otherId] = c.status;
  });

  return map;
}

export async function toggleConnectionInSupabase(requesterId, recipientId, currentStatus) {
  if (!isSupabaseConfigured || !supabase) return;

  if (currentStatus === 'connected' || currentStatus === 'pending') {
    const { error } = await supabase
      .from('connections')
      .delete()
      .or(`and(requester_id.eq.${requesterId},recipient_id.eq.${recipientId}),and(requester_id.eq.${recipientId},recipient_id.eq.${requesterId})`);
    handleSupabaseError(error, 'deleteConnection');
  } else {
    const { error } = await supabase
      .from('connections')
      .insert({ requester_id: requesterId, recipient_id: recipientId, status: 'pending' });
    handleSupabaseError(error, 'createConnection');
  }
}
