import "./SoftwareDev.css";

// Stats from github-wrapped data (fetched Dec 15, 2025)
const GITHUB_STATS = {
  contributors: 13,
  commits: 11311,
  prs: 3422,
  reviews: 1832,
  issues: 2684,
  topContributors: [
    { name: "Max Ghenis", github: "MaxGhenis" },
    { name: "Anthony V.", github: "anth-volk" },
    { name: "Nikhil Woodruff", github: "nikhilwoodruff" },
    { name: "Pavel Makarchuk", github: "pmberg" },
    { name: "Vahid Ahmadi", github: "vahidahmadi" },
  ],
};

function StatCard({ value, label, icon }) {
  return (
    <div className="dev-stat-card">
      <div className="dev-stat-icon">{icon}</div>
      <div className="dev-stat-value">{value.toLocaleString()}</div>
      <div className="dev-stat-label">{label}</div>
    </div>
  );
}

export default function SoftwareDev() {
  return (
    <section className="software-dev-section">
      <div className="software-dev-container">
        <p className="section-label">Open Source</p>
        <h2 className="section-title">Software Development</h2>
        <p className="software-dev-subtitle">
          Building transparent, open-source tools for policy analysis
        </p>

        <div className="dev-stats-grid">
          <StatCard
            value={GITHUB_STATS.contributors}
            label="Contributors"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            value={GITHUB_STATS.commits}
            label="Commits"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <line x1="1.05" y1="12" x2="7" y2="12" />
                <line x1="17.01" y1="12" x2="22.96" y2="12" />
              </svg>
            }
          />
          <StatCard
            value={GITHUB_STATS.prs}
            label="Pull Requests"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                <line x1="6" y1="9" x2="6" y2="21" />
              </svg>
            }
          />
          <StatCard
            value={GITHUB_STATS.reviews}
            label="Code Reviews"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
          />
          <StatCard
            value={GITHUB_STATS.issues}
            label="Issues"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            }
          />
        </div>

        <div className="top-contributors">
          <h3>Top Contributors</h3>
          <div className="contributors-row">
            {GITHUB_STATS.topContributors.map((contributor, i) => (
              <a
                key={contributor.github}
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contributor-avatar"
                title={contributor.name}
                style={{ "--delay": `${i * 100}ms` }}
              >
                <img
                  src={`https://github.com/${contributor.github}.png`}
                  alt={contributor.name}
                />
                <span className="contributor-name">{contributor.name.split(" ")[0]}</span>
              </a>
            ))}
          </div>
        </div>

        <a
          href="https://policyengine.github.io/github-wrapped/"
          target="_blank"
          rel="noopener noreferrer"
          className="wrapped-cta"
        >
          <span className="wrapped-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </span>
          <span className="wrapped-cta-text">
            <strong>View GitHub Wrapped</strong>
            <span>See individual contributor stats</span>
          </span>
          <span className="wrapped-cta-arrow">→</span>
        </a>
      </div>
    </section>
  );
}
