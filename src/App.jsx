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
 *
 * Phoenix Portfolio — Clean Editorial Redesign
 * Inspired by tactile editorial poster design with cream, autumn golden hour,
 * deep black, and white. Zero AI gradients.
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import HarmonicStringWaveform from './components/HarmonicStringWaveform';
import { badges, categoryLabels, GOOGLE_PROFILE_URL } from './data/badges';

/* ── Minimalist SVG Icons (Pure Monochromatic) ── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0h-.056zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Navigation Links
  const navTabs = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'content', label: 'Content' },
    { id: 'badges', label: 'Badges' },
    { id: 'contact', label: 'Contact' },
  ];

  // ScrollSpy via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'content', 'badges', 'contact'];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Filtered Google Cloud Badges
  const filteredBadges = badgeFilter === 'all'
    ? badges
    : badges.filter(b => b.category === badgeFilter);

  // Social Links
  const socialLinks = {
    github: 'https://github.com/phoenixdevellopment75-web',
    instagram: 'https://www.instagram.com/phoenix_veena/',
    telegram: 'https://t.me/PhoenixEditz75',
    googleProfile: GOOGLE_PROFILE_URL,
  };

  // Scraper-resistant email copy handler (decoded only upon click)
  const handleCopyEmail = () => {
    try {
      const decodedEmail = atob('cGhvZW5peGRldmVsbG9wbWVudDc1QGdtYWlsLmNvbQ==');
      navigator.clipboard.writeText(decodedEmail).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      });
    } catch {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-wrapper">
      {/* ═══════════ Floating Editorial Header ═══════════ */}
      <header className="header-wrapper">
        <nav className="editorial-navbar">
          <a href="#hero" className="nav-brand-group">
            <span className="nav-brand-title">PHOENIX</span>
            <span className="nav-brand-year">'26</span>
          </a>

          <div className="nav-status-chip">
            <span className="status-dot" />
            <span>16 y/o dev · 11th PCM · Available</span>
          </div>

          <ul className="nav-menu-links">
            {navTabs.map((tab) => (
              <li key={tab.id} className="nav-link-item">
                <a
                  href={`#${tab.id}`}
                  className={activeSection === tab.id ? 'active' : ''}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="#contact" className="nav-cta-btn">
              <span>Say Hello</span>
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
            </a>

            <button
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
          {navTabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {tab.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-nav-link"
            style={{ fontWeight: 800, color: 'var(--autumn-gold)' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            Say Hello →
          </a>
        </div>
      </header>

      <main>
        {/* ═══════════ HERO SECTION — Recreating Reference Poster ═══════════ */}
        <section className="hero-stage-section" id="hero">
          <div className="content-container">
            <div className="hero-art-wrapper">
              {/* Massive Editorial "PORTFOLIO" Letters with depth layering */}
              <div className="portfolio-title-container">
                <div className="portfolio-letter-row">
                  <span className="portfolio-char char-p">P</span>
                  <span className="portfolio-char char-o1">O</span>
                  <span className="portfolio-char char-r">R</span>
                  <span className="portfolio-char char-t">T</span>
                  <span className="portfolio-char char-f">F</span>
                  <span className="portfolio-char char-o2">O</span>
                  <span className="portfolio-char char-l">L</span>
                  <span className="portfolio-char char-i">I</span>
                  <span className="portfolio-char char-o3">O</span>
                  <span className="portfolio-year-tag">'26</span>
                </div>
              </div>

              {/* Seated Depth Effect Cutout (Phoenix in sweater with golden hour light) */}
              <div className="hero-person-cutout-box">
                <img
                  src="./phoenix_hero.png"
                  alt="Phoenix Developer portrait"
                  className="hero-person-img"
                  onError={(e) => {
                    e.target.src = './pfp.png';
                  }}
                />
              </div>

              {/* Name stamp under the cutout */}
              <div className="hero-caption-name">
                PHOENIX DEV // '26
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 2: Lanyard ID Pass + Editorial Bio ═══════════ */}
        <section className="editorial-profile-section" id="about">
          <div className="content-container">
            <div className="profile-editorial-grid">
              {/* Hanging Physical Lanyard Badge */}
              <div className="lanyard-hanging-wrapper">
                <div className="lanyard-strap" />
                <div className="lanyard-clip" />
                <div className="lanyard-id-card">
                  <div className="id-card-top-hole" />
                  <div className="id-photo-container">
                    <img
                      src="./pfp.jpg"
                      alt="Phoenix official pass photo"
                      className="id-photo-img"
                      onError={(e) => {
                        e.target.src = './pfp.png';
                      }}
                    />
                  </div>
                  <div className="id-card-details">
                    <div className="id-person-name">PHOENIX</div>
                    <div className="id-person-role">11TH GRADE PCM · ANDROID DEV</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                      Veena &amp; Vocal Practitioner (10 Yrs)
                    </div>
                  </div>
                  <div className="id-barcode-graphic">
                    <div className="id-barcode-bar" style={{ width: '3px' }} />
                    <div className="id-barcode-bar" style={{ width: '1px' }} />
                    <div className="id-barcode-bar" style={{ width: '4px' }} />
                    <div className="id-barcode-bar" style={{ width: '2px' }} />
                    <div className="id-barcode-bar" style={{ width: '5px' }} />
                    <div className="id-barcode-bar" style={{ width: '1px' }} />
                    <div className="id-barcode-bar" style={{ width: '3px' }} />
                    <div className="id-barcode-bar" style={{ width: '2px' }} />
                    <div className="id-barcode-bar" style={{ width: '4px' }} />
                    <div className="id-barcode-bar" style={{ width: '1px' }} />
                    <div className="id-barcode-bar" style={{ width: '3px' }} />
                    <div className="id-barcode-bar" style={{ width: '2px' }} />
                    <div className="id-barcode-bar" style={{ width: '5px' }} />
                    <div className="id-barcode-bar" style={{ width: '2px' }} />
                    <div className="id-barcode-bar" style={{ width: '4px' }} />
                    <div className="id-barcode-bar" style={{ width: '1px' }} />
                    <div className="id-barcode-bar" style={{ width: '3px' }} />
                    <div className="id-barcode-bar" style={{ width: '2px' }} />
                    <div className="id-barcode-bar" style={{ width: '6px' }} />
                  </div>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)', marginTop: '4px', textAlign: 'center' }}>
                    ID: PHX-2026-PCM-CARNATIC
                  </div>
                </div>
              </div>

              {/* Right Profile & Experience Editorial Columns */}
              <div className="profile-main-editorial">
                <div>
                  <h2 className="editorial-greeting-title">
                    Hi, I'm <span>Phoenix</span>
                  </h2>
                  <p className="editorial-lead-bio" style={{ marginTop: '12px' }}>
                    I am a 16-year-old self-taught developer from India, currently in 11th grade studying Physics, Chemistry, and Mathematics (PCM). Alongside sciences, I have trained for over a decade in classical Carnatic vocal and the Saraswati Veena. That same rhythmic discipline guides how I build software: strict mathematical structure, clean architecture, low runtime overhead, and tactile user experiences.
                  </p>
                </div>

                {/* 3-Column Editorial Grid (Matching Reference Poster) */}
                <div className="editorial-three-columns">
                  {/* Column 1: Studies & Discipline */}
                  <div>
                    <div className="column-header-title">Studies &amp; Discipline</div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">11th Grade PCM Track</div>
                      <div className="column-entry-desc">Advanced Physics, Chemistry &amp; Mathematics coursework.</div>
                      <div className="column-entry-date">2025 – Present</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Carnatic Vocal &amp; Veena</div>
                      <div className="column-entry-desc">10+ years of classical discipline, microtonal tuning, and tala rhythm.</div>
                      <div className="column-entry-date">2016 – Present (10 Yrs)</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Self-Taught Systems &amp; Dev</div>
                      <div className="column-entry-desc">Android architecture, 2D graphics math, and cloud infrastructure.</div>
                      <div className="column-entry-date">2023 – Present</div>
                    </div>
                  </div>

                  {/* Column 2: Core Expertise */}
                  <div>
                    <div className="column-header-title">Core Expertise</div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Native Android Engineering</div>
                      <div className="column-entry-desc">Kotlin, Jetpack Compose, Material 3 Expressive, Monet dynamic colors.</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Skia 2D Procedural Graphics</div>
                      <div className="column-entry-desc">Pure mathematical canvas rendering engines executing at 60/120 FPS.</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Cloud &amp; DevOps</div>
                      <div className="column-entry-desc">Google Cloud Platform, Terraform (IaC), BigQuery, Cloud Run, Docker.</div>
                    </div>
                  </div>

                  {/* Column 3: Contact & Links */}
                  <div>
                    <div className="column-header-title">Connect</div>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-entry-link"
                    >
                      <GitHubIcon />
                      <span>github.com/phoenixdevellopment75-web</span>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-entry-link"
                    >
                      <InstagramIcon />
                      <span>instagram.com/phoenix_veena</span>
                    </a>
                    <a
                      href={socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-entry-link"
                    >
                      <TelegramIcon />
                      <span>t.me/PhoenixEditz75</span>
                    </a>
                    <a
                      href={socialLinks.googleProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="connect-entry-link"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>badge</span>
                      <span>Google Skills Profile</span>
                    </a>
                  </div>
                </div>

                {/* Softwares & Tooling Row */}
                <div className="software-stack-row">
                  <div className="software-heading">Softwares &amp; Technologies</div>
                  <div className="software-chips-flex">
                    <span className="software-badge-pill">Kotlin</span>
                    <span className="software-badge-pill">Jetpack Compose</span>
                    <span className="software-badge-pill">Android Studio</span>
                    <span className="software-badge-pill">Skia Canvas</span>
                    <span className="software-badge-pill">Python</span>
                    <span className="software-badge-pill">React 19</span>
                    <span className="software-badge-pill">JavaScript (ES6+)</span>
                    <span className="software-badge-pill">Google Cloud</span>
                    <span className="software-badge-pill">Terraform (IaC)</span>
                    <span className="software-badge-pill">BigQuery</span>
                    <span className="software-badge-pill">Docker</span>
                    <span className="software-badge-pill">WebAssembly</span>
                    <span className="software-badge-pill">Git / GitHub</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 3: "CONTENT" & 5-Column Project Showcase ═══════════ */}
        <section className="content-showcase-section" id="content">
          <div className="content-container">
            <div className="content-header-art">
              {/* Step numbers: 01, 02, 03, 04, 05 */}
              <div className="content-steps-row">
                <span className="content-step-num">01</span>
                <span className="content-step-num">02</span>
                <span className="content-step-num">03</span>
                <span className="content-step-num">04</span>
                <span className="content-step-num">05</span>
              </div>
              {/* Giant Outlined Typography */}
              <div className="content-big-outline-text">
                CONTENT
              </div>
            </div>

            {/* 5 Distinctive Columns (Matching the Reference Poster) */}
            <div className="five-columns-project-grid">
              {/* Column 1: Wallpaper Studio (Blue #2B557F) */}
              <div className="content-col-card col-theme-1">
                <div>
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '38px', color: '#FFFFFF' }}>
                        wallpaper
                      </span>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                        25+ SKIA MATH PATTERNS
                      </div>
                    </div>
                  </div>

                  <div className="col-badge-tag">Android App · Skia 2D</div>
                  <h3 className="col-project-title" style={{ marginTop: '8px' }}>
                    Material UI 3 Wallpaper Studio
                  </h3>
                  <p className="col-project-desc">
                    Generates crisp geometric wallpapers using pure procedural math right on device. 100% private, zero network requests, and dynamic Monet palette tinting.
                  </p>

                  <div className="col-action-btns">
                    <a
                      href="https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-/releases"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-btn-white"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>download</span>
                      <span>Get APK (v2.6.0)</span>
                    </a>
                    <a
                      href="https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-btn-outline"
                    >
                      <span>View GitHub Repo</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                    </a>
                  </div>
                </div>

                <div className="content-bottom-num">1</div>
              </div>

              {/* Column 2: Classmates Hub (Khaki/Camel #C29F74) */}
              <div className="content-col-card col-theme-2">
                <div>
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '38px', color: '#141414' }}>
                        groups
                      </span>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#141414', letterSpacing: '0.05em' }}>
                        CLASS 10TH VAULT
                      </div>
                    </div>
                  </div>

                  <div className="col-badge-tag">Web Community</div>
                  <h3 className="col-project-title" style={{ marginTop: '8px', color: '#141414' }}>
                    Classmates Hub
                  </h3>
                  <p className="col-project-desc">
                    A community website built for our 10th-grade class to preserve memories, student directory cards, and class events with zero bundle bloat.
                  </p>

                  <div className="col-action-btns">
                    <a
                      href="https://github.com/phoenixdevellopment75-web/Class10thForever-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-btn-white"
                      style={{ background: '#141414', color: '#FFFFFF' }}
                    >
                      <span>Explore Repo</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                    </a>
                  </div>
                </div>

                <div className="content-bottom-num">2</div>
              </div>

              {/* Column 3: In-Browser File Converter (Green #65855B) */}
              <div className="content-col-card col-theme-3">
                <div>
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '38px', color: '#FFFFFF' }}>
                        swap_horizontal_circle
                      </span>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                        WASM / FFMPEG WORKER
                      </div>
                    </div>
                  </div>

                  <div className="col-badge-tag">WASM · 100% Private</div>
                  <h3 className="col-project-title" style={{ marginTop: '8px' }}>
                    In-Browser File Converter
                  </h3>
                  <p className="col-project-desc">
                    Converts images, audio, and video directly inside the browser using client-side FFmpeg.wasm workers. Zero files ever touch an external server.
                  </p>

                  <div className="col-action-btns">
                    <a
                      href="https://github.com/phoenixdevellopment75-web"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-btn-white"
                    >
                      <span>Explore System</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                    </a>
                  </div>
                </div>

                <div className="content-bottom-num">3</div>
              </div>

              {/* Column 4: Focus Study Clock (Rust #C25345) */}
              <div className="content-col-card col-theme-4">
                <div>
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '38px', color: '#FFFFFF' }}>
                        alarm
                      </span>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                        SYNTHESIZED WEB AUDIO
                      </div>
                    </div>
                  </div>

                  <div className="col-badge-tag">Productivity &amp; Sound</div>
                  <h3 className="col-project-title" style={{ marginTop: '8px' }}>
                    My Favourite Focus Clock
                  </h3>
                  <p className="col-project-desc">
                    A clean Pomodoro study timer with pleasant synthesized audio alerts, customizable intervals, and an eye-friendly dark design for focused learning.
                  </p>

                  <div className="col-action-btns">
                    <a
                      href="https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="col-btn-white"
                    >
                      <span>View GitHub Repo</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                    </a>
                  </div>
                </div>

                <div className="content-bottom-num">4</div>
              </div>

              {/* Column 5: Google Cloud Credentials (Slate #4C6E96) */}
              <div className="content-col-card col-theme-5">
                <div>
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '38px', color: '#FFFFFF' }}>
                        verified_user
                      </span>
                      <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>
                        7 VERIFIED GCP BADGES
                      </div>
                    </div>
                  </div>

                  <div className="col-badge-tag">Google Cloud Platform</div>
                  <h3 className="col-project-title" style={{ marginTop: '8px' }}>
                    Google Cloud Credentials
                  </h3>
                  <p className="col-project-desc">
                    Hands-on credentials in Multi-agent AI systems with Gemini Enterprise, Terraform (IaC), BigQuery data warehouses, and secure software delivery.
                  </p>

                  <div className="col-action-btns">
                    <a
                      href="#badges"
                      className="col-btn-white"
                    >
                      <span>Inspect Badges</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_downward</span>
                    </a>
                  </div>
                </div>

                <div className="content-bottom-num">5</div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 4: Google Cloud Badges Interactive Gallery ═══════════ */}
        <section className="credentials-gallery-section" id="badges">
          <div className="content-container">
            <div className="section-head-editorial">
              <span className="section-tag-eyebrow">Google Cloud Platform</span>
              <h2 className="section-main-heading">Verified Cloud Credentials</h2>
              <p className="section-editorial-subtext">
                7 verified skill badges earned by completing hands-on challenge labs on Google Cloud Platform—covering agentic AI workflows, infrastructure as code, BigQuery, and security.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="badge-filter-tabs">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className={`filter-tab-pill ${badgeFilter === key ? 'active' : ''}`}
                  onClick={() => setBadgeFilter(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Badges Grid */}
            <div className="badges-cards-container">
              {filteredBadges.map((badge) => (
                <div key={badge.id} className="badge-editorial-card">
                  <div>
                    <div className="badge-top-row">
                      <div className="badge-img-frame">
                        <img src={badge.image} alt={badge.title} loading="lazy" />
                      </div>
                      <span className="badge-category-tag">{badge.category}</span>
                    </div>

                    <h3 className="badge-card-name">{badge.title}</h3>
                    <div className="badge-card-date-stamp">Earned: {badge.date}</div>
                    <p className="badge-card-body-text">{badge.description}</p>
                  </div>

                  <a
                    href={badge.badgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge-verify-anchor"
                  >
                    <span>Verify on Google Skills</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                  </a>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta-btn"
                style={{ padding: '12px 28px', fontSize: '14px' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>badge</span>
                <span>View Full Public Google Skills Profile</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 5: Carnatic Veena Harmonic Physics ═══════════ */}
        <section className="veena-physics-section">
          <div className="content-container">
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              <div className="section-head-editorial" style={{ textAlign: 'center', alignItems: 'center' }}>
                <span className="section-tag-eyebrow">Acoustic Math &amp; Classical Rigor</span>
                <h2 className="section-main-heading">10 Years of Veena Discipline</h2>
                <p className="section-editorial-subtext" style={{ textAlign: 'center' }}>
                  10 years of Carnatic Veena taught me rhythm, cadence, and discipline. I apply the same principles to code: strict structure, low latency, and zero unnecessary dependencies.
                </p>
              </div>

              {/* Interactive Veena Harmonic Waveform Canvas */}
              <HarmonicStringWaveform />
            </div>
          </div>
        </section>

        {/* ═══════════ SECTION 6: Functional Social Media Cards & Contact ═══════════ */}
        <section className="contact-hub-section" id="contact">
          <div className="content-container">
            <div className="section-head-editorial" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="section-tag-eyebrow">Get In Touch</span>
              <h2 className="section-main-heading">Connect &amp; Collaborate</h2>
              <p className="section-editorial-subtext" style={{ textAlign: 'center' }}>
                Open for collaboration on native Android apps, local-first web tooling, and open-source software.
              </p>
            </div>

            {/* 3 Prominent Functional Social Media Cards */}
            <div className="social-cards-grid">
              {/* GitHub Card */}
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-editorial-card"
              >
                <div>
                  <div className="social-card-top-icon">
                    <GitHubIcon />
                  </div>
                  <h3 className="social-card-platform">GitHub</h3>
                  <div className="social-card-handle">@phoenixdevellopment75-web</div>
                  <p className="social-card-desc">
                    Explore my repositories, open-source Android wallpaper studio codebase, and private local-first WASM utilities.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Visit GitHub Profile</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-editorial-card"
              >
                <div>
                  <div className="social-card-top-icon">
                    <InstagramIcon />
                  </div>
                  <h3 className="social-card-platform">Instagram</h3>
                  <div className="social-card-handle">@phoenix_veena</div>
                  <p className="social-card-desc">
                    Follow my 10-year classical Carnatic music journey, Veena practice recordings, and creative life in India.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Open Instagram</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>

              {/* Telegram Card */}
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-editorial-card"
              >
                <div>
                  <div className="social-card-top-icon">
                    <TelegramIcon />
                  </div>
                  <h3 className="social-card-platform">Telegram</h3>
                  <div className="social-card-handle">@PhoenixEditz75</div>
                  <p className="social-card-desc">
                    Direct real-time messaging for quick project discussions, questions about Android development, or tech chats.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Message on Telegram</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>
            </div>

            {/* Email Copy Card with Instant Tooltip Checkmark */}
            <div className="email-copy-editorial-box">
              <h3 className="email-box-title">Direct Inquiries</h3>
              <p className="email-box-subtext">
                Feel free to email me directly regarding open-source Android work or collaboration.
              </p>

              <div className="email-button-wrapper">
                {emailCopied && (
                  <div className="copied-tooltip-bubble" role="status" aria-live="polite">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#4ADE80' }}>check_circle</span>
                    <span>Copied to clipboard!</span>
                  </div>
                )}
                <button
                  type="button"
                  className={`email-copy-action-btn ${emailCopied ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {emailCopied ? 'check' : 'content_copy'}
                  </span>
                  <span>{emailCopied ? 'Email Copied!' : 'Copy Email Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════ Editorial Footer ═══════════ */}
      <footer className="editorial-footer">
        <div className="content-container">
          <div className="footer-top-row">
            <div className="footer-brand-title">
              PHOENIX <span style={{ color: 'var(--autumn-gold)' }}>'26</span>
            </div>

            <div className="footer-links-group">
              <a href="#hero" className="footer-nav-link">Home</a>
              <a href="#about" className="footer-nav-link">About</a>
              <a href="#content" className="footer-nav-link">Content</a>
              <a href="#badges" className="footer-nav-link">Badges</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
            </div>

            <button
              type="button"
              className="footer-back-to-top"
              onClick={scrollToTop}
              title="Back to top"
            >
              <span>Back to Top</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span>
            </button>
          </div>

          <div className="footer-copy-text">
            © {new Date().getFullYear()} Phoenix · 16-year-old Android &amp; Web Developer · 11th Grade PCM · Licensed under Apache-2.0
          </div>
        </div>
      </footer>
    </div>
  );
}
