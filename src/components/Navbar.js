'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ siteName = 'ARCBUILD' }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href) => pathname === href ? 'active' : '';
  const close = () => setOpen(false);

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo" onClick={close}>{siteName}<span>.</span></Link>
        <div className="nav-links">
          {PAGES.map((p) => (
            <Link key={p.href} href={p.href} className={`nav-link ${isActive(p.href)}`}>{p.label}</Link>
          ))}
        </div>
        <Link href="/contact" className="nav-cta">Get a Quote</Link>
        <button className="nav-mobile-btn" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>☰</button>
      </nav>

      <div className={`nav-mobile-menu${open ? ' open' : ''}`}>
        {PAGES.map((p) => (
          <Link key={p.href} href={p.href} className={isActive(p.href)} onClick={close}>{p.label}</Link>
        ))}
        <Link href="/contact" className="nav-mobile-cta" onClick={close}>Get a Quote</Link>
      </div>
    </>
  );
}
