/**
 * Single source of truth for identity + contact.
 * Everything here comes from the CV (ShabanCV.pdf) unless marked otherwise.
 */

export const profile = {
  name: "Muhammad Shaban",
  firstName: "Shaban",
  role: "Mobile Application Developer",
  specialism: "React Native",
  location: "Sialkot, Pakistan",
  timezone: "PKT (UTC+5)",

  /** Shown in the hero headline. */
  headline: "I build mobile apps that ship.",

  /** One-line value proposition under the headline. Frontend-first, by design. */
  pitch:
    "React Native developer with 3+ years turning Figma files into production apps on the App Store and Play Store. Frontend is my core; when a product needs the backend too, I build that — Laravel APIs, MySQL schema, admin dashboards — with AI tooling and my own review.",

  /** About section — first person, no filler. */
  bio: [
    "I'm a mobile developer based in Sialkot, Pakistan. React Native (CLI and Expo) is my core stack — the one I'd want to be tested on. I also build in SwiftUI, Flutter and UIKit, and wrote Android natively in Java before any of it. Most of my work is the unglamorous part that decides whether an app actually ships: wiring REST APIs and Firebase, getting in-app purchases to behave, making biometric auth and push notifications reliable on real devices, and pushing builds through App Store Connect, TestFlight and Google Play Console — fifteen or so apps built from scratch, eight of them taken through store release myself, alongside a long tail of existing codebases I've shipped features into, rebuilt interfaces for, and fixed in production.",
    "I'm not only a client-side developer, though I'll be precise about how that works. For a restaurant POS system I delivered the whole stack alone — the MySQL schema and migrations, the Laravel REST API and business logic, role-based auth for staff and managers, and the web admin dashboard for inventory and orders, alongside the React Native phone and tablet apps. The backend half I built with Cursor and Claude Code rather than years of PHP behind me: I know the shape of the problem and I read what lands before it ships, which is why it works and why I'd rather say so than let someone assume otherwise.",
    "I've also built deferred deep linking and referral attribution from scratch, without paying for an attribution platform: a QR or link routes to the right store, and the referral code still resolves on first open after install — Play Install Referrer API on Android, ChottuLink on iOS.",
    "I've worked on apps from first commit and I've inherited codebases mid-flight to fix production issues — both teach you different things. I use Cursor and Claude Code daily, which lets me move through debugging and feature work faster without losing track of what the code is doing.",
  ],

  availability: {
    open: true,
    label: "Open to opportunities",
  },

  stats: [
    { value: "3+", label: "Years building mobile" },
    /**
     * Both numbers on purpose: a total alone invites "doing what?", so the
     * from-scratch count answers it before it's asked. Every figure here is one
     * that can be talked through in detail.
     */
    { value: "15+", label: "Apps built from scratch" },
    { value: "8", label: "Released to the stores" },
    { value: "4", label: "Teams & clients" },
  ],

  links: {
    email: "shabanshabi79@gmail.com",
    phone: "+92 341 6067085",
    phoneHref: "tel:+923416067085",
    linkedin: "https://linkedin.com/in/muhammad-shaban-97726b292",
    github: "https://github.com/beingshaban79",
    /** Drop the PDF at public/resume/ with this exact filename. */
    resume: "/resume/Muhammad-Shaban-CV.pdf",
    /** Optional — paste a Calendly/Cal.com link to surface a "book a call" CTA. */
    calendar: "",
  },

  languages: ["English", "Urdu", "Punjabi"],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
