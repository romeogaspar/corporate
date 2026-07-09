'use client';
import { useState } from 'react';

export default function PortfolioClient({ items }) {
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? items : items.filter((p) => p.category === filter);

  return (
    <>
      <div className="portfolio-filters">
        {categories.map((f) => (
          <button key={f} className={`portfolio-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="portfolio-grid">
        {filtered.map((item) => (
          <div key={item._id} className={`portfolio-item${item.featured ? ' featured' : ''}`}>
            <div className="portfolio-img-wrap"><img src={item.imgSrc} alt={item.title} loading="lazy" /></div>
            <div className="portfolio-overlay">
              <div className="portfolio-cat">{item.category}</div>
              <div className="portfolio-title">{item.title}</div>
              <div className="portfolio-meta">{item.meta}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
