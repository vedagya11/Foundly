// Seed Dataset for Foundly Platform

export const CATEGORIES = [
  {
    id: 'music',
    name: 'Music & Vocalists',
    icon: 'Music',
    description: 'Singers, Producers, Songwriters, Instrumentalists',
    parameters: [
      { key: 'voiceQuality', label: 'Voice Quality', weight: 0.25 },
      { key: 'pitchAccuracy', label: 'Pitch Accuracy', weight: 0.25 },
      { key: 'expression', label: 'Expression', weight: 0.20 },
      { key: 'originality', label: 'Originality', weight: 0.15 },
      { key: 'commercialAppeal', label: 'Commercial Appeal', weight: 0.15 }
    ]
  },
  {
    id: 'design',
    name: 'Design & Visual Arts',
    icon: 'Palette',
    description: 'UI/UX Designers, Graphic Artists, 3D Animators',
    parameters: [
      { key: 'visualComposition', label: 'Visual Composition', weight: 0.25 },
      { key: 'creativity', label: 'Creativity', weight: 0.20 },
      { key: 'typography', label: 'Typography', weight: 0.20 },
      { key: 'technicalExecution', label: 'Technical Execution', weight: 0.20 },
      { key: 'brandCommunication', label: 'Brand Communication', weight: 0.15 }
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Code',
    icon: 'Code',
    description: 'Developers, AI/ML Engineers, Systems Architects',
    parameters: [
      { key: 'codeQuality', label: 'Code Quality', weight: 0.25 },
      { key: 'problemSolving', label: 'Problem Solving', weight: 0.25 },
      { key: 'efficiency', label: 'Efficiency & Speed', weight: 0.20 },
      { key: 'architecture', label: 'Architecture & Design', weight: 0.15 },
      { key: 'technicalImplementation', label: 'Implementation', weight: 0.15 }
    ]
  },
  {
    id: 'entertainment',
    name: 'Film & Media',
    icon: 'Film',
    description: 'Filmmakers, Editors, Actors, Directors',
    parameters: [
      { key: 'narrativePacing', label: 'Narrative Pacing', weight: 0.25 },
      { key: 'visualStorytelling', label: 'Visual Storytelling', weight: 0.25 },
      { key: 'lightingColor', label: 'Color & Lighting', weight: 0.20 },
      { key: 'soundDesign', label: 'Audio Sound Design', weight: 0.15 },
      { key: 'audienceEngagement', label: 'Engagement Impact', weight: 0.15 }
    ]
  },
  {
    id: 'writing',
    name: 'Creative Writing',
    icon: 'Feather',
    description: 'Poets, Screenwriters, Copywriters, Authors',
    parameters: [
      { key: 'linguisticDepth', label: 'Linguistic Depth', weight: 0.25 },
      { key: 'emotionalResonance', label: 'Emotional Resonance', weight: 0.25 },
      { key: 'structureFlow', label: 'Structure & Flow', weight: 0.20 },
      { key: 'originalConcept', label: 'Original Concept', weight: 0.15 },
      { key: 'engagementValue', label: 'Reader Engagement', weight: 0.15 }
    ]
  }
];

export const SAMPLE_USERS_SEED = [
  {
    id: 'aarav-music',
    email: 'aarav@foundly.ai',
    name: 'Aarav Mehta',
    username: '@aarav_beats',
    handle: '@aarav_beats',
    location: 'Mumbai, India',
    category: 'music',
    categoryLabel: 'Music Producer & Vocalist',
    followers: 450,
    following: 210,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Electronic music producer & indie acoustic arranger mixing ambient synths with traditional Indian strings.',
    overallScore: 8.7,
    parameters: {
      voiceQuality: 8.6,
      pitchAccuracy: 8.9,
      expression: 8.8,
      originality: 8.5,
      commercialAppeal: 8.7
    },
    topSkills: ['Logic Pro', 'Vocal Processing', 'Acoustic Guitar', 'Mixing & Mastering'],
    aiFeedback: 'Exceptional dynamic range control and clean vocal pitch locking (8.9). Harmonization layers display zero phase cancellation.',
    skillsGraphData: [
      { month: 'Jan', score: 8.1 },
      { month: 'Mar', score: 8.3 },
      { month: 'May', score: 8.5 },
      { month: 'Jul', score: 8.6 },
      { month: 'Sep', score: 8.7 }
    ],
    highlightWorkTitle: 'Midnight Ambient Acoustic Sessions',
    audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3',
    work: [
      {
        id: 'w-aarav-1',
        title: 'Midnight Ambient Acoustic Sessions',
        description: 'Analyzed acoustic guitar and vocal harmony track.',
        score: 8.7,
        date: 'Aug 2026'
      }
    ]
  },
  {
    id: 'ananya-design',
    email: 'ananya@foundly.ai',
    name: 'Ananya Roy',
    username: '@ananya_ui_ux',
    handle: '@ananya_ui_ux',
    location: 'Jaipur, India',
    category: 'design',
    categoryLabel: 'UI/UX & Product Designer',
    followers: 620,
    following: 140,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    bio: 'Spatial interface designer crafting glassmorphic UI systems, micro-interactions, and accessible component libraries.',
    overallScore: 9.1,
    parameters: {
      visualComposition: 9.3,
      creativity: 9.0,
      typography: 9.1,
      technicalExecution: 9.2,
      brandCommunication: 8.9
    },
    topSkills: ['Figma Design Systems', 'Glassmorphism', 'Design Tokens', 'Prototyping'],
    aiFeedback: 'Exceptional hierarchy and visual grid discipline (9.3). Contrast compliance (WCAG AAA) is flawless across dark interfaces.',
    skillsGraphData: [
      { month: 'Jan', score: 8.4 },
      { month: 'Mar', score: 8.7 },
      { month: 'May', score: 8.9 },
      { month: 'Jul', score: 9.0 },
      { month: 'Sep', score: 9.1 }
    ],
    highlightWorkTitle: 'Neomorphic Dark Glass Design System',
    work: [
      {
        id: 'w-ananya-1',
        title: 'Neomorphic Dark Glass Design System',
        description: 'Glassmorphic component tokens & WCAG AAA UI system.',
        score: 9.1,
        date: 'Jul 2026'
      }
    ]
  },
  {
    id: 'rohan-ml',
    email: 'rohan@foundly.ai',
    name: 'Rohan Sharma',
    username: '@rohan_ai_dev',
    handle: '@rohan_ai_dev',
    location: 'Bengaluru, India',
    category: 'technology',
    categoryLabel: 'ML Engineer & Backend Dev',
    followers: 380,
    following: 180,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    bio: 'Building real-time audio FFT parsers, PyTorch recommendation engines, and low-latency API pipelines.',
    overallScore: 8.5,
    parameters: {
      codeQuality: 8.8,
      problemSolving: 8.6,
      efficiency: 8.4,
      architecture: 8.3,
      technicalImplementation: 8.6
    },
    topSkills: ['PyTorch', 'Python', 'FastAPI', 'Audio Signal Processing', 'Vector DBs'],
    aiFeedback: 'Robust memory safety and efficient tensor transformations. Signal processing latency under 12ms.',
    skillsGraphData: [
      { month: 'Jan', score: 7.9 },
      { month: 'Mar', score: 8.1 },
      { month: 'May', score: 8.3 },
      { month: 'Jul', score: 8.4 },
      { month: 'Sep', score: 8.5 }
    ],
    highlightWorkTitle: 'Real-Time Audio Spectrum Feature Extraction in PyTorch',
    work: [
      {
        id: 'w-rohan-1',
        title: 'Real-Time Audio Spectrum Feature Extraction',
        description: 'High-speed audio DSP tensor transformation pipeline.',
        score: 8.5,
        date: 'Sep 2026'
      }
    ]
  },
  {
    id: 'priya-writer',
    email: 'priya@foundly.ai',
    name: 'Priya Nambiar',
    username: '@priya_words',
    handle: '@priya_words',
    location: 'Kochi, India',
    category: 'writing',
    categoryLabel: 'Screenwriter & Narrative Designer',
    followers: 290,
    following: 115,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    bio: 'Storyteller writing psychological thrillers and interactive narrative scripts for modern cinema & gaming.',
    overallScore: 8.8,
    parameters: {
      linguisticDepth: 9.0,
      emotionalResonance: 8.9,
      structureFlow: 8.7,
      originalConcept: 8.8,
      engagementValue: 8.6
    },
    topSkills: ['Screenwriting', 'Worldbuilding', 'Dialogue Pacing', 'Character Development'],
    aiFeedback: 'Strong dialogue cadence and emotional payoff beats. Scene transition flow scored in the 90th percentile.',
    skillsGraphData: [
      { month: 'Jan', score: 8.2 },
      { month: 'Mar', score: 8.4 },
      { month: 'May', score: 8.6 },
      { month: 'Jul', score: 8.7 },
      { month: 'Sep', score: 8.8 }
    ],
    highlightWorkTitle: 'Shadows of Malabar: Short Film Screenplay'
  },
  {
    id: 'rahul-singh',
    email: 'rahul@foundly.ai',
    name: 'Rahul Sharma',
    username: '@rahul_singh_voice',
    handle: '@rahul_singh_voice',
    location: 'Kolkata, India',
    category: 'music',
    categoryLabel: 'Singer & Songwriter',
    followers: 300,
    following: 112,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Independent acoustic singer from Kolkata blending Indian classical thumri with modern acoustic pop.',
    overallScore: 8.5,
    parameters: {
      voiceQuality: 8.7,
      pitchAccuracy: 9.1,
      expression: 8.4,
      originality: 7.8,
      commercialAppeal: 8.2
    },
    topSkills: ['Classical Indian Vocals', 'Acoustic Guitar', 'Live Improvisation'],
    aiFeedback: 'Rahul demonstrates world-class pitch accuracy (9.1) with remarkable resonance in the mid-high vocal spectrum.',
    skillsGraphData: [
      { month: 'Jan', score: 7.8 },
      { month: 'Mar', score: 8.0 },
      { month: 'May', score: 8.2 },
      { month: 'Jul', score: 8.4 },
      { month: 'Sep', score: 8.5 }
    ],
    highlightWorkTitle: 'Kolkata Rain Acoustic Session (Live 2-Min Take)',
    audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3'
  }
];

export const CREATORS = SAMPLE_USERS_SEED;

export const COMMUNITIES = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    membersCount: '12.4K',
    category: 'Technology',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Discuss LLMs, PyTorch models, computer vision tools, and practical ML engineering applications.'
  },
  {
    id: 'designers-collective',
    name: 'Designers Collective',
    membersCount: '8.2K',
    category: 'Design',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    description: 'Share work, critique interface designs, explore typography, and build design systems together.'
  },
  {
    id: 'indie-builders',
    name: 'Indie Builders',
    membersCount: '5.7K',
    category: 'Startups',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    description: 'Build in public, share product progress, discuss bootstrapping tech startups, and find co-creators.'
  },
  {
    id: 'music-producers',
    name: 'Music Producers & Vocalists',
    membersCount: '4.1K',
    category: 'Music',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: 'Share track stems, collaborate on vocal takes, give feedback on mixes, and improve your craft.'
  },
  {
    id: 'creative-writers',
    name: 'Creative Writers Studio',
    membersCount: '3.2K',
    category: 'Writing',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    description: 'Screenwriting workshops, prose feedback, character development, and narrative craft discussions.'
  },
  {
    id: 'film-media',
    name: 'Film & Visual Media Lab',
    membersCount: '2.9K',
    category: 'Film',
    coverImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    description: 'Color grading techniques, video editing showcases, camera gear discussions, and film breakdowns.'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    creatorId: 'ananya-design',
    creatorName: 'Ananya Roy',
    creatorHandle: '@ananya_ui_ux',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    timestamp: '3 hours ago',
    caption: 'Redesigned our dark glassmorphic component system. Focused on high visual contrast, WCAG AAA accessibility, and smooth micro-interactions.',
    category: 'design',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    likes: 45,
    commentsCount: 2,
    shares: 9,
    aiAnalysis: {
      overall: 9.1,
      badgeText: 'Top 1% Design Hierarchy',
      parameters: [
        { label: 'Visual Composition', score: 9.3 },
        { label: 'Typography', score: 9.1 },
        { label: 'Execution', score: 9.2 }
      ],
      insight: 'Flawless grid alignment with zero visual clutter and crisp visual contrast.'
    },
    comments: [
      { id: 'c1', author: 'Aarav Mehta', text: 'The glass panel border shadows look super clean!' }
    ]
  },
  {
    id: 'post-2',
    creatorId: 'aarav-music',
    creatorName: 'Aarav Mehta',
    creatorHandle: '@aarav_beats',
    creatorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    timestamp: '5 hours ago',
    caption: 'Recorded an acoustic guitar arrangement in C major. Layered ambient vocal pads over subtle synth arpeggios. Looking for feedback!',
    category: 'music',
    mediaType: 'audio',
    mediaUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3',
    audioTitle: 'Midnight Acoustic Take (2-Min Live Sample)',
    likes: 52,
    commentsCount: 1,
    shares: 11,
    aiAnalysis: {
      overall: 8.7,
      badgeText: 'Top 5% Voice Precision',
      parameters: [
        { label: 'Voice Quality', score: 8.6 },
        { label: 'Pitch Accuracy', score: 8.9 },
        { label: 'Expression', score: 8.8 }
      ],
      insight: 'Pitch stability across transitions is exceptionally refined.'
    },
    comments: [
      { id: 'c3', author: 'Rahul Sharma', text: 'Beautiful vocal dynamics at 1:12! Loved the acoustic tone.' }
    ]
  }
];

