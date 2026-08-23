/**
 * Verbatim from the CV. Three roles are concurrent (`current: true`) —
 * the timeline renders them grouped rather than pretending they're sequential.
 */

export type Role = {
  id: string;
  title: string;
  company: string;
  start: string;
  end: string;
  current: boolean;
  /** Short framing line — not on the CV, but a factual summary of the bullets. */
  summary: string;
  points: string[];
  tags: string[];
};

export const experience: Role[] = [
  {
    id: "raytech",
    title: "Mobile App Developer (Remote)",
    company: "Raytech Labs",
    start: "May 2026",
    end: "Present",
    current: true,
    summary: "Native iOS and Expo work on subscription-based products.",
    points: [
      "Develop and maintain native iOS (UIKit/Storyboard) and React Native (Expo) applications.",
      "Integrate Supabase backend services and RevenueCat for subscription-based applications.",
      "Implement new features, resolve production issues, and optimize application performance.",
      "Collaborate with designers, backend developers, and QA teams using Git-based workflows.",
      "Utilize Cursor and Claude Code to accelerate development, debugging, and feature delivery.",
    ],
    tags: ["UIKit", "Expo", "Supabase", "RevenueCat", "Git"],
  },
  {
    id: "astapor",
    title: "SwiftUI & React Native Developer",
    company: "Astapor Technologies",
    start: "Feb 2025",
    end: "Present",
    current: true,
    summary:
      "Started in SwiftUI, moved into React Native — and owned a Restaurant POS system end to end, frontend and backend.",
    points: [
      "Built a Restaurant POS system as sole developer across the full stack: React Native apps for phone and tablet, a PHP Laravel REST API, and a web admin dashboard for inventory and order management.",
      "Designed the MySQL schema and migrations for the POS — orders, menu items, inventory and staff accounts — and wrote the Eloquent models and business logic on top.",
      "Implemented authentication with role-based permissions separating staff, manager and admin access.",
      "Started as a SwiftUI developer and transitioned to React Native development.",
      "Develop responsive mobile and tablet applications from Figma and Adobe XD designs.",
      "Integrate RESTful APIs, Firebase services, biometric authentication, push notifications, and in-app purchases.",
      "Utilize Cursor and Claude Code to improve development productivity and assist with Flutter application maintenance.",
    ],
    tags: [
      "React Native",
      "SwiftUI",
      "PHP",
      "Laravel",
      "MySQL",
      "REST API design",
      "RBAC",
      "Firebase",
      "In-App Purchases",
    ],
  },
  {
    id: "freelance",
    title: "Freelance React Native Developer",
    company: "Independent",
    start: "Mar 2025",
    end: "Present",
    current: true,
    summary: "Direct client work, end to end — build through store release.",
    points: [
      "Develop and maintain cross-platform mobile applications for direct clients.",
      "Built a referral system with deferred deep linking: a QR code or shared link routes the user to the correct store, and the referral code still resolves on first open after install — implemented with the Play Install Referrer API on Android and the ChottuLink SDK on iOS, with no paid attribution platform.",
      "Integrate AI-powered chatbot features, RevenueCat, push notifications, and Arabic language support.",
      "Convert designs into responsive, high-performance user interfaces.",
      "Deploy and maintain applications on Google Play Store and Apple App Store.",
    ],
    tags: [
      "React Native",
      "Deferred deep linking",
      "Play Install Referrer",
      "ChottuLink",
      "RevenueCat",
      "AI Chatbot",
      "Localization",
    ],
  },
  {
    id: "balawal-2024",
    title: "React Native Developer",
    company: "Balawal IT House",
    start: "Sep 2024",
    end: "Jan 2025",
    current: false,
    summary: "Production React Native delivery with a backend team.",
    points: [
      "Developed cross-platform React Native applications with responsive user interfaces.",
      "Integrated RESTful APIs and third-party libraries.",
      "Collaborated with backend teams to deliver production-ready applications.",
      "Deployed applications to Google Play Store, Apple App Store, and TestFlight.",
    ],
    tags: ["React Native", "REST APIs", "TestFlight"],
  },
  {
    id: "balawal-2023",
    title: "React Native Developer",
    company: "Balawal IT House",
    start: "Sep 2023",
    end: "Apr 2024",
    current: false,
    summary: "Design-to-app delivery and performance work.",
    points: [
      "Developed responsive cross-platform mobile applications from UI designs.",
      "Integrated RESTful APIs and maintained scalable application architecture.",
      "Optimized application performance and user experience.",
      "Assisted with application deployment to Google Play Store and Apple App Store.",
    ],
    tags: ["React Native", "REST APIs", "Performance"],
  },
  {
    id: "balawal-intern",
    title: "React Native Intern",
    company: "Balawal IT House",
    start: "Jul 2023",
    end: "Sep 2023",
    current: false,
    summary: "Where it started — components, Firebase, and the basics done properly.",
    points: [
      "Built reusable React Native components and responsive user interfaces.",
      "Integrated Firebase services and REST APIs.",
      "Used Git for version control and Postman for API testing.",
      "Learned industry-standard mobile development workflows and best practices.",
    ],
    tags: ["React Native", "Firebase", "Git", "Postman"],
  },
];

export const education = [
  {
    id: "bsit",
    degree: "Bachelor of Science in Information Technology",
    institution: "University of Sialkot",
    start: "Aug 2020",
    end: "Aug 2024",
  },
  {
    id: "intermediate",
    degree: "Intermediate (Pre-Engineering)",
    institution: "Army Public College, Sialkot Cantt",
    start: "Feb 2017",
    end: "Apr 2019",
  },
];

/**
 * Certifications.
 *
 * `url` is optional and points at a file in public/certificates/. An entry with
 * a url renders a "View certificate" link; one without still lists, for a
 * certificate held on paper but not yet scanned.
 */
export const certifications: {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
}[] = [
  {
    id: "bith-internship-2024",
    name: "React Native Internship — Certificate of Appreciation",
    issuer: "Balawal IT House",
    year: "May – Sep 2024",
    url: "/certificates/balawal-it-house-react-native-internship-2024.pdf",
  },
  {
    id: "bith-internship-2023",
    name: "React Native Internship — Certificate of Appreciation",
    issuer: "Balawal IT House",
    year: "Jul – Sep 2023",
    // Awaiting a scan of the original letter (issued 21 September 2023).
  },
];
