import { useState } from 'react';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Highlights from './components/Highlights';
import Timeline from './components/Timeline';
import GitHub from './components/GitHub';
import Footer from './components/Footer';
import { usStats, usHighlights, usTimeline } from './data/us';
import { ukStats, ukHighlights, ukTimeline } from './data/uk';
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
      <Timeline timeline={timeline} country={country} />
      <GitHub />
      <Footer />
    </>
  );
}
