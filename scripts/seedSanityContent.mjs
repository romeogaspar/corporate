// Seeds the construction-studio "production" dataset with ArcBuild's current
// copy so /studio (run `npm run dev` inside construction-studio/) has real
// starting content instead of empty documents.
// Run once with: npm run seed  (requires SANITY_API_WRITE_TOKEN in .env.local)
import { createClient } from '@sanity/client';
import { randomUUID } from 'node:crypto';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qz3nxygb';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN. Add it to .env.local (see .env.example) and re-run: npm run seed');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const key = () => randomUUID();
const withKeys = (arr) => arr.map((item) => ({ _key: key(), ...item }));

const singletons = [
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'ARCBUILD',
    footerTagline: 'Building the Philippines with precision, integrity, and Filipino craftsmanship since 1994.',
    phone: '+63 46 888 0001',
    email: 'projects@arcbuild.ph',
    address: 'Dasmariñas, Cavite',
    licenseLabel: 'PCAB AAA Licensed',
    copyrightText: 'ArcBuild Corporation. All rights reserved.',
    defaultSeoTitle: 'ArcBuild Corporation | Construction & Real Estate Philippines',
    defaultSeoDescription: "ArcBuild Corporation is one of the Philippines' most trusted construction and real estate development companies — residential, commercial, and industrial.",
  },
  {
    _id: 'homePage',
    _type: 'homePage',
    heroTag: 'Building the Philippines Since 1994',
    heroTitle: { line1: 'WE BUILD', line2Highlight: 'WHAT', line3: 'MATTERS' },
    heroSub: 'From residential developments to landmark commercial towers — ArcBuild delivers construction excellence rooted in precision, integrity, and Filipino craftsmanship.',
    heroStats: withKeys([
      { _type: 'statItem', value: '500+', label: 'Projects Completed' },
      { _type: 'statItem', value: '30', label: 'Years Experience' },
      { _type: 'statItem', value: '₱18B', label: 'Total Project Value' },
      { _type: 'statItem', value: '98%', label: 'On-time Delivery' },
    ]),
    aboutSectionTag: 'Who We Are',
    aboutHeading: { line1: 'BUILDING TRUST', highlight: 'SINCE 1994' },
    aboutBody: "ArcBuild Corporation is one of the Philippines' most trusted construction and real estate development companies, with a proven track record across residential, commercial, and industrial sectors.",
    aboutPoints: withKeys([
      { _type: 'pointItem', icon: '🏗', title: 'PCAB-Licensed Contractor', desc: 'Category AAA license covering all major civil and building works nationwide.' },
      { _type: 'pointItem', icon: '♻', title: 'Sustainable Construction', desc: 'BERDE-certified green building practices integrated in all new developments.' },
      { _type: 'pointItem', icon: '🤝', title: 'Turnkey Solutions', desc: 'From land acquisition and design to construction and handover — one team, full accountability.' },
    ]),
    servicesSectionTag: 'What We Do',
    servicesHeading: { line1: 'OUR CORE', highlight: 'SERVICES' },
    testimonialsSectionTag: 'Client Testimonials',
    testimonialsHeading: { line1: 'WHAT CLIENTS', highlight: 'SAY' },
  },
  {
    _id: 'aboutPage',
    _type: 'aboutPage',
    sectionTag: 'Our Story',
    heading: { line1: 'BUILT ON', highlight: 'INTEGRITY' },
    paragraphs: [
      "Founded in 1994 by Ricardo Dela Cruz, ArcBuild began as a small civil works contractor in Cavite. Three decades later, we've grown into one of the Philippines' most respected construction and real estate firms.",
      'Our portfolio spans over 500 completed projects valued at more than ₱18 billion — from socialized housing in the provinces to premium mixed-use towers in BGC and Makati.',
    ],
    points: withKeys([
      { _type: 'pointItem', icon: '🏗', title: 'PCAB Category AAA Licensed', desc: 'Qualified to undertake the largest civil and building construction projects in the Philippines.' },
      { _type: 'pointItem', icon: '♻', title: 'ISO 9001:2015 Certified', desc: 'Quality management systems that ensure consistency, safety, and client satisfaction on every project.' },
      { _type: 'pointItem', icon: '🤝', title: 'Filipino-Owned & Operated', desc: 'Proudly 100% Filipino, employing over 2,000 skilled workers and engineers nationwide.' },
    ]),
  },
  {
    _id: 'servicesPage',
    _type: 'servicesPage',
    sectionTag: 'What We Do',
    heading: 'SERVICES',
    intro: 'End-to-end construction and real estate solutions for every project scale.',
  },
  {
    _id: 'portfolioPage',
    _type: 'portfolioPage',
    sectionTag: 'Our Work',
    heading: { line1: 'FEATURED', highlight: 'PROJECTS' },
    intro: 'A selection of completed developments across residential, commercial, and industrial sectors.',
  },
  {
    _id: 'pricingPage',
    _type: 'pricingPage',
    sectionTag: 'Transparent Pricing',
    heading: { line1: 'CONSTRUCTION', highlight: 'PACKAGES' },
    intro: 'Indicative per-square-meter rates for residential construction. Final pricing subject to site assessment and specifications.',
    tiers: withKeys([
      { _type: 'pricingTier', tier: 'Economy', price: '₱25,000', unit: 'per sqm · Basic Finish', features: ['Structural works & roofing', 'Standard CHB walls', 'Basic electrical & plumbing', 'Cement floor finish', 'Painted interiors', 'No interior design'], featured: false },
      { _type: 'pricingTier', tier: 'Standard', price: '₱40,000', unit: 'per sqm · Mid-range Finish', features: ['All Economy inclusions', 'Ceramic tile flooring', 'Modular kitchen layout', 'Painted & tiled bathrooms', 'Aluminum windows', '30-day defect warranty'], featured: true, badge: 'Most Popular' },
      { _type: 'pricingTier', tier: 'Premium', price: '₱65,000', unit: 'per sqm · Premium Finish', features: ['All Standard inclusions', 'Engineered hardwood floors', 'Full kitchen & cabinetry', 'Premium sanitary fixtures', 'Double-glazed windows', '1-year full warranty'], featured: false },
    ]),
    disclaimer: 'All rates are indicative and exclude land cost, permits, and professional fees. Contact us for a detailed project estimate.',
  },
  {
    _id: 'teamPage',
    _type: 'teamPage',
    sectionTag: 'The People Behind the Build',
    heading: { line1: 'MEET THE', highlight: 'TEAM' },
    intro: 'Seasoned professionals with decades of combined experience in Philippine construction and real estate.',
  },
  {
    _id: 'contactPage',
    _type: 'contactPage',
    sectionTag: 'Get in Touch',
    heading: { line1: 'START YOUR', highlight: 'PROJECT' },
    intro: 'Tell us about your project and our team will prepare a detailed proposal within 3 business days.',
    infoItems: withKeys([
      { _type: 'infoItem', label: 'Head Office', value: 'Dasmariñas, Cavite, Philippines' },
      { _type: 'infoItem', label: 'Phone', value: '+63 46 888 0001' },
      { _type: 'infoItem', label: 'Email', value: 'projects@arcbuild.ph' },
      { _type: 'infoItem', label: 'Office Hours', value: 'Mon–Fri, 8:00am – 5:30pm' },
      { _type: 'infoItem', label: 'License', value: 'PCAB License No. AAA-12345' },
    ]),
    responseNote: 'We respond within 3 business days.',
    serviceOptions: ['Commercial Construction', 'Residential Development', 'Industrial Facilities', 'Design & Engineering', 'Renovation & Fit-Out', 'Real Estate Inquiry'],
  },
];

