import './Highlights.css';

function HighlightCard({ highlight }) {
  const sizeClass = highlight.size === 'large' ? 'large' : highlight.size === 'full' ? 'full' : 'medium';

  return (
    <div className={`highlight-card ${sizeClass}`}>
      <span className="highlight-tag">{highlight.tag}</span>
      <h3 className="highlight-title">{highlight.title}</h3>
      <p className="highlight-desc">{highlight.description}</p>

      {highlight.image && (
        <div className="highlight-image-container">
          <img
            src={highlight.image}
            alt={highlight.title}
            className="highlight-image"
            loading="lazy"
          />
        </div>
      )}

      {highlight.link && (
        <a href={highlight.link} className="highlight-link" target="_blank" rel="noopener noreferrer">
          {highlight.linkText || 'Learn more'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default function Highlights({ highlights }) {
  return (
    <section className="highlights-section">
      <div className="highlights-container">
        <p className="section-label">Key Achievements</p>
        <h2 className="section-title">2025 Highlights</h2>
        <div className="highlight-grid">
          {highlights.map((highlight, index) => (
            <HighlightCard key={index} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
