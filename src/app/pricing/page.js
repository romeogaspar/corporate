import Link from 'next/link';
import { client } from '../../lib/sanityClient';

export const metadata = {
  title: 'Pricing',
  alternates: { canonical: '/pricing' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'Transparent Pricing',
  heading: { line1: 'CONSTRUCTION', highlight: 'PACKAGES' },
  intro: 'Indicative per-square-meter rates for residential construction. Final pricing subject to site assessment and specifications.',
  tiers: [
    { tier: 'Economy', price: '₱25,000', unit: 'per sqm · Basic Finish', features: ['Structural works & roofing', 'Standard CHB walls', 'Basic electrical & plumbing', 'Cement floor finish', 'Painted interiors', 'No interior design'], featured: false },
    { tier: 'Standard', price: '₱40,000', unit: 'per sqm · Mid-range Finish', features: ['All Economy inclusions', 'Ceramic tile flooring', 'Modular kitchen layout', 'Painted & tiled bathrooms', 'Aluminum windows', '30-day defect warranty'], featured: true, badge: 'Most Popular' },
    { tier: 'Premium', price: '₱65,000', unit: 'per sqm · Premium Finish', features: ['All Standard inclusions', 'Engineered hardwood floors', 'Full kitchen & cabinetry', 'Premium sanitary fixtures', 'Double-glazed windows', '1-year full warranty'], featured: false },
  ],
  disclaimer: 'All rates are indicative and exclude land cost, permits, and professional fees. Contact us for a detailed project estimate.',
};

const query = `*[_id == "pricingPage"][0]`;

export default async function Pricing() {
  const data = (await client.fetch(query)) || {};
  const page = { ...fallback, ...data };

  return (
    <section className="section pricing-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="section-tag">{page.sectionTag}</div>
        <h2 className="section-heading">{page.heading.line1}<br /><span>{page.heading.highlight}</span></h2>
        <p className="section-sub">{page.intro}</p>
        <div className="pricing-grid">
          {page.tiers.map((p) => (
            <div key={p.tier} className={`pricing-card${p.featured ? ' featured' : ''}`}>
              {p.badge && <div className="pricing-badge">{p.badge}</div>}
              <div className="pricing-tier">{p.tier}</div>
              <div className="pricing-price">{p.price}</div>
              <div className="pricing-unit">{p.unit}</div>
              <div className="pricing-divider" />
              {p.features.map((f) => (
                <div key={f} className="pricing-feature"><span className="pricing-feature-icon">✦</span>{f}</div>
              ))}
              <Link href="/contact" className="pricing-cta">Get a Custom Quote</Link>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.78rem', color: 'var(--concrete)' }}>{page.disclaimer}</p>
      </div>
    </section>
  );
}