const services = [
  { order: 1, icon: '🏢', name: 'Commercial Construction', shortDesc: 'Office towers, retail developments, mixed-use complexes built to international standards.', fullDesc: 'Office towers, retail developments, hotels, and mixed-use complexes. We handle structural works, facade, MEP, and interior fit-out.' },
  { order: 2, icon: '🏘', name: 'Residential Development', shortDesc: 'From single-family homes to large-scale subdivision and condominium projects.', fullDesc: 'Socialized housing, mid-rise condominiums, and premium subdivisions. Complete from land development to unit turnover.' },
  { order: 3, icon: '🏭', name: 'Industrial Facilities', shortDesc: 'Warehouses, manufacturing plants, and logistics hubs across Luzon and Visayas.', fullDesc: 'Warehouses, cold storage, manufacturing plants, and logistics hubs with strict compliance to industrial and safety standards.' },
  { order: 4, icon: '📐', name: 'Design & Engineering', shortDesc: 'In-house architectural, structural, and MEP engineering for complete project control.', fullDesc: 'In-house architectural, structural, mechanical, electrical, and plumbing engineering services for complete design-build delivery.' },
  { order: 5, icon: '🏚', name: 'Renovation & Fit-Out', shortDesc: 'Commercial interiors, building retrofits, and property rehabilitation projects.', fullDesc: 'Commercial interior fit-outs, building retrofits, facade upgrades, and property rehabilitation — minimal disruption guaranteed.' },
  { order: 6, icon: '🏡', name: 'Real Estate Sales', shortDesc: 'Pre-selling and RFO units across our residential portfolio with in-house financing.', fullDesc: 'Pre-selling and ready-for-occupancy units across our residential portfolio. In-house accredited bank financing available.' },
].map((s) => ({ _id: `service-${s.order}`, _type: 'service', ...s }));

