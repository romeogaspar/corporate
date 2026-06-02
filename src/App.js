import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');`;

const css = `
${FONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --steel: #0D1117;
  --steel-mid: #161C24;
  --steel-soft: #1E2730;
  --iron: #2C3540;
  --concrete: #8A9099;
  --concrete-light: #C4C9CF;
  --off-white: #F0EDE8;
  --white: #FAFAFA;
  --amber: #E8A020;
  --amber-dark: #B87D10;
  --amber-light: #F5C55A;
  --rust: #C04A20;
  --font-display: 'Bebas Neue', sans-serif;
  --font-body: 'Outfit', sans-serif;
}
body { background: var(--steel); color: var(--off-white); font-family: var(--font-body); overflow-x: hidden; }

/* NAV */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 4rem; height: 70px; display: flex; align-items: center; justify-content: space-between; background: rgba(13,17,23,0.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(232,160,32,0.12); }
.nav-logo { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 0.06em; color: var(--white); cursor: pointer; }
.nav-logo span { color: var(--amber); }
.nav-links { display: flex; gap: 2.5rem; align-items: center; }
.nav-link { font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--concrete); cursor: pointer; background: none; border: none; font-family: var(--font-body); transition: color 0.2s; }
.nav-link:hover, .nav-link.active { color: var(--amber); }
.nav-cta { background: var(--amber); color: var(--steel); padding: 10px 24px; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; font-family: var(--font-body); font-weight: 600; transition: background 0.2s; }
.nav-cta:hover { background: var(--amber-light); }
.nav-mobile-btn { display: none; background: none; border: none; cursor: pointer; color: var(--white); font-size: 1.4rem; }

/* HERO */
.hero { min-height: 100vh; position: relative; display: flex; align-items: flex-end; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; }
.hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.35); }
.hero-bg-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, rgba(13,17,23,0.92) 40%, rgba(13,17,23,0.3) 100%); }
.hero-grid-lines { position: absolute; inset: 0; background-image: linear-gradient(rgba(232,160,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.04) 1px, transparent 1px); background-size: 60px 60px; }
.hero-content { position: relative; z-index: 2; padding: 0 6rem 7rem; max-width: 800px; }
.hero-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.5rem; }
.hero-tag::before { content: ''; width: 32px; height: 2px; background: var(--amber); }
.hero-title { font-family: var(--font-display); font-size: clamp(4rem, 8vw, 8rem); line-height: 0.92; color: var(--white); margin-bottom: 1.5rem; letter-spacing: 0.02em; }
.hero-title span { color: var(--amber); }
.hero-sub { font-size: 1rem; color: var(--concrete-light); line-height: 1.8; max-width: 480px; margin-bottom: 3rem; font-weight: 300; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-amber { background: var(--amber); color: var(--steel); padding: 16px 38px; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; border: none; cursor: pointer; font-family: var(--font-body); font-weight: 600; transition: all 0.2s; }
.btn-amber:hover { background: var(--amber-light); transform: translateY(-2px); }
.btn-outline { background: transparent; color: var(--off-white); padding: 16px 38px; font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; font-family: var(--font-body); transition: all 0.2s; }
.btn-outline:hover { border-color: var(--amber); color: var(--amber); transform: translateY(-2px); }
.hero-stats { position: absolute; right: 6rem; bottom: 7rem; z-index: 2; display: flex; flex-direction: column; gap: 1px; }
.hero-stat { background: rgba(22,28,36,0.9); border: 1px solid rgba(232,160,32,0.15); padding: 1.2rem 1.8rem; border-left: 3px solid var(--amber); }
.hero-stat-val { font-family: var(--font-display); font-size: 2.2rem; color: var(--amber); letter-spacing: 0.04em; }
.hero-stat-lbl { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--concrete); margin-top: 2px; }
.hero-scroll { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
.hero-scroll span { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--concrete); }
.hero-scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--amber), transparent); animation: scrollpulse 1.8s ease-in-out infinite; }
@keyframes scrollpulse { 0%,100%{opacity:0.4;transform:scaleY(1)} 50%{opacity:1;transform:scaleY(1.2)} }

/* SECTION COMMON */
.section { padding: 7rem 0; }
.section-inner { max-width: 1200px; margin: 0 auto; padding: 0 4rem; }
.section-tag { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--amber); margin-bottom: 1rem; display: flex; align-items: center; gap: 10px; }
.section-tag::before { content: ''; width: 24px; height: 2px; background: var(--amber); }
.section-heading { font-family: var(--font-display); font-size: clamp(2.8rem, 4vw, 4.5rem); line-height: 0.95; color: var(--white); margin-bottom: 1.5rem; letter-spacing: 0.02em; }
.section-heading span { color: var(--amber); }
.section-sub { font-size: 0.95rem; color: var(--concrete); line-height: 1.9; max-width: 540px; font-weight: 300; }

/* ABOUT */
.about-section { background: var(--steel-mid); }
.about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
.about-img-stack { position: relative; height: 520px; }
.about-img-main { position: absolute; left: 0; top: 0; width: 75%; height: 85%; object-fit: cover; }
.about-img-accent { position: absolute; right: 0; bottom: 0; width: 55%; height: 55%; object-fit: cover; border: 4px solid var(--steel-mid); }
.about-badge { position: absolute; left: 58%; top: 38%; background: var(--amber); color: var(--steel); padding: 1.2rem 1.5rem; text-align: center; z-index: 2; }
.about-badge-val { font-family: var(--font-display); font-size: 2.5rem; display: block; }
.about-badge-lbl { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; }
.about-points { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
.about-point { display: flex; align-items: flex-start; gap: 1rem; }
.about-point-icon { width: 36px; height: 36px; background: rgba(232,160,32,0.1); border: 1px solid rgba(232,160,32,0.25); display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: var(--amber); font-size: 0.9rem; }
.about-point-text h4 { font-size: 0.9rem; font-weight: 600; color: var(--off-white); margin-bottom: 0.2rem; }
.about-point-text p { font-size: 0.82rem; color: var(--concrete); line-height: 1.7; font-weight: 300; }

/* SERVICES */
.services-section { background: var(--steel); }
.services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 4rem; }
.service-card { background: var(--steel-mid); padding: 2.5rem; border-top: 3px solid transparent; transition: all 0.3s; cursor: pointer; position: relative; overflow: hidden; }
.service-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 0; background: rgba(232,160,32,0.05); transition: height 0.3s; }
.service-card:hover { border-top-color: var(--amber); transform: translateY(-4px); }
.service-card:hover::after { height: 100%; }
.service-num { font-family: var(--font-display); font-size: 3.5rem; color: rgba(232,160,32,0.12); line-height: 1; margin-bottom: 1rem; }
.service-icon { font-size: 1.8rem; margin-bottom: 1rem; }
.service-name { font-size: 1.05rem; font-weight: 600; color: var(--white); margin-bottom: 0.75rem; letter-spacing: 0.02em; }
.service-desc { font-size: 0.83rem; color: var(--concrete); line-height: 1.8; font-weight: 300; margin-bottom: 1.5rem; }
.service-link { font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); display: flex; align-items: center; gap: 8px; }
.service-link::after { content: '→'; transition: transform 0.2s; }
.service-card:hover .service-link::after { transform: translateX(4px); }

/* PORTFOLIO */
.portfolio-section { background: var(--steel-mid); }
.portfolio-filters { display: flex; gap: 0.5rem; margin: 2.5rem 0; flex-wrap: wrap; }
.portfolio-filter { background: transparent; border: 1px solid var(--iron); color: var(--concrete); padding: 8px 20px; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; font-family: var(--font-body); transition: all 0.2s; }
.portfolio-filter.active, .portfolio-filter:hover { background: var(--amber); border-color: var(--amber); color: var(--steel); }
.portfolio-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
.portfolio-item { position: relative; overflow: hidden; cursor: pointer; }
.portfolio-item.featured { grid-column: span 2; }
.portfolio-img-wrap { aspect-ratio: 4/3; overflow: hidden; }
.portfolio-item.featured .portfolio-img-wrap { aspect-ratio: 16/9; }
.portfolio-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; filter: brightness(0.75); }
.portfolio-item:hover .portfolio-img-wrap img { transform: scale(1.06); filter: brightness(0.55); }
.portfolio-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 1.8rem; }
.portfolio-cat { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.4rem; }
.portfolio-title { font-family: var(--font-display); font-size: 1.4rem; color: var(--white); letter-spacing: 0.04em; }
.portfolio-meta { font-size: 0.78rem; color: var(--concrete-light); margin-top: 0.3rem; }
.portfolio-item:hover .portfolio-title { color: var(--amber-light); }

/* PRICING */
.pricing-section { background: var(--steel); }
.pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 4rem; }
.pricing-card { background: var(--steel-mid); padding: 3rem 2.5rem; position: relative; transition: transform 0.3s; }
.pricing-card.featured { background: var(--amber); }
.pricing-card:hover { transform: translateY(-4px); }
.pricing-badge { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--rust); color: white; font-size: 0.65rem; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 16px; font-weight: 600; white-space: nowrap; }
.pricing-tier { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--concrete); margin-bottom: 0.75rem; }
.pricing-card.featured .pricing-tier { color: rgba(13,17,23,0.6); }
.pricing-price { font-family: var(--font-display); font-size: 3.5rem; color: var(--white); line-height: 1; margin-bottom: 0.25rem; }
.pricing-card.featured .pricing-price { color: var(--steel); }
.pricing-unit { font-size: 0.78rem; color: var(--concrete); margin-bottom: 2rem; }
.pricing-card.featured .pricing-unit { color: rgba(13,17,23,0.55); }
.pricing-divider { height: 1px; background: rgba(255,255,255,0.08); margin-bottom: 2rem; }
.pricing-card.featured .pricing-divider { background: rgba(13,17,23,0.15); }
.pricing-feature { display: flex; align-items: center; gap: 10px; font-size: 0.83rem; color: var(--concrete-light); padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-weight: 300; }
.pricing-card.featured .pricing-feature { color: var(--steel); border-bottom-color: rgba(13,17,23,0.1); }
.pricing-feature-icon { color: var(--amber); font-size: 0.8rem; flex-shrink: 0; }
.pricing-card.featured .pricing-feature-icon { color: var(--steel); }
.pricing-cta { width: 100%; margin-top: 2rem; padding: 14px; font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; font-family: var(--font-body); font-weight: 600; transition: all 0.2s; border: 1px solid rgba(232,160,32,0.3); background: transparent; color: var(--amber); }
.pricing-card.featured .pricing-cta { background: var(--steel); color: var(--amber); border-color: var(--steel); }
.pricing-cta:hover { background: var(--amber); color: var(--steel); border-color: var(--amber); }
.pricing-card.featured .pricing-cta:hover { background: var(--steel-mid); }

/* TEAM */
.team-section { background: var(--steel-mid); }
.team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-top: 4rem; }
.team-card { position: relative; overflow: hidden; cursor: pointer; }
.team-img-wrap { aspect-ratio: 3/4; overflow: hidden; }
.team-img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(30%) brightness(0.8); transition: all 0.5s; }
.team-card:hover .team-img-wrap img { filter: grayscale(0%) brightness(0.6); transform: scale(1.04); }
.team-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1.5rem; background: linear-gradient(to top, rgba(13,17,23,0.95) 0%, transparent 100%); transform: translateY(40px); transition: transform 0.3s; }
.team-card:hover .team-info { transform: translateY(0); }
.team-name { font-size: 1rem; font-weight: 600; color: var(--white); }
.team-role { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber); margin-top: 0.2rem; }
.team-bio { font-size: 0.78rem; color: var(--concrete-light); margin-top: 0.5rem; line-height: 1.6; font-weight: 300; opacity: 0; transition: opacity 0.3s 0.1s; }
.team-card:hover .team-bio { opacity: 1; }

/* TESTIMONIALS */
.testimonials-section { background: var(--steel); }
.testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 4rem; }
.testimonial-card { background: var(--steel-mid); padding: 2.5rem; border-top: 2px solid var(--iron); transition: border-color 0.3s; }
.testimonial-card:hover { border-top-color: var(--amber); }
.testimonial-stars { color: var(--amber); font-size: 0.85rem; letter-spacing: 2px; margin-bottom: 1.2rem; }
.testimonial-text { font-size: 0.9rem; color: var(--concrete-light); line-height: 1.9; font-weight: 300; font-style: italic; margin-bottom: 1.5rem; }
.testimonial-author { font-size: 0.88rem; font-weight: 600; color: var(--off-white); }
.testimonial-company { font-size: 0.72rem; letter-spacing: 0.08em; color: var(--amber); text-transform: uppercase; margin-top: 0.2rem; }
.testimonial-project { font-size: 0.75rem; color: var(--concrete); margin-top: 0.15rem; }

/* CONTACT */
.contact-section { background: var(--steel-mid); }
.contact-layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 6rem; align-items: start; }
.contact-info { display: flex; flex-direction: column; gap: 1px; margin-top: 3rem; }
.contact-info-item { background: var(--steel-soft); padding: 1.5rem; border-left: 3px solid var(--iron); transition: border-color 0.2s; }
.contact-info-item:hover { border-left-color: var(--amber); }
.contact-info-label { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--concrete); margin-bottom: 0.4rem; }
.contact-info-value { font-size: 0.92rem; color: var(--off-white); font-weight: 400; }
.contact-form { background: var(--steel-soft); padding: 3rem; border: 1px solid rgba(232,160,32,0.1); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.form-group { margin-bottom: 1.25rem; }
.form-label { font-size: 0.68rem; letter-spacing: 0.16em; text-transform: uppercase; color: var(--concrete); display: block; margin-bottom: 0.6rem; }
.form-input, .form-select, .form-textarea { width: 100%; background: var(--steel); border: 1px solid var(--iron); padding: 13px 16px; font-size: 0.88rem; font-family: var(--font-body); color: var(--off-white); outline: none; transition: border-color 0.2s; appearance: none; }
.form-input::placeholder, .form-textarea::placeholder { color: var(--concrete); }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--amber); }
.form-textarea { height: 120px; resize: vertical; }
.form-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238A9099' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px; }
.form-select option { background: var(--steel); }
.form-submit-row { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
.form-note { font-size: 0.75rem; color: var(--concrete); }

/* SUCCESS */
.contact-success { text-align: center; padding: 3rem; }
.contact-success-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.contact-success h3 { font-family: var(--font-display); font-size: 2rem; color: var(--amber); margin-bottom: 0.75rem; }
.contact-success p { font-size: 0.88rem; color: var(--concrete); line-height: 1.8; }

/* TOAST */
.toast { position: fixed; bottom: 2rem; right: 2rem; background: var(--amber); color: var(--steel); padding: 1rem 1.5rem; font-size: 0.85rem; font-weight: 600; z-index: 999; transform: translateY(100px); opacity: 0; transition: all 0.3s; pointer-events: none; }
.toast.show { transform: translateY(0); opacity: 1; }

/* FOOTER */
.footer { background: var(--steel); border-top: 1px solid rgba(232,160,32,0.1); padding: 5rem 0 2rem; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
.footer-logo { font-family: var(--font-display); font-size: 2rem; color: var(--white); margin-bottom: 1rem; }
.footer-logo span { color: var(--amber); }
.footer-tagline { font-size: 0.85rem; color: var(--concrete); line-height: 1.8; font-weight: 300; max-width: 260px; }
.footer-col-title { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--amber); margin-bottom: 1.5rem; }
.footer-link { display: block; font-size: 0.85rem; color: var(--concrete); margin-bottom: 0.75rem; cursor: pointer; transition: color 0.2s; background: none; border: none; font-family: var(--font-body); text-align: left; }
.footer-link:hover { color: var(--amber-light); }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; }
.footer-copy { font-size: 0.78rem; color: var(--concrete); }
.footer-socials { display: flex; gap: 0.5rem; }
.footer-social { width: 36px; height: 36px; border: 1px solid var(--iron); display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 0.8rem; font-weight: 600; color: var(--concrete); transition: all 0.2s; font-family: var(--font-body); }
.footer-social:hover { border-color: var(--amber); color: var(--amber); }

/* RESPONSIVE */
@media (max-width: 960px) {
  .nav-links { display: none; }
  .nav-mobile-btn { display: block; }
  .nav { padding: 0 1.5rem; }
  .hero-content { padding: 0 2rem 5rem; }
  .hero-stats { position: static; flex-direction: row; flex-wrap: wrap; gap: 2px; margin-top: 2.5rem; }
  .about-layout, .contact-layout { grid-template-columns: 1fr; gap: 3rem; }
  .about-img-stack { height: 320px; }
  .services-grid, .pricing-grid, .testimonials-grid { grid-template-columns: 1fr; }
  .team-grid { grid-template-columns: repeat(2,1fr); }
  .portfolio-grid { grid-template-columns: 1fr 1fr; }
  .portfolio-item.featured { grid-column: span 2; }
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
  .section-inner { padding: 0 2rem; }
  .form-row { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .hero-title { font-size: 3.5rem; }
  .team-grid { grid-template-columns: 1fr 1fr; }
  .portfolio-grid { grid-template-columns: 1fr; }
  .portfolio-item.featured { grid-column: auto; }
  .footer-grid { grid-template-columns: 1fr; }
}
`;

