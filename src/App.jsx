import { useState, useEffect } from 'react';
import DotGrid from './components/DotGrid';
import SplitText from './components/SplitText';
import BlurText from './components/BlurText';
import AnimatedContent from './components/AnimatedContent';
import SpotlightCard from './components/SpotlightCard';
import Magnet from './components/Magnet';
import DecryptedText from './components/DecryptedText';
import ShinyText from './components/ShinyText';
import ClickSpark from './components/ClickSpark';
import IntroAnimation from './components/IntroAnimation';
import RotatingText from './components/RotatingText';
import ScrollVelocity from './components/ScrollVelocity';
import Aurora from './components/Aurora';
import StarBorder from './components/StarBorder';
import FadeContent from './components/FadeContent';
import ScrollFloat from './components/ScrollFloat';
import Ribbons from './components/Ribbons';
import GlitchText from './components/GlitchText';
import Marquee from './components/Marquee';
import CountUp from './components/CountUp';

import { badges, categoryLabels, GOOGLE_PROFILE_URL } from './data/badges';

/* ── SVG Icons ── */
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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('phoenix-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('phoenix-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const filteredBadges = badgeFilter === 'all'
    ? badges
    : badges.filter(b => b.category === badgeFilter);

  const projects = [
    {
      id: 1, title: 'Classmates Hub', category: 'web',
      desc: 'A community website built for our 10th-grade class to stay connected — student directory, class structure, and profile cards.',
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'GitHub Pages'],
      link: 'https://github.com/phoenixdevellopment75-web/Class10thForever-',
      linkText: 'View on GitHub',
    },
    {
      id: 2, title: 'In-Browser File Converter', category: 'web',
      desc: 'Convert images, audio, and video directly inside your browser without uploading files to any external server.',
      tech: ['WebAssembly', 'FFmpeg.wasm', 'HTML5'],
      link: '#', linkText: 'Explore Project',
    },
    {
      id: 3, title: 'My Favourite Focus Clock', category: 'productivity',
      desc: 'A Pomodoro timer with audio alerts, interval tracking, and an eye-friendly dark design for focused study sessions.',
      tech: ['JavaScript', 'Web Audio API', 'CSS Grid'],
      link: 'https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer',
      linkText: 'View on GitHub',
    },
  ];

  const techStack = [
    'JavaScript (ES6+)',
    'HTML5 & CSS3',
    'Python',
    'Google Cloud',
    'Node.js',
    'Git & GitHub',
    'REST APIs',
    'Kotlin & Android',
    'Generative AI / Gemini',
    'Terraform / IaC',
    'BigQuery & SQL',
    'Docker & Cloud Run',
  ];

  const socialLinks = {
    github: 'https://github.com/phoenixdevellopment75-web',
    instagram: 'https://www.instagram.com/phoenix_veena/',
    telegram: 'https://t.me/PhoenixEditz75',
  };

  const closeMobile = () => setMobileMenuOpen(false);

  /* ── Stats data ── */
  const stats = [
    { value: badges.length, label: 'Google Badges', suffix: '' },
    { value: 2, label: 'Years Building', suffix: '+' },
    { value: projects.length, label: 'Projects Shipped', suffix: '+' },
    { value: 12, label: 'Technologies', suffix: '+' },
  ];

  return (
    <ClickSpark sparkColor="#9DC183" sparkSize={7} sparkRadius={24} sparkCount={6}>
      {/* Intro Animation */}
      <IntroAnimation />

      {/* Subtle Dot Grid */}
      <div className="dot-grid-bg">
        <DotGrid
          dotColor={theme === 'dark' ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.04)"}
          activeColor="rgba(107, 142, 78, 0.25)"
          dotSize={1}
          spacing={35}
          interactionRadius={90}
        />
      </div>

      <div className="page-content">
        {/* ═══════════ Navigation ═══════════ */}
        <header>
          <div className="container nav-wrapper">
            <a href="#hero" className="logo">PHOENIX<span>.</span></a>

            <ul className="nav-links">
              <li><a href="#hero">Home</a></li>
              <li><a href="#badges">Badges</a></li>
              <li><a href="#projects">Work</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="nav-right-actions">
              {/* Theme Toggle Button */}
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                title={`Switch to ${theme === 'dark' ? 'White' : 'Dark'} theme`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>

              <Magnet strength={0.2}>
                <a href="#contact" className="btn-nav desktop-only">
                  Let's Talk
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </a>
              </Magnet>

              <button
                className="menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <span className="material-symbols-outlined">
                  {mobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>

          <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={closeMobile}>Home</a>
            <a href="#badges" onClick={closeMobile}>Badges</a>
            <a href="#projects" onClick={closeMobile}>Work</a>
            <a href="#about" onClick={closeMobile}>About</a>
            <a href="#contact" onClick={closeMobile}>Contact</a>
          </nav>
        </header>

        {/* ═══════════ Hero Section ═══════════ */}
        <section className="hero" id="hero">
          <div className="hero-aurora-wrapper">
            <Aurora
              colorStops={['#506E39', '#6B8E4E', '#3A5228', '#9DC183']}
              speed={10}
              blur={120}
              opacity={theme === 'dark' ? 0.12 : 0.08}
            />
          </div>

          <div className="container hero-content">
            {/* Avatar + Status */}
            <FadeContent blur duration={0.6}>
              <div className="hero-top-row">
                <img src="./pfp.jpg" alt="Phoenix" className="hero-avatar" />
                <div className="hero-status">
                  <span className="status-dot"></span>
                  <span>Currently building a small-end LLM</span>
                </div>
              </div>
            </FadeContent>

            {/* Headline */}
            <h1 className="hero-title">
              <SplitText
                text="I design & build"
                delay={35}
                animationFrom={{ opacity: 0, transform: 'translateY(24px)' }}
                animationTo={{ opacity: 1, transform: 'translateY(0)' }}
              />
              <br />
              <span className="accent">
                <RotatingText
                  texts={[
                    "cloud projects.",
                    "simple web apps.",
                    "AI tools.",
                    "useful code."
                  ]}
                  rotationInterval={2800}
                />
              </span>
            </h1>

            <FadeContent blur duration={0.7} delay={0.25}>
              <p className="hero-subtitle">
                Hey, I'm Phoenix. I'm a developer building web apps, completing Google Cloud labs, and working on AI projects.
              </p>
            </FadeContent>

            {/* CTAs */}
            <FadeContent blur duration={0.7} delay={0.4}>
              <div className="hero-actions">
                <Magnet strength={0.15}>
                  <StarBorder as="a" color="#6B8E4E" speed="10s" className="btn-primary" href="#projects" style={{ borderRadius: '9999px' }}>
                    See My Work
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>south</span>
                  </StarBorder>
                </Magnet>
                <Magnet strength={0.15}>
                  <a href="#badges" className="btn-secondary">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px', color: '#6B8E4E' }}>verified</span>
                    {badges.length} Google Badges
                  </a>
                </Magnet>
              </div>
            </FadeContent>

            {/* Social Row */}
            <FadeContent blur duration={0.7} delay={0.55}>
              <div className="hero-social-group">
                <span className="hero-social-label">CONNECT //</span>
                <div className="social-row">
                  <Magnet strength={0.3}>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                      <GitHubIcon />
                    </a>
                  </Magnet>
                  <Magnet strength={0.3}>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                      <InstagramIcon />
                    </a>
                  </Magnet>
                  <Magnet strength={0.3}>
                    <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram">
                      <TelegramIcon />
                    </a>
                  </Magnet>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ═══════════ Scroll Marquee — Ghost Text ═══════════ */}
        <ScrollVelocity
          texts={[
            "GOOGLE CLOUD BADGES",
            "REACT & VANILLA WEB",
            "TERRAFORM & BIGQUERY",
            "PRACTICAL AI TOOLS"
          ]}
          velocity={3}
        />

        {/* ═══════════ Stats Strip (Launchfolio-style) ═══════════ */}
        <section className="stats-strip" id="stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <AnimatedContent key={i} direction="up" distance={30} delay={i * 0.1}>
                  <div className="stat-cell">
                    <span className="stat-number">
                      <CountUp from={0} to={stat.value} duration={2} />{stat.suffix}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Badges Section ═══════════ */}
        <section id="badges">
          <div className="container">
            <div className="section-header">
              <FadeContent blur>
                <div className="label-pill">
                  <span className="material-symbols-outlined">verified</span>
                  <span>Google Cloud Credentials</span>
                </div>
              </FadeContent>
              <h2 className="section-title">
                <ScrollFloat animationDuration={0.8} stagger={0.04}>
                  Earned Badges
                </ScrollFloat>
              </h2>
              <FadeContent blur delay={0.1}>
                <p className="section-desc">
                  Badges earned by finishing hands-on labs and challenge quests on Google Cloud.
                </p>
              </FadeContent>
            </div>

            {/* Filters */}
            <FadeContent blur delay={0.15}>
              <div className="filter-tabs">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`filter-tab ${badgeFilter === key ? 'active' : ''}`}
                    onClick={() => setBadgeFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </FadeContent>

            {/* Badges Grid */}
            <div className="badges-grid">
              {filteredBadges.map((badge, index) => (
                <AnimatedContent key={badge.id} direction="up" distance={30} delay={index * 0.06}>
                  <div className="badge-card">
                    <div>
                      <div className="badge-card-top">
                        <div className="badge-image-wrapper">
                          <img src={badge.image} alt={badge.title} />
                        </div>
                        <span className="badge-tag">
                          {badge.category === 'ai' ? 'AI' : badge.category === 'cloud' ? 'Cloud' : badge.category === 'devsecops' ? 'DevSecOps' : 'Foundation'}
                        </span>
                      </div>
                      <h3 className="badge-title">{badge.title}</h3>
                      <div className="badge-date">
                        <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>schedule</span>
                        {badge.date}
                      </div>
                      <p className="badge-desc">{badge.description}</p>
                      <div className="badge-skills-list">
                        {badge.skills.map(skill => (
                          <span key={skill} className="skill-chip">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <a href={badge.badgeUrl} target="_blank" rel="noopener noreferrer" className="btn-badge-link">
                      <ShinyText text="View on Google Skills" speed={3} />
                      <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                    </a>
                  </div>
                </AnimatedContent>
              ))}
            </div>

            {/* Profile CTA */}
            <FadeContent blur delay={0.1}>
              <div className="profile-cta">
                <Magnet strength={0.12}>
                  <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>badge</span>
                    View Full Google Profile
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>open_in_new</span>
                  </a>
                </Magnet>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ═══════════ Projects Section ═══════════ */}
        <section id="projects">
          <div className="container">
            <div className="section-header">
              <FadeContent blur>
                <div className="label-pill">
                  <span className="material-symbols-outlined">code</span>
                  <span>Selected Work</span>
                </div>
              </FadeContent>
              <h2 className="section-title">
                <ScrollFloat animationDuration={0.8} stagger={0.04}>
                  Featured Projects
                </ScrollFloat>
              </h2>
              <FadeContent blur delay={0.1}>
                <p className="section-desc">
                  Projects and tools I've built.
                </p>
              </FadeContent>
            </div>

            <div className="projects-grid">
              {projects.map((project, index) => (
                <AnimatedContent key={project.id} direction="up" distance={40} delay={index * 0.1}>
                  <SpotlightCard
                    spotlightColor="rgba(107, 142, 78, 0.06)"
                    className="project-card"
                  >
                    <div className="project-body">
                      <div className="project-number">0{index + 1}</div>
                      <h3 className="project-title">
                        <DecryptedText text={project.title} speed={40} revealDirection="start" />
                      </h3>
                      <p className="project-desc">{project.desc}</p>
                      <div className="project-tech">
                        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <div className="project-footer">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          {project.linkText}
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_outward</span>
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ Tech Marquee ═══════════ */}
        <div className="tech-marquee-strip">
          <Marquee speed={35} pauseOnHover>
            {techStack.map((tech, i) => (
              <span key={i} className="marquee-tech-item">
                {tech}
                <span className="marquee-sep">✦</span>
              </span>
            ))}
          </Marquee>
        </div>

        {/* ═══════════ About Section ═══════════ */}
        <section id="about">
          <div className="container">
            <div className="section-header">
              <FadeContent blur>
                <div className="label-pill">
                  <span className="material-symbols-outlined">person</span>
                  <span>About Me</span>
                </div>
              </FadeContent>
              <h2 className="section-title">
                <ScrollFloat animationDuration={0.8} stagger={0.04}>
                  A Little Story
                </ScrollFloat>
              </h2>
            </div>

            <FadeContent blur delay={0.1}>
              <div className="about-grid">
                <div className="about-text">
                  <p>
                    I'm a developer who loves building things with code. Over the past 2+ years, I've taught myself web development, cloud computing, and AI.
                  </p>
                  <p>
                    I like testing my skills on Google Cloud challenge labs, building clean web tools, and learning how things work under the hood.
                  </p>
                </div>

                <div className="about-sidebar">
                  <h4>Tools & Technologies</h4>
                  <div className="skills-list">
                    {techStack.map(t => (
                      <Magnet key={t} strength={0.15}>
                        <span className="skill-tag">{t}</span>
                      </Magnet>
                    ))}
                  </div>

                  <div className="currently-building">
                    <h4>What I'm Working On</h4>
                    <p>
                      Currently building a small-end LLM from scratch — learning how tokenization, neural network layers, and training loops work.
                    </p>
                    <div className="status-line">
                      <span className="status-dot"></span>
                      In progress
                    </div>
                  </div>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ═══════════ Contact Section ═══════════ */}
        <section id="contact" className="contact-section">
          <div className="ribbons-wrapper">
            <Ribbons baseHue={120} count={3} speed={0.4} opacity={0.06} />
          </div>

          <div className="container">
            <FadeContent blur>
              <div className="contact-inner">
                <div className="label-pill" style={{ marginBottom: '16px' }}>
                  <span className="material-symbols-outlined">mail</span>
                  <span>Get in Touch</span>
                </div>

                <h2 className="contact-heading">
                  <BlurText text="Let's Work Together" delay={60} />
                </h2>

                <p className="contact-desc">
                  Have a project idea, want to collaborate, or just want to connect?
                  Reach out through any of these platforms.
                </p>

                <div className="contact-links">
                  <Magnet strength={0.12}>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                      <GitHubIcon /> GitHub
                    </a>
                  </Magnet>
                  <Magnet strength={0.12}>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                      <InstagramIcon /> Instagram
                    </a>
                  </Magnet>
                  <Magnet strength={0.12}>
                    <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                      <TelegramIcon /> Telegram
                    </a>
                  </Magnet>
                  <Magnet strength={0.12}>
                    <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="contact-link-btn">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
                      Google Skills
                    </a>
                  </Magnet>
                </div>
              </div>
            </FadeContent>
          </div>
        </section>

        {/* ═══════════ Footer ═══════════ */}
        <footer>
          <div className="container footer-inner">
            <div className="footer-left">
              <div className="footer-logo">
                <GlitchText
                  text="PHOENIX."
                  speed={5}
                  enableShadow={false}
                  colors={{
                    primary: theme === 'dark' ? '#FAFAFA' : '#1A241C',
                    glitch1: '#9DC183',
                    glitch2: '#506E39'
                  }}
                />
              </div>
              <div className="footer-links">
                <a href="#badges">Badges</a>
                <a href="#projects">Work</a>
                <a href="#about">About</a>
                <a href="#contact">Contact</a>
              </div>
            </div>

            <div className="footer-right">
              <div className="social-row">
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                  <GitHubIcon />
                </a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Telegram">
                  <TelegramIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="container" style={{ textAlign: 'center', marginTop: '24px' }}>
            <p className="footer-credit">
              © 2026 Phoenix · Built with React
            </p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}

export default App;
