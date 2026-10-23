/*
 * Copyright 2026 Phoenix (phoenixdevellopment75@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import KineticShapeIntro from './components/KineticShapeIntro';
import LiquidGlassCard from './components/LiquidGlassCard';
import BouncyButton from './components/BouncyButton';
import MagneticButton from './components/MagneticButton';
import ScrollReveal from './components/ScrollReveal';
import HarmonicStringWaveform from './components/HarmonicStringWaveform';
import { badges, categoryLabels, GOOGLE_PROFILE_URL } from './data/badges';

/* ── Minimalist SVG Icons (Pure Monochromatic) ── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [replayIntroKey, setReplayIntroKey] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedProjects, setExpandedProjects] = useState({});

  const navContainerRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({
    opacity: 0,
    transform: 'translateX(0px)',
    width: '0px',
  });

  // Navigation tabs list
  const navTabs = [
    { id: 'work', label: 'Work' },
    { id: 'badges', label: 'Badges' },
    { id: 'story', label: 'Story' },
    { id: 'skills', label: 'Skills' },
  ];

  /* ══════════════════════════════════════════════════════════
     1. ScrollSpy Bug Fix via IntersectionObserver
     Uses exact rootMargin: '-20% 0px -70% 0px'
     Removes manual onClick active state overwrites.
     ══════════════════════════════════════════════════════════ */
  useEffect(() => {
    const sectionIds = ['hero', 'work', 'badges', 'story', 'skills', 'contact'];
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smoothly position active tab sliding background pill
  useEffect(() => {
    if (!navContainerRef.current) return;
    const activeAnchor = navContainerRef.current.querySelector(
      `.nav-link-anchor[data-section="${activeSection}"]`
    );

    if (activeAnchor) {
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const anchorRect = activeAnchor.getBoundingClientRect();
      setPillStyle({
        opacity: 1,
        transform: `translateX(${anchorRect.left - containerRect.left}px)`,
        width: `${anchorRect.width}px`,
      });
    } else {
      // Off-tabs (hero or contact)
      setPillStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Shipped Projects (Spotlighting Wallpaper Studio v2.6.0-beta)
  const projects = [
    {
      id: 1,
      title: 'Material UI 3 Wallpaper Studio',
      category: 'Android App · Jetpack Compose',
      desc: 'A lightweight, battery-friendly Android app that generates crisp geometric wallpapers using pure math right on your phone. No internet needed, totally private, and it automatically tints itself to match your phone’s Material You colors.',
      tech: ['Kotlin', 'Jetpack Compose', 'Skia 2D Canvas', 'Material 3 Expressive', 'Monet Dynamic Color'],
      link: 'https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-',
      downloadLink: 'https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-/releases',
      linkText: 'View on GitHub',
      highlight: 'v2.6.0-beta Latest',
      featured: true,
      featuresList: [
        '⚡ 100% on-device math rendering (zero network, completely private)',
        '🎨 Dynamic Material You theming (adapts to your wallpaper)',
        '📱 Smooth 60/120 FPS canvas studio with tactile shape controls',
        '🔋 Super light on battery and memory (even on 4GB RAM phones)',
      ],
      details: [
        'Graphics Pipeline: Custom Skia 2D render loops executing on hardware canvas without intermediate Bitmaps.',
        'Memory Footprint: < 38 MB runtime allocation, zero background wakelocks, no polling.',
        'Architecture: Unidirectional StateFlow pipeline with Jetpack Compose 1.6+ and Android 12+ Monet extraction.',
      ],
    },
    {
      id: 2,
      title: 'Classmates Hub',
      category: 'Web Community',
      desc: 'A community website built for our 10th-grade class to preserve memories and stay connected — with student profile cards, class structure, and directories.',
      tech: ['HTML5', 'CSS Grid', 'Vanilla JS', 'GitHub Pages'],
      link: 'https://github.com/phoenixdevellopment75-web/Class10thForever-',
      linkText: 'View on GitHub',
      highlight: 'Live Community',
      featured: false,
      details: [
        'Architecture: Pure vanilla modular JavaScript, CSS Grid masonry, zero external bundle overhead.',
        'Deployment: Automated continuous delivery via GitHub Pages and static artifact caching.',
      ],
    },
    {
      id: 3,
      title: 'In-Browser File Converter',
      category: 'WebAssembly Tool',
      desc: 'Convert images, audio, and video directly inside your web browser. Everything runs locally on your device using WebAssembly so your files are never uploaded to any external server.',
      tech: ['WebAssembly', 'FFmpeg.wasm', 'Web Workers', 'HTML5'],
      link: 'https://github.com/phoenixdevellopment75-web',
      linkText: 'Explore System',
      highlight: '100% Private',
      featured: false,
      details: [
        'Execution Model: In-memory WebAssembly workers isolate heavy video and audio transcode threads.',
        'Privacy Guarantee: 100% local client-side processing, zero data transmitted over the wire.',
      ],
    },
    {
      id: 4,
      title: 'My Favourite Focus Clock',
      category: 'Productivity & Sound',
      desc: 'A clean, distraction-free Pomodoro study timer with pleasant synthesized audio alerts, customizable intervals, and an eye-friendly dark design for focused learning.',
      tech: ['JavaScript', 'Web Audio API', 'CSS Grid', 'LocalStorage'],
      link: 'https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer',
      linkText: 'View on GitHub',
      highlight: 'Audio Synthesis',
      featured: false,
      details: [
        'Sound Synthesis: Real-time procedural tone generation via Web Audio API oscillators.',
        'State Management: Synchronized local storage preferences with zero UI re-render jitter.',
      ],
    },
  ];

  const techMatrix = [
    {
      group: 'Languages',
      icon: 'code',
      items: ['Kotlin', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'HTML5 & Modern CSS', 'SQL'],
    },
    {
      group: 'Android & UI/UX',
      icon: 'android',
      items: ['Jetpack Compose', 'Material 3 Expressive', 'Monet Color Engine', 'Skia 2D Canvas', 'Android Studio', 'MVVM / MVI'],
    },
    {
      group: 'Cloud & Infrastructure',
      icon: 'cloud',
      items: ['Google Cloud Platform', 'Terraform (IaC)', 'BigQuery', 'Docker', 'Cloud Run', 'Git & GitHub'],
    },
    {
      group: 'Web & Systems',
      icon: 'terminal',
      items: ['React 19', 'Vite', 'WebAssembly', 'FFmpeg.wasm', 'REST APIs', 'Gemini Enterprise'],
    },
  ];

  const socialLinks = {
    github: 'https://github.com/phoenixdevellopment75-web',
    instagram: 'https://www.instagram.com/phoenix_veena/',
    telegram: 'https://t.me/PhoenixEditz75',
    googleProfile: GOOGLE_PROFILE_URL,
    email: 'phoenixdevellopment75@gmail.com',
  };

  const filteredBadges = badgeFilter === 'all'
    ? badges
    : badges.filter(b => b.category === badgeFilter);

  const stats = [
    { value: `${badges.length}`, label: 'Google Cloud Badges' },
    { value: `${projects.length}`, label: 'Shipped Projects' },
    { value: '16+', label: 'Core Technologies' },
    { value: '10 Yrs', label: 'Carnatic Music Discipline' },
  ];

  // Enhanced "Say Hello / Copy Email" interaction with subtle green checkmark for exactly 2 seconds
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const handleReplayIntro = () => {
    try {
      sessionStorage.removeItem('phoenix-intro-seen');
    } catch {}
    setReplayIntroKey(prev => prev + 1);
  };

  // Toggle project expansion with zero layout shift
  const toggleProjectExpansion = (id) => {
    setExpandedProjects(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="app-container">
      {/* Animated Shape Intro (Monochrome Precision SVG Line-Drawing) */}
      <KineticShapeIntro key={replayIntroKey} force={replayIntroKey > 0} />

      {/* Ambient Monochromatic Dot Grid */}
      <div className="ambient-dot-grid" />

      {/* ═══════════ Refined Floating Liquid Glass Navbar ═══════════ */}
      <header className="header-wrapper">
        <nav className="liquid-navbar">
          <a href="#hero" className="nav-brand">
            <span className="brand-text">PHOENIX</span>
            <span className="brand-dot">.</span>
          </a>

          <div className="nav-status-pill">
            <span className="status-indicator-dot" />
            <span>16 y/o dev · Available for projects</span>
          </div>

          {/* Smoothly animated sliding active pill */}
          <ul className="nav-links-desktop" ref={navContainerRef}>
            <div
              className="nav-active-pill"
              style={{
                opacity: pillStyle.opacity,
                transform: pillStyle.transform,
                width: pillStyle.width,
              }}
              aria-hidden="true"
            />
            {navTabs.map((tab) => (
              <li key={tab.id} className="nav-link-item">
                <a
                  href={`#${tab.id}`}
                  data-section={tab.id}
                  className={`nav-link-anchor ${activeSection === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-right-actions">
            <MagneticButton strength={0.25} as="div">
              <a href="#contact" className="nav-contact-btn">
                <span>Let's Talk</span>
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_outward</span>
              </a>
            </MagneticButton>

            <button
              className="nav-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#hero" className={`mobile-nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#work" className={`mobile-nav-link ${activeSection === 'work' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Work</a>
          <a href="#badges" className={`mobile-nav-link ${activeSection === 'badges' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Google Badges</a>
          <a href="#story" className={`mobile-nav-link ${activeSection === 'story' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>About &amp; Story</a>
          <a href="#skills" className={`mobile-nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Tech Stack</a>
          <a href="#contact" className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>Say Hello</a>
        </div>
      </header>

      {/* ═══════════ Hero Section (Editorial Minimalist & Handcrafted) ═══════════ */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-avatar-container">
            <div className="hero-avatar-frame">
              <img
                src="./pfp.jpg"
                alt="Phoenix portrait"
                className="hero-avatar-img"
                onError={(e) => {
                  e.target.src = './pfp.png';
                }}
              />
              <div className="hero-badge-tag">
                <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>verified</span>
                <span>Dev</span>
              </div>
            </div>
          </div>

          {/* Monospace Editorial Metadata Stamp — Audited WCAG AA Contrast */}
          <div className="hero-meta-bar">
            <div className="hero-meta-item">
              <span className="hero-meta-dot" />
              <span>SYS // PHOENIX-2026</span>
            </div>
            <div className="hero-meta-sep" />
            <div className="hero-meta-item">
              <span>EDITION // MONOCHROME</span>
            </div>
            <div className="hero-meta-sep" />
            <div className="hero-meta-item">
              <span>LATENCY // 0MS (ON-DEVICE)</span>
            </div>
          </div>

          <h1 className="hero-title-main">
            Hi, I'm Phoenix. I build clean Android apps <span className="hero-title-highlight">&amp; web tools.</span>
          </h1>

          <p className="hero-bio-lead">
            I'm a 16-year-old self-taught developer crafting tactile Android experiences in Kotlin,
            exploring Google Cloud systems, and practicing the Carnatic Veena. I build software with mathematical precision, clean architecture, and zero bloat.
          </p>

          <div className="hero-action-buttons">
            <MagneticButton strength={0.35} as="div">
              <BouncyButton as="a" href="#work" variant="primary">
                <span>See What I've Built</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_downward</span>
              </BouncyButton>
            </MagneticButton>

            <MagneticButton strength={0.35} as="div">
              <BouncyButton as="a" href="#badges" variant="secondary">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
                <span>7 Google Cloud Credentials</span>
              </BouncyButton>
            </MagneticButton>
          </div>

          <div className="hero-social-strip">
            <MagneticButton strength={0.4} as="div">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4} as="div">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill"
                aria-label="Instagram Profile"
                title="Instagram (@phoenix_veena)"
              >
                <InstagramIcon />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4} as="div">
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill"
                aria-label="Telegram"
                title="Telegram"
              >
                <TelegramIcon />
              </a>
            </MagneticButton>
            <MagneticButton strength={0.4} as="div">
              <a
                href={socialLinks.googleProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social-pill"
                aria-label="Google Skills Profile"
                title="Google Skills Profile"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>badge</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Stats Strip (Liquid Glass) ═══════════ */}
      <section className="stats-section">
        <div className="container">
          <ScrollReveal delay={50}>
            <div className="stats-glass-grid">
              {stats.map((s, idx) => (
                <LiquidGlassCard key={idx} interactive={true}>
                  <div className="stat-card-inner">
                    <div className="stat-number-display">{s.value}</div>
                    <div className="stat-label-text">{s.label}</div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Featured Work (Highlighting Wallpaper Studio) ═══════════ */}
      <section className="section-wrapper" id="work">
        <div className="container">
          <ScrollReveal>
            <div className="section-head-box">
              <div className="section-eyebrow">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>terminal</span>
                <span>Selected Work</span>
              </div>
              <h2 className="section-headline">Things I've Built</h2>
              {/* Cleaned copy per technical specification */}
              <p className="section-subtext">
                Engineered from scratch. Focused on low runtime overhead, tactile UI, and clean architecture.
              </p>
            </div>
          </ScrollReveal>

          <div className="projects-grid-layout">
            {projects.map((p, idx) => {
              const isExpanded = !!expandedProjects[p.id];
              return (
                <ScrollReveal key={p.id} delay={idx * 80} distance="24px">
                  <LiquidGlassCard interactive={true} className={p.featured ? 'project-card-featured' : ''}>
                    <div className="project-card-inner">
                      <div>
                        <div className="project-header-row">
                          <span className="project-index-num">0{idx + 1} //</span>
                          <span className="project-status-tag">{p.highlight}</span>
                        </div>

                        <h3 className="project-title-text">{p.title}</h3>
                        <p className="project-desc-text">{p.desc}</p>

                        {/* Bullet features */}
                        {p.featuresList && (
                          <div className="project-bullet-features">
                            {p.featuresList.map((feat, fIdx) => (
                              <div key={fIdx} className="project-bullet-item">
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Expandable Architecture Drawer (Zero Layout Shift via CSS Grid) */}
                        {p.details && (
                          <>
                            <button
                              type="button"
                              className="project-expand-toggle"
                              onClick={() => toggleProjectExpansion(p.id)}
                              aria-expanded={isExpanded}
                            >
                              <span>{isExpanded ? 'Hide Architecture Specs' : 'Architecture & Specs'}</span>
                              <span className={`material-symbols-outlined project-expand-icon ${isExpanded ? 'expanded' : ''}`}>
                                expand_more
                              </span>
                            </button>

                            <div className={`project-expandable-drawer ${isExpanded ? 'is-expanded' : ''}`}>
                              <div className="project-expandable-content">
                                <div className="project-details-box">
                                  {p.details.map((item, dIdx) => (
                                    <div key={dIdx} className="project-detail-row">
                                      <span className="project-detail-bullet">▪</span>
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        <div className="project-tech-pills">
                          {p.tech.map(t => (
                            <span key={t} className="project-tech-pill">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="project-footer-actions">
                        <MagneticButton strength={0.3} as="div">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn-link"
                          >
                            <span>{p.linkText}</span>
                            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_outward</span>
                          </a>
                        </MagneticButton>

                        {p.downloadLink && (
                          <MagneticButton strength={0.3} as="div">
                            <a
                              href={p.downloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-btn-ghost"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>download</span>
                              <span>Get APK</span>
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </LiquidGlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Google Cloud Credentials ═══════════ */}
      <section className="section-wrapper" id="badges">
        <div className="container">
          <ScrollReveal>
            <div className="section-head-box">
              <div className="section-eyebrow">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                <span>Google Cloud Platform</span>
              </div>
              <h2 className="section-headline">Google Cloud Badges</h2>
              <p className="section-subtext">
                7 hands-on credentials I earned on Google Cloud. From building AI agents to writing Terraform scripts and managing BigQuery databases.
              </p>
            </div>
          </ScrollReveal>

          {/* Filter Pills */}
          <div className="filter-tabs-row">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className={`bouncy-btn bouncy-btn-pill ${badgeFilter === key ? 'active' : ''}`}
                onClick={() => setBadgeFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Badges Grid */}
          <div className="badges-cards-grid">
            {filteredBadges.map((badge, idx) => (
              <ScrollReveal key={badge.id} delay={Math.min(idx * 60, 300)} distance="20px">
                <LiquidGlassCard interactive={true}>
                  <div className="badge-card-box">
                    <div>
                      <div className="badge-top-meta">
                        <div className="badge-image-container">
                          <img src={badge.image} alt={badge.title} loading="lazy" />
                        </div>
                        <span className="badge-category-chip">
                          {badge.category}
                        </span>
                      </div>

                      <h3 className="badge-card-title">{badge.title}</h3>
                      <div className="badge-card-date">
                        <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>calendar_today</span>
                        <span>Earned: {badge.date}</span>
                      </div>

                      <p className="badge-card-desc">{badge.description}</p>

                      <div className="badge-skills-flex">
                        {badge.skills.map(s => (
                          <span key={s} className="badge-skill-tag">{s}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <MagneticButton strength={0.3} as="div">
                        <a
                          href={badge.badgeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="badge-action-link"
                        >
                          <span>Verify on Google Skills</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                        </a>
                      </MagneticButton>
                    </div>
                  </div>
                </LiquidGlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={100}>
            <div className="google-profile-cta-box">
              <MagneticButton strength={0.3} as="div">
                <BouncyButton
                  as="a"
                  href={GOOGLE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>badge</span>
                  <span>View Full Google Profile</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_outward</span>
                </BouncyButton>
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Story & Philosophy (Carnatic Veena & Harmonic Physics) ═══════════ */}
      <section className="section-wrapper" id="story">
        <div className="container">
          <ScrollReveal>
            <div className="section-head-box">
              <div className="section-eyebrow">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>music_note</span>
                <span>About Me</span>
              </div>
              <h2 className="section-headline">Code, Music &amp; Patience</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="story-grid-layout">
              <LiquidGlassCard interactive={false}>
                <div className="story-main-box">
                  <p className="story-lead-paragraph">
                    I started coding about two years ago out of pure curiosity. I wanted to understand how apps on my phone actually worked, why some websites feel fast while others lag, and how to build helpful things from scratch.
                  </p>
                  <p className="story-body-paragraph">
                    At the same time, I have been learning <strong>classical Carnatic music on the Veena for the past 10 years</strong>. In Carnatic music, you cannot rush or cheat the rhythm. Every note requires discipline, practice, and patience.
                  </p>
                  <p className="story-body-paragraph">
                    Building software feels the exact same way. Whether I'm optimizing offscreen canvas rendering in my Wallpaper Studio app or structuring state in React, having patience and respecting clean structure makes all the difference. No shortcuts — just good craftsmanship.
                  </p>

                  <div className="music-quote-box">
                    "Patience isn't just about waiting; it's about paying close attention to every small detail along the way."
                  </div>

                  {/* Interactive Carnatic Veena Harmonic Waveform Canvas */}
                  <HarmonicStringWaveform />
                </div>
              </LiquidGlassCard>

              <LiquidGlassCard interactive={false}>
                <div className="story-sidebar-box">
                  <div className="sidebar-focus-list">
                    <div className="focus-item">
                      <div className="focus-icon-bullet">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>android</span>
                      </div>
                      <div>
                        <div className="focus-text-title">Android &amp; Jetpack Compose</div>
                        <div className="focus-text-desc">Building responsive, battery-friendly apps in Kotlin with dynamic Material You colors.</div>
                      </div>
                    </div>

                    <div className="focus-item">
                      <div className="focus-icon-bullet">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>brush</span>
                      </div>
                      <div>
                        <div className="focus-text-title">Procedural Math &amp; Canvas</div>
                        <div className="focus-text-desc">Writing custom 2D Skia algorithms that draw sharp vector designs on hardware with zero lag.</div>
                      </div>
                    </div>

                    <div className="focus-item">
                      <div className="focus-icon-bullet">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>cloud_sync</span>
                      </div>
                      <div>
                        <div className="focus-text-title">Cloud Infrastructure</div>
                        <div className="focus-text-desc">Writing Terraform configurations, deploying to Cloud Run, and querying data with BigQuery.</div>
                      </div>
                    </div>

                    <div className="focus-item">
                      <div className="focus-icon-bullet">
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>queue_music</span>
                      </div>
                      <div>
                        <div className="focus-text-title">Carnatic Veena (10+ Years)</div>
                        <div className="focus-text-desc">A decade of classical discipline cultivating patience, micro-tuning, and focus.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Tech Matrix (Technologies & Tooling) ═══════════ */}
      <section className="section-wrapper" id="skills">
        <div className="container">
          <ScrollReveal>
            <div className="section-head-box">
              <div className="section-eyebrow">
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>tune</span>
                <span>Skills &amp; Tools</span>
              </div>
              {/* Cleaned title and subtext per specification */}
              <h2 className="section-headline">Technologies &amp; Tooling</h2>
              <p className="section-subtext">
                Tools and frameworks leveraged across native Android, backend infra, and web engines.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="tech-matrix-grid">
              {techMatrix.map((tGroup) => (
                <LiquidGlassCard key={tGroup.group} interactive={true}>
                  <div className="tech-group-card">
                    <div className="tech-group-title">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tGroup.icon}</span>
                      <span>{tGroup.group}</span>
                    </div>

                    <div className="tech-chips-wrap">
                      {tGroup.items.map(skill => (
                        <span key={skill} className="tech-interactive-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </LiquidGlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════════ Contact Hub (Friendly & Humane) ═══════════ */}
      <section className="section-wrapper" id="contact">
        <div className="container">
          <ScrollReveal>
            <LiquidGlassCard interactive={true}>
              <div className="contact-hub-card">
                <div className="section-eyebrow" style={{ marginBottom: '20px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>alternate_email</span>
                  <span>Get In Touch</span>
                </div>

                <h2 className="contact-headline">Say Hello!</h2>
                <p className="contact-message-body">
                  Have an idea for an Android app, want to collaborate on a web project, or just want to chat about code or music? My inbox is always open.
                </p>

                <div className="contact-actions-grid">
                  <MagneticButton strength={0.35} as="div">
                    <BouncyButton
                      onClick={handleCopyEmail}
                      variant="primary"
                      className={emailCopied ? 'copied-btn' : ''}
                    >
                      {emailCopied ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '16px', color: '#16a34a' }}
                          >
                            check_circle
                          </span>
                          <span style={{ color: '#15803d', fontWeight: 600 }}>Copied to clipboard!</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                            content_copy
                          </span>
                          <span>Copy Email Address</span>
                        </>
                      )}
                    </BouncyButton>
                  </MagneticButton>

                  <MagneticButton strength={0.35} as="div">
                    <BouncyButton
                      as="a"
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      <GitHubIcon />
                      <span>GitHub</span>
                    </BouncyButton>
                  </MagneticButton>

                  <MagneticButton strength={0.35} as="div">
                    <BouncyButton
                      as="a"
                      href={socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      <TelegramIcon />
                      <span>Telegram</span>
                    </BouncyButton>
                  </MagneticButton>

                  <MagneticButton strength={0.35} as="div">
                    <BouncyButton
                      as="a"
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                    >
                      <InstagramIcon />
                      <span>Instagram</span>
                    </BouncyButton>
                  </MagneticButton>
                </div>
              </div>
            </LiquidGlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════ Minimalist Monochrome Footer ═══════════ */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-inner-flex">
            <div className="footer-brand">
              <span>PHOENIX</span>
              <span style={{ color: '#94a3b8' }}>.</span>
            </div>

            <div className="footer-nav-links">
              <a href="#work" className="footer-nav-link">Work</a>
              <a href="#badges" className="footer-nav-link">Badges</a>
              <a href="#story" className="footer-nav-link">Story</a>
              <a href="#skills" className="footer-nav-link">Skills</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
            </div>

            <div>
              <button
                type="button"
                className="replay-intro-btn"
                onClick={handleReplayIntro}
                title="Replay the kinetic geometric intro animation"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>replay</span>
                <span>Replay Intro</span>
              </button>
            </div>
          </div>

          <div className="footer-bottom-line">
            <p>© {new Date().getFullYear()} Phoenix · 16-year-old Android &amp; Web Developer · Licensed under Apache-2.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
