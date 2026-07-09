import ContactClient from './ContactClient';
import { client } from '../../lib/sanityClient';

export const metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'Get in Touch',
  heading: { line1: 'START YOUR', highlight: 'PROJECT' },
  intro: 'Tell us about your project and our team will prepare a detailed proposal within 3 business days.',
  infoItems: [
    { label: 'Head Office', value: 'Dasmariñas, Cavite, Philippines' },
    { label: 'Phone', value: '+63 46 888 0001' },
    { label: 'Email', value: 'projects@arcbuild.ph' },
    { label: 'Office Hours', value: 'Mon–Fri, 8:00am – 5:30pm' },
    { label: 'License', value: 'PCAB License No. AAA-12345' },
  ],
  responseNote: 'We respond within 3 business days.',
  serviceOptions: ['Commercial Construction', 'Residential Development', 'Industrial Facilities', 'Design & Engineering', 'Renovation & Fit-Out', 'Real Estate Inquiry'],
};

const query = `*[_id == "contactPage"][0]`;

export default async function ContactPage() {
  const data = (await client.fetch(query)) || {};
  const page = { ...fallback, ...data };

  return <ContactClient page={page} />;
}
