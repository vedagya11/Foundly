import React, { useState } from 'react';
import { 
  Sparkles, Upload, Play, CheckCircle2, RefreshCw, Send, 
  Music, Palette, Code, Film, Feather, ShieldCheck, Eye, Info
} from 'lucide-react';

const EVALUATOR_CATEGORIES = [
  {
    id: 'technology',
    name: 'Technology & Code',
    icon: Code,
    description: 'Evaluates architecture, memory safety, code complexity, and algorithmic throughput.',
    parameters: [
      { key: 'codeQuality', label: 'Code Quality & Structure', desc: 'Modularity, readability, and syntax standards' },
      { key: 'problemSolving', label: 'Algorithmic Problem Solving', desc: 'Data structure choice and edge-case handling' },
      { key: 'efficiency', label: 'Performance & Complexity', desc: 'Time/space complexity and resource efficiency' },
      { key: 'architecture', label: 'System Architecture', desc: 'Design patterns, decoupled modules, and API design' },
      { key: 'technicalImplementation', label: 'Implementation Depth', desc: 'Test coverage and error resilience' }
    ]
  },
  {
    id: 'design',
    name: 'Design & Visual Arts',
    icon: Palette,
    description: 'Evaluates spatial hierarchy, contrast, typography, and visual execution.',
    parameters: [
      { key: 'visualComposition', label: 'Visual Composition', desc: 'Grid alignment, balance, and spatial flow' },
      { key: 'typography', label: 'Typography & Hierarchy', desc: 'Font pairing, kerning, and legibility' },
      { key: 'colorTheory', label: 'Color Harmony & Contrast', desc: 'Palette cohesion and accessibility ratios' },
      { key: 'technicalExecution', label: 'Technical Precision', desc: 'Vector cleanliness, asset resolution, and specs' },
      { key: 'brandCommunication', label: 'Brand & Product Clarity', desc: 'Message transmission and UX intent' }
    ]
  },
  {
    id: 'music',
    name: 'Music & Vocals',
    icon: Music,
    description: 'Evaluates vocal stability, pitch accuracy, expression, and production quality.',
    parameters: [
      { key: 'pitchAccuracy', label: 'Pitch Accuracy', desc: 'Interval precision & sustain stability' },
      { key: 'voiceQuality', label: 'Vocal Quality & Timbre', desc: 'Resonance, clarity, and breath control' },
      { key: 'expression', label: 'Artistic Expression', desc: 'Dynamics, emotional phrasing, and nuance' },
      { key: 'rhythmPrecision', label: 'Rhythm Precision', desc: 'Micro-timing and groove consistency' },
      { key: 'productionQuality', label: 'Production Quality', desc: 'Mix balance, frequency response, and acoustics' }
    ]
  },
  {
    id: 'film',
    name: 'Film & Media',
    icon: Film,
    description: 'Evaluates pacing, narrative framing, lighting, audio mix, and visual storytelling.',
    parameters: [
      { key: 'narrativePacing', label: 'Narrative Pacing & Cuts', desc: 'Temporal flow and edit rhythm' },
      { key: 'cinematography', label: 'Cinematography & Framing', desc: 'Shot composition and camera movement' },
      { key: 'audioDesign', label: 'Audio Design & Mixing', desc: 'Foley, dialogue clarity, and soundtrack balance' },
      { key: 'colorGrading', label: 'Color Grading & Mood', desc: 'Visual tone and chromatic consistency' },
      { key: 'storytelling', label: 'Storytelling Impact', desc: 'Emotional engagement and thematic execution' }
    ]
  },
  {
    id: 'writing',
    name: 'Creative Writing',
    icon: Feather,
    description: 'Evaluates narrative structure, tone consistency, vocabulary depth, and clarity.',
    parameters: [
      { key: 'structure', label: 'Narrative Architecture', desc: 'Pacing, plot/argument flow, and resolution' },
      { key: 'toneConsistency', label: 'Voice & Tone Consistency', desc: 'Stylistic discipline and emotional control' },
      { key: 'vocabularyDepth', label: 'Linguistic Precision', desc: 'Diction, sentence variety, and phrasing' },
      { key: 'clarity', label: 'Clarity & Coherence', desc: 'Conciseness and logical progression' },
      { key: 'originality', label: 'Originality & Resonance', desc: 'Conceptual freshness and thematic depth' }
    ]
  }
];

