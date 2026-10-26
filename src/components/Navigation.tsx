import { useState } from 'react';
import { Icon } from './Icons';
import { useMagnetic } from '../useMagnetic';
import type { Theme } from '../App';

const items = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Badges', href: '#badges' },
  { label: 'Contact', href: '#contact' },
];

type Props = { theme: Theme; onToggleTheme: () => void };

export function Navigation({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const helloRef = useMagnetic<HTMLAnchorElement>();
  const close = () => setOpen(false);

  return (
    <header className="topbar">
      <a className="brand" href="#home" onClick={close} aria-label="Phoenix home">
        <span className="brand-mark" aria-hidden="true"><i /><b /></span>
        <span>PHOENIX <span className="brand-year">'26</span></span>
      </a>
      <div className="availability"><span className="live-dot" />16 y/o dev <span className="nav-dot">·</span> 11th PCM <span className="nav-dot">·</span> Available</div>
      <nav className={`nav-links${open ? ' is-open' : ''}`} aria-label="Main navigation">
        {items.map((item) => <a key={item.href} href={item.href} onClick={close}>{item.label}</a>)}
      </nav>
      <button className="theme-toggle" type="button" role="switch" aria-checked={theme === 'dark'} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={onToggleTheme}>
        <span className="theme-switch-track"><span className="theme-switch-thumb"><Icon name={theme === 'dark' ? 'moon' : 'sun'} size={12} /></span></span>
      </button>
      <a ref={helloRef} className="nav-hello magnetic" href="#contact" onClick={close}>Say Hello <Icon name="arrow" size={15} /></a>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <Icon name={open ? 'check' : 'menu'} size={19} />
      </button>
    </header>
  );
}
