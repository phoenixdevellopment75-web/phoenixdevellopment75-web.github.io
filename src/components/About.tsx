const facts = [
  { index: '01', label: 'EDUCATION', title: '11th Grade PCM Track', detail: 'CBSE · Physics, Chemistry & Math' },
  { index: '02', label: 'CORE STACK', title: 'Kotlin · Jetpack Compose', detail: 'Skia 2D · Material 3 · Android Studio' },
  { index: '03', label: 'WEB & SYSTEMS', title: 'TypeScript · React', detail: 'WebAssembly · FFmpeg.wasm' },
  { index: '04', label: 'CLOUD', title: 'Google Cloud Platform', detail: 'Terraform · BigQuery' },
];

export function About() {
  return (
    <section id="about" className="about-section section page-wrap" aria-labelledby="about-title">
      <div className="section-heading-row">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> A LITTLE ABOUT ME</span>
          <h2 id="about-title" data-reveal>
            <span className="reveal-line"><span>Hi, I'm</span></span>
            <span className="reveal-line"><span>Phoenix<span className="heading-period">.</span></span></span>
          </h2>
        </div>
        <span className="section-index mono">01 — 05</span>
      </div>
      <div className="about-content">
        <div className="about-copy">
          <span className="about-open-quote">“</span>
          <p>I'm a 16-year-old self-taught developer from India currently in 11th grade studying Physics, Chemistry, and Math (PCM). When I'm not preparing for exams, I build lightweight Android apps in Kotlin and local-first web tools. I’ve also trained on the Saraswati Veena for 10 years, which taught me discipline and precision.</p>
          <div className="about-signature"><span className="signature-line" /><span>Curious by default. Careful by design.</span></div>
        </div>
        <div className="spec-grid" aria-label="Education and technical skills">
          {facts.map((fact) => (
            <article className="spec-card" key={fact.index}>
              <div className="spec-card-top"><span>{fact.label}</span><span className="spec-index">{fact.index}</span></div>
              <h3>{fact.title}</h3>
              <p>{fact.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
