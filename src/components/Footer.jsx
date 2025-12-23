import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer-title">Ready to explore policy?</h2>
      <p className="footer-desc">
        Try PolicyEngine yourself. Design custom reforms, see impacts on households and society,
        and understand tax and benefit systems.
      </p>
      <a href="https://policyengine.org" className="footer-cta">
        Launch PolicyEngine
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
      <div className="footer-links">
        <a href="https://github.com/PolicyEngine" className="footer-link">GitHub</a>
        <a href="https://blog.policyengine.org" className="footer-link">Blog</a>
        <a href="https://policyengine.org/us/about" className="footer-link">About</a>
        <a href="https://twitter.com/thepolicyengine" className="footer-link">Twitter</a>
      </div>
      <p className="footer-copyright">
        PolicyEngine {new Date().getFullYear()}
      </p>
    </footer>
  );
}