const PORTFOLIO_ITEMS = [
  { id:1, cat:"Residential", title:"Skyline Residences", meta:"Manila · 2024 · 48 Units", img:"https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80", featured:true },
  { id:2, cat:"Commercial", title:"Vertex Tower", meta:"BGC · 2023", img:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80" },
  { id:3, cat:"Industrial", title:"LogiPark Cavite", meta:"Cavite · 2024", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
  { id:4, cat:"Residential", title:"The Pines Estate", meta:"Tagaytay · 2023", img:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { id:5, cat:"Commercial", title:"Harbor Walk Mall", meta:"Cavite · 2022", img:"https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&q=80" },
];

const TEAM = [
  { name:"Ricardo Dela Cruz", role:"CEO & Founder", bio:"30 years in Philippine construction. Built over ₱12B in infrastructure.", img:"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
  { name:"Maria Santos", role:"Chief Architect", bio:"Award-winning designer. FUAP member, specialising in sustainable design.", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name:"Andres Villanueva", role:"Project Director", bio:"15 years managing large-scale commercial and residential builds.", img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80" },
  { name:"Lena Park", role:"Head of Real Estate", bio:"Closed over ₱3B in property sales across Metro Manila and Cavite.", img:"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("All");
  const [contactDone, setContactDone] = useState(false);
  const [toast, setToast] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [form, setForm] = useState({ name:"", company:"", email:"", phone:"", service:"", message:"" });

  const showToast = (msg) => { setToast(msg); setToastVisible(true); setTimeout(() => setToastVisible(false), 3000); };

  const filtered = filter === "All" ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter(p => p.cat === filter);

  const nav = (p) => { setPage(p); window.scrollTo(0,0); };

  return (
    <>
      <style>{css}</style>

      <nav className="nav">
        <div className="nav-logo" onClick={() => nav("home")}>ARCBUILD<span>.</span></div>
        <div className="nav-links">
          {["home","about","services","portfolio","pricing","team","contact"].map(p => (
            <button key={p} className={`nav-link${page===p?" active":""}`} onClick={() => nav(p)}>
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
        <button className="nav-cta" onClick={() => nav("contact")}>Get a Quote</button>
        <button className="nav-mobile-btn" onClick={() => { const pages = ["home","about","services","portfolio","pricing","team","contact"]; const i = pages.indexOf(page); nav(pages[(i+1)%pages.length]); }}>☰</button>
      </nav>

      {/* ── HOME ── */}
      {page === "home" && <>
        <section className="hero">
          <div className="hero-bg">
            <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80" alt="Construction site" />
            <div className="hero-bg-overlay" />
            <div className="hero-grid-lines" />
          </div>
          <div className="hero-content">
            <div className="hero-tag">Building the Philippines Since 1994</div>
            <h1 className="hero-title">WE BUILD<br /><span>WHAT</span><br />MATTERS</h1>
            <p className="hero-sub">From residential developments to landmark commercial towers — ArcBuild delivers construction excellence rooted in precision, integrity, and Filipino craftsmanship.</p>
            <div className="hero-actions">
              <button className="btn-amber" onClick={() => nav("portfolio")}>View Our Projects</button>
              <button className="btn-outline" onClick={() => nav("contact")}>Request a Quote</button>
            </div>
          </div>
          <div className="hero-stats">
            {[["500+","Projects Completed"],["30","Years Experience"],["₱18B","Total Project Value"],["98%","On-time Delivery"]].map(([v,l]) => (
              <div key={l} className="hero-stat"><div className="hero-stat-val">{v}</div><div className="hero-stat-lbl">{l}</div></div>
            ))}
          </div>
          <div className="hero-scroll"><span>Scroll</span><div className="hero-scroll-line" /></div>
        </section>

        {/* ABOUT PREVIEW */}
        <section className="section about-section">
          <div className="section-inner">
            <div className="about-layout">
              <div className="about-img-stack">
                <img className="about-img-main" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="Construction" />
                <img className="about-img-accent" src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80" alt="Blueprint" />
                <div className="about-badge"><span className="about-badge-val">30</span><span className="about-badge-lbl">Years of Excellence</span></div>
              </div>
              <div>
                <div className="section-tag">Who We Are</div>
                <h2 className="section-heading">BUILDING <span>TRUST</span><br />SINCE 1994</h2>
                <p className="section-sub">ArcBuild Corporation is one of the Philippines' most trusted construction and real estate development companies, with a proven track record across residential, commercial, and industrial sectors.</p>
                <div className="about-points">
                  {[
                    { icon:"🏗", title:"PCAB-Licensed Contractor", desc:"Category AAA license covering all major civil and building works nationwide." },
                    { icon:"♻", title:"Sustainable Construction", desc:"BERDE-certified green building practices integrated in all new developments." },
                    { icon:"🤝", title:"Turnkey Solutions", desc:"From land acquisition and design to construction and handover — one team, full accountability." },
                  ].map(p => (
                    <div key={p.title} className="about-point">
                      <div className="about-point-icon">{p.icon}</div>
                      <div className="about-point-text"><h4>{p.title}</h4><p>{p.desc}</p></div>
                    </div>
                  ))}
                </div>
                <button className="btn-amber" style={{ marginTop:"2rem" }} onClick={() => nav("about")}>Learn More About Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES PREVIEW */}
        <section className="section services-section">
          <div className="section-inner">
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <div className="section-tag">What We Do</div>
                <h2 className="section-heading">OUR CORE<br /><span>SERVICES</span></h2>
              </div>
              <button className="btn-outline" onClick={() => nav("services")}>All Services →</button>
            </div>
            <div className="services-grid" style={{ marginTop:"3rem" }}>
              {[
                { num:"01", icon:"🏢", name:"Commercial Construction", desc:"Office towers, retail developments, mixed-use complexes built to international standards." },
                { num:"02", icon:"🏘", name:"Residential Development", desc:"From single-family homes to large-scale subdivision and condominium projects." },
                { num:"03", icon:"🏭", name:"Industrial Facilities", desc:"Warehouses, manufacturing plants, and logistics hubs across Luzon and Visayas." },
                { num:"04", icon:"📐", name:"Design & Engineering", desc:"In-house architectural, structural, and MEP engineering for complete project control." },
                { num:"05", icon:"🏚", name:"Renovation & Fit-Out", desc:"Commercial interiors, building retrofits, and property rehabilitation projects." },
                { num:"06", icon:"🏡", name:"Real Estate Sales", desc:"Pre-selling and RFO units across our residential portfolio with in-house financing." },
              ].map(s => (
                <div key={s.num} className="service-card" onClick={() => nav("services")}>
                  <div className="service-num">{s.num}</div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-link">Learn More</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS PREVIEW */}
        <section className="section testimonials-section">
          <div className="section-inner">
            <div className="section-tag">Client Testimonials</div>
            <h2 className="section-heading">WHAT CLIENTS<br /><span>SAY</span></h2>
            <div className="testimonials-grid">
              {[
                { text:"ArcBuild delivered our 12-storey office tower two weeks ahead of schedule. The quality of work and professionalism throughout was outstanding.", author:"Engr. Robert Tan", company:"Vertex Holdings Inc.", project:"Vertex Tower, BGC" },
                { text:"We've partnered with ArcBuild on three subdivision projects. Their consistency, transparency, and craftsmanship keep us coming back.", author:"Ma. Lourdes Reyes", company:"Sunrise Property Group", project:"The Pines Estate" },
                { text:"From permits to turnover, the process was seamless. Our LogiPark facility was completed within budget and exactly to spec.", author:"James Nakamura", company:"Asia Pacific Logistics", project:"LogiPark Cavite" },
              ].map(t => (
                <div key={t.author} className="testimonial-card">
                  <div className="testimonial-stars">★★★★★</div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">{t.author}</div>
                  <div className="testimonial-company">{t.company}</div>
                  <div className="testimonial-project">{t.project}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>}

      {/* ── ABOUT ── */}
      {page === "about" && (
        <section className="section about-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="about-layout">
              <div className="about-img-stack">
                <img className="about-img-main" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" alt="Construction" />
                <img className="about-img-accent" src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80" alt="Blueprint" />
                <div className="about-badge"><span className="about-badge-val">30</span><span className="about-badge-lbl">Years Strong</span></div>
              </div>
              <div>
                <div className="section-tag">Our Story</div>
                <h2 className="section-heading">BUILT ON<br /><span>INTEGRITY</span></h2>
                <p className="section-sub" style={{ marginBottom:"1.5rem" }}>Founded in 1994 by Ricardo Dela Cruz, ArcBuild began as a small civil works contractor in Cavite. Three decades later, we've grown into one of the Philippines' most respected construction and real estate firms.</p>
                <p className="section-sub">Our portfolio spans over 500 completed projects valued at more than ₱18 billion — from socialized housing in the provinces to premium mixed-use towers in BGC and Makati.</p>
                <div className="about-points" style={{ marginTop:"2rem" }}>
                  {[
                    { icon:"🏗", title:"PCAB Category AAA Licensed", desc:"Qualified to undertake the largest civil and building construction projects in the Philippines." },
                    { icon:"♻", title:"ISO 9001:2015 Certified", desc:"Quality management systems that ensure consistency, safety, and client satisfaction on every project." },
                    { icon:"🤝", title:"Filipino-Owned & Operated", desc:"Proudly 100% Filipino, employing over 2,000 skilled workers and engineers nationwide." },
                  ].map(p => (
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
      )}

      {/* ── SERVICES ── */}
      {page === "services" && (
        <section className="section services-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="section-tag">What We Do</div>
            <h2 className="section-heading">OUR <span>SERVICES</span></h2>
            <p className="section-sub">End-to-end construction and real estate solutions for every project scale.</p>
            <div className="services-grid">
              {[
                { num:"01", icon:"🏢", name:"Commercial Construction", desc:"Office towers, retail developments, hotels, and mixed-use complexes. We handle structural works, facade, MEP, and interior fit-out." },
                { num:"02", icon:"🏘", name:"Residential Development", desc:"Socialized housing, mid-rise condominiums, and premium subdivisions. Complete from land development to unit turnover." },
                { num:"03", icon:"🏭", name:"Industrial Facilities", desc:"Warehouses, cold storage, manufacturing plants, and logistics hubs with strict compliance to industrial and safety standards." },
                { num:"04", icon:"📐", name:"Design & Engineering", desc:"In-house architectural, structural, mechanical, electrical, and plumbing engineering services for complete design-build delivery." },
                { num:"05", icon:"🏚", name:"Renovation & Fit-Out", desc:"Commercial interior fit-outs, building retrofits, facade upgrades, and property rehabilitation — minimal disruption guaranteed." },
                { num:"06", icon:"🏡", name:"Real Estate Sales", desc:"Pre-selling and ready-for-occupancy units across our residential portfolio. In-house accredited bank financing available." },
              ].map(s => (
                <div key={s.num} className="service-card" onClick={() => nav("contact")}>
                  <div className="service-num">{s.num}</div>
                  <div className="service-icon">{s.icon}</div>
                  <div className="service-name">{s.name}</div>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-link">Get a Quote</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PORTFOLIO ── */}
      {page === "portfolio" && (
        <section className="section portfolio-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="section-tag">Our Work</div>
            <h2 className="section-heading">FEATURED<br /><span>PROJECTS</span></h2>
            <p className="section-sub">A selection of completed developments across residential, commercial, and industrial sectors.</p>
            <div className="portfolio-filters">
              {["All","Residential","Commercial","Industrial"].map(f => (
                <button key={f} className={`portfolio-filter${filter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</button>
              ))}
            </div>
            <div className="portfolio-grid">
              {filtered.map(item => (
                <div key={item.id} className={`portfolio-item${item.featured?" featured":""}`} onClick={() => showToast(`Viewing: ${item.title}`)}>
                  <div className="portfolio-img-wrap"><img src={item.img} alt={item.title} loading="lazy" /></div>
                  <div className="portfolio-overlay">
                    <div className="portfolio-cat">{item.cat}</div>
                    <div className="portfolio-title">{item.title}</div>
                    <div className="portfolio-meta">{item.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PRICING ── */}
      {page === "pricing" && (
        <section className="section pricing-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="section-tag">Transparent Pricing</div>
            <h2 className="section-heading">CONSTRUCTION<br /><span>PACKAGES</span></h2>
            <p className="section-sub">Indicative per-square-meter rates for residential construction. Final pricing subject to site assessment and specifications.</p>
            <div className="pricing-grid">
              {[
                { tier:"Economy", price:"₱25,000", unit:"per sqm · Basic Finish", features:["Structural works & roofing","Standard CHB walls","Basic electrical & plumbing","Cement floor finish","Painted interiors","No interior design"], featured:false },
                { tier:"Standard", price:"₱40,000", unit:"per sqm · Mid-range Finish", features:["All Economy inclusions","Ceramic tile flooring","Modular kitchen layout","Painted & tiled bathrooms","Aluminum windows","30-day defect warranty"], featured:true, badge:"Most Popular" },
                { tier:"Premium", price:"₱65,000", unit:"per sqm · Premium Finish", features:["All Standard inclusions","Engineered hardwood floors","Full kitchen & cabinetry","Premium sanitary fixtures","Double-glazed windows","1-year full warranty"], featured:false },
              ].map(p => (
                <div key={p.tier} className={`pricing-card${p.featured?" featured":""}`}>
                  {p.badge && <div className="pricing-badge">{p.badge}</div>}
                  <div className="pricing-tier">{p.tier}</div>
                  <div className="pricing-price">{p.price}</div>
                  <div className="pricing-unit">{p.unit}</div>
                  <div className="pricing-divider" />
                  {p.features.map(f => (
                    <div key={f} className="pricing-feature"><span className="pricing-feature-icon">✦</span>{f}</div>
                  ))}
                  <button className="pricing-cta" onClick={() => nav("contact")}>Get a Custom Quote</button>
                </div>
              ))}
            </div>
            <p style={{ textAlign:"center", marginTop:"2rem", fontSize:"0.78rem", color:"var(--concrete)" }}>All rates are indicative and exclude land cost, permits, and professional fees. Contact us for a detailed project estimate.</p>
          </div>
        </section>
      )}

      {/* ── TEAM ── */}
      {page === "team" && (
        <section className="section team-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="section-tag">The People Behind the Build</div>
            <h2 className="section-heading">MEET THE<br /><span>TEAM</span></h2>
            <p className="section-sub">Seasoned professionals with decades of combined experience in Philippine construction and real estate.</p>
            <div className="team-grid">
              {TEAM.map(t => (
                <div key={t.name} className="team-card">
                  <div className="team-img-wrap"><img src={t.img} alt={t.name} /></div>
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
      )}

      {/* ── CONTACT ── */}
      {page === "contact" && (
        <section className="section contact-section" style={{ paddingTop:"8rem" }}>
          <div className="section-inner">
            <div className="contact-layout">
              <div>
                <div className="section-tag">Get in Touch</div>
                <h2 className="section-heading">START YOUR<br /><span>PROJECT</span></h2>
                <p className="section-sub">Tell us about your project and our team will prepare a detailed proposal within 3 business days.</p>
                <div className="contact-info">
                  {[
                    { label:"Head Office", value:"Dasmariñas, Cavite, Philippines" },
                    { label:"Phone", value:"+63 46 888 0001" },
                    { label:"Email", value:"projects@arcbuild.ph" },
                    { label:"Office Hours", value:"Mon–Fri, 8:00am – 5:30pm" },
                    { label:"License", value:"PCAB License No. AAA-12345" },
                  ].map(i => (
                    <div key={i.label} className="contact-info-item">
                      <div className="contact-info-label">{i.label}</div>
                      <div className="contact-info-value">{i.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                {contactDone ? (
                  <div className="contact-form">
                    <div className="contact-success">
                      <div className="contact-success-icon">✦</div>
                      <h3>Message Received</h3>
                      <p>Thank you for reaching out. Our project team will review your enquiry and respond within 3 business days with a tailored proposal.</p>
                      <button className="btn-outline" style={{ marginTop:"2rem" }} onClick={() => setContactDone(false)}>Send Another Message</button>
                    </div>
                  </div>
                ) : (
                  <div className="contact-form">
                    <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.8rem", color:"var(--white)", marginBottom:"2rem", letterSpacing:"0.04em" }}>PROJECT ENQUIRY</h3>
                    <div className="form-row">
                      <div className="form-group" style={{ marginBottom:0 }}>
                        <label className="form-label">Full Name</label>
                        <input className="form-input" placeholder="Juan dela Cruz" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
                      </div>
                      <div className="form-group" style={{ marginBottom:0 }}>
                        <label className="form-label">Company</label>
                        <input className="form-input" placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company:e.target.value})} />
                      </div>
                    </div>
                    <div className="form-row" style={{ marginTop:"1.25rem" }}>
                      <div className="form-group" style={{ marginBottom:0 }}>
                        <label className="form-label">Email</label>
                        <input type="email" className="form-input" placeholder="juan@company.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
                      </div>
                      <div className="form-group" style={{ marginBottom:0 }}>
                        <label className="form-label">Phone</label>
                        <input type="tel" className="form-input" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginTop:"1.25rem" }}>
                      <label className="form-label">Service Required</label>
                      <select className="form-select" value={form.service} onChange={e => setForm({...form, service:e.target.value})}>
                        <option value="">Select a service</option>
                        <option>Commercial Construction</option>
                        <option>Residential Development</option>
                        <option>Industrial Facilities</option>
                        <option>Design & Engineering</option>
                        <option>Renovation & Fit-Out</option>
                        <option>Real Estate Inquiry</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Project Details</label>
                      <textarea className="form-textarea" placeholder="Describe your project — location, size, timeline, budget range..." value={form.message} onChange={e => setForm({...form, message:e.target.value})} />
                    </div>
                    <div className="form-submit-row">
                      <span className="form-note">We respond within 3 business days.</span>
                      <button className="btn-amber" onClick={() => { if(form.name && form.email) setContactDone(true); else showToast("Please fill in your name and email."); }}>Send Enquiry →</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="section-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-logo">ARCBUILD<span>.</span></div>
              <p className="footer-tagline">Building the Philippines with precision, integrity, and Filipino craftsmanship since 1994.</p>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              {["About Us","Our Team","Careers","News & Updates"].map(l => <button key={l} className="footer-link">{l}</button>)}
            </div>
            <div>
              <div className="footer-col-title">Services</div>
              {["Commercial","Residential","Industrial","Design & Engineering"].map(l => <button key={l} className="footer-link">{l}</button>)}
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <button className="footer-link">projects@arcbuild.ph</button>
              <button className="footer-link">+63 46 888 0001</button>
              <button className="footer-link">Dasmariñas, Cavite</button>
              <button className="footer-link">PCAB AAA Licensed</button>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 ArcBuild Corporation. All rights reserved.</div>
            <div className="footer-socials">
              {["fb","li","ig","yt"].map(s => <div key={s} className="footer-social">{s}</div>)}
            </div>
          </div>
        </div>
      </footer>

      <div className={`toast${toastVisible?" show":""}`}>{toast}</div>
    </>
  );
}