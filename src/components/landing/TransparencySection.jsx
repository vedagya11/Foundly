import React from 'react';
import { ShieldAlert, Compass, CheckCircle } from 'lucide-react';

export default function TransparencySection() {
  return (
    <section className="landing-section">
      <div className="glass-panel" style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: '28px 36px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(11, 15, 25, 0.6)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          borderRadius: '99px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: 'var(--text-muted)',
          fontSize: '0.78rem',
          fontWeight: '700',
          marginBottom: '14px'
        }}>
          <Compass size={14} color="#818cf8" />
          <span>EARLY-STAGE TRANSPARENCY</span>
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginBottom: '10px' }}>
          Foundly is currently being built and validated.
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          We are actively testing our AI skill evaluation models, refining creator workflows, and conducting qualitative interviews with opportunity providers and creators. We believe in building in public with authentic evidence.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '18px',
          fontSize: '0.78rem',
          color: 'var(--text-dim)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#34d399" />
            <span>Prototype Validation Phase</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#34d399" />
            <span>Open Early Access</span>
          </div>
        </div>
      </div>
    </section>
  );
}
