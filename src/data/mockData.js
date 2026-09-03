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

export const CREATORS = [
  {
    id: 'rahul-singh',
    name: 'Rahul Sharma',
    handle: '@rahul_singh_voice',
    location: 'Kolkata, India',
    category: 'music',
    categoryLabel: 'Singer & Songwriter',
    followers: 300,
    following: 112,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    bio: 'Independent acoustic singer from Kolkata blending Indian classical thumri with modern acoustic pop. Seeking music label & producer collaborations.',
    overallScore: 8.5,
    parameters: {
      voiceQuality: 8.7,
      pitchAccuracy: 9.1,
      expression: 8.4,
      originality: 7.8,
      commercialAppeal: 8.2
    },
    aiFeedback: 'Rahul demonstrates world-class pitch accuracy (9.1) with remarkable resonance in the mid-high vocal spectrum. His pitch stability across microtonal transitions is exceptionally refined. Recommend exploring vocal projection dynamics during rapid tempo changes.',
    skillsGraphData: [
      { month: 'Jan', score: 7.8 },
      { month: 'Mar', score: 8.0 },
      { month: 'May', score: 8.2 },
      { month: 'Jul', score: 8.4 },
      { month: 'Sep', score: 8.5 }
    ],
    highlightWorkTitle: 'Kolkata Rain Acoustic Session (Live 2-Min Sample)',
    audioSampleUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3'
  },
  {
    id: 'ananya-design',
    name: 'Ananya Roy',
    handle: '@ananya_ui_ux',
    location: 'Jaipur, India',
    category: 'design',
    categoryLabel: 'UI/UX & Product Designer',
    followers: 140,
    following: 89,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    bio: 'Spatial interface designer crafting futuristic glassmorphic UI systems and accessible design component libraries.',
    overallScore: 9.0,
    parameters: {
      visualComposition: 9.2,
      creativity: 8.8,
      typography: 8.9,
      technicalExecution: 9.1,
      brandCommunication: 9.0
    },
    aiFeedback: 'Exceptional hierarchy and spatial grid discipline (9.2). Color contrast compliance (WCAG AAA) is flawless across dark backgrounds. Typography scaling exhibits geometric precision.',
    skillsGraphData: [
      { month: 'Jan', score: 8.3 },
      { month: 'Mar', score: 8.6 },
      { month: 'May', score: 8.8 },
      { month: 'Jul', score: 8.9 },
      { month: 'Sep', score: 9.0 }
    ],
    highlightWorkTitle: 'Neomorphic FinTech Mobile Dashboard & Design System'
  },
  {
    id: 'vikram-dev',
    name: 'Vikram Mehta',
    handle: '@vikram_builds',
    location: 'Bhopal, India',
    category: 'technology',
    categoryLabel: 'Full-Stack & Rust Engineer',
    followers: 85,
    following: 45,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    bio: 'Systems software developer building low-latency microservices, WebAssembly plugins, and real-time audio analysis algorithms.',
    overallScore: 9.3,
    parameters: {
      codeQuality: 9.5,
      problemSolving: 9.4,
      efficiency: 9.2,
      architecture: 9.1,
      technicalImplementation: 9.3
    },
    aiFeedback: 'Memory safety & concurrency handling in compiled rust benchmark tests scored near maximum efficiency (9.5). Zero memory leaks detected; benchmark throughput exceeded industry average by 42%.',
    skillsGraphData: [
      { month: 'Jan', score: 8.7 },
      { month: 'Mar', score: 8.9 },
      { month: 'May', score: 9.1 },
      { month: 'Jul', score: 9.2 },
      { month: 'Sep', score: 9.3 }
    ],
    highlightWorkTitle: 'High-Throughput Audio DSP Pipeline in Rust'
  },
  {
    id: 'influencer-a',
    name: 'Singer A (Trending)',
    handle: '@singer_a_official',
    location: 'Mumbai, India',
    category: 'music',
    categoryLabel: 'Pop Vocalist & Influencer',
    followers: 100000,
    following: 950,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    bio: 'Social media star with 100k followers across social platforms. Pop covers, lifestyle vlogs & brand collabs.',
    overallScore: 6.8,
    parameters: {
      voiceQuality: 6.8,
      pitchAccuracy: 6.5,
      expression: 7.2,
      originality: 6.4,
      commercialAppeal: 9.1
    },
    aiFeedback: 'High social engagement and commercial familiarity (9.1). However, pitch correction analysis reveals heavy auto-tune reliance and moderate pitch drift (-35 cents) on sustained acoustic notes.',
    skillsGraphData: [
      { month: 'Jan', score: 6.7 },
      { month: 'Mar', score: 6.8 },
      { month: 'May', score: 6.7 },
      { month: 'Jul', score: 6.8 },
      { month: 'Sep', score: 6.8 }
    ],
    highlightWorkTitle: 'Acoustic Studio Pop Cover'
  }
];

