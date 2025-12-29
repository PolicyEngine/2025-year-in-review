import "./ImpactMetrics.css";

export default function ImpactMetrics({
  metrics,
  title = "Real-World Impact",
}) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section className="impact-section">
      <div className="impact-container">
        <p className="section-label">Impact</p>
        <h2 className="section-title">{title}</h2>

        <div className="impact-grid">
          {metrics.map((metric, index) => (
            <div key={index} className="impact-card">
              <div className="impact-number">{metric.number}</div>
              <div className="impact-label">{metric.label}</div>
              <p className="impact-description">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