const teamMembers = [
  { order: 1, name: 'Ricardo Dela Cruz', role: 'CEO & Founder', bio: '30 years in Philippine construction. Built over ₱12B in infrastructure.' },
  { order: 2, name: 'Maria Santos', role: 'Chief Architect', bio: 'Award-winning designer. FUAP member, specialising in sustainable design.' },
  { order: 3, name: 'Andres Villanueva', role: 'Project Director', bio: '15 years managing large-scale commercial and residential builds.' },
  { order: 4, name: 'Lena Park', role: 'Head of Real Estate', bio: 'Closed over ₱3B in property sales across Metro Manila and Cavite.' },
].map((t) => ({ _id: `teamMember-${t.order}`, _type: 'teamMember', ...t }));

const testimonials = [
  { order: 1, text: 'ArcBuild delivered our 12-storey office tower two weeks ahead of schedule. The quality of work and professionalism throughout was outstanding.', author: 'Engr. Robert Tan', company: 'Vertex Holdings Inc.', project: 'Vertex Tower, BGC', rating: 5 },
  { order: 2, text: "We've partnered with ArcBuild on three subdivision projects. Their consistency, transparency, and craftsmanship keep us coming back.", author: 'Ma. Lourdes Reyes', company: 'Sunrise Property Group', project: 'The Pines Estate', rating: 5 },
  { order: 3, text: 'From permits to turnover, the process was seamless. Our LogiPark facility was completed within budget and exactly to spec.', author: 'James Nakamura', company: 'Asia Pacific Logistics', project: 'LogiPark Cavite', rating: 5 },
].map((t) => ({ _id: `testimonial-${t.order}`, _type: 'testimonial', ...t }));

const portfolioProjects = [
  { order: 1, category: 'Residential', title: 'Skyline Residences', meta: 'Manila · 2024 · 48 Units', featured: true },
  { order: 2, category: 'Commercial', title: 'Vertex Tower', meta: 'BGC · 2023', featured: false },
  { order: 3, category: 'Industrial', title: 'LogiPark Cavite', meta: 'Cavite · 2024', featured: false },
  { order: 4, category: 'Residential', title: 'The Pines Estate', meta: 'Tagaytay · 2023', featured: false },
  { order: 5, category: 'Commercial', title: 'Harbor Walk Mall', meta: 'Cavite · 2022', featured: false },
].map((p) => ({ _id: `portfolioProject-${p.order}`, _type: 'portfolioProject', ...p }));

const run = async () => {
  const tx = client.transaction();
  [...singletons, ...services, ...teamMembers, ...testimonials, ...portfolioProjects].forEach((doc) => tx.createOrReplace(doc));
  await tx.commit();
  console.log(`Seeded ${singletons.length} singletons, ${services.length} services, ${teamMembers.length} team members, ${testimonials.length} testimonials, ${portfolioProjects.length} portfolio projects into "${dataset}".`);
  console.log('Note: images (hero, about, portfolio, team photos) were not set — upload them in /studio; the site falls back to Unsplash stock photos until then.');
};

run().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
