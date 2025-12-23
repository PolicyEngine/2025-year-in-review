import './BudgetProvisions.css';

function ProvisionCard({ provision, index }) {
  return (
    <a
      href={provision.link}
      className="provision-card"
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="provision-number">{index + 1}</div>
      <div className="provision-content">
        <h4 className="provision-title">{provision.title}</h4>
        <p className="provision-desc">{provision.description}</p>
      </div>
      <svg className="provision-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );
}

export default function BudgetProvisions({ provisions, title, intro, ctaLink, ctaText }) {
  return (
    <section className="provisions-section">
      <div className="provisions-container">
        <p className="section-label">Deep Dive</p>
        <h2 className="section-title">{title}</h2>
        <p className="provisions-intro">{intro}</p>
        <div className="provisions-grid">
          {provisions.map((provision, index) => (
            <ProvisionCard key={provision.title} provision={provision} index={index} />
          ))}
        </div>
        <a
          href={ctaLink}
          className="provisions-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          {ctaText}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
