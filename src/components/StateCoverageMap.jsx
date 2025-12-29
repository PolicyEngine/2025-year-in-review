import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./StateCoverageMap.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// States with dedicated research/blog posts
// Single link: { name, link }
// Multiple links: { name, links: [{ title, url }] }
const statesWithReports = {
  CA: {
    name: "California",
    link: "https://www.policyengine.org/us/research/california-billionaire-tax-marginal-rates",
  },
  ID: {
    name: "Idaho",
    link: "https://policyengine.org/us/research/idaho-2025-tax-change",
  },
  MI: {
    name: "Michigan",
    link: "https://www.policyengine.org/us/research/michigan-bill-hb4170",
  },
  MT: {
    name: "Montana",
    link: "https://www.policyengine.org/us/research/montana-tax-cuts-2026",
  },
  NY: {
    name: "New York",
    links: [
      { title: "Hochul Budget Analysis", url: "https://www.policyengine.org/us/research/ny-hochul-budget" },
      { title: "Working Families Tax Credit", url: "https://www.policyengine.org/us/research/ny-wftc" },
    ],
  },
  OR: {
    name: "Oregon",
    link: "https://policyengine.org/us/research/oregons-nonrefundable-exemption-credit",
  },
  UT: {
    name: "Utah",
    link: "https://policyengine.org/us/blog/introducing-utah-state-income-tax-analysis-on-policyengine",
  },
  KY: {
    name: "Kentucky",
    link: "https://www.policyengine.org/us/research/kentucky-cuts-income-tax-rate",
  },
  NYC: {
    name: "New York City",
    link: "https://www.policyengine.org/us/research/nyc-ctc-s2238",
    isCity: true,
  },
};

// FIPS code to state abbreviation mapping
const fipsToAbbr = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  10: "DE",
  11: "DC",
  12: "FL",
  13: "GA",
  15: "HI",
  16: "ID",
  17: "IL",
  18: "IN",
  19: "IA",
  20: "KS",
  21: "KY",
  22: "LA",
  23: "ME",
  24: "MD",
  25: "MA",
  26: "MI",
  27: "MN",
  28: "MS",
  29: "MO",
  30: "MT",
  31: "NE",
  32: "NV",
  33: "NH",
  34: "NJ",
  35: "NM",
  36: "NY",
  37: "NC",
  38: "ND",
  39: "OH",
  40: "OK",
  41: "OR",
  42: "PA",
  44: "RI",
  45: "SC",
  46: "SD",
  47: "TN",
  48: "TX",
  49: "UT",
  50: "VT",
  51: "VA",
  53: "WA",
  54: "WV",
  55: "WI",
  56: "WY",
};

// Style objects for react-simple-maps hover support
const defaultStateStyle = {
  default: {
    fill: "#5eead4",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
  hover: {
    fill: "#2dd4bf",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
  pressed: {
    fill: "#2dd4bf",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
};

const featuredStateStyle = {
  default: {
    fill: "#14b8a6",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
  hover: {
    fill: "#0d9488",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
  pressed: {
    fill: "#0d9488",
    stroke: "#fff",
    strokeWidth: 0.5,
    outline: "none",
    cursor: "pointer",
  },
};

function StateCard({ abbr, state, onOpenPopup }) {
  const hasMultipleLinks = state.links && state.links.length > 1;

  if (hasMultipleLinks) {
    return (
      <button
        className="featured-state-card"
        onClick={() => onOpenPopup(abbr)}
      >
        <span className="state-abbr">{abbr}</span>
      </button>
    );
  }

  return (
    <a
      href={state.link}
      className="featured-state-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="state-abbr">{abbr}</span>
    </a>
  );
}

function ReportsPopup({ abbr, state, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <h4 className="popup-title">{state.name} Reports</h4>
        <div className="popup-links">
          {state.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="popup-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StateCoverageMap() {
  const [openPopup, setOpenPopup] = useState(null);

  return (
    <section className="map-section">
      <div className="map-container">
        <p className="section-label">Coverage</p>
        <h2 className="section-title">All 50 States + DC</h2>
        <p className="map-subtitle">
          Complete state income tax modeling across the entire United States
        </p>

        <div className="map-wrapper">
          <ComposableMap projection="geoAlbersUsa" className="us-map">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateAbbr = fipsToAbbr[geo.id];
                  const hasReport = statesWithReports[stateAbbr];

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={hasReport ? featuredStateStyle : defaultStateStyle}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>

        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-color legend-covered"></span>
            <span>State income tax modeled</span>
          </div>
          <div className="legend-item">
            <span className="legend-color legend-featured"></span>
            <span>Featured state reports</span>
          </div>
        </div>

        <div className="featured-states">
          <h3 className="featured-heading">Featured State Reports</h3>
          <div className="featured-grid">
            {Object.entries(statesWithReports)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([abbr, state]) => (
                <StateCard
                  key={abbr}
                  abbr={abbr}
                  state={state}
                  onOpenPopup={setOpenPopup}
                />
              ))}
          </div>
        </div>

        <a
          href="https://policyengine.org/us/research/state-tax-model-beta"
          className="map-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn about our state coverage
        </a>
      </div>

      {openPopup && statesWithReports[openPopup] && (
        <ReportsPopup
          abbr={openPopup}
          state={statesWithReports[openPopup]}
          onClose={() => setOpenPopup(null)}
        />
      )}
    </section>
  );
}
