import citationsData from "../data/citations.yaml?raw";
import YAML from "yaml";
import "./Citations.css";

const parsedData = YAML.parse(citationsData);

const ICONS = {
  radio: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
    </svg>
  ),
  mic: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  ),
  newspaper: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8z" />
    </svg>
  ),
  building: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  landmark: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7" />
    </svg>
  ),
};

function CitationCard({ item, color }) {
  const IconComponent = ICONS[item.icon] || ICONS.newspaper;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`citation-card ${!item.url ? "no-link" : ""}`}
      style={{ "--accent-color": color }}
    >
      <div className="citation-icon" style={{ color }}>
        {IconComponent}
      </div>
      <div className="citation-content">
        <span className="citation-outlet">{item.outlet || item.org || item.entity}</span>
        <h4 className="citation-title">{item.title}</h4>
        {item.author && <span className="citation-author">By {item.author}</span>}
        <p className="citation-description">{item.description}</p>
      </div>
      {item.url && (
        <div className="citation-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </div>
      )}
    </a>
  );
}

function CitationSection({ title, items, color }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="citation-section">
      <h3 className="citation-section-title">{title}</h3>
      <div className="citation-grid">
        {items.map((item, idx) => (
          <CitationCard key={idx} item={item} color={color} />
        ))}
      </div>
    </div>
  );
}

export default function Citations({ country = "us" }) {
  const data = parsedData[country];
  if (!data) return null;

  return (
    <section className="citations-section">
      <div className="citations-container">
        <p className="section-label">Recognition</p>
        <h2 className="section-title">Citations & Media</h2>
        <p className="citations-subtitle">
          PolicyEngine research featured in major outlets and cited by policymakers
        </p>

        <CitationSection
          title="Media Coverage"
          items={data.media}
          color="#F97316"
        />
        <CitationSection
          title="Publications"
          items={data.publications}
          color="#8B5CF6"
        />
        <CitationSection
          title="Research Partners"
          items={data.research_partners}
          color="#EAB308"
        />
        <CitationSection
          title="Government Citations"
          items={data.government}
          color="#319795"
        />
      </div>
    </section>
  );
}