export const COMMUNITY_DISCUSSIONS = {
  'ai-ml': [
    {
      id: 'disc-1',
      communityId: 'ai-ml',
      authorName: 'Rohan Sharma',
      authorHandle: '@rohan_ai_dev',
      authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      timestamp: '2 hours ago',
      title: 'Best approach for low-latency audio feature extraction in Python?',
      content: 'I am building a live pitch detection pipeline. Librosa is accurate but a bit slow for real-time streaming. Are you guys using PyTorch audio or custom C++ bindings?',
      likes: 14,
      comments: [
        { id: 'cm1', author: 'Sarah Jenkins', text: 'We use PyTorch Audio C++ API wrapped in FastAPI, works reliably under 15ms latency.' }
      ]
    }
  ],
  'designers-collective': [
    {
      id: 'disc-2',
      communityId: 'designers-collective',
      authorName: 'Ananya Roy',
      authorHandle: '@ananya_ui_ux',
      authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      timestamp: '4 hours ago',
      title: 'Design System Checklist for Dark Mode Glassmorphism',
      content: 'When designing glassmorphic dark UI, always ensure background surfaces have a subtle 1px border with 10-15% white opacity to define elevation without relying on heavy dropshadows.',
      likes: 38,
      comments: []
    }
  ]
};

export const COMMUNITY_RESOURCES = {
  'ai-ml': [
    { id: 'r1', title: 'Understanding Transformers & Attention Mechanisms', category: 'Guide', readTime: '10 min read', url: '#' },
    { id: 'r2', title: 'PyTorch Real-Time Audio DSP Pipeline Benchmark', category: 'Repository', readTime: 'Code Repo', url: '#' }
  ],
  'designers-collective': [
    { id: 'r3', title: 'Figma Design Tokens & Variables Masterclass', category: 'Video Guide', readTime: '12 min video', url: '#' },
    { id: 'r4', title: 'WCAG AAA Dark Mode Accessibility Audit Checklist', category: 'Documentation', readTime: '5 min read', url: '#' }
  ]
};
