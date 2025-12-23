import { useEffect, useRef, useState } from 'react';
import './Stats.css';

function AnimatedNumber({ number, prefix = '', suffix = '' }) {
  const [displayNumber, setDisplayNumber] = useState(number);
  const ref = useRef(null);
  const prevNumber = useRef(number);

  useEffect(() => {
    // If number changed, animate to new value
    if (prevNumber.current !== number) {
      prevNumber.current = number;
      const duration = 800;
      const start = performance.now();
      const startValue = displayNumber;

      const animate = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (number - startValue) * eased;
        setDisplayNumber(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      return;
    }

    // Initial animation on scroll into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayNumber === 0) {
          const duration = 2000;
          const start = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = number * eased;
            setDisplayNumber(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [number, displayNumber]);

  const formatted = number % 1 !== 0
    ? displayNumber.toFixed(1)
    : Math.floor(displayNumber).toLocaleString();

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export default function Stats({ stats, country }) {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <p className="section-label">By The Numbers</p>
        <h2 className="section-title">
          {country === 'us' ? 'United States' : 'United Kingdom'} Impact
        </h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={`${stat.label}-${stat.number}`}>
              <div className="stat-number">
                <AnimatedNumber
                  number={stat.number}
                  prefix={stat.prefix || ''}
                  suffix={stat.suffix || ''}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-detail">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
