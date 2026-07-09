import Link from 'next/link';
import { client } from '../../lib/sanityClient';

export const metadata = {
  title: 'Services',
  alternates: { canonical: '/services' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'What We Do',
  heading: 'SERVICES',
  intro: 'End-to-end construction and real estate solutions for every project scale.',
};

const fallbackServices = [
  { _id: '1', icon: '🏢', name: 'Commercial Construction', fullDesc: 'Office towers, retail developments, hotels, and mixed-use complexes. We handle structural works, facade, MEP, and interior fit-out.' },
  { _id: '2', icon: '🏘', name: 'Residential Development', fullDesc: 'Socialized housing, mid-rise condominiums, and premium subdivisions. Complete from land development to unit turnover.' },
  { _id: '3', icon: '🏭', name: 'Industrial Facilities', fullDesc: 'Warehouses, cold storage, manufacturing plants, and logistics hubs with strict compliance to industrial and safety standards.' },
  { _id: '4', icon: '📐', name: 'Design & Engineering', fullDesc: 'In-house architectural, structural, mechanical, electrical, and plumbing engineering services for complete design-build delivery.' },
  { _id: '5', icon: '🏚', name: 'Renovation & Fit-Out', fullDesc: 'Commercial interior fit-outs, building retrofits, facade upgrades, and property rehabilitation — minimal disruption guaranteed.' },
  { _id: '6', icon: '🏡', name: 'Real Estate Sales', fullDesc: 'Pre-selling and ready-for-occupancy units across our residential portfolio. In-house accredited bank financing available.' },
];

const query = `{
  "page": *[_id == "servicesPage"][0],
  "services": *[_type == "service"] | order(order asc){_id, icon, name, fullDesc}
}`;

export default async function Services() {
  const data = await client.fetch(query);
  const page = { ...fallback, ...(data.page || {}) };
  const services = data.services?.length ? data.services : fallbackServices;

  return (
    <section className="section services-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="section-tag">{page.sectionTag}</div>
        <h2 className="section-heading">OUR <span>{page.heading}</span></h2>
        <p className="section-sub">{page.intro}</p>
        <div className="services-grid">
          {services.map((s, i) => (
            <Link key={s._id} href="/contact" className="service-card">
              <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="service-icon">{s.icon}</div>
              <div className="service-name">{s.name}</div>
              <p className="service-desc">{s.fullDesc}</p>
              <div className="service-link">Get a Quote</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
