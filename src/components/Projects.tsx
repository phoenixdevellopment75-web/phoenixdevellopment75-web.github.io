import { projects } from '../data';
import { Icon } from './Icons';
import type { Project } from '../data';

function DeviceMockup({ kind }: { kind: Project['kind'] }) {
  if (kind === 'wallpaper') return <div className="mockup mockup-phone"><div className="phone-frame"><div className="phone-screen wallpaper-screen"><div className="phone-status"><span>9:41</span><i /></div><div className="wallpaper-art"><span /><i /><b /><em /></div><div className="phone-dock"><i /><i /><i /></div></div></div><span className="mockup-caption">SKIA / ON DEVICE</span></div>;
  if (kind === 'classmates') return <div className="mockup mockup-browser"><div className="browser-frame"><div className="browser-bar"><i /><i /><i /><span>classmates.hub</span></div><div className="classmates-screen"><div className="mock-brand"><b /><i /><i /><i /></div><div className="mock-heading" /><div className="mock-heading short" /><div className="classmate-cards"><i /><i /><i /></div><div className="mock-list"><b /><b /><b /></div></div></div><span className="mockup-caption">MEMORIES / 10TH BATCH</span></div>;
  if (kind === 'converter') return <div className="mockup mockup-converter"><div className="converter-window"><div className="browser-bar"><i /><i /><i /><span>local convert</span></div><div className="converter-drop"><span>↗</span><b>Drop a file</b><i>stays on your device</i><div className="converter-tags"><small>MP4</small><small>WAV</small><small>WEBP</small></div></div></div><div className="converter-phone"><div className="converter-phone-screen"><i /><b /><span /><span /></div></div><span className="mockup-caption">WEBASSEMBLY / LOCAL</span></div>;
  if (kind === 'focus') return <div className="mockup mockup-laptop"><div className="laptop-frame"><div className="laptop-screen"><div className="timer-label">FOCUS SESSION</div><div className="timer-digits">25<span>:</span>00</div><div className="timer-start">START FOCUS</div></div><div className="laptop-base" /></div><span className="mockup-caption">A LITTLE LESS DISTRACTION</span></div>;
  return <div className="mockup mockup-cloud"><div className="cloud-stack cloud-stack-back"><i /><span /><b /></div><div className="cloud-stack cloud-stack-mid"><i /><span /><b /></div><div className="cloud-stack cloud-stack-front"><i /><span /><b /></div><span className="mockup-caption">7 VERIFIED SKILL BADGES</span></div>;
}

export function Projects() {
  return (
    <section id="work" className="work-section section" aria-labelledby="work-title">
      <div className="work-header page-wrap">
        <div className="work-head-left">
          <span className="eyebrow"><span className="eyebrow-dot" /> SELECTED WORK / 2023—26</span>
          <h2 id="work-title" data-reveal>
            <span className="reveal-line"><span>Things I've</span></span>
            <span className="reveal-line"><span>Built</span></span>
          </h2>
        </div>
        <div className="work-head-right"><span className="work-spark">✳</span><p>Real tools running on real devices. No clones, no fake demo wrappers.</p><span className="mono">SCROLL THROUGH / 05</span></div>
      </div>
      <div className="project-number-rail" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div>
      <div className="project-grid page-wrap">
        {projects.map((project) => (
          <article
            className={`project-card project-${project.kind}`}
            key={project.number}
            onPointerMove={(event) => {
              if (event.pointerType !== 'mouse') return;
              const bounds = event.currentTarget.getBoundingClientRect();
              event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - bounds.left}px`);
              event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - bounds.top}px`);
            }}
            onPointerLeave={(event) => {
              event.currentTarget.style.removeProperty('--cursor-x');
              event.currentTarget.style.removeProperty('--cursor-y');
            }}
          >
            <div className="project-art" aria-hidden="true">
              <DeviceMockup kind={project.kind} />
              <span className="project-big-number">{Number(project.number)}</span>
              <span className="project-corner-code">PX — {project.number}</span>
            </div>
            <div className="project-copy">
              <span className="project-label">PROJECT {project.number}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.links.map((link) => link.href.startsWith('#')
                  ? <a key={link.label} href={link.href}>{link.label}<Icon name="arrow" size={14} /></a>
                  : <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<Icon name="external" size={13} /></a>)}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="work-endnote page-wrap"><span>BUILT FOR USE, NOT JUST A SCREENSHOT</span><span>MORE EXPERIMENTS IN PROGRESS <b>↗</b></span></div>
    </section>
  );
}
