import { client, urlFor } from '../../lib/sanityClient';

export const metadata = {
  title: 'Our Team',
  alternates: { canonical: '/team' },
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

const fallback = {
  sectionTag: 'The People Behind the Build',
  heading: { line1: 'MEET THE', highlight: 'TEAM' },
  intro: 'Seasoned professionals with decades of combined experience in Philippine construction and real estate.',
};

const fallbackTeam = [
  { _id: '1', name: 'Ricardo Dela Cruz', role: 'CEO & Founder', bio: '30 years in Philippine construction. Built over ₱12B in infrastructure.', imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { _id: '2', name: 'Maria Santos', role: 'Chief Architect', bio: 'Award-winning designer. FUAP member, specialising in sustainable design.', imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { _id: '3', name: 'Andres Villanueva', role: 'Project Director', bio: '15 years managing large-scale commercial and residential builds.', imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { _id: '4', name: 'Lena Park', role: 'Head of Real Estate', bio: 'Closed over ₱3B in property sales across Metro Manila and Cavite.', imgSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80' },
];

const query = `{
  "page": *[_id == "teamPage"][0],
  "members": *[_type == "teamMember"] | order(order asc){_id, name, role, bio, photo}
}`;

export default async function Team() {
  const data = await client.fetch(query);
  const page = { ...fallback, ...(data.page || {}) };
  const members = data.members?.length
    ? data.members.map((m, i) => ({ ...m, imgSrc: urlFor(m.photo, 400) || fallbackTeam[i % fallbackTeam.length].imgSrc }))
    : fallbackTeam;

  return (
    <section className="section team-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="section-tag">{page.sectionTag}</div>
        <h2 className="section-heading">{page.heading.line1}<br /><span>{page.heading.highlight}</span></h2>
        <p className="section-sub">{page.intro}</p>
        <div className="team-grid">
          {members.map((t) => (
            <div key={t._id} className="team-card">
              <div className="team-img-wrap"><img src={t.imgSrc} alt={t.name} /></div>
              <div className="team-info">
                <div className="team-name">{t.name}</div>
                <div className="team-role">{t.role}</div>
                <div className="team-bio">{t.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
