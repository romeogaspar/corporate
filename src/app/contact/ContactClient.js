'use client';
import { useState } from 'react';

export default function ContactClient({ page }) {
  const { sectionTag, heading, intro, infoItems, responseNote, serviceOptions } = page;
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', message: '' });
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (form.name && form.email) {
      setError('');
      setDone(true);
    } else {
      setError('Please fill in your name and email.');
    }
  };

  return (
    <section className="section contact-section" style={{ paddingTop: '8rem' }}>
      <div className="section-inner">
        <div className="contact-layout">
          <div>
            <div className="section-tag">{sectionTag}</div>
            <h2 className="section-heading">{heading.line1}<br /><span>{heading.highlight}</span></h2>
            <p className="section-sub">{intro}</p>
            <div className="contact-info">
              {infoItems.map((i) => (
                <div key={i.label} className="contact-info-item">
                  <div className="contact-info-label">{i.label}</div>
                  <div className="contact-info-value">{i.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {done ? (
              <div className="contact-form">
                <div className="contact-success">
                  <div className="contact-success-icon">✦</div>
                  <h3>Message Received</h3>
                  <p>Thank you for reaching out. Our project team will review your enquiry and respond within 3 business days with a tailored proposal.</p>
                  <button className="btn-outline" style={{ marginTop: '2rem' }} onClick={() => { setDone(false); setForm({ name: '', company: '', email: '', phone: '', service: '', message: '' }); }}>Send Another Message</button>
                </div>
              </div>
            ) : (
              <div className="contact-form">
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '2rem', letterSpacing: '0.04em' }}>PROJECT ENQUIRY</h3>
                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" placeholder="Juan dela Cruz" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Company</label>
                    <input className="form-input" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: '1.25rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="juan@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                  <label className="form-label">Service Required</label>
                  <select className="form-select" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">Select a service</option>
                    {serviceOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Project Details</label>
                  <textarea className="form-textarea" placeholder="Describe your project — location, size, timeline, budget range..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {error && <p style={{ color: 'var(--rust)', fontSize: '0.8rem', marginBottom: '1rem' }}>{error}</p>}
                <div className="form-submit-row">
                  <span className="form-note">{responseNote}</span>
                  <button className="btn-amber" onClick={submit}>Send Enquiry →</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
