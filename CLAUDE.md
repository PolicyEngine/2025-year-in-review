# 2025 Year in Review - Development Notes

## Current Status (Dec 2025)

### Completed Components
- **Hero**: Animated header with PolicyEngine branding and year title
- **Stats**: Animated counters showing key metrics (commits, repos, etc.)
- **Highlights**: Visual cards for major launches (PE 2.0, OBBBA, ACA Calculator, etc.)
- **BudgetProvisions**: Interactive provision cards for OBBBA (US) and Autumn Budget (UK)
- **Events**: Timeline of major 2025 events (UK launch event, DC office, etc.)
- **Partners**: Grid showing partner organizations (US only)
- **ImpactMetrics**: Key impact statistics with icons (US only)
- **StateCoverageMap**: Interactive US map showing state income tax coverage with featured state reports
- **Timeline**: Chronological list of 2025 blog posts/research
- **GitHub**: Real stats from GitHub API (9,623 commits, 43 repos, 27 new repos)
- **Footer**: Standard footer with links

### Component Notes

#### StateCoverageMap
- Uses `react-simple-maps` v3.0.0 for rendering
- **IMPORTANT**: Hover effects work via the `style` prop with `{default, hover, pressed}` object structure - NOT CSS `:hover` or React state/events
- Featured states (with reports): CA, ID, MD, NY, OR, UT, WA
- All 50 states + DC are shown as "covered" for state income tax modeling

#### GitHub Component
- Pulls real stats from GitHub API
- Shows: total commits, total repos, new repos in 2025
- Grid visualization removed (was causing issues/fake data)

### Data Files
- `src/data/us.js` - All US-specific data (stats, highlights, events, partners, etc.)
- `src/data/uk.js` - All UK-specific data

## Suggested Improvements

### High Priority
1. **UK content parity**: UK page is thinner than US - add events, partners, impact metrics
2. **More state reports**: Only 7 states have featured reports - research/add more
3. **Mobile testing**: Verify all components work well on mobile devices
4. **Accessibility audit**: Check color contrast, keyboard navigation, screen reader support

### Medium Priority
1. **Performance**: Consider lazy loading images and components below the fold
2. **SEO**: Add meta tags, Open Graph tags for social sharing
3. **Analytics**: Add tracking to see which sections get engagement
4. **Interactive map clicks**: Make states clickable to their research pages (currently only featured states in grid below are linked)
5. **UK map**: Consider adding UK regional map for similar coverage visualization

### Low Priority / Nice to Have
1. **Animation polish**: Add scroll-triggered animations for sections
2. **Dark/light mode toggle**: Currently dark theme only
3. **Print stylesheet**: For users who want to save as PDF
4. **Share buttons**: Social sharing for specific sections

### Technical Debt
1. **Type safety**: Consider adding TypeScript for data files
2. **Component tests**: No tests currently - add Jest/Vitest tests
3. **Storybook**: Could help with component documentation
4. **CSS organization**: Some duplicate styles across component CSS files

## Development Commands

```bash
# Install dependencies (use bun, not npm)
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## URL Structure

- `/` - Redirects based on browser locale (en-GB → /uk, else → /us)
- `/us` - US Year in Review
- `/uk` - UK Year in Review
- `?embed=true` - Hides country toggle (for embedding)

## Deployment

Currently deployed to GitHub Pages. Build creates `dist/` folder.

The `vite.config.js` should have `base: '/2025-year-in-review/'` for GitHub Pages deployment.

## Known Issues

1. **react-simple-maps hover**: Must use the library's native `style` prop structure, not CSS or external event handlers
2. **GitHub API rate limiting**: If developing extensively, you may hit GitHub's unauthenticated rate limit (60/hour)

## Resources

- [react-simple-maps docs](https://www.react-simple-maps.io/docs/)
- [PolicyEngine Research](https://policyengine.org/us/research) - Source for featured state reports
- [PolicyEngine Blog](https://policyengine.org/us/blog) - Source for timeline entries
