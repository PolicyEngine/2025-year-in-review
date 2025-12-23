# PolicyEngine 2025 Year in Review

An interactive year-in-review for PolicyEngine's 2025 achievements, featuring US and UK policy analysis highlights.

## Live Preview

```bash
bun install
bun dev
```

Then open http://localhost:5173

## Features

- **US/UK Toggle**: Switch between country-specific content with animated transitions
- **Animated Statistics**: Counter animations for key metrics
- **Visual Highlights**: Images and GIFs from major launches and tools
- **Interactive Timeline**: 2025 blog posts and milestones
- **GitHub Contribution Grid**: Visual representation of open-source activity
- **Responsive Design**: Works on mobile and desktop

## 2025 Highlights

### United States
- **2,307 commits** to policyengine-us
- **PolicyEngine 2.0** - Complete app rebuild
- **OBBBA Household Explorer** - Interactive tool for 20,000 households
- **ACA Premium Calculator** - Compare subsidy schedules
- **SALTernative** - SALT deduction reform simulator
- **NBER TAXSIM Integration** - Partnership with National Bureau of Economic Research
- **NSF POSE Grant** - National Science Foundation funding
- **DC Office Launch** - New office at Open Gov Hub

### United Kingdom
- **538 commits** to policyengine-uk
- **Autumn Budget 2025 Dashboard** - 9 provision interactive explorer
- **PolicyEngine 2.0 Launch Event** - Central Hall Westminster showcase
- **Reform UK Manifesto Analysis**
- **Wealth Decile Breakdown** - New distributional analysis capability

## Tech Stack

- React 19
- Vite 7
- CSS with custom properties
- Google Fonts (Playfair Display + Inter)

## Design

Built following PolicyEngine brand guidelines:
- **Primary Color**: Teal #319795
- **Typography**: Inter (body) + Playfair Display (headlines)
- **Dark theme** with teal accents
- Animated counters and scroll effects

## Deployment

Build for production:

```bash
bun run build
```

Deploy the `dist/` folder to any static hosting (GitHub Pages, Vercel, Netlify).
