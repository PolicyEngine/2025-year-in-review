import { useState } from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Highlights from './components/Highlights';
import BudgetProvisions from './components/BudgetProvisions';
import Timeline from './components/Timeline';
import GitHub from './components/GitHub';
import Footer from './components/Footer';
import { usStats, usHighlights, usTimeline, obbbaProvisions } from './data/us';
import { ukStats, ukHighlights, ukTimeline, autumnBudgetProvisions } from './data/uk';
import './styles/index.css';

function CountryToggle({ country, setCountry }) {
  return (
    <div className="country-toggle">
      <button
        className={`country-btn ${country === 'us' ? 'active' : ''}`}
        onClick={() => setCountry('us')}
      >
        United States
      </button>
      <button
        className={`country-btn ${country === 'uk' ? 'active' : ''}`}
        onClick={() => setCountry('uk')}
      >
        United Kingdom
      </button>
    </div>
  );
}

export default function App() {
  const [country, setCountry] = useState('us');

  const stats = country === 'us' ? usStats : ukStats;
  const highlights = country === 'us' ? usHighlights : ukHighlights;
  const timeline = country === 'us' ? usTimeline : ukTimeline;

  return (
    <>
      <CountryToggle country={country} setCountry={setCountry} />
      <Hero />
      <Stats stats={stats} country={country} />
      <Highlights highlights={highlights} />
      {country === 'us' && (
        <BudgetProvisions
          provisions={obbbaProvisions}
          title="One Big Beautiful Bill Act"
          intro="We modeled all major OBBBA provisions. Click each to read our detailed analysis of its impacts."
          ctaLink="https://policyengine.org/us/obbba-household-by-household"
          ctaText="Explore 20,000 household impacts"
        />
      )}
      {country === 'uk' && (
        <BudgetProvisions
          provisions={autumnBudgetProvisions}
          title="Autumn Budget 2025 Provisions"
          intro="Our interactive dashboard models all nine major provisions. Click each to read our detailed analysis."
          ctaLink="https://policyengine.org/uk/autumn-budget-2025"
          ctaText="Explore the full interactive dashboard"
        />
      )}
      <Timeline timeline={timeline} country={country} />
      <GitHub />
      <Footer />
    </>
  );
}
