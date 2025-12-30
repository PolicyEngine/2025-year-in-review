import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Highlights from "./components/Highlights";
import BudgetProvisions from "./components/BudgetProvisions";
import Events from "./components/Events";
import Partners from "./components/Partners";
import ImpactMetrics from "./components/ImpactMetrics";
import Citations from "./components/Citations";
import StateCoverageMap from "./components/StateCoverageMap";
import Timeline from "./components/Timeline";
import GitHub from "./components/GitHub";
import Footer from "./components/Footer";
import {
  usStats,
  usHighlights,
  usTimeline,
  obbbaProvisions,
  usEvents,
  usPartners,
  usImpactMetrics,
} from "./data/us";
import {
  ukStats,
  ukHighlights,
  ukTimeline,
  autumnBudgetProvisions,
  ukEvents,
} from "./data/uk";
import "./styles/index.css";

const COUNTRY_CODES = ["us", "uk"];

function CountryToggle({ country }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Hide toggle if embed mode
  if (searchParams.get("embed") === "true") {
    return null;
  }

  const handleCountryChange = (newCountry) => {
    // Preserve search params when navigating
    const params = searchParams.toString();
    navigate(`/${newCountry}${params ? `?${params}` : ""}`);
  };

  return (
    <div className="country-toggle">
      <button
        className={`country-btn ${country === "us" ? "active" : ""}`}
        onClick={() => handleCountryChange("us")}
      >
        United States
      </button>
      <button
        className={`country-btn ${country === "uk" ? "active" : ""}`}
        onClick={() => handleCountryChange("uk")}
      >
        United Kingdom
      </button>
    </div>
  );
}

function YearInReview() {
  const { countryId } = useParams();
  const country = COUNTRY_CODES.includes(countryId) ? countryId : "us";

  const stats = country === "us" ? usStats : ukStats;
  const highlights = country === "us" ? usHighlights : ukHighlights;
  const timeline = country === "us" ? usTimeline : ukTimeline;
  const events = country === "us" ? usEvents : ukEvents;
  const partners = country === "us" ? usPartners : null;
  const impactMetrics = country === "us" ? usImpactMetrics : null;

  return (
    <>
      <CountryToggle country={country} />
      <Hero country={country} />
      <Stats stats={stats} country={country} />
      <Highlights highlights={highlights} />
      {country === "us" && obbbaProvisions.length > 0 && (
        <BudgetProvisions
          provisions={obbbaProvisions}
          title="One Big Beautiful Bill Act"
          intro="We modeled all major OBBBA provisions. Click each to read our detailed analysis of its impacts."
          ctaLink="https://policyengine.org/us/obbba-household-by-household"
          ctaText="Explore 40,000+ household impacts"
        />
      )}
      {country === "uk" && (
        <BudgetProvisions
          provisions={autumnBudgetProvisions}
          title="Autumn Budget 2025 Provisions"
          intro="Our interactive dashboard models all nine major provisions. Click each to read our detailed analysis."
          ctaLink="https://policyengine.org/uk/autumn-budget-2025"
          ctaText="Explore the full interactive dashboard"
        />
      )}
      <Events events={events} />
      <ImpactMetrics metrics={impactMetrics} />
      <Citations country={country} />
      {country === "us" && <StateCoverageMap />}
      <Partners partners={partners} />
      <Timeline timeline={timeline} country={country} />
      <GitHub />
      <Footer />
    </>
  );
}

function RedirectToCountry() {
  // Detect country from browser locale
  const browserLang = navigator.language;
  const countryMap = {
    "en-GB": "uk",
    "en-US": "us",
  };
  const country = countryMap[browserLang] || "us";
  return <Navigate to={`/${country}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToCountry />} />
        <Route path="/:countryId" element={<YearInReview />} />
        <Route path="*" element={<Navigate to="/us" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
