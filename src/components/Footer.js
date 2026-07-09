import Link from 'next/link';

const COMPANY_LINKS = [
  { href: '/about', label: 'About Us' },
  { href: '/team', label: 'Our Team' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

const SERVICE_LINKS = [
  { href: '/services', label: 'Commercial' },
  { href: '/services', label: 'Residential' },
  { href: '/services', label: 'Industrial' },
  { href: '/services', label: 'Design & Engineering' },
];

export default function Footer({
  siteName = 'ARCBUILD',
  footerTagline = 'Building the Philippines with precision, integrity, and Filipino craftsmanship since 1994.',
  phone = '+63 46 888 0001',
  email = 'projects@arcbuild.ph',
  address = 'Dasmariñas, Cavite',
  licenseLabel = 'PCAB AAA Licensed',
  copyrightText = 'ArcBuild Corporation. All rights reserved.',
}) {
  return (
    <footer className="footer">
      <div className="section-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">{siteName}<span>.</span></div>
            <p className="footer-tagline">{footerTagline}</p>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            {COMPANY_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            {SERVICE_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <a href={`mailto:${email}`} className="footer-link">{email}</a>
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="footer-link">{phone}</a>
            <span className="footer-link" style={{ cursor: 'default' }}>{address}</span>
            {licenseLabel && <span className="footer-link" style={{ cursor: 'default' }}>{licenseLabel}</span>}
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} {copyrightText}</div>
          <div className="footer-socials">
            {['fb', 'li', 'ig', 'yt'].map((s) => (
              <div key={s} className="footer-social">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
