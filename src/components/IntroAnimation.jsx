import React, { useState, useEffect } from 'react';
import DecryptedText from './DecryptedText';
import ShinyText from './ShinyText';
import './IntroAnimation.css';

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: loading, 1: text reveal, 2: fade out
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Stage 0 -> 1: reveal text
    const t1 = setTimeout(() => setStage(1), 300);
    // Stage 1 -> 2: prepare exit
    const t2 = setTimeout(() => setStage(2), 2200);
    // Finish
    const t3 = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`intro-overlay ${stage === 2 ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <div className="intro-logo">
          <span className="pulse-circle" />
          <DecryptedText
            text="PHOENIX.DEV"
            speed={35}
            maxIterations={12}
            sequential={true}
            className="intro-decrypted"
          />
        </div>
        <div className={`intro-subtext ${stage >= 1 ? 'show' : ''}`}>
          <ShinyText text="INITIALIZING CREATIVE WORKSPACE..." speed={2.5} />
        </div>
        <div className="intro-progress-bar">
          <div className={`intro-progress-fill ${stage >= 1 ? 'fill' : ''}`} />
        </div>
      </div>
    </div>
  );
}
