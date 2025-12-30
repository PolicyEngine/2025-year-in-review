import { useState, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import engagementsData from "../data/engagements.yaml?raw";
import YAML from "yaml";
import "./StateCoverageMap.css";

// Parse YAML data
const parsedData = YAML.parse(engagementsData);
const stateEngagements = parsedData.us;
const internationalEngagements = parsedData.international;

const usGeoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";
const worldGeoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// PE App v2 aligned colors
const ENGAGEMENT_TYPES = {
  report: { icon: "📄", label: "Research Report", color: "#319795" },      // pe-teal-500
  apiPartner: { icon: "🔗", label: "API Partner", color: "#F97316" },      // pe-coral
  research: { icon: "📊", label: "Research Partnership", color: "#EAB308" }, // pe-gold
  conference: { icon: "🎤", label: "Conference", color: "#8B5CF6" },        // violet
};

// FIPS code to state abbreviation mapping
const fipsToAbbr = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

// Get engagement color based on primary type
function getStateColor(stateAbbr, isHovered) {
  const state = stateEngagements[stateAbbr];
  if (!state) {
    return isHovered ? "#4FD1C5" : "#5EEAD4"; // pe-teal-300/400
  }

  const types = state.engagements.map((e) => e.type);
  if (types.includes("report")) {
    return isHovered ? "#2C7A7B" : "#319795"; // pe-teal-700/500
  }
  if (types.includes("apiPartner")) {
    return isHovered ? "#EA580C" : "#F97316"; // orange-600/500
  }
  if (types.includes("research")) {
    return isHovered ? "#CA8A04" : "#EAB308"; // yellow-600/500
  }
  if (types.includes("conference")) {
    return isHovered ? "#7C3AED" : "#8B5CF6"; // violet-600/500
  }
  return isHovered ? "#4FD1C5" : "#5EEAD4";
}

function HoverCard({ state, position }) {
  if (!state) return null;

  // Group engagements by type
  const grouped = {};
  state.engagements.forEach((eng) => {
    if (!grouped[eng.type]) grouped[eng.type] = [];
    grouped[eng.type].push(eng);
  });

  return (
    <div
      className="hover-card"
      style={{ left: position.x, top: position.y }}
    >
      <div className="hover-card-header">
        <h4>{state.name}</h4>
        <span className="engagement-count">
          {state.engagements.length} engagement
          {state.engagements.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="hover-card-content">
        {Object.entries(grouped).map(([type, engagements]) => (
          <div key={type} className="engagement-group">
            <div className="engagement-type-header">
              <span
                className="engagement-dot"
                style={{ background: ENGAGEMENT_TYPES[type].color }}
              />
              <span className="engagement-type-label">
                {ENGAGEMENT_TYPES[type].label}
              </span>
            </div>
            {engagements.map((eng, idx) => (
              <div key={idx} className="engagement-item">
                {eng.url ? (
                  <a
                    href={eng.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="engagement-link"
                  >
                    <span className="engagement-title">{eng.title}</span>
                    {eng.comingSoon && (
                      <span className="coming-soon-badge">Coming Soon</span>
                    )}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ) : (
                  <span className="engagement-title">
                    {eng.title}
                    {eng.comingSoon && (
                      <span className="coming-soon-badge">Coming Soon</span>
                    )}
                  </span>
                )}
                {eng.location && (
                  <span className="engagement-location">{eng.location}</span>
                )}
                {eng.description && (
                  <p className="engagement-description">{eng.description}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function USMap({ hoveredState, setHoveredState, tooltipPosition, setTooltipPosition, mapRef }) {
  const handleMouseEnter = (stateAbbr, event) => {
    if (stateEngagements[stateAbbr]) {
      const rect = mapRef.current?.getBoundingClientRect();
      if (rect) {
        const x = event.clientX - rect.left + 20;
        const y = event.clientY - rect.top - 10;
        setTooltipPosition({ x, y });
      }
      setHoveredState(stateAbbr);
    }
  };

  return (
    <ComposableMap projection="geoAlbersUsa" className="us-map">
      <Geographies geography={usGeoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const stateAbbr = fipsToAbbr[geo.id];
            const hasEngagement = stateEngagements[stateAbbr];

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={(e) => handleMouseEnter(stateAbbr, e)}
                onMouseLeave={() => setHoveredState(null)}
                style={{
                  default: {
                    fill: getStateColor(stateAbbr, false),
                    stroke: "#fff",
                    strokeWidth: 0.5,
                    outline: "none",
                    cursor: hasEngagement ? "pointer" : "default",
                  },
                  hover: {
                    fill: getStateColor(stateAbbr, true),
                    stroke: "#fff",
                    strokeWidth: hasEngagement ? 1.5 : 0.5,
                    outline: "none",
                    cursor: hasEngagement ? "pointer" : "default",
                  },
                  pressed: {
                    fill: getStateColor(stateAbbr, true),
                    stroke: "#fff",
                    strokeWidth: 0.5,
                    outline: "none",
                  },
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}

function WorldMap({ hoveredLocation, setHoveredLocation, tooltipPosition, setTooltipPosition, mapRef }) {
  const handleMarkerEnter = (key, data, event) => {
    const rect = mapRef.current?.getBoundingClientRect();
    if (rect) {
      const x = event.clientX - rect.left + 20;
      const y = event.clientY - rect.top - 10;
      setTooltipPosition({ x, y });
    }
    setHoveredLocation({ key, data });
  };

  // Combine US (as single marker) and international
  const usEngagementCount = Object.values(stateEngagements).reduce(
    (acc, state) => acc + state.engagements.length,
    0
  );

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 120, center: [0, 30] }}
      className="world-map"
    >
      <ZoomableGroup>
        <Geographies geography={worldGeoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#E2E8F0",
                    stroke: "#fff",
                    strokeWidth: 0.3,
                    outline: "none",
                  },
                  hover: {
                    fill: "#CBD5E1",
                    stroke: "#fff",
                    strokeWidth: 0.3,
                    outline: "none",
                  },
                  pressed: {
                    fill: "#CBD5E1",
                    stroke: "#fff",
                    strokeWidth: 0.3,
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

        {/* US marker */}
        <Marker
          coordinates={[-98.5795, 39.8283]}
          onMouseEnter={(e) =>
            handleMarkerEnter(
              "US",
              {
                name: "United States",
                engagements: [
                  {
                    type: "report",
                    title: `${usEngagementCount} engagements across ${Object.keys(stateEngagements).length} states`,
                    description: "Switch to US view for details",
                  },
                ],
              },
              e
            )
          }
          onMouseLeave={() => setHoveredLocation(null)}
        >
          <circle
            r={12}
            fill="#319795"
            stroke="#fff"
            strokeWidth={2}
            style={{ cursor: "pointer" }}
          />
          <text
            textAnchor="middle"
            y={4}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "8px",
              fill: "#fff",
              fontWeight: "bold",
            }}
          >
            US
          </text>
        </Marker>

        {/* International markers */}
        {Object.entries(internationalEngagements).map(([key, data]) => (
          <Marker
            key={key}
            coordinates={data.coordinates}
            onMouseEnter={(e) => handleMarkerEnter(key, data, e)}
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <circle
              r={8}
              fill="#8B5CF6"
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
            />
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  );
}

export default function StateCoverageMap() {
  const [viewMode, setViewMode] = useState("us"); // 'us' or 'world'
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  // Count engagements
  const engagementCounts = { report: 0, apiPartner: 0, research: 0, conference: 0 };
  Object.values(stateEngagements).forEach((state) => {
    state.engagements.forEach((eng) => {
      engagementCounts[eng.type]++;
    });
  });

  const intlCount = Object.values(internationalEngagements).reduce(
    (acc, loc) => acc + loc.engagements.length,
    0
  );

  return (
    <section className="map-section">
      <div className="map-container">
        <p className="section-label">Global Engagement</p>
        <h2 className="section-title">2025 Activities</h2>
        <p className="map-subtitle">
          Research, partnerships, and conferences around the world
        </p>

        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "us" ? "active" : ""}`}
            onClick={() => setViewMode("us")}
          >
            🇺🇸 United States
          </button>
          <button
            className={`view-btn ${viewMode === "world" ? "active" : ""}`}
            onClick={() => setViewMode("world")}
          >
            🌍 World
          </button>
        </div>

        <div className="map-wrapper" ref={mapRef}>
          {viewMode === "us" ? (
            <USMap
              hoveredState={hoveredState}
              setHoveredState={setHoveredState}
              tooltipPosition={tooltipPosition}
              setTooltipPosition={setTooltipPosition}
              mapRef={mapRef}
            />
          ) : (
            <WorldMap
              hoveredLocation={hoveredLocation}
              setHoveredLocation={setHoveredLocation}
              tooltipPosition={tooltipPosition}
              setTooltipPosition={setTooltipPosition}
              mapRef={mapRef}
            />
          )}

          {viewMode === "us" && hoveredState && stateEngagements[hoveredState] && (
            <HoverCard
              state={stateEngagements[hoveredState]}
              position={tooltipPosition}
            />
          )}

          {viewMode === "world" && hoveredLocation && (
            <HoverCard
              state={hoveredLocation.data}
              position={tooltipPosition}
            />
          )}
        </div>

        {/* Legend */}
        <div className="map-legend-new">
          <div className="legend-row">
            {viewMode === "us" && (
              <div className="legend-item-new">
                <span className="legend-dot" style={{ background: "#5EEAD4" }} />
                <span>State tax modeled</span>
              </div>
            )}
            {Object.entries(ENGAGEMENT_TYPES).map(
              ([key, { label, color }]) =>
                engagementCounts[key] > 0 && (
                  <div key={key} className="legend-item-new">
                    <span className="legend-dot" style={{ background: color }} />
                    <span>{label}</span>
                  </div>
                )
            )}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="engagement-summary">
          <h3 className="summary-heading">2025 Engagement Highlights</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-number">{engagementCounts.report}</span>
              <span className="summary-label">State Reports</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">
                {Object.values(stateEngagements).filter((s) =>
                  s.engagements.some((e) => e.type === "apiPartner")
                ).length}
              </span>
              <span className="summary-label">API Partner States</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">{engagementCounts.conference + intlCount}</span>
              <span className="summary-label">Conferences</span>
            </div>
            <div className="summary-card">
              <span className="summary-number">
                {Object.keys(internationalEngagements).length}
              </span>
              <span className="summary-label">Countries</span>
            </div>
          </div>
        </div>

        <a
          href="https://policyengine.org/us/research"
          className="map-cta"
          target="_blank"
          rel="noopener noreferrer"
        >
          View all research
        </a>
      </div>
    </section>
  );
}
