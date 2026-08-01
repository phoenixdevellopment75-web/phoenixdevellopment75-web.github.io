import { useState, useEffect, useCallback } from 'react';
import DotGrid from './components/DotGrid';
import SplitText from './components/SplitText';
import BlurText from './components/BlurText';
import AnimatedContent from './components/AnimatedContent';
import SpotlightCard from './components/SpotlightCard';
import TiltedCard from './components/TiltedCard';
import Magnet from './components/Magnet';
import Marquee from './components/Marquee';
import DecryptedText from './components/DecryptedText';
import ShinyText from './components/ShinyText';
import GradientText from './components/GradientText';
import ClickSpark from './components/ClickSpark';
import IntroAnimation from './components/IntroAnimation';
import CountUp from './components/CountUp';
import RotatingText from './components/RotatingText';
import ScrollVelocity from './components/ScrollVelocity';

import { badges, categoryLabels, GOOGLE_PROFILE_URL, LEAGUE_INFO } from './data/badges';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [theme, setTheme] = useState('light');

  // Sync theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const filteredBadges = badgeFilter === 'all'
    ? badges
    : badges.filter(b => b.category === badgeFilter);

  // Projects list: NeuroLLM and Slow Roads removed
  const projects = [
    {
      id: 1, title: 'Classmates Hub', category: 'web',
      desc: 'A community site I built for our 10th-grade batch so everyone could keep in touch. Includes student directory, class hierarchy, scroll tabs, and custom profile cards. Was awesome seeing everyone actually use it!',
      tech: ['HTML5', 'CSS3', 'Vanilla JS', 'GitHub Pages'],
      link: 'https://github.com/phoenixdevellopment75-web/Class10thForever-',
      linkText: 'Check GitHub Repo',
    },
    {
      id: 2, title: 'In-Browser File Converter', category: 'web',
      desc: 'Got tired of sketchy online file converters with ads, so I built my own using WebAssembly! Convert images, audio, and video right inside your browser without uploading anything to a server.',
      tech: ['WebAssembly', 'FFmpeg.wasm', 'HTML5'],
      link: '#', linkText: 'Explore Project',
    },
    {
      id: 3, title: 'My Favourite Focus Clock', category: 'productivity',
      desc: 'My go-to Pomodoro timer for long study and coding sessions. Custom sound alerts, interval tracking, and a warm eye-friendly layout so it doesn\'t blind me at 2am.',
      tech: ['JavaScript', 'Web Audio API', 'CSS Grid'],
      link: 'https://github.com/phoenixdevellopment75-web/My-favourite-clock-timer',
      linkText: 'Check GitHub Repo',
    },
  ];

  const projectCategories = {
    all: `All Projects (${projects.length})`,
    web: `Web Apps (${projects.filter(p => p.category === 'web').length})`,
    productivity: `Tools (${projects.filter(p => p.category === 'productivity').length})`,
  };

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  const techStack = [
    { name: 'JavaScript (ES6+)', icon: 'code' },
    { name: 'HTML5 & CSS3', icon: 'web' },
    { name: 'Python', icon: 'terminal' },
    { name: 'Google Cloud Platform', icon: 'cloud' },
    { name: 'Node.js', icon: 'dns' },
    { name: 'Git & GitHub', icon: 'merge_type' },
    { name: 'REST APIs', icon: 'api' },
    { name: 'Kotlin & Android', icon: 'adb' },
    { name: 'Generative AI / Gemini', icon: 'smart_toy' },
    { name: 'Terraform / IaC', icon: 'build' },
    { name: 'BigQuery & SQL', icon: 'storage' },
    { name: 'Docker & Cloud Run', icon: 'cloud_sync' },
  ];

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    alert('Awesome! Thanks for reaching out — I\'ll get back to you as soon as I can!');
    e.target.reset();
  }, []);

  return (
    <ClickSpark sparkColor={theme === 'light' ? '#6B8E4E' : '#9DC183'} sparkSize={10} sparkRadius={32} sparkCount={10}>
      {/* Silky Intro Animation */}
      <IntroAnimation />

      {/* 120Hz Smooth Dot Grid Background */}
      <div className="dot-grid-bg">
        <DotGrid
          dotColor={theme === 'light' ? 'rgba(107, 142, 78, 0.16)' : 'rgba(245, 242, 235, 0.15)'}
          activeColor={theme === 'light' ? '#6B8E4E' : '#9DC183'}
          dotSize={1.6}
          spacing={26}
          interactionRadius={140}
        />
      </div>

      <div className="page-content">
        {/* Navigation */}
        <header>
          <div className="container nav-wrapper">
            <a href="#hero" className="logo">PHOENIX<span>.DEV</span></a>

            <ul className="nav-links">
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#badges">Badges</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>

            <div className="nav-right-actions">
              {/* Dark / Light Mode Toggle Button */}
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Mode"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              >
                <span className="material-symbols-outlined">
                  {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
              </button>

              <Magnet strength={0.25}>
                <a href="#contact" className="btn-header desktop-only">
                  <ShinyText text="Let's Talk" speed={3} />
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
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

          {/* Mobile Nav */}
          <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#hero" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#badges" onClick={() => setMobileMenuOpen(false)}>Badges</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="hero-glow-bg" />
          <div className="container hero-content">
            {/* PFP Avatar (floating badge above removed as requested) */}
            <div>
              <Magnet strength={0.15}>
                <img src="./pfp.jpg" alt="Phoenix profile" className="hero-avatar" />
              </Magnet>
            </div>

            {/* Main Space Headline featuring RotatingText */}
            <h1 className="hero-title">
              <GradientText colors={theme === 'light' ? ['#1A241C', '#6B8E4E', '#506E39', '#1A241C'] : ['#F5F2EB', '#9DC183', '#B4DB96', '#F5F2EB']}>
                HEY, I'M PHOENIX —<br />
                <RotatingText
                  texts={[
                    "CREATIVE DEVELOPER",
                    "GOOGLE CERTIFIED",
                    "AI EXPERIMENTER",
                    "PROBLEM SOLVER"
                  ]}
                  rotationInterval={2600}
                />
              </GradientText>
            </h1>

            <AnimatedContent distance={35} direction="up" delay={250}>
              <p className="hero-subtitle">
                Just a curious developer who loves turning ideas into real, working projects.
                Whether it's cloud labs, AI experiments, or handy browser tools, I love building things,
                learning how stuff works under the hood, and sharing it along the way.
              </p>
            </AnimatedContent>

            {/* Polished Hero Actions */}
            <AnimatedContent distance={30} direction="up" delay={450}>
              <div className="hero-actions">
                <Magnet strength={0.25}>
                  <a href="#projects" className="btn-hero-primary">
                    <span>See My Work</span>
                    <span className="material-symbols-outlined">south</span>
                  </a>
                </Magnet>

                <Magnet strength={0.25}>
                  <a href="#badges" className="btn-hero-secondary">
                    <span className="material-symbols-outlined badge-icon" style={{ color: theme === 'light' ? '#506E39' : '#9DC183' }}>verified</span>
                    <span>Google Badges</span>
                  </a>
                </Magnet>
              </div>
            </AnimatedContent>

            {/* Neatly Cropped Silver League Banner */}
            <AnimatedContent distance={30} direction="up" delay={550}>
              <div className="league-card">
                <img src={LEAGUE_INFO.image} alt={LEAGUE_INFO.name} />
                <div className="league-info">
                  <h4>{LEAGUE_INFO.name}</h4>
                  <span>{LEAGUE_INFO.points} points on Google Cloud Skills</span>
                </div>
              </div>
            </AnimatedContent>

            {/* Stats Bar (100% matcha removed as requested; 3 clean stats) */}
            <AnimatedContent distance={35} direction="up" delay={650}>
              <div className="stats-bar" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp to={2} suffix="+" duration={1.8} />
                  </div>
                  <div className="stat-label"><ShinyText text="Projects Built" speed={4} /></div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp to={7} prefix="0" duration={1.8} />
                  </div>
                  <div className="stat-label"><ShinyText text="Google Badges" speed={4} /></div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    <CountUp to={2} suffix="+ Yrs" duration={1.8} />
                  </div>
                  <div className="stat-label"><ShinyText text="Dev Journey" speed={4} /></div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Scroll Velocity Marquee Banner */}
        <ScrollVelocity
          texts={[
            "GOOGLE CLOUD CERTIFIED",
            "MULTI-AGENT WORKFLOWS",
            "REACT & MODERN WEB",
            "TERRAFORM & BIGQUERY"
          ]}
          velocity={4}
        />

        {/* Google Badges Section */}
        <section id="badges">
          <div className="container">
            <div className="section-header">
              <AnimatedContent distance={25} direction="up">
                <div className="badge-pill">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: theme === 'light' ? '#506E39' : '#9DC183' }}>verified</span>
                  <span>Google Cloud Credentials</span>
                </div>
              </AnimatedContent>
              <h2 className="section-title">
                <GradientText colors={theme === 'light' ? ['#1A241C', '#6B8E4E', '#1A241C'] : ['#F5F2EB', '#9DC183', '#F5F2EB']}>
                  <BlurText text="MY GOOGLE BADGES" delay={80} />
                </GradientText>
              </h2>
              <AnimatedContent distance={20} direction="up" delay={200}>
                <p className="section-desc">
                  These are real skill badges I earned by completing hands-on labs and challenge quests on Google Cloud. No shortcuts — just grinding through the labs and fixing configs.
                </p>
              </AnimatedContent>
            </div>

            {/* Filter Tabs */}
            <AnimatedContent distance={20} direction="up" delay={300}>
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
            </AnimatedContent>

            {/* Badges Grid */}
            <div className="badges-grid">
              {filteredBadges.map((badge, index) => (
                <AnimatedContent key={badge.id} distance={35} direction="up" delay={index * 80}>
                  <TiltedCard tiltMaxAngle={10} scale={1.03} glareEnable glareMaxOpacity={0.18}>
                    <div className="badge-card-inner">
                      <div>
                        <div className="badge-header">
                          <div className="badge-image-wrapper">
                            <img src={badge.image} alt={badge.title} />
                          </div>
                          <span className="badge-tag">
                            {badge.category === 'ai' ? 'AI & Agents' : badge.category === 'cloud' ? 'Google Cloud' : badge.category === 'devsecops' ? 'DevSecOps' : 'Foundational'}
                          </span>
                        </div>
                        <h3 className="badge-title">{badge.title}</h3>
                        <div className="badge-date">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                          <span>Earned {badge.date}</span>
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
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                      </a>
                    </div>
                  </TiltedCard>
                </AnimatedContent>
              ))}
            </div>

            {/* View Full Profile CTA */}
            <AnimatedContent distance={30} direction="up" delay={200}>
              <div className="profile-cta">
                <Magnet strength={0.18}>
                  <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>badge</span>
                    <span>View My Official Google Skills Profile</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                  </a>
                </Magnet>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="container">
            <div className="section-header">
              <AnimatedContent distance={25} direction="up">
                <div className="badge-pill">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>code</span>
                  <span>My Creations</span>
                </div>
              </AnimatedContent>
              <h2 className="section-title">
                <GradientText colors={theme === 'light' ? ['#6B8E4E', '#1A241C', '#506E39'] : ['#9DC183', '#F5F2EB', '#B4DB96']}>
                  <BlurText text="FEATURED PROJECTS" delay={80} />
                </GradientText>
              </h2>
              <AnimatedContent distance={20} direction="up" delay={200}>
                <p className="section-desc">
                  Here are some of the tools and school projects I've built over time. Each one taught me something cool.
                </p>
              </AnimatedContent>
            </div>

            {/* Filter */}
            <AnimatedContent distance={20} direction="up" delay={300}>
              <div className="filter-tabs">
                {Object.entries(projectCategories).map(([key, label]) => (
                  <button
                    key={key}
                    className={`filter-tab ${projectFilter === key ? 'active' : ''}`}
                    onClick={() => setProjectFilter(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </AnimatedContent>

            {/* Projects Grid */}
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <AnimatedContent key={project.id} distance={35} direction="up" delay={index * 90}>
                  <SpotlightCard spotlightColor={theme === 'light' ? 'rgba(107, 142, 78, 0.16)' : 'rgba(157, 193, 131, 0.18)'}>
                    <div className="project-body">
                      <h3 className="project-title">{project.title}</h3>
                      <p className="project-desc">{project.desc}</p>
                      <div className="project-tech">
                        {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                      </div>
                      <div className="project-footer">
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                          <span>{project.linkText}</span>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>open_in_new</span>
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about">
          <div className="container about-wrapper">
            <AnimatedContent distance={35} direction="left">
              <div className="about-text">
                <div className="badge-pill" style={{ marginBottom: '16px' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>person</span>
                  <span>A Little Story</span>
                </div>
                <h3>I LOVE BUILDING STUFF THAT JUST WORKS</h3>
                <p>
                  Hey, I'm Phoenix! I'm not a big studio or agency — just a passionate developer who loves sitting down with a warm cup of matcha and building cool things from scratch.
                </p>
                <p>
                  For over 2 years now, I've been teaching myself web development, cloud computing, and AI logic. I love taking on challenge labs on Google Cloud, experimenting with multi-agent workflows, and making web apps that feel fast, smooth, and fun to use.
                </p>
                <p>
                  I'm constantly learning, breaking code, fixing it, and pushing updates. Feel free to explore my badges and projects!
                </p>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={35} direction="right">
              <div className="skills-box">
                <h4>TOOLS I USE OFTEN</h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  Things I reach for when building projects:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {techStack.map(t => (
                    <span key={t.name} style={{
                      padding: '8px 16px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.88rem',
                      color: 'var(--text-main)',
                      fontWeight: '500'
                    }}>
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Tech Marquee */}
          <div className="tech-marquee-wrapper">
            <Marquee speed={32} pauseOnHover>
              {techStack.map(t => (
                <span key={t.name} className="tech-marquee-item">
                  <span className="material-symbols-outlined">{t.icon}</span>
                  {t.name}
                </span>
              ))}
            </Marquee>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="container">
            <div className="section-header">
              <AnimatedContent distance={25} direction="up">
                <div className="badge-pill">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>build</span>
                  <span>How I Can Help</span>
                </div>
              </AnimatedContent>
              <h2 className="section-title">
                <GradientText colors={theme === 'light' ? ['#1A241C', '#6B8E4E', '#1A241C'] : ['#F5F2EB', '#9DC183', '#F5F2EB']}>
                  <BlurText text="WHAT I CAN DO" delay={80} />
                </GradientText>
              </h2>
              <AnimatedContent distance={20} direction="up" delay={200}>
                <p className="section-desc">
                  Whether you need a custom website, help setting up cloud infrastructure, or an AI agent integration — here's what I specialize in.
                </p>
              </AnimatedContent>
            </div>

            <div className="services-grid">
              {[
                { icon: 'web', title: 'Web Development', desc: 'Building clean, fast, and responsive websites from scratch. Semantic HTML, modern CSS, and lightweight JS without unnecessary bloat.', color: theme === 'light' ? '#506E39' : '#9DC183' },
                { icon: 'smart_toy', title: 'AI & Multi-Agent Integrations', desc: 'Connecting Gemini API, Agent Development Kit (ADK), and multi-agent setups into real apps with clean user interfaces.', color: theme === 'light' ? '#6B8E4E' : '#B4DB96' },
                { icon: 'cloud_sync', title: 'Google Cloud Setup', desc: 'Certified in Google Cloud — setting up serverless hosting, BigQuery data tables, Terraform infrastructure, and Docker deployments.', color: '#3B78D8' },
                { icon: 'palette', title: 'UI Design & Micro-Animations', desc: 'Creating clean aesthetic layouts with smooth interactive animations, responsive cards, and thoughtful details.', color: '#D9A01C' },
              ].map((service, index) => (
                <AnimatedContent key={service.title} distance={30} direction="up" delay={index * 90}>
                  <div className="service-card">
                    <span className="material-symbols-outlined service-icon" style={{ color: service.color }}>{service.icon}</span>
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <div className="container">
            <AnimatedContent distance={35} direction="up">
              <div className="contact-card">
                <div className="section-header" style={{ marginBottom: '24px' }}>
                  <div className="badge-pill">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>mail</span>
                    <span>Say Hello</span>
                  </div>
                  <h2 className="section-title">LET'S CHAT OR COLLABORATE</h2>
                  <p className="section-desc">
                    Got an idea for a project? Want to collaborate or ask a question? Send me a message below — I'd love to hear from you!
                  </p>
                </div>

                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" required className="form-control" placeholder="What's your name?" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" required className="form-control" placeholder="your@email.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows="5" required className="form-control" placeholder="Tell me what's on your mind..." />
                  </div>
                  <Magnet strength={0.15}>
                    <button type="submit" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                      <span>Send Message</span>
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </Magnet>
                </form>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <p>
              © 2026 Phoenix Dev. Crafted with React + <a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer">React Bits</a> • <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer">Google Skills Profile</a>
            </p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  );
}

export default App;