export const INITIAL_POSTS = [
  {
    id: 'post-1',
    creatorId: 'rahul-singh',
    timestamp: '2 hours ago',
    caption: 'Recorded a fresh 2-minute vocal take in Kolkata. Blending classical Raag Bhairavi ornaments into an acoustic ballad setup. Feedback and producer collabs welcome! 🎤✨',
    category: 'music',
    mediaType: 'audio',
    mediaUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=acoustic-guitars-ambient-112108.mp3',
    audioTitle: 'Kolkata Rain Acoustic Session (2-Min Live Take)',
    likes: 42,
    commentsCount: 9,
    shares: 5,
    aiAnalysis: {
      overall: 8.5,
      badgeText: 'Top 5% Voice Precision',
      parameters: [
        { label: 'Voice Quality', score: 8.7 },
        { label: 'Pitch Accuracy', score: 9.1 },
        { label: 'Expression', score: 8.4 },
        { label: 'Originality', score: 7.8 },
        { label: 'Commercial Appeal', score: 8.2 }
      ],
      insight: 'Pitch accuracy is in the 95th percentile among acoustic indie vocalists.'
    },
    comments: [
      { id: 'c1', author: 'Neha Verma', text: 'That vocal pitch at 0:45 gave me goosebumps! AI score is so well deserved.' },
      { id: 'c2', author: 'Music Producer X (Verified)', text: 'Interested in sending a track demo over DM. Great pitch control.' }
    ]
  },
  {
    id: 'post-2',
    creatorId: 'ananya-design',
    timestamp: '5 hours ago',
    caption: 'Finished redesigning an AI Talent Dashboard with dark glassmorphic design principles. Focus on high visual hierarchy and dark mode contrast.',
    category: 'design',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    likes: 38,
    commentsCount: 4,
    shares: 8,
    aiAnalysis: {
      overall: 9.0,
      badgeText: 'Top 2% Design Hierarchy',
      parameters: [
        { label: 'Visual Composition', score: 9.2 },
        { label: 'Creativity', score: 8.8 },
        { label: 'Typography', score: 8.9 },
        { label: 'Technical Execution', score: 9.1 },
        { label: 'Brand Communication', score: 9.0 }
      ],
      insight: 'Flawless grid alignment with zero visual clutter.'
    },
    comments: [
      { id: 'c3', author: 'DevStudio Inc.', text: 'The typography ratio is super crisp!' }
    ]
  },
  {
    id: 'post-3',
    creatorId: 'vikram-dev',
    timestamp: '1 day ago',
    caption: 'Created a zero-dependency WebAudio FFT visualizer written in Rust + WebAssembly. Runs at 120 FPS with minimal CPU overhead.',
    category: 'technology',
    mediaType: 'code',
    codeSnippet: `// WebAssembly Audio DSP Kernel in Rust
#[wasm_bindgen]
pub struct FastFourierEngine {
    fft_size: usize,
    window_buffer: Vec<f32>,
}

#[wasm_bindgen]
impl FastFourierEngine {
    pub fn compute_magnitude(&mut self, input: &[f32]) -> Vec<f32> {
        // Zero allocations in hot audio loop
        let mut output = vec![0.0; self.fft_size / 2];
        for i in 0..output.len() {
            output[i] = (input[i] * self.window_buffer[i]).abs();
        }
        output
    }
}`,
    likes: 29,
    commentsCount: 6,
    shares: 12,
    aiAnalysis: {
      overall: 9.3,
      badgeText: 'Top 1% Code Efficiency',
      parameters: [
        { label: 'Code Quality', score: 9.5 },
        { label: 'Problem Solving', score: 9.4 },
        { label: 'Efficiency', score: 9.2 },
        { label: 'Architecture', score: 9.1 },
        { label: 'Implementation', score: 9.3 }
      ],
      insight: 'Zero allocation hot loop ensures 60+ FPS audio buffer processing without garbage collection pauses.'
    },
    comments: [
      { id: 'c4', author: 'Tech Recruiter', text: 'Impressive memory management in Rust. Check your messages!' }
    ]
  }
];
