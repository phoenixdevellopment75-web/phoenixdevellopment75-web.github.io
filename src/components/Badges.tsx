import { useState } from 'react';
import { badges, skillsProfile, type BadgeCategory } from '../data';
import { Icon } from './Icons';
import { useMagnetic } from '../useMagnetic';

const filters: { label: string; category: BadgeCategory | 'All Badges'; count: number }[] = [
  { label: 'All Badges', category: 'All Badges', count: 7 },
  { label: 'AI & Agents', category: 'AI & Agents', count: 3 },
  { label: 'Cloud', category: 'Cloud', count: 2 },
  { label: 'DevSecOps', category: 'DevSecOps', count: 1 },
  { label: 'Foundational', category: 'Foundational', count: 1 },
];

export function Badges() {
  const [active, setActive] = useState<BadgeCategory | 'All Badges'>('All Badges');
  const profileRef = useMagnetic<HTMLAnchorElement>();
  const visible = active === 'All Badges' ? badges : badges.filter((badge) => badge.category === active);

  return (
    <section id="badges" className="badges-section section page-wrap" aria-labelledby="badges-title">
      <div className="badges-topline"><span className="eyebrow"><span className="eyebrow-dot" /> PROOF OF PRACTICE</span><span className="mono">GOOGLE CLOUD / 07 BADGES</span></div>
      <div className="badges-heading">
        <div>
          <h2 id="badges-title" data-reveal>
            <span className="reveal-line"><span>Verified Cloud</span></span>
            <span className="reveal-line"><span className="credentials-word">Credentials.</span></span>
          </h2>
          <p>7 verified skill badges earned through hands-on architecture labs on Google Cloud.</p>
        </div>
        <div className="badge-seal" aria-label="Seven verified credentials"><span>GOOGLE<br />CLOUD</span><b>7</b><i>BADGES</i></div>
      </div>
      <div className="filter-bar" role="tablist" aria-label="Filter credentials by category">
        {filters.map((filter) => <button key={filter.label} className={`filter-chip${active === filter.category ? ' active' : ''}`} role="tab" aria-selected={active === filter.category} onClick={() => setActive(filter.category)}>{filter.label}<span>{filter.count}</span></button>)}
      </div>
      <div className="badge-list" aria-live="polite">
        {visible.map((badge, index) => (
          <article className="credential-card" key={badge.badgeId}>
            <span className="credential-index">{String(index + 1).padStart(2, '0')}</span>
            <span className={`credential-icon category-${badge.category.toLowerCase().replaceAll(' ', '-').replace('&', 'and')}`}><Icon name="spark" size={20} /></span>
            <div className="credential-main"><h3>{badge.title}</h3><p>{badge.description}</p><div className="credential-tags"><span>{badge.category}</span><span>GOOGLE SKILLS</span></div></div>
            <div className="credential-date"><span>ISSUED</span><time>{badge.date}</time></div>
            <a className="credential-link" href={`${skillsProfile}/badges/${badge.badgeId}`} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${badge.title} on Google Skills`}><Icon name="external" size={17} /></a>
          </article>
        ))}
      </div>
      <div className="skills-profile-row"><p><span className="profile-star">✳</span> Each badge represents a completed, hands-on skill path.</p><a ref={profileRef} className="profile-button magnetic" href={skillsProfile} target="_blank" rel="noopener noreferrer">View Full Google Skills Profile <Icon name="arrow" size={16} /></a></div>
    </section>
  );
}
