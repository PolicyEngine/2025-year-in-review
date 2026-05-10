'use client';

import { Suspense, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header as PolicyEngineHeader } from '@policyengine/ui-kit/layout';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Highlights from '@/components/Highlights';
import BudgetProvisions from '@/components/BudgetProvisions';
import Partners from '@/components/Partners';
import Citations from '@/components/Citations';
import StateCoverageMap from '@/components/StateCoverageMap';
import Timeline from '@/components/Timeline';
import SoftwareDev from '@/components/SoftwareDev';
import Footer from '@/components/Footer';
import {
  usStats,
  usHighlights,
  usTimeline,
  obbbaProvisions,
  usPartners,
} from '@/data/us';
import {
  ukStats,
  ukHighlights,
  ukTimeline,
  autumnBudgetProvisions,
} from '@/data/uk';

const COUNTRY_CODES = ['us', 'uk'];
const PE_COUNTRIES = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'United Kingdom' },
];

function getNavItems(country: string) {
  const root = `https://policyengine.org/${country}`;
  return [
    { label: 'Research', href: `${root}/research` },
    { label: 'Model', href: `${root}/model` },
    { label: 'API', href: `${root}/api` },
    { label: 'Python', href: `${root}/python` },
    {
      label: 'About',
      href: `${root}/team`,
      children: [
        { label: 'Team', href: `${root}/team` },
        { label: 'Supporters', href: `${root}/supporters` },
        { label: 'Citations', href: `${root}/citations` },
      ],
    },
    { label: 'Donate', href: `${root}/donate` },
  ];
}

function CountryToggle({ country }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Hide toggle in embed mode.
  if (searchParams.get('embed') === 'true') {
    return null;
  }

  const handleCountryChange = (newCountry) => {
    const params = searchParams.toString();
    router.push(`/${newCountry}${params ? `?${params}` : ''}`);
  };

  return (
    <div className="country-toggle">
      <button
        className={`country-btn ${country === 'us' ? 'active' : ''}`}
        onClick={() => handleCountryChange('us')}
      >
        United States
      </button>
      <button
        className={`country-btn ${country === 'uk' ? 'active' : ''}`}
        onClick={() => handleCountryChange('uk')}
      >
        United Kingdom
      </button>
    </div>
  );
}

function YearInReview({ countryId }: { countryId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Allow ?country=… to override the path segment for embedded usage.
  const countryParam = searchParams.get('country');
  const country = COUNTRY_CODES.includes(countryParam ?? '')
    ? countryParam
    : COUNTRY_CODES.includes(countryId)
      ? countryId
      : 'us';

  const stats = country === 'us' ? usStats : ukStats;
  const highlights = country === 'us' ? usHighlights : ukHighlights;
  const timeline = country === 'us' ? usTimeline : ukTimeline;
  const partners = country === 'us' ? usPartners : null;
  const embedded = searchParams.get('embed') === 'true';

  const handleCountryChange = (newCountry: string) => {
    const params = searchParams.toString();
    router.push(`/${newCountry}${params ? `?${params}` : ''}`);
  };

  return (
    <>
      {!embedded && (
        <PolicyEngineHeader
          navItems={getNavItems(country)}
          countries={PE_COUNTRIES}
          currentCountry={country}
          onCountryChange={handleCountryChange}
          logoHref={`https://policyengine.org/${country}`}
        />
      )}
      <CountryToggle country={country} />
      <Hero country={country} />
      <Stats stats={stats} country={country} />
      <Highlights highlights={highlights} />
      {country === 'us' && obbbaProvisions.length > 0 && (
        <BudgetProvisions
          provisions={obbbaProvisions}
          title="One Big Beautiful Bill Act"
          intro="We modeled all major OBBBA provisions. Click each to read our detailed analysis of its impacts."
          ctaLink="https://policyengine.org/us/obbba-household-by-household"
          ctaText="Explore 40,000+ household impacts"
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
      <Citations country={country} />
      {country === 'us' && <StateCoverageMap />}
      <Partners partners={partners} />
      <Timeline timeline={timeline} country={country} />
      <SoftwareDev />
      <Footer country={country} />
    </>
  );
}

export default function YearInReviewPage({
  params,
}: {
  params: Promise<{ countryId: string }>;
}) {
  const { countryId } = use(params);
  return (
    <Suspense fallback={null}>
      <YearInReview countryId={countryId} />
    </Suspense>
  );
}
