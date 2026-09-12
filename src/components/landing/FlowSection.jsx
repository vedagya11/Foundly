import React from 'react';
import { Upload, Cpu, Award, Search, Handshake } from 'lucide-react';

export default function FlowSection() {
  const steps = [
    { num: '01', title: 'Show your work', icon: Upload, desc: 'Creators upload or connect live work: code repositories, design files, audio, videos, or writing.' },
    { num: '02', title: 'Foundly analyzes it', icon: Cpu, desc: 'Automated skill extraction evaluates structural execution, complexity, and domain-specific parameters.' },
    { num: '03', title: 'Build skill profile', icon: Award, desc: 'Work is converted into structured, evidence-backed Demonstrated Skill Scores.' },
    { num: '04', title: 'Get discovered', icon: Search, desc: 'Recruiters filter talent by verified skill requirements instead of social popularity.' },
    { num: '05', title: 'Connect with opportunities', icon: Handshake, desc: 'Receive direct inquiry outreach and career opportunities based on proven ability.' }
  ];

  return (
    <section className="landing-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-eyebrow">
          <span>Core Product Loop</span>
        </div>

        <h2 className="section-title">
          How Foundly <span className="gradient-text">Works</span>
        </h2>

        <p className="section-subtitle" style={{ margin: '0 auto', maxWidth: '600px' }}>
          From raw work samples to verified recruiter discovery in five simple steps.
        </p>
      </div>

      {/* 5-Step Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: 'var(--space-20)', background: 'var(--bg-surface)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary-indigo)', fontFamily: 'var(--font-heading)' }}>
                  {step.num}
                </span>
                <IconComp size={18} color="var(--primary-indigo)" />
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
                {step.title}
              </h3>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
