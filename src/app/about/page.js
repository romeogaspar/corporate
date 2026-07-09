import { client, urlFor } from '../../lib/sanityClient';

export const metadata = {
  title: 'About Us',
  alternates: { canonical: '/about' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'Our Story',
  heading: { line1: 'BUILT ON', highlight: 'INTEGRITY' },
  paragraphs: [
    "Founded in 1994 by Ricardo Dela Cruz, ArcBuild began as a small civil works contractor in Cavite. Three decades later, we've grown into one of the Philippines' most respected construction and real estate firms.",
    'Our portfolio spans over 500 completed projects valued at more than ₱18 billion — from socialized housing in the provinces to premium mixed-use towers in BGC and Makati.',
  ],
  images: null,
  points: [
    { icon: '🏗', title: 'PCAB Category AAA Licensed', desc: 'Qualified to undertake the largest civil and building construction projects in the Philippines.' },
    { icon: '♻', title: 'ISO 9001:2015 Certified', desc: 'Quality management systems that ensure consistency, safety, and client satisfaction on every project.' },
    { icon: '🤝', title: 'Filipino-Owned & Operated', desc: 'Proudly 100% Filipino, employing over 2,000 skilled workers and engineers nationwide.' },
  ],
};

const FALLBACK_MAIN_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80';
const FALLBACK_ACCENT_IMG = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80';

const query = `*[_id == "aboutPage"][0]`;

export default async function About() {
  const data = (await client.fetch(query)) || {};
  const about = { ...fallback, ...data };

  const mainSrc = about.images?.mainImage ? urlFor(about.images.mainImage, 700) : FALLBACK_MAIN_IMG;
  const accentSrc = about.images?.accentImage ? urlFor(about.images.accentImage, 500) : FALLBACK_ACCENT_IMG;
  const badgeValue = about.images?.badgeValue || '30';
  const badgeLabel = about.images?.badgeLabel || 'Years Strong';

  return (
    <section className="section about-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="about-layout">
          <div className="about-img-stack">
            <img className="about-img-main" src={mainSrc} alt="Construction" />
            <img className="about-img-accent" src={accentSrc} alt="Blueprint" />
            <div className="about-badge">
              <span className="about-badge-val">{badgeValue}</span>
              <span className="about-badge-lbl">{badgeLabel}</span>
            </div>
          </div>
          <div>
            <div className="section-tag">{about.sectionTag}</div>
            <h2 className="section-heading">{about.heading.line1}<br /><span>{about.heading.highlight}</span></h2>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="section-sub" style={{ marginBottom: i < about.paragraphs.length - 1 ? '1.5rem' : 0 }}>{p}</p>
            ))}
            <div className="about-points" style={{ marginTop: '2rem' }}>
              {about.points.map((p) => (
                <div key={p.title} className="about-point">
                  <div className="about-point-icon">{p.icon}</div>
                  <div className="about-point-text"><h4>{p.title}</h4><p>{p.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
