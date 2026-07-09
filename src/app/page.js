import Link from 'next/link';
import { client, urlFor } from '../lib/sanityClient';

export const metadata = {
  title: 'Home',
  alternates: { canonical: '/' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  heroTag: 'Building the Philippines Since 1994',
  heroTitle: { line1: 'WE BUILD', line2Highlight: 'WHAT', line3: 'MATTERS' },
  heroSub: 'From residential developments to landmark commercial towers — ArcBuild delivers construction excellence rooted in precision, integrity, and Filipino craftsmanship.',
  heroImage: null,
  heroStats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '30', label: 'Years Experience' },
    { value: '₱18B', label: 'Total Project Value' },
    { value: '98%', label: 'On-time Delivery' },
  ],
  aboutSectionTag: 'Who We Are',
  aboutHeading: { line1: 'BUILDING TRUST', highlight: 'SINCE 1994' },
  aboutBody: "ArcBuild Corporation is one of the Philippines' most trusted construction and real estate development companies, with a proven track record across residential, commercial, and industrial sectors.",
  aboutImages: null,
  aboutPoints: [
    { icon: '🏗', title: 'PCAB-Licensed Contractor', desc: 'Category AAA license covering all major civil and building works nationwide.' },
    { icon: '♻', title: 'Sustainable Construction', desc: 'BERDE-certified green building practices integrated in all new developments.' },
    { icon: '🤝', title: 'Turnkey Solutions', desc: 'From land acquisition and design to construction and handover — one team, full accountability.' },
  ],
  servicesSectionTag: 'What We Do',
  servicesHeading: { line1: 'OUR CORE', highlight: 'SERVICES' },
  testimonialsSectionTag: 'Client Testimonials',
  testimonialsHeading: { line1: 'WHAT CLIENTS', highlight: 'SAY' },
};

const fallbackServices = [
  { _id: '1', icon: '🏢', name: 'Commercial Construction', shortDesc: 'Office towers, retail developments, mixed-use complexes built to international standards.' },
  { _id: '2', icon: '🏘', name: 'Residential Development', shortDesc: 'From single-family homes to large-scale subdivision and condominium projects.' },
  { _id: '3', icon: '🏭', name: 'Industrial Facilities', shortDesc: 'Warehouses, manufacturing plants, and logistics hubs across Luzon and Visayas.' },
  { _id: '4', icon: '📐', name: 'Design & Engineering', shortDesc: 'In-house architectural, structural, and MEP engineering for complete project control.' },
  { _id: '5', icon: '🏚', name: 'Renovation & Fit-Out', shortDesc: 'Commercial interiors, building retrofits, and property rehabilitation projects.' },
  { _id: '6', icon: '🏡', name: 'Real Estate Sales', shortDesc: 'Pre-selling and RFO units across our residential portfolio with in-house financing.' },
];

const fallbackTestimonials = [
  { _id: '1', text: 'ArcBuild delivered our 12-storey office tower two weeks ahead of schedule. The quality of work and professionalism throughout was outstanding.', author: 'Engr. Robert Tan', company: 'Vertex Holdings Inc.', project: 'Vertex Tower, BGC' },
  { _id: '2', text: "We've partnered with ArcBuild on three subdivision projects. Their consistency, transparency, and craftsmanship keep us coming back.", author: 'Ma. Lourdes Reyes', company: 'Sunrise Property Group', project: 'The Pines Estate' },
  { _id: '3', text: 'From permits to turnover, the process was seamless. Our LogiPark facility was completed within budget and exactly to spec.', author: 'James Nakamura', company: 'Asia Pacific Logistics', project: 'LogiPark Cavite' },
];

const FALLBACK_HERO_IMG = 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80';
const FALLBACK_ABOUT_MAIN_IMG = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80';
const FALLBACK_ABOUT_ACCENT_IMG = 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80';

const query = `{
  "home": *[_id == "homePage"][0],
  "services": *[_type == "service"] | order(order asc)[0...6]{_id, icon, name, shortDesc},
  "testimonials": *[_type == "testimonial"] | order(order asc){_id, text, author, company, project}
}`;

