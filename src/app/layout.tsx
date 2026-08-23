import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SmoothAnchors } from "@/components/layout/smooth-anchors";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

const description = `${profile.role} — ${profile.specialism}. ${profile.location}. React Native, SwiftUI and UIKit apps shipped to the App Store and Google Play.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "React Native Developer",
    "iOS Developer",
    "SwiftUI",
    "UIKit",
    "Mobile App Developer",
    "Expo",
    "Firebase",
    "Supabase",
    "RevenueCat",
    "Pakistan",
    profile.name,
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Structured data — helps a recruiter's search surface the right person. */
function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: SITE_URL,
    email: `mailto:${profile.links.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Sialkot", addressCountry: "PK" },
    sameAs: [profile.links.linkedin, profile.links.github],
    knowsAbout: [
      "React Native",
      "SwiftUI",
      "UIKit",
      "Firebase",
      "Supabase",
      "Mobile Application Development",
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Content is a static literal from our own data file — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <PersonSchema />
        <SmoothAnchors />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
