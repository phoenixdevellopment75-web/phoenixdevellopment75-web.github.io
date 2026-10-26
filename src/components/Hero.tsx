export function Hero() {
  return (
    <section id="home" className="hero section" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>INDEPENDENT DEVELOPER <span className="topline-star">✳</span> VISAKHAPATNAM, IN</span>
        <span className="mono">PORTFOLIO INDEX / 2026</span>
      </div>

      <div className="id-pass" aria-label="Phoenix, 11th Grade PCM, Android Developer, Visakhapatnam, India">
        <div className="lanyard"><span /><span /></div>
        <div className="lanyard-clip"><i /></div>
        <div className="pass-paper">
          <div className="pass-head"><span className="pass-brand">PHX / 26</span><span className="pass-mark">✳</span></div>
          <img src="/phoenix-avatar.webp" alt="Phoenix's public profile photo" />
          <div className="pass-name">Phoenix</div>
          <div className="pass-role">11TH GRADE PCM<br />ANDROID DEV</div>
          <div className="pass-place">VISAKHAPATNAM, INDIA</div>
          <div className="pass-code" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        </div>
      </div>

      <div className="hero-side-note" aria-hidden="true">
        <span className="hero-side-rule" />
        <span>MADE WITH<br />CURIOSITY<br /><b>AND CARE.</b></span>
      </div>

      <div className="hero-stage">
        <h1 id="hero-title" className="hero-title" aria-label="Portfolio '26">
          <span className="title-line"><span>P</span><span className="low">O</span><span>R</span><span className="high">T</span><span>F</span><span className="low">O</span><span>L</span><span className="high">I</span><span>O</span></span>
          <span className="hero-year">’26<span className="year-star">✳</span></span>
        </h1>
        <div className="hero-portrait-wrap" aria-hidden="true">
          <img className="hero-portrait" src="/phoenix-cutout.webp" onError={(event) => { event.currentTarget.src = '/phoenix-avatar.webp'; }} alt="" />
          <span className="portrait-caption">PHOENIX <span>—</span> DEV / INDIA</span>
        </div>
      </div>

      <div className="hero-bottomline">
        <p className="hero-intro"><strong>Hey, I'm Phoenix.</strong> 16-year-old self-taught developer from India. When I'm not studying 11th grade PCM, I build fast Android apps in Kotlin and local web tools. Saraswati Veena player for 10 years.</p>
        <a className="scroll-cue" href="#about"><span className="scroll-cue-mark">↓</span><span>SCROLL TO EXPLORE</span></a>
        <div className="hero-stack"><span>ANDROID / KOTLIN</span><span>LOCAL-FIRST WEB</span><span>GCP / TERRAFORM</span></div>
      </div>
    </section>
  );
}
