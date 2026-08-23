/**
 * Grouped by what each capability is *for*.
 *
 * Wording note: this file distinguishes building from consuming. The Laravel /
 * MySQL group says "designed and built" because that's the actual scope of the
 * POS work — schema, endpoints, auth and the admin UI. Listing Laravel next to
 * Firebase under a generic "Backend" heading implied integration-only, which
 * undersold it.
 */

export type SkillGroup = {
  id: string;
  title: string;
  /** Lucide icon name, resolved in the Skills section. */
  icon:
    | "smartphone"
    | "server"
    | "sparkles"
    | "wrench"
    | "rocket"
    | "code"
    | "link"
    | "database";
  blurb: string;
  items: string[];
  /** Highlighted items get the accent treatment — the headline capabilities. */
  primary?: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "mobile",
    title: "Core Stack",
    icon: "smartphone",
    blurb: "React Native, day in and day out — the one I'd want to be tested on.",
    items: [
      "React Native (CLI)",
      "React Native (Expo)",
      "JavaScript",
      "Redux",
      "Reusable component architecture",
      "Responsive UI development",
    ],
    primary: ["React Native (CLI)", "React Native (Expo)", "JavaScript"],
  },
  {
    /**
     * Split out from the core stack on purpose. Listing SwiftUI and UIKit
     * beside React Native implied equal depth in all three; they came later and
     * the shipped volume is smaller. Saying so plainly is what makes the core
     * claim above credible.
     */
    id: "cross-platform",
    title: "Also Build In",
    icon: "smartphone",
    blurb: "Real shipped work, less depth than React Native — stated rather than implied.",
    items: [
      "SwiftUI",
      "Flutter",
      "UIKit (Storyboard)",
      "Android (Java, XML layouts)",
    ],
    primary: ["SwiftUI", "Flutter"],
  },
  {
    id: "fullstack",
    title: "Full-Stack, AI-Assisted",
    icon: "database",
    blurb:
      "Delivered end to end on the POS — schema to admin UI — with Cursor and Claude Code, and my own review.",
    items: [
      "PHP",
      "Laravel",
      "MySQL schema design",
      "Migrations & Eloquent",
      "REST API design",
      "Auth & role-based permissions",
      "Admin dashboard UI",
    ],
    primary: ["PHP", "Laravel", "MySQL schema design", "REST API design"],
  },
  {
    id: "integrations",
    title: "Backend I Integrate",
    icon: "server",
    blurb: "Managed services an app depends on.",
    items: [
      "REST API Integration",
      "Firebase Authentication",
      "Firestore",
      "Firebase Storage",
      "Firebase Cloud Messaging",
      "Firebase Analytics",
      "Supabase",
    ],
    primary: ["Firebase Authentication", "Firestore", "Firebase Analytics"],
  },
  {
    id: "deeplinking",
    title: "Deep Linking & Attribution",
    icon: "link",
    blurb:
      "QR or link → store → install → the referral code still resolves. Built without a paid attribution platform.",
    items: [
      "Deferred deep linking",
      "Play Install Referrer API",
      "ChottuLink (iOS)",
      "Universal Links (iOS)",
      "App Links (Android)",
      "Referral code attribution",
      "QR-based install flows",
    ],
    primary: [
      "Deferred deep linking",
      "Play Install Referrer API",
      "Referral code attribution",
    ],
  },
  {
    id: "features",
    title: "Product Features",
    icon: "sparkles",
    blurb: "The integrations that usually decide a release date.",
    items: [
      "In-App Purchases",
      "RevenueCat",
      "Google AdMob",
      "Push Notifications",
      "Biometric Authentication",
      "Multi-Language Support",
    ],
    primary: ["RevenueCat", "Google AdMob", "Biometric Authentication"],
  },
  {
    id: "ai",
    title: "AI-Assisted Development",
    icon: "code",
    blurb:
      "How I work confidently outside my core stack — reviewing what lands, not shipping it unread.",
    items: ["Cursor", "Claude Code"],
    primary: ["Cursor", "Claude Code"],
  },
  {
    id: "tooling",
    title: "Tooling & Practices",
    icon: "wrench",
    blurb: "How the work gets organised.",
    items: [
      "Git",
      "GitHub",
      "Postman",
      "Responsive UI Development",
      "Reusable Component Architecture",
    ],
  },
  {
    id: "deployment",
    title: "Shipping & Deployment",
    icon: "rocket",
    blurb: "End-to-end release, including the parts that go wrong.",
    items: [
      "Google Play Console",
      "Apple App Store Connect",
      "TestFlight",
    ],
    primary: ["Apple App Store Connect", "TestFlight"],
  },
];
