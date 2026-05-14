import { PolicyEngineShell } from "@policyengine/ui-kit/layout";
import "@policyengine/ui-kit/styles.css";

import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://policyengine.org/us/2025-year-in-review';
const TITLE = 'PolicyEngine 2025 Year in Review';
const DESCRIPTION =
  "Explore PolicyEngine's 2025 achievements in democratizing policy analysis across the US and UK.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  icons: {
    icon: 'https://policyengine.org/favicon.ico',
  },
  openGraph: {
    type: 'website',
    title: TITLE,
    description:
      '2025 was our biggest year yet. 62 jurisdictions, 100K+ people served, PolicyEngine 2.0, and more.',
    url: SITE_URL,
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description:
      '2025 was our biggest year yet. 62 jurisdictions, 100K+ people served, PolicyEngine 2.0, and more.',
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PolicyEngineShell country="us">{children}        </PolicyEngineShell>
      </body>
    </html>
  );
}
