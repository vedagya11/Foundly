import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export default function AudioPlayer({ audioUrl, title, artist, pitchScore }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration || 120);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate 28 static/dynamic waveform height bars for visualization
  const waveformHeights = [
    12, 24, 18, 32, 40, 22, 14, 38, 48, 28, 16, 30, 42, 50, 36, 20, 34, 46, 26, 18, 32, 40, 22, 14, 28, 36, 18, 10
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.8))',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      borderRadius: '16px',
      padding: '18px 20px',
      marginTop: '12px',
      marginBottom: '12px'
    }}>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Top Track Details */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Music size={20} color="#ffffff" />
          </div>
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>{title || 'Audio Work Sample'}</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{artist || 'Acoustic Vocal Demo'}</p>
          </div>
        </div>

        {pitchScore && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            borderRadius: '99px',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            fontSize: '0.75rem',
            fontWeight: '700',
            color: '#38bdf8'
          }}>
            <Sparkles size={12} />
            <span>AI Pitch Acc: {pitchScore}/10</span>
          </div>
        )}
      </div>

      {/* Waveform Visualizer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'between',
        gap: '4px',
        height: '42px',
        padding: '0 8px',
        marginBottom: '12px',
        background: 'rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        {waveformHeights.map((h, idx) => {
          const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
          const barPercent = (idx / waveformHeights.length) * 100;
          const isPlayed = barPercent <= progressPercent;

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${isPlaying ? Math.max(8, (h * (0.8 + Math.sin(idx + currentTime * 4) * 0.4))) : h}px`,
                background: isPlayed 
                  ? 'linear-gradient(to top, #6366f1, #06b6d4)' 
                  : 'rgba(255, 255, 255, 0.15)',
                borderRadius: '2px',
                transition: 'height 0.15s ease, background 0.2s ease'
              }}
            />
          );
        })}
      </div>

      {/* Play Controls & Seek Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          onClick={togglePlay}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary-500), var(--accent-purple))',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
            transition: 'var(--transition-smooth)'
          }}
        >
          {isPlaying ? <Pause size={20} color="#ffffff" /> : <Play size={20} color="#ffffff" style={{ marginLeft: '2px' }} />}
        </button>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: '40px' }}>
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{ flex: 1 }}
        />

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', minWidth: '40px', textAlign: 'right' }}>
          {formatTime(duration)}
        </span>

        <button
          onClick={toggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </div>
  );
}
