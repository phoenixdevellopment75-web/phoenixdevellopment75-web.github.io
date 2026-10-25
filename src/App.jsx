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
 * Phoenix Portfolio — Clean Editorial Design
 * Palette: Cream Linen, Autumn Golden Hour, Deep Black, White. Zero AI gradients.
 */

import React, { useState, useEffect } from 'react';
import './App.css';
import { badges, categoryLabels, GOOGLE_PROFILE_URL } from './data/badges';

/* ── Minimalist SVG Icons ── */
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

  const navTabs = [
    { id: 'hero',    label: 'Home'    },
    { id: 'about',   label: 'About'   },
    { id: 'content', label: 'Work'    },
    { id: 'badges',  label: 'Badges'  },
    { id: 'contact', label: 'Contact' },
  ];

  // ScrollSpy via IntersectionObserver — no manual active state overwrite
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'content', 'badges', 'contact'];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredBadges = badgeFilter === 'all'
    ? badges
    : badges.filter(b => b.category === badgeFilter);

  const socialLinks = {
    github:        'https://github.com/phoenixdevellopment75-web',
    instagram:     'https://www.instagram.com/phoenix_veena/',
    telegram:      'https://t.me/PhoenixEditz75',
    googleProfile: GOOGLE_PROFILE_URL,
  };

  // Scraper-resistant — decoded only on click
  const handleCopyEmail = () => {
    try {
      const email = atob('cGhvZW5peGRldmVsbG9wbWVudDc1QGdtYWlsLmNvbQ==');
      navigator.clipboard.writeText(email).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      });
    } catch {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="app-wrapper">

      {/* ═══════════ Floating Editorial Navbar ═══════════ */}
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

        {/* Mobile Drawer */}
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
        {/* ═══════════ HERO — Editorial Poster Typography + Depth Portrait ═══════════ */}
        <section className="hero-stage-section" id="hero">
          <div className="hero-inner-constrained">
            <div className="hero-art-wrapper">
              {/* Constrained "PORTFOLIO" title — no 100vw stretch */}
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

              {/* Phoenix cutout — layered behind the letters (z-index 3 cuts through) */}
              <div className="hero-person-cutout-box">
                <img
                  src="./phoenix_hero.png"
                  alt="Phoenix, developer"
                  className="hero-person-img"
                  onError={(e) => { e.target.src = './pfp.png'; }}
                />
              </div>

              <div className="hero-caption-name">PHOENIX DEV // '26</div>
            </div>

            {/* Hero intro — natural voice */}
            <div className="hero-intro-strip">
              <p className="hero-intro-text">
                Hey, I'm Phoenix. I'm a 16-year-old self-taught developer from India currently
                in 11th grade (PCM). When I'm not studying, I build lightweight Android apps in
                Kotlin and local-first web tools. I've also trained in the Saraswati Veena for
                over 10 years.
              </p>
              <div className="hero-stat-chips">
                <span className="hero-stat-chip">🎵 10 Yrs Saraswati Veena</span>
                <span className="hero-stat-chip">📱 Android · Kotlin</span>
                <span className="hero-stat-chip">☁️ 7 GCP Badges</span>
                <span className="hero-stat-chip">🇮🇳 India</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ ABOUT — Lanyard ID + 3-Column Bio ═══════════ */}
        <section className="editorial-profile-section" id="about">
          <div className="content-container">
            <div className="profile-editorial-grid">

              {/* Hanging Lanyard Badge */}
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
                      onError={(e) => { e.target.src = './pfp.png'; }}
                    />
                  </div>
                  <div className="id-card-details">
                    <div className="id-person-name">PHOENIX</div>
                    <div className="id-person-role">11TH GRADE PCM · ANDROID DEV</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-muted)', marginTop: '2px' }}>
                      India · Available for Projects
                    </div>
                  </div>
                  <div className="id-barcode-graphic">
                    {[3,1,4,2,5,1,3,2,4,1,3,2,5,2,4,1,3,2,6].map((w, i) => (
                      <div key={i} className="id-barcode-bar" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--ink-dim)', marginTop: '4px', textAlign: 'center' }}>
                    ID: PHX-2026-PCM-CARNATIC
                  </div>
                </div>
              </div>

              {/* Right — bio editorial columns */}
              <div className="profile-main-editorial">
                <div>
                  <h2 className="editorial-greeting-title">
                    Hi, I'm <span>Phoenix</span>
                  </h2>
                  <p className="editorial-lead-bio" style={{ marginTop: '12px' }}>
                    I am a 16-year-old self-taught developer from India, currently in 11th grade
                    studying Physics, Chemistry, and Mathematics. I build native Android apps in
                    Kotlin and local-first web tools. 10+ years of Carnatic Veena taught me
                    rhythm, cadence, and the patience to get things right.
                  </p>
                </div>

                {/* 3-Column editorial grid */}
                <div className="editorial-three-columns">
                  {/* Studies */}
                  <div>
                    <div className="column-header-title">Studies &amp; Discipline</div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">11th Grade PCM</div>
                      <div className="column-entry-desc">Physics, Chemistry &amp; Mathematics.</div>
                      <div className="column-entry-date">2025 – Present</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Carnatic Vocal &amp; Veena</div>
                      <div className="column-entry-desc">10 Yrs Saraswati Veena — classical tala, microtonal tuning.</div>
                      <div className="column-entry-date">2016 – Present</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Self-Taught Dev</div>
                      <div className="column-entry-desc">Android architecture, 2D canvas math, cloud infra.</div>
                      <div className="column-entry-date">2023 – Present</div>
                    </div>
                  </div>

                  {/* Core Skills */}
                  <div>
                    <div className="column-header-title">Core Skills</div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Native Android</div>
                      <div className="column-entry-desc">Kotlin, Jetpack Compose, Material 3, Monet colors.</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Skia 2D Graphics</div>
                      <div className="column-entry-desc">Procedural canvas rendering at 60/120 FPS on-device.</div>
                    </div>
                    <div className="column-item-entry">
                      <div className="column-entry-title">Cloud &amp; DevOps</div>
                      <div className="column-entry-desc">Google Cloud, Terraform, BigQuery, Docker, Cloud Run.</div>
                    </div>
                  </div>

                  {/* Connect */}
                  <div>
                    <div className="column-header-title">Connect</div>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="connect-entry-link">
                      <GitHubIcon />
                      <span>github.com/phoenixdevellopment75-web</span>
                    </a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="connect-entry-link">
                      <InstagramIcon />
                      <span>instagram.com/phoenix_veena</span>
                    </a>
                    <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="connect-entry-link">
                      <TelegramIcon />
                      <span>t.me/PhoenixEditz75</span>
                    </a>
                    <a href={socialLinks.googleProfile} target="_blank" rel="noopener noreferrer" className="connect-entry-link">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>badge</span>
                      <span>Google Skills Profile</span>
                    </a>
                  </div>
                </div>

                {/* Tech stack pills */}
                <div className="software-stack-row">
                  <div className="software-heading">Technologies &amp; Tooling</div>
                  <div className="software-chips-flex">
                    {['Kotlin','Jetpack Compose','Android Studio','Skia Canvas','Python','React 19',
                      'JavaScript ES6+','Google Cloud','Terraform','BigQuery','Docker','WebAssembly','Git / GitHub']
                      .map(t => <span key={t} className="software-badge-pill">{t}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ WORK — 5-Column Project Grid ═══════════ */}
        <section className="content-showcase-section" id="content">
          <div className="content-container">
            <div className="content-header-art">
              <div className="content-steps-row">
                {['01','02','03','04','05'].map(n => (
                  <span key={n} className="content-step-num">{n}</span>
                ))}
              </div>
              <div className="content-big-outline-text">CONTENT</div>
            </div>

            {/* Work section subtitle */}
            <p className="work-section-subtitle">
              Apps and tools I built from scratch — zero fake demos or clones.
            </p>

            {/* 5 project columns — simplified: icon mockup + 1-line desc + giant number */}
            <div className="five-columns-project-grid">

              {/* 1 — Wallpaper Studio (Blue) */}
              <div className="content-col-card col-theme-1">
                <div className="col-top-content">
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#FFFFFF' }}>wallpaper</span>
                      <div className="mockup-label">25+ SKIA PATTERNS</div>
                    </div>
                  </div>
                  <div className="col-badge-tag">Android · Skia 2D</div>
                  <h3 className="col-project-title">Material UI 3 Wallpaper Studio</h3>
                  <p className="col-project-desc">
                    Generates procedural geometric wallpapers right on your phone without internet access or data leaks.
                  </p>
                  <div className="col-links-row">
                    <a href="https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-/releases" target="_blank" rel="noopener noreferrer" className="col-link-chip">↓ APK v2.6.0</a>
                    <a href="https://github.com/phoenixdevellopment75-web/Material-ui-3-wallpaper-studio-" target="_blank" rel="noopener noreferrer" className="col-link-chip col-link-ghost">GitHub ↗</a>
                  </div>
                </div>
                <div className="content-bottom-num">1</div>
              </div>

              {/* 2 — Classmates Hub (Khaki) */}
              <div className="content-col-card col-theme-2">
                <div className="col-top-content">
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#141414' }}>groups</span>
                      <div className="mockup-label" style={{ color: '#141414' }}>CLASS 10TH VAULT</div>
                    </div>
                  </div>
                  <div className="col-badge-tag">Web · Community</div>
                  <h3 className="col-project-title" style={{ color: '#141414' }}>Classmates Hub</h3>
                  <p className="col-project-desc" style={{ color: '#2C261F' }}>
                    A class portal I built for my 10th-grade batch to save memories and stay connected.
                  </p>
                  <div className="col-links-row">
                    <a href="https://github.com/phoenixdevellopment75-web/Class10thForever-" target="_blank" rel="noopener noreferrer" className="col-link-chip" style={{ background: '#141414', color: '#FFF' }}>GitHub ↗</a>
                  </div>
                </div>
                <div className="content-bottom-num" style={{ color: 'rgba(20,20,20,0.75)' }}>2</div>
              </div>

              {/* 3 — File Converter (Green) */}
              <div className="content-col-card col-theme-3">
                <div className="col-top-content">
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#FFFFFF' }}>swap_horizontal_circle</span>
                      <div className="mockup-label">WASM · FFMPEG</div>
                    </div>
                  </div>
                  <div className="col-badge-tag">WASM · 100% Private</div>
                  <h3 className="col-project-title">In-Browser File Converter</h3>
                  <p className="col-project-desc">
                    Converts audio, video, and images directly in the browser via WebAssembly so files never leave your device.
                  </p>
                  <div className="col-links-row">
                    <a href="https://github.com/phoenixdevellopment75-web" target="_blank" rel="noopener noreferrer" className="col-link-chip">GitHub ↗</a>
                  </div>
                </div>
                <div className="content-bottom-num">3</div>
              </div>

              {/* 4 — Focus Clock (Rust) */}
              <div className="content-col-card col-theme-4">
                <div className="col-top-content">
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#FFFFFF' }}>alarm</span>
                      <div className="mockup-label">SYNTH AUDIO</div>
                    </div>
                  </div>
                  <div className="col-badge-tag">Productivity · Sound</div>
                  <h3 className="col-project-title">Focus Clock</h3>
                  <p className="col-project-desc">
                    A distraction-free Pomodoro timer with clean synthesized audio alerts.
                  </p>
                  <div className="col-links-row">
                    <a href="https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer" target="_blank" rel="noopener noreferrer" className="col-link-chip">GitHub ↗</a>
                  </div>
                </div>
                <div className="content-bottom-num">4</div>
              </div>

              {/* 5 — Cloud Credentials (Slate) */}
              <div className="content-col-card col-theme-5">
                <div className="col-top-content">
                  <div className="col-mockup-frame">
                    <div className="mockup-inner-art">
                      <span className="material-symbols-outlined" style={{ fontSize: '42px', color: '#FFFFFF' }}>verified_user</span>
                      <div className="mockup-label">7 VERIFIED BADGES</div>
                    </div>
                  </div>
                  <div className="col-badge-tag">Google Cloud Platform</div>
                  <h3 className="col-project-title">Cloud Credentials</h3>
                  <p className="col-project-desc">
                    7 verified Google Cloud skill badges in BigQuery, Terraform, and cloud architecture.
                  </p>
                  <div className="col-links-row">
                    <a href="#badges" className="col-link-chip">See Badges ↓</a>
                  </div>
                </div>
                <div className="content-bottom-num">5</div>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════ BADGES — Google Cloud Credentials Gallery ═══════════ */}
        <section className="credentials-gallery-section" id="badges">
          <div className="content-container">
            <div className="section-head-editorial">
              <span className="section-tag-eyebrow">Google Cloud Platform</span>
              <h2 className="section-main-heading">Verified Cloud Credentials</h2>
              <p className="section-editorial-subtext">
                7 verified skill badges earned by completing hands-on challenge labs on Google Cloud —
                covering agentic AI, infrastructure as code, BigQuery, and security.
              </p>
            </div>

            {/* Filter pills */}
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

            {/* Badges grid */}
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
                <span>View Full Google Skills Profile</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════ CONTACT ═══════════ */}
        <section className="contact-hub-section" id="contact">
          <div className="content-container">
            <div className="section-head-editorial" style={{ textAlign: 'center', alignItems: 'center' }}>
              <span className="section-tag-eyebrow">Get In Touch</span>
              <h2 className="section-main-heading">Connect &amp; Collaborate</h2>
              <p className="section-editorial-subtext" style={{ textAlign: 'center' }}>
                Have an Android app idea, want to collaborate on a project, or just chat about tech?
                Drop me a message below.
              </p>
            </div>

            {/* 3 Social Cards */}
            <div className="social-cards-grid">
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-editorial-card">
                <div>
                  <div className="social-card-top-icon"><GitHubIcon /></div>
                  <h3 className="social-card-platform">GitHub</h3>
                  <div className="social-card-handle">@phoenixdevellopment75-web</div>
                  <p className="social-card-desc">
                    Open-source Android wallpaper studio, local-first WASM utilities, and more.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Visit GitHub Profile</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>

              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-editorial-card">
                <div>
                  <div className="social-card-top-icon"><InstagramIcon /></div>
                  <h3 className="social-card-platform">Instagram</h3>
                  <div className="social-card-handle">@phoenix_veena</div>
                  <p className="social-card-desc">
                    Classical Carnatic music, Veena practice recordings, and life in India.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Open Instagram</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>

              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="social-editorial-card">
                <div>
                  <div className="social-card-top-icon"><TelegramIcon /></div>
                  <h3 className="social-card-platform">Telegram</h3>
                  <div className="social-card-handle">@PhoenixEditz75</div>
                  <p className="social-card-desc">
                    Quick project questions, Android development chats, or just say hi.
                  </p>
                </div>
                <div className="social-card-action-label">
                  <span>Message on Telegram</span>
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>arrow_forward</span>
                </div>
              </a>
            </div>

            {/* Email copy card */}
            <div className="email-copy-editorial-box">
              <h3 className="email-box-title">Direct Email</h3>
              <p className="email-box-subtext">
                Open for collaboration, Android tooling, and open-source work.
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
              <a href="#hero"    className="footer-nav-link">Home</a>
              <a href="#about"   className="footer-nav-link">About</a>
              <a href="#content" className="footer-nav-link">Work</a>
              <a href="#badges"  className="footer-nav-link">Badges</a>
              <a href="#contact" className="footer-nav-link">Contact</a>
            </div>

            <button type="button" className="footer-back-to-top" onClick={scrollToTop} title="Back to top">
              <span>Back to Top</span>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_upward</span>
            </button>
          </div>

          <div className="footer-copy-text">
            © {new Date().getFullYear()} Phoenix · 16-year-old Android &amp; Web Developer · 11th Grade PCM · Apache-2.0
          </div>
        </div>
      </footer>
    </div>
  );
}
