import './Events.css';

export default function Events({ events, title = "Events & Presentations" }) {
  if (!events || events.length === 0) return null;

  return (
    <section className="events-section">
      <div className="events-container">
        <p className="section-label">Community</p>
        <h2 className="section-title">{title}</h2>

        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-date">{event.date}</div>
              <h3 className="event-title">{event.title}</h3>
              <div className="event-location">{event.location}</div>
              <p className="event-description">{event.description}</p>
              {event.link && (
                <a href={event.link} target="_blank" rel="noopener noreferrer" className="event-link">
                  Watch recording →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
