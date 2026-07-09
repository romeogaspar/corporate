import PortfolioClient from './PortfolioClient';
import { client, urlFor } from '../../lib/sanityClient';

export const metadata = {
  title: 'Portfolio',
  alternates: { canonical: '/portfolio' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'Our Work',
  heading: { line1: 'FEATURED', highlight: 'PROJECTS' },
  intro: 'A selection of completed developments across residential, commercial, and industrial sectors.',
};

const fallbackProjects = [
  { _id: '1', category: 'Residential', title: 'Skyline Residences', meta: 'Manila · 2024 · 48 Units', imgSrc: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80', featured: true },
  { _id: '2', category: 'Commercial', title: 'Vertex Tower', meta: 'BGC · 2023', imgSrc: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80' },
  { _id: '3', category: 'Industrial', title: 'LogiPark Cavite', meta: 'Cavite · 2024', imgSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80' },
  { _id: '4', category: 'Residential', title: 'The Pines Estate', meta: 'Tagaytay · 2023', imgSrc: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80' },
  { _id: '5', category: 'Commercial', title: 'Harbor Walk Mall', meta: 'Cavite · 2022', imgSrc: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&q=80' },
];

const query = `{
  "page": *[_id == "portfolioPage"][0],
  "projects": *[_type == "portfolioProject"] | order(order asc){_id, category, title, meta, image, featured}
}`;

export default async function Portfolio() {
  const data = await client.fetch(query);
  const page = { ...fallback, ...(data.page || {}) };
  const projects = data.projects?.length
    ? data.projects.map((p, i) => ({ ...p, imgSrc: urlFor(p.image, 900) || fallbackProjects[i % fallbackProjects.length].imgSrc }))
    : fallbackProjects;

  return (
    <section className="section portfolio-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="section-tag">{page.sectionTag}</div>
        <h2 className="section-heading">{page.heading.line1}<br /><span>{page.heading.highlight}</span></h2>
        <p className="section-sub">{page.intro}</p>
        <PortfolioClient items={projects} />
      </div>
    </section>
  );
}
