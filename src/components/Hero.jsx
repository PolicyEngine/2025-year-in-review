import './Hero.css';

export default function Hero({ country = 'us' }) {
  const tagline = country === 'uk'
    ? 'A year of democratising policy analysis. From new tools and partnerships to major policy events, we made economic policy accessible to everyone.'
    : 'A year of democratizing policy analysis. From new tools and partnerships to major policy events, we made economic policy accessible to everyone.';

  return (
    <section className="hero">
      <div className="hero-content">
        <img
          src="https://raw.githubusercontent.com/PolicyEngine/policyengine-app/master/src/images/logos/policyengine/white.png"
          alt="PolicyEngine"
          className="hero-logo"
        />
        <div className="hero-year">2025</div>
        <h1 className="hero-subtitle">Year in Review</h1>
        <p className="hero-tagline">{tagline}</p>
      </div>
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
