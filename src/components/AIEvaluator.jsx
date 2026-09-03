import React, { useState } from 'react';
import { Sparkles, Upload, Play, CheckCircle2, AlertCircle, RefreshCw, Send, Music, Palette, Code, Film, Feather, Award } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function AIEvaluator({ onPublishToFeed }) {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [uploadFileName, setUploadFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setEvaluationResult(null);
  };

  const runEvaluation = (sampleType = null) => {
    const fileName = sampleType || uploadFileName || `${selectedCategory.name}_Submission.mp3`;
    setUploadFileName(fileName);
    setIsAnalyzing(true);
    setAnalysisStep(1);
    setEvaluationResult(null);

    setTimeout(() => setAnalysisStep(2), 900);
    setTimeout(() => setAnalysisStep(3), 1800);
    setTimeout(() => {
      setIsAnalyzing(false);
      
      let params = {};
      let overall = 8.5;
      let feedback = '';
      let strengths = [];
      let improvements = [];

      if (selectedCategory.id === 'music') {
        params = {
          voiceQuality: 8.7,
          pitchAccuracy: 9.1,
          expression: 8.4,
          originality: 7.8,
          commercialAppeal: 8.2
        };
        overall = 8.5;
        feedback = 'Exceptional pitch stability (9.1) in acoustic range. Vocal timbre shows high clarity and natural resonance.';
        strengths = ['Near-perfect pitch accuracy on acoustic sustain', 'Rich warm vocal timbre in mid-register'];
        improvements = ['Focus on vocal projection dynamics during crescendo transitions'];
      } else if (selectedCategory.id === 'design') {
        params = {
          visualComposition: 9.2,
          creativity: 8.8,
          typography: 8.9,
          technicalExecution: 9.1,
          brandCommunication: 9.0
        };
        overall = 9.0;
        feedback = 'Grid discipline and visual composition score in the top tier (9.2). Color contrast follows spatial UI principles.';
        strengths = ['Flawless WCAG AAA contrast ratio', 'Geometric precision in typography scaling'];
        improvements = ['Explore dynamic motion transition specs for micro-interactions'];
      } else if (selectedCategory.id === 'technology') {
        params = {
          codeQuality: 9.5,
          problemSolving: 9.4,
          efficiency: 9.2,
          architecture: 9.1,
          technicalImplementation: 9.3
        };
        overall = 9.3;
        feedback = 'Clean, modular structure with zero memory leaks or red-flag complexity smells. Benchmark throughput is exceptional.';
        strengths = ['Zero allocations inside hot audio DSP loop', 'High memory safety in compiled Rust WebAssembly module'];
        improvements = ['Add comprehensive doc-comments for public API methods'];
      } else {
        params = selectedCategory.parameters.reduce((acc, p) => ({ ...acc, [p.key]: (8.0 + Math.random() * 1.5).toFixed(1) }), {});
        overall = 8.6;
        feedback = 'Solid technical execution across core category metrics. Demonstrated strong consistency and originality.';
        strengths = ['Consistent structural execution', 'Strong original concept delivery'];
        improvements = ['Polishing fine stylistic nuances for broader commercial appeal'];
      }

      setEvaluationResult({
        category: selectedCategory,
        fileName,
        overall,
        parameters: params,
        feedback,
        strengths,
        improvements,
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2800);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Music': return <Music size={20} />;
      case 'Palette': return <Palette size={20} />;
      case 'Code': return <Code size={20} />;
      case 'Film': return <Film size={20} />;
      case 'Feather': return <Feather size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(168, 85, 247, 0.15))', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>AI-Assisted Skill Evaluator</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Evaluate actual demonstrated work using domain-tailored skill parameters to gain AI Skill Insights.
            </p>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#e0e7ff', marginBottom: '12px' }}>
          Select Category / Talent Discipline:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: `1px solid ${selectedCategory.id === cat.id ? 'rgba(168, 85, 247, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
                background: selectedCategory.id === cat.id ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                color: selectedCategory.id === cat.id ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ color: selectedCategory.id === cat.id ? '#c084fc' : 'var(--text-muted)' }}>
                {getCategoryIcon(cat.icon)}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: selectedCategory.id === cat.id ? '#ffffff' : '#e2e8f0' }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {cat.parameters.length} Skill Parameters
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', marginBottom: '28px', borderStyle: 'dashed' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
          <Upload size={24} color="#818cf8" />
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>
          Upload Your {selectedCategory.name} Work
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 20px auto' }}>
          Upload audio, video clips, UI design files, or code repositories. Foundly AI will evaluate your work across 5 category parameters.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => runEvaluation()}
            disabled={isAnalyzing}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            <Upload size={18} />
            Simulate File Upload & Analyze
          </button>

          <button
            onClick={() => runEvaluation(`Demo_${selectedCategory.name}_Sample.mp3`)}
            disabled={isAnalyzing}
            className="btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            <Play size={18} />
            Try Pre-loaded Category Demo
          </button>
        </div>
      </div>

      {/* Animated AI Analysis State */}
      {isAnalyzing && (
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px', textAlign: 'center' }}>
          <RefreshCw size={28} color="#c084fc" style={{ animation: 'spin 1.5s linear infinite', margin: '0 auto 16px auto' }} />
          <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>
            Foundly AI Engine Analyzing Submission...
          </h4>
          
          <div style={{ maxWidth: '400px', margin: '0 auto 16px auto', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: analysisStep >= 1 ? '#38bdf8' : 'var(--text-dim)' }}>
              <CheckCircle2 size={14} /> 1. Extracting structural metadata & audio visual vectors...
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: analysisStep >= 2 ? '#38bdf8' : 'var(--text-dim)' }}>
              <CheckCircle2 size={14} /> 2. Evaluating parameter weights against benchmark dataset...
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: analysisStep >= 3 ? '#34d399' : 'var(--text-dim)' }}>
              <CheckCircle2 size={14} /> 3. Synthesizing AI Skill Insights & coaching feedback...
            </div>
          </div>
        </div>
      )}

      {/* AI Evaluation Output Results */}
      {evaluationResult && (
        <div className="glass-panel animate-fade-in" style={{ padding: '28px', marginBottom: '28px', border: '1px solid rgba(16, 185, 129, 0.4)', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(16, 185, 129, 0.1))' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                AI Analysis Completed • {evaluationResult.timestamp}
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
                {evaluationResult.fileName}
              </h3>
            </div>

            <div className="score-badge high" style={{ padding: '10px 20px', fontSize: '1.1rem' }}>
              <Award size={20} />
              <span>Overall Skill Rating: {evaluationResult.overall}/10</span>
            </div>
          </div>

          {/* 5 Category-Specific Skills */}
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#e0e7ff', marginBottom: '14px' }}>
            Category-Specific AI Skill Breakdown:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {selectedCategory.parameters.map((p, i) => {
              const val = evaluationResult.parameters[p.key] || 8.5;
              return (
                <div key={i} style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    <span>{p.label}</span>
                    <strong style={{ color: '#38bdf8' }}>{val}/10</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${(val / 10) * 100}%`, height: '100%', background: 'linear-gradient(to right, #4f46e5, #06b6d4)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths & Improvement Areas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <strong style={{ color: '#34d399', fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>
                ✓ Key Demonstrated Strengths:
              </strong>
              <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                {evaluationResult.strengths.map((s, idx) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '16px', borderRadius: '12px' }}>
              <strong style={{ color: '#fbbf24', fontSize: '0.88rem', display: 'block', marginBottom: '8px' }}>
                ⚡ Areas for Improvement:
              </strong>
              <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                {evaluationResult.improvements.map((imp, idx) => (
                  <li key={idx}>{imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feedback & Disclaimer */}
          <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: '700', fontSize: '0.88rem', marginBottom: '6px' }}>
              <Sparkles size={16} /> Qualitative AI Coaching & Feedback:
            </div>
            <p style={{ fontSize: '0.88rem', color: '#f1f5f9', lineHeight: '1.6' }}>
              "{evaluationResult.feedback}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              <AlertCircle size={14} color="#a5b4fc" />
              <span>AI-generated insights based on submitted content. Scores are intended as guidance and should not be treated as an absolute measure of ability.</span>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onPublishToFeed(evaluationResult)}
              className="btn-primary"
            >
              <Send size={18} />
              Publish Work & AI Skill Insights to Feed
            </button>
            <button 
              onClick={() => setEvaluationResult(null)}
              className="btn-secondary"
            >
              Re-analyze Another Track
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
