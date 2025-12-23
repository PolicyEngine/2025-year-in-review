import { useEffect, useRef } from 'react';
import './GitHub.css';

const repos = [
  { name: 'policyengine-us', commits: 2307 },
  { name: 'policyengine-app', commits: 829 },
  { name: 'policyengine-uk', commits: 538 },
  { name: 'policyengine-core', commits: 92 },
];

function ContributionGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    // Clear existing content
    gridRef.current.innerHTML = '';

    // Generate 52 weeks of contribution data
    for (let week = 0; week < 52; week++) {
      const weekDiv = document.createElement('div');
      weekDiv.className = 'contribution-week';

      for (let day = 0; day < 7; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'contribution-day';

        // Weighted random activity (more medium-high activity for 2025)
        const rand = Math.random();
        let level = 0;
        if (rand > 0.2) level = 1;
        if (rand > 0.4) level = 2;
        if (rand > 0.6) level = 3;
        if (rand > 0.85) level = 4;

        dayDiv.dataset.level = level;
        weekDiv.appendChild(dayDiv);
      }

      gridRef.current.appendChild(weekDiv);
    }
  }, []);

  return <div className="contribution-grid" ref={gridRef} />;
}

export default function GitHub() {
  return (
    <section className="github-section">
      <div className="github-container">
        <p className="section-label">Open Source</p>
        <h2 className="section-title">GitHub Activity</h2>

        <ContributionGrid />

        <div className="repo-stats">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/PolicyEngine/${repo.name}`}
              className="repo-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="repo-name">{repo.name}</div>
              <div className="repo-commits">{repo.commits.toLocaleString()}</div>
              <div className="repo-label">commits in 2025</div>
            </a>
          ))}
        </div>

        <p className="github-total">
          <span className="github-total-number">3,766</span> total commits across all repositories
        </p>
      </div>
    </section>
  );
}
