import './Partners.css';

export default function Partners({ partners, title = "Partners & Collaborations" }) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="partners-section">
      <div className="partners-container">
        <p className="section-label">Ecosystem</p>
        <h2 className="section-title">{title}</h2>

        <div className="partners-grid">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              className="partner-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="partner-name">{partner.name}</h3>
              <p className="partner-description">{partner.description}</p>
              <span className="partner-link-text">Learn more</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
