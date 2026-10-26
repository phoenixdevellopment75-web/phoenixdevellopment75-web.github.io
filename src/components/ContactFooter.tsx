import { useEffect, useState } from 'react';
import { socialLinks } from '../data';
import { Icon } from './Icons';
import { useMagnetic } from '../useMagnetic';

// No public email is listed on Phoenix's current portfolio or GitHub profile.
const CONTACT_EMAIL = 'phoenixdevellopment75@gmail.com';

type Props = { onReplayIntro: () => void };

export function ContactFooter({ onReplayIntro }: Props) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'missing'>('idle');
  const copyButtonRef = useMagnetic<HTMLButtonElement>();

  useEffect(() => {
    if (copyState === 'idle') return;
    const timer = window.setTimeout(() => setCopyState('idle'), 2500);
    return () => window.clearTimeout(timer);
  }, [copyState]);

  async function copyEmail() {
    if (!CONTACT_EMAIL) {
      setCopyState('missing');
      return;
    }
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopyState('copied');
    } catch {
      setCopyState('missing');
    }
  }

  return (
    <>
      <section id="contact" className="contact-section section" aria-labelledby="contact-title">
        <div className="contact-inner page-wrap">
          <div className="contact-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> THE NEXT GOOD CONVERSATION</span>
            <h2 id="contact-title" data-reveal><span className="reveal-line"><span>Connect &</span></span><span className="reveal-line"><span className="contact-heading-word">Collaborate.</span></span></h2>
            <p>Building an Android app, want to team up on an open-source tool, or talk tech? Reach out below.</p>
          </div>
          <div className="contact-side"><span className="contact-mark">↗</span><span className="contact-side-note">GOOD THINGS<br />START WITH<br /><b>“HEY.”</b></span></div>
        </div>
        <div className="social-grid page-wrap">
          {socialLinks.map((item, index) => <a className={`social-card social-${item.kind}`} href={item.href} target="_blank" rel="noopener noreferrer" key={item.name}>
            <div className="social-card-top"><span className="social-icon"><Icon name={item.kind} size={21} /></span><span className="social-index">0{index + 1} / 03</span><Icon name="external" size={15} /></div>
            <span className="social-name">{item.name}</span><strong>{item.handle}</strong><span className="social-note">{item.note}</span>
          </a>)}
        </div>
        <div className="email-row page-wrap">
          <div><span className="email-eyebrow">DIRECT EMAIL</span><p>{CONTACT_EMAIL ? 'Prefer email? I keep an eye on my inbox.' : 'A public email address hasn’t been added yet. You can reach me on GitHub or Telegram for now.'}</p></div>
          <button ref={copyButtonRef} className={`copy-email magnetic${copyState === 'copied' ? ' is-copied' : ''}`} type="button" onClick={copyEmail} aria-live="polite"><Icon name={copyState === 'copied' ? 'check' : 'copy'} size={17} />{copyState === 'copied' ? 'Copied! ✓' : copyState === 'missing' ? 'Email not listed' : 'Copy Email Address'}</button>
        </div>
      </section>
      <footer className="site-footer page-wrap">
        <p className="footer-legal">© 2026 Phoenix <span>•</span> 16-year-old Android & Web Developer <span>•</span> 11th Grade PCM <span>•</span> Licensed under Apache-2.0</p>
        <nav className="footer-nav" aria-label="Footer navigation"><a href="#home">Home</a><a href="#about">About</a><a href="#work">Work</a><a href="#badges">Badges</a><a href="#contact">Contact</a></nav>
        <div className="footer-actions"><button type="button" className="replay-intro" title="Replay intro" aria-label="Replay intro" onClick={onReplayIntro}><Icon name="replay" size={15} /></button><a className="back-top" href="#home">Back to Top ↑</a></div>
      </footer>
    </>
  );
}
