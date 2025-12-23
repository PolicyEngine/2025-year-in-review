import './Timeline.css';

export default function Timeline({ timeline, country }) {
  return (
    <section className="timeline-section">
      <div className="timeline-container">
        <p className="section-label">Research & Milestones</p>
        <h2 className="section-title">{country === 'us' ? 'US' : 'UK'} Timeline</h2>
        <div className="timeline">
          {timeline.map((item, index) => (
            <div
              className="timeline-item"
              key={index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-dot" />
              <div className="timeline-date">{item.date}</div>
              <h3 className="timeline-title">
                {item.link ? (
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                ) : (
                  item.title
                )}
              </h3>
              <p className="timeline-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
