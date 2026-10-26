import { useCallback, useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Badges } from './components/Badges';
import { ContactFooter } from './components/ContactFooter';

export type Theme = 'light' | 'dark';
const THEME_KEY = 'phoenix-theme';
const INTRO_KEY = 'phoenix-intro-seen';

function initialTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Keep the site usable when storage is unavailable.
  }
  return 'light';
}

function initialIntroState() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return window.sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [introActive, setIntroActive] = useState(initialIntroState);
  const [introExiting, setIntroExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [heroReveal, setHeroReveal] = useState(false);
  const [introRun, setIntroRun] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Theme remains active for this page view if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const headings = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const showAll = () => headings.forEach((heading) => heading.classList.add('is-visible'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!introActive) return;
    try {
      window.sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // The intro still runs once this page is mounted.
    }
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const amount = Math.min(100, Math.round(((now - started) / 790) * 100));
      setProgress(amount);
      if (amount < 100) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    const revealTimer = window.setTimeout(() => setHeroReveal(true), 770);
    const exitTimer = window.setTimeout(() => setIntroExiting(true), 790);
    const finishTimer = window.setTimeout(() => {
      setIntroActive(false);
      setIntroExiting(false);
    }, 1290);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, [introActive, introRun]);

  const replayIntro = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHeroReveal(true);
      return;
    }
    try {
      window.sessionStorage.removeItem(INTRO_KEY);
    } catch {
      // Replay works for the current view even if storage is unavailable.
    }
    setProgress(0);
    setHeroReveal(false);
    setIntroExiting(false);
    setIntroActive(true);
    setIntroRun((run) => run + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen site-shell" data-hero-reveal={heroReveal ? 'ready' : 'staged'}>
      {introActive && (
        <div className={`intro-curtain${introExiting ? ' is-exiting' : ''}`} role="status" aria-live="polite" aria-label="Initializing Phoenix OS">
          <div className="intro-inner">
            <div className="intro-brand"><span className="intro-flame">✳</span> PHOENIX SYSTEMS <span>/ 26</span></div>
            <div className="intro-center">
              <div className="intro-monogram">PHX</div>
              <div className="intro-status"><span>{String(progress).padStart(2, '0')}%</span><span>// INITIALIZING PHOENIX OS</span></div>
              <div className="intro-progress-track"><span style={{ width: `${progress}%` }} /></div>
            </div>
            <div className="intro-foot"><span>STUDENT / DEVELOPER</span><span>VISAKHAPATNAM, INDIA</span></div>
          </div>
        </div>
      )}
      <Navigation theme={theme} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
      <main>
        <Hero />
        <div className="section-divider"><span>01</span><i /><span>PHOENIX / PORTFOLIO</span><i /><span>2026</span></div>
        <About />
        <Projects />
        <Badges />
        <ContactFooter onReplayIntro={replayIntro} />
      </main>
    </div>
  );
}
