import React, { useState, useEffect } from 'react';
import DecryptedText from './DecryptedText';
import Aurora from './Aurora';
import './IntroAnimation.css';

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: initial, 1: active, 2: exit
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 150);
    const t2 = setTimeout(() => setStage(2), 1900);
    const t3 = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div className={`intro-overlay ${stage === 2 ? 'fade-out' : ''}`}>
      {/* Background Aurora animation component */}
      <div className="intro-aurora-container">
        <Aurora
          colorStops={['#506E39', '#6B8E4E', '#3A5228', '#9DC183']}
          speed={8}
          blur={100}
          opacity={0.3}
        />
      </div>

      <div className="intro-content">
        <div className="intro-badge">
          <span className="intro-dot" />
          <DecryptedText
            text="PHOENIX"
            speed={35}
            maxIterations={10}
            sequential={true}
            className="intro-decrypted-title"
          />
          <span className="intro-dot-accent">.</span>
        </div>

        <div className="intro-line-loader">
          <div className={`intro-line-fill ${stage >= 1 ? 'active' : ''}`} />
        </div>
      </div>
    </div>
  );
}