export default async function Home() {
  const data = await client.fetch(query);
  const home = { ...fallback, ...(data.home || {}) };
  const services = data.services?.length ? data.services : fallbackServices;
  const testimonials = data.testimonials?.length ? data.testimonials : fallbackTestimonials;

  const heroImgSrc = home.heroImage ? urlFor(home.heroImage, 1600) : FALLBACK_HERO_IMG;
  const aboutMainSrc = home.aboutImages?.mainImage ? urlFor(home.aboutImages.mainImage, 700) : FALLBACK_ABOUT_MAIN_IMG;
  const aboutAccentSrc = home.aboutImages?.accentImage ? urlFor(home.aboutImages.accentImage, 500) : FALLBACK_ABOUT_ACCENT_IMG;
  const aboutBadgeValue = home.aboutImages?.badgeValue || '30';
  const aboutBadgeLabel = home.aboutImages?.badgeLabel || 'Years of Excellence';

  return (
    <>
      <section className="hero">
        <div className="hero-bg">
          <img src={heroImgSrc} alt="Construction site" />
          <div className="hero-bg-overlay" />
          <div className="hero-grid-lines" />
        </div>
        <div className="hero-content">
          <div className="hero-tag">{home.heroTag}</div>
          <h1 className="hero-title">
            {home.heroTitle.line1}<br />
            <span>{home.heroTitle.line2Highlight}</span><br />
            {home.heroTitle.line3}
          </h1>
          <p className="hero-sub">{home.heroSub}</p>
          <div className="hero-actions">
            <Link href="/portfolio" className="btn-amber">View Our Projects</Link>
            <Link href="/contact" className="btn-outline">Request a Quote</Link>
          </div>
        </div>
        <div className="hero-stats">
          {home.heroStats.map((s) => (
            <div key={s.label} className="hero-stat">
              <div className="hero-stat-val">{s.value}</div>
              <div className="hero-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-section">
        <div className="section-inner">
          <div className="about-layout">
            <div className="about-img-stack">
              <img className="about-img-main" src={aboutMainSrc} alt="Construction" />
              <img className="about-img-accent" src={aboutAccentSrc} alt="Blueprint" />
              <div className="about-badge">
                <span className="about-badge-val">{aboutBadgeValue}</span>
                <span className="about-badge-lbl">{aboutBadgeLabel}</span>
              </div>
            </div>
            <div>
              <div className="section-tag">{home.aboutSectionTag}</div>
              <h2 className="section-heading">{home.aboutHeading.line1} <span>{home.aboutHeading.highlight}</span></h2>
              <p className="section-sub">{home.aboutBody}</p>
              <div className="about-points">
                {home.aboutPoints.map((p) => (
                  <div key={p.title} className="about-point">
                    <div className="about-point-icon">{p.icon}</div>
                    <div className="about-point-text"><h4>{p.title}</h4><p>{p.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/about" className="btn-amber" style={{ marginTop: '2rem' }}>Learn More About Us</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section">
        <div className="section-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag">{home.servicesSectionTag}</div>
              <h2 className="section-heading">{home.servicesHeading.line1}<br /><span>{home.servicesHeading.highlight}</span></h2>
            </div>
            <Link href="/services" className="btn-outline">All Services →</Link>
          </div>
          <div className="services-grid" style={{ marginTop: '3rem' }}>
            {services.map((s, i) => (
              <Link key={s._id} href="/services" className="service-card">
                <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="service-icon">{s.icon}</div>
                <div className="service-name">{s.name}</div>
                <p className="service-desc">{s.shortDesc}</p>
                <div className="service-link">Learn More</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="section-tag">{home.testimonialsSectionTag}</div>
          <h2 className="section-heading">{home.testimonialsHeading.line1}<br /><span>{home.testimonialsHeading.highlight}</span></h2>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t._id} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-company">{t.company}</div>
                <div className="testimonial-project">{t.project}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
