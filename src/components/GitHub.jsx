import './GitHub.css';

const topRepos = [
  { name: 'policyengine-us', commits: 2924 },
  { name: 'policyengine-api', commits: 944 },
  { name: 'policyengine-app', commits: 821 },
  { name: 'policyengine-api-v2', commits: 702 },
  { name: 'policyengine-us-data', commits: 598 },
  { name: 'policyengine-uk', commits: 576 },
  { name: 'policyengine-uk-data', commits: 459 },
  { name: 'policyengine-household-api', commits: 458 },
];

const orgStats = {
  totalCommits: 9623,
  reposWithCommits: 43,
  newRepos: 27,
};

export default function GitHub() {
  return (
    <section className="github-section">
      <div className="github-container">
        <p className="section-label">Open Source</p>
        <h2 className="section-title">GitHub Activity</h2>

        <div className="org-stats">
          <div className="org-stat">
            <div className="org-stat-number">{orgStats.totalCommits.toLocaleString()}</div>
            <div className="org-stat-label">Total Commits</div>
          </div>
          <div className="org-stat">
            <div className="org-stat-number">{orgStats.reposWithCommits}</div>
            <div className="org-stat-label">Active Repos</div>
          </div>
          <div className="org-stat">
            <div className="org-stat-number">{orgStats.newRepos}</div>
            <div className="org-stat-label">New Repos</div>
          </div>
        </div>

        <h3 className="repos-heading">Top Repositories</h3>
        <div className="repo-stats">
          {topRepos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/PolicyEngine/${repo.name}`}
              className="repo-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="repo-name">{repo.name}</div>
              <div className="repo-commits">{repo.commits.toLocaleString()}</div>
              <div className="repo-label">commits</div>
            </a>
          ))}
        </div>

        <a
          href="https://github.com/PolicyEngine"
          className="github-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all repositories
        </a>
      </div>
    </section>
  );
}
