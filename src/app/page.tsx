'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const COUNTRY_CODES = ['us', 'uk'];

function HomePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Honour explicit ?country=… for embedded usage.
    const countryParam = searchParams.get('country');
    let target = COUNTRY_CODES.includes(countryParam ?? '')
      ? countryParam
      : null;

    if (!target) {
      const lang = typeof navigator !== 'undefined' ? navigator.language : '';
      target = lang === 'en-GB' ? 'uk' : 'us';
    }

    const params = searchParams.toString();
    router.replace(`/${target}${params ? `?${params}` : ''}`);
  }, [router, searchParams]);

  return null;
}

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomePageInner />
    </Suspense>
  );
}