export default function AIEvaluator({ onPublishToFeed }) {
  const [selectedCategory, setSelectedCategory] = useState(EVALUATOR_CATEGORIES[0]);
  const [uploadFileName, setUploadFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setEvaluationResult(null);
  };

  const runEvaluation = (sampleType = null) => {
    const fileName = sampleType || uploadFileName || `${selectedCategory.name.replace(/\s+/g, '_')}_Submission.file`;
    setUploadFileName(fileName);
    setIsAnalyzing(true);
    setAnalysisStep(1);
    setEvaluationResult(null);

    setTimeout(() => setAnalysisStep(2), 700);
    setTimeout(() => setAnalysisStep(3), 1400);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      let params = {};
      let scoreNum = 8.7;
      let feedback = '';
      let detectedEvidence = [];

      if (selectedCategory.id === 'technology') {
        params = { codeQuality: 9.2, problemSolving: 8.9, efficiency: 8.8, architecture: 9.0, technicalImplementation: 8.6 };
        scoreNum = 8.9;
        feedback = 'Clean, modular architecture with high structural discipline. Function signatures follow clean scope isolation.';
        detectedEvidence = [
          'Zero heap allocation anomalies inside high-frequency execution loops',
          'Modular function decomposition with explicit type contract safety',
          'Clean error boundaries and non-blocking asynchronous flow'
        ];
      } else if (selectedCategory.id === 'design') {
        params = { visualComposition: 9.2, typography: 8.9, colorTheory: 9.1, technicalExecution: 9.0, brandCommunication: 8.8 };
        scoreNum = 9.0;
        feedback = 'Grid discipline and spatial composition score in top tier (9.2). Color contrast adheres strictly to WCAG AAA ratios.';
        detectedEvidence = [
          'WCAG AAA contrast compliance across all primary UI text nodes',
          'Strict 8pt grid alignment on all layout vectors and card components',
          'Consistent typographic scale using modern sans geometry'
        ];
      } else if (selectedCategory.id === 'music') {
        params = { pitchAccuracy: 9.1, voiceQuality: 8.7, expression: 8.4, rhythmPrecision: 8.9, productionQuality: 8.2 };
        scoreNum = 8.7;
        feedback = 'Exceptional pitch stability (9.1) in acoustic sustain range. Vocal timbre displays high clarity and natural resonance.';
        detectedEvidence = [
          'Maintained pitch accuracy ≥9.0 across sustained vocal takes',
          'Zero vocal strain detected during acoustic crescendo passages',
          'Clean stereo separation with minimal ambient noise floor'
        ];
      } else {
        params = selectedCategory.parameters.reduce((acc, p) => ({ ...acc, [p.key]: (8.2 + Math.random() * 1.2).toFixed(1) }), {});
        scoreNum = 8.6;
        feedback = 'Solid technical execution across core category metrics. Demonstrated strong consistency and thematic resonance.';
        detectedEvidence = [
          'High structural consistency across all evaluated content segments',
          'Strong original execution exceeding domain benchmark baselines'
        ];
      }

      setEvaluationResult({
        category: selectedCategory,
        fileName,
        overallScore: scoreNum,
        parameters: params,
        feedback,
        detectedEvidence,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2100);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '24px',
        background: 'var(--bg-surface)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--glow-primary)'
          }}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff' }}>Prototype Skill Analysis</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Submit your work to generate evidence-based skill insights. AI evaluation happens ONLY when you voluntarily submit work.
            </p>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          SELECT TALENT DISCIPLINE
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
          {EVALUATOR_CATEGORIES.map(cat => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: `1px solid ${isSelected ? 'var(--primary-purple)' : 'var(--border-color)'}`,
                  background: isSelected ? 'rgba(168, 85, 247, 0.15)' : 'var(--bg-surface)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <IconComp size={18} color={isSelected ? '#c084fc' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.88rem', fontWeight: '700' }}>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* What Foundly Evaluates Card */}
      <div className="glass-panel" style={{
        padding: '20px',
        marginBottom: '24px',
        background: 'var(--bg-elevated)'
      }}>
        <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#c084fc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={16} />
          <span>WHAT FOUNDLY EVALUATES FOR {selectedCategory.name.toUpperCase()}</span>
        </div>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          {selectedCategory.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {selectedCategory.parameters.map((p, idx) => (
            <div key={idx} style={{
              padding: '10px 12px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#ffffff' }}>{p.label}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Box */}
      <div className="glass-panel" style={{
        padding: '32px',
        textAlign: 'center',
        marginBottom: '24px',
        borderStyle: 'dashed'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <Upload size={22} color="#818cf8" />
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
          Upload Your {selectedCategory.name} Work
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto 20px auto' }}>
          Upload audio, video clips, UI design files, or code repositories for prototype skill extraction.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => runEvaluation()}
            disabled={isAnalyzing}
            className="btn-primary"
          >
            <Upload size={16} />
            Upload Work & Run Analysis
          </button>

          <button
            onClick={() => runEvaluation(`Demo_${selectedCategory.id}_Sample.file`)}
            disabled={isAnalyzing}
            className="btn-secondary"
          >
            <Play size={16} />
            Try Category Sample
          </button>
        </div>
      </div>

      {/* Analyzing Progress */}
      {isAnalyzing && (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
          <RefreshCw size={24} color="#c084fc" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
            Running Prototype Skill Analysis...
          </h4>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {analysisStep === 1 && '1. Parsing submission structure & category metadata...'}
            {analysisStep === 2 && '2. Evaluating parameter benchmarks...'}
            {analysisStep === 3 && '3. Extracting evidence proof points...'}
          </div>
        </div>
      )}

      {/* Output Results */}
      {evaluationResult && (
        <div className="glass-panel" style={{
          padding: '28px',
          marginBottom: '24px',
          border: '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-success)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PROTOTYPE SKILL ANALYSIS COMPLETED
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                {evaluationResult.fileName}
              </h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                DEMONSTRATED SKILL SCORE
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-success)', fontFamily: 'var(--font-heading)' }}>
                {evaluationResult.overallScore} <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/ 10</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Based on analyzed work</div>
            </div>
          </div>

          {/* Parameter Breakdown */}
          <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Category Skill Parameters
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '20px' }}>
            {selectedCategory.parameters.map((p, idx) => {
              const val = evaluationResult.parameters[p.key] || 8.5;
              return (
                <div key={idx} style={{ padding: '12px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>{p.label}</span>
                    <strong style={{ color: '#ffffff' }}>{val}</strong>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${(val / 10) * 100}%`, height: '100%', background: 'var(--primary-gradient)' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evidence Box */}
          <div className="evidence-card" style={{ marginBottom: '20px' }}>
            <div className="evidence-title">
              <CheckCircle2 size={15} />
              <span>EVIDENCE DETECTED ({evaluationResult.detectedEvidence.length} PROOF POINTS)</span>
            </div>
            <div className="evidence-list">
              {evaluationResult.detectedEvidence.map((item, idx) => (
                <div key={idx} className="evidence-item">
                  <span>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button className="btn-evidence-trigger" onClick={() => setShowEvidenceModal(!showEvidenceModal)}>
              <Eye size={14} />
              <span>{showEvidenceModal ? 'Hide Full Evidence Breakdown' : 'View Evidence Details →'}</span>
            </button>

            {showEvidenceModal && (
              <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <p style={{ fontStyle: 'italic', marginBottom: '6px', color: '#ffffff' }}>
                  "{evaluationResult.feedback}"
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onPublishToFeed(evaluationResult)}
              className="btn-primary"
            >
              <Send size={16} />
              Publish Work & Update Profile
            </button>
            <button 
              onClick={() => setEvaluationResult(null)}
              className="btn-secondary"
            >
              Analyze Another Work
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
