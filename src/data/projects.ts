/* ==========================================================================
 *  PROJECTS — this is the only file you need to edit to add your work.
 * ==========================================================================
 *
 *  HOW TO ADD A PROJECT
 *
 *  1. Drop screenshots in:  public/projects/<slug>/01.png, 02.png, ...
 *     Portrait Android screenshots (1080x2412) fit the frame exactly — they
 *     get wrapped in an Android device mockup automatically, so don't
 *     pre-frame them yourself.
 *
 *  2. Copy the TEMPLATE block below, paste it into the `projects` array,
 *     and fill it in.
 *
 *  3. Demo videos: leave `video` as null for now. When you have footage,
 *     set `video: "/projects/<slug>/demo.mp4"` — the player slot is already
 *     built into the card, so nothing else changes.
 *
 *  Anything you leave as "[ADD ...]" renders a visible amber "Needs content"
 *  badge on the card, so unfinished entries are obvious in the page itself.
 *
 *  Each project carries a `track` ("Product Work" / "Client Work" / "Personal").
 *  It isn't shown as a badge — it's there so the section can be split into
 *  headed groups later. See the note at the bottom of this file.
 * ------------------------------------------------------------------------- */

/**
 * Which body of work a project belongs to.
 *
 * Not rendered as a badge — it exists so the Projects section can be split into
 * separate groups ("Product Work", then "Client Work") once there's enough in
 * each to justify it. See the note at the bottom of this file.
 *
 *   "Product Work" — built as part of a company's product team (Astapor, Raytech)
 *   "Client Work"  — freelance, direct clients
 *   "Personal"     — own projects, open source
 *
 * Optional: a project with no `track` yet simply isn't assigned to a group.
 */
export type WorkTrack = "Product Work" | "Client Work" | "Personal";

export type Platform = "iOS" | "Android" | "Web" | "Tablet";

export type Project = {
  slug: string;
  name: string;
  /** One line, shown on the card. Keep it under ~90 characters. */
  pitch: string;
  /** Full description, shown in the detail dialog. 1–3 short paragraphs. */
  description: string[];
  /** Be explicit about what you actually did — recruiters care about this. */
  role: string;
  /** Omit when the owning company isn't confirmed yet. */
  track?: WorkTrack;
  platforms: Platform[];
  tech: string[];
  /** Company or "Freelance" / "Personal". */
  context: string;
  year: string;
  /**
   * Screenshot paths relative to /public. Rendered in Android device frames.
   * Leave empty and the card shows a "screenshots coming" placeholder.
   */
  screenshots: { src: string; alt: string }[];
  /**
   * Shown on the empty phone frame when `screenshots` is empty. Use it when
   * capture is impossible rather than merely pending — a private messenger that
   * sets FLAG_SECURE will never have screenshots, and "coming soon" would be a
   * promise that can't be kept. Leave undefined for work that just hasn't been
   * captured yet; that falls back to "Screenshot coming soon".
   */
  screenshotNote?: string;
  /** Set once you have footage — see step 3 above. */
  video: string | null;
  links: {
    appStore?: string;
    playStore?: string;
    live?: string;
    github?: string;
  };
  /** Optional: 1–3 outcome bullets. Use real numbers or leave it out. */
  highlights?: string[];
  /** Pins the project to the front of the grid. */
  featured?: boolean;
  /**
   * Marks the app as shipped and in customers' hands, which earns the "Live"
   * badge on the card.
   *
   * A store link implies this and is the better signal — a visitor can click
   * it. Set this flag only when the app really is public but the listing URL
   * isn't available to link, so "Live" doesn't depend on having a link.
   */
  live?: boolean;
};

/* --------------------------------------------------------------------------
 *  TEMPLATE — copy this, don't edit it in place.
 * --------------------------------------------------------------------------
 *
 *  {
 *    slug: "my-app",
 *    name: "My App",
 *    pitch: "A one-line description of what it does and who it's for.",
 *    description: [
 *      "What the product is and the problem it solves.",
 *      "The interesting technical part — what was hard and how you handled it.",
 *    ],
 *    role: "Built from scratch — architecture, all screens, Firebase integration, store release.",
 *    track: "Product Work",   // or "Client Work" / "Personal"
 *    platforms: ["iOS", "Android"],
 *    tech: ["React Native (Expo)", "Firebase", "RevenueCat"],
 *    context: "Astapor Technologies",
 *    year: "2025",
 *    screenshots: [
 *      { src: "/projects/my-app/01.png", alt: "Onboarding screen" },
 *      { src: "/projects/my-app/02.png", alt: "Home feed" },
 *    ],
 *    video: null,
 *    links: { playStore: "https://play.google.com/store/apps/details?id=..." },
 *    highlights: ["Cut cold-start time from 4.2s to 1.1s"],
 *    featured: true,
 *  },
 *
 * -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "tapy-aman",
    name: "Tapy Aman",
    pitch:
      "Safety companion for a GPS smartwatch: live location, geofencing, SOS and wearable readings for caregivers.",
    description: [
      "A companion app for a GPS smartwatch worn by elderly users and people of determination, built for the family members and caregivers watching over them. The app is the caregiver's window onto the device: where the wearer is right now, whether the watch is online, its battery and GPS status, and the last reading it sent.",
      "The centre of the app is a live map with the watch's position and connection state, paired with a geofence manager — named zones with an adjustable radius from 1m to 5km, each set to fire on entry, exit or both. Crossings land in an alert log as plain statements a worried relative can read at a glance: the user has left the Home zone, at this time. Fall detection and SOS alerts come through the same path.",
      "It also fronts the watch's own controls — SOS and admin numbers, phone book, fall sensitivity, GPS upload interval, remote restart and power off, video call — which means the app is a control surface for a device rather than a self-contained product. And it surfaces what the watch reports: pulse, blood pressure, oxygen, steps, distance, calories, shown against reference ranges.",
      "That last part carried the strictest constraint on the whole build. Tapy Aman is explicitly not a medical device: it measures nothing, analyses nothing and diagnoses nothing. Every figure on screen is passed through from the wearable, and the app cannot function without one. Presenting health-adjacent numbers without implying diagnosis — and keeping that line intact through store review on both platforms — shaped how those screens are worded and framed.",
      "Live on both stores under Tapy Tech, a UAE hardware brand that sells the Aman smart safety watch the app pairs with. Ongoing engagement, over a year in: Arabic support with right-to-left layout shipped recently, and in-app purchases and further API integration are in progress.",
    ],
    role:
      "Sole frontend developer on an ongoing client engagement — I build and maintain the React Native application on my own: the live tracking map and device status, the geofence manager, the alert log, the wearable data screens, and the device control functions, shipped through App Store Connect and Play Console on both platforms. Recently delivered Arabic localisation with right-to-left layout. The wearable platform and its API are the client's; the app is mine.",
    track: "Client Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Google Maps",
      "Geofencing",
      "Real-time location tracking",
      "Wearable device API",
      "Push notifications",
      "Arabic / RTL localisation",
    ],
    context: "Tapy Tech",
    year: "2025 – Present",
    screenshots: [
      { src: "/projects/tapy-aman/01-splash.webp", alt: "Tapy Aman splash screen" },
      { src: "/projects/tapy-aman/02-sign-in.webp", alt: "Sign-in screen for Tapy Aman" },
      { src: "/projects/tapy-aman/03-live-map-and-device-status.webp", alt: "Home screen with the wearer's live position on a map and a device card showing online state, battery, GPS time and speed" },
      { src: "/projects/tapy-aman/04-device-functions.webp", alt: "Device functions including video chat, SOS and admin numbers, fall sensitivity, upload interval, remote restart and power off" },
      { src: "/projects/tapy-aman/05-wearable-readings.webp", alt: "Readings passed through from the wearable — heart rate and blood pressure — shown against reference ranges" },
      { src: "/projects/tapy-aman/06-activity.webp", alt: "Activity screen with a step ring against a daily goal plus distance and calories" },
      { src: "/projects/tapy-aman/07-geofences.webp", alt: "Geofence list showing named zones and their radius" },
      { src: "/projects/tapy-aman/08-add-geofence.webp", alt: "Add geofence form with entry, exit or both triggers, a radius slider from 1m to 5km, and map location picking" },
      { src: "/projects/tapy-aman/09-geofence-alerts.webp", alt: "Alert log of geofence crossings written in plain language with timestamps" },
    ],
    featured: true,
    video: null,
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.tapy.app",
      // Region-neutral: Apple redirects to the viewer's own storefront.
      appStore: "https://apps.apple.com/app/tapy-aman/id6747520147",
    },
  },
  {
    slug: "lumo-ai-photo-editor",
    name: "Lumo — AI Photo Editor",
    pitch:
      "AI photo editing with natural-language prompts, on-device batch processing, and shareable edit recipes.",
    description: [
      "A photo editor that pairs conventional tools — filters, adjustments, crop, text, stickers, frames — with AI transformations driven by plain language. A user picks a photo, describes the change they want, and the request goes to a trained model hosted on Hugging Face; the edited image comes back into the same editor. The AI tab also exposes direct transformations like adding facial hair or recolouring clothing without the user having to phrase a prompt at all.",
      "Not every edit needs a model. Requests that map to supported local operations are handled on-device and free, with the AI path reserved for what actually requires it — so common edits are instant and don't burn an inference call.",
      "Two features drove most of the architecture. Batch editing applies one look across multiple photos, and it runs on the device rather than server-side — a cloud pipeline would bill per image, which doesn't survive contact with a user processing a large library. Looks turns an editing workflow into a shareable code: the code carries the full recipe, so another user pastes it and reproduces the exact edit. Nothing is uploaded and it resolves offline, which meant designing the code as a self-contained serialised format rather than a pointer to a stored server-side preset.",
      "Rounded out with an in-app camera with live filter preview, subscription tiers and in-app purchases gating Pro features, a rewarded-ad path to unlock a Pro edit once, and a profile section for account and purchase management.",
    ],
    role:
      "Built the application in React Native and Expo — the full editing UI and tooling, the Hugging Face model integration and the free local-edit path, the on-device batch pipeline, the Looks edit-code encode/decode and sharing, the in-app camera, and the subscription and in-app purchase flow.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Expo",
      "Hugging Face API",
      "AI image transformation",
      "On-device batch processing",
      "In-App Purchases",
      "Subscriptions",
      "Rewarded ads",
    ],
    context: "Astapor Technologies",
    year: "2026",
    screenshots: [
      { src: "/projects/lumo-ai-photo-editor/01-studio-home.webp", alt: "Lumo studio home screen with the Just Ask AI entry point and editor shortcut" },
      { src: "/projects/lumo-ai-photo-editor/02-just-ask-ai-prompt.webp", alt: "Just Ask screen: a loaded photo with a natural-language prompt field and free instant quick-edit chips" },
      { src: "/projects/lumo-ai-photo-editor/03-ai-editor-facial-hair-clothing.webp", alt: "AI editor tab offering facial hair transformations and clothing colour changes" },
      { src: "/projects/lumo-ai-photo-editor/04-filters.webp", alt: "Filter tab showing filters suggested for the current photo alongside the full filter set" },
      { src: "/projects/lumo-ai-photo-editor/05-adjust.webp", alt: "Adjust tab with brightness, contrast, saturation and warmth sliders" },
      { src: "/projects/lumo-ai-photo-editor/06-crop.webp", alt: "Crop tab with aspect ratio presets, straighten and orientation controls" },
      { src: "/projects/lumo-ai-photo-editor/07-stickers.webp", alt: "Sticker tab with shape, nature, party and symbol categories" },
      { src: "/projects/lumo-ai-photo-editor/08-text.webp", alt: "Text tab with a caption composited onto the photo" },
      { src: "/projects/lumo-ai-photo-editor/09-frames-pro.webp", alt: "Frame tab showing the Pro upgrade prompt for hand-drawn frames" },
      { src: "/projects/lumo-ai-photo-editor/10-batch-editing.webp", alt: "Batch screen applying a single look across multiple selected photos on-device" },
      { src: "/projects/lumo-ai-photo-editor/11-looks-edit-codes.webp", alt: "Looks screen for pasting a shared edit code and managing saved looks" },
      { src: "/projects/lumo-ai-photo-editor/12-in-app-camera.webp", alt: "In-app camera with live filter preview and timer controls" },
      { src: "/projects/lumo-ai-photo-editor/13-pro-subscription.webp", alt: "Profile and Lumo Pro subscription tiers with restore purchases" },
    ],
    video: null,
    links: {
      // Add the store listing once it's live:
      // playStore: "https://play.google.com/store/apps/details?id=...",
      // appStore: "https://apps.apple.com/app/id...",
    },
    // Not featured. Tapy Aman is the only featured project — one badge carries
    // more weight than two, and Lumo keeps its position at the front of the
    // grid regardless, since order here drives order on the page.
  },
  {
    slug: "pay-it-forward",
    name: "Kindr — Pay It Forward",
    pitch:
      "Community donation app: list what you no longer need, and it reaches the people whose interests actually match it.",
    description: [
      "A give-away marketplace where nothing is for sale. Someone lists an item they're done with; it surfaces in the feeds of people whose chosen categories match it, ranked by how close they are. The point of the category matching is that a donation feed without it is just noise — you see everything and act on nothing.",
      "The full loop is handled in-app: a recipient requests a pickup, the two sides message each other, location gets them to the handover, and afterwards the recipient rates the giver while the lister marks the item completed. Listers get full CRUD over their own posts, and requests carry state (pending, completed) with an expiry so stale ones don't linger.",
      "Two recent additions changed how the app opens. Top Impacts of the Month puts the highest-rated, most active givers on a podium on the home screen — reputation made visible, which is what makes people come back and list again. And guest mode lets someone browse the feed and timeline with no account at all, so the app has something to show before it asks for anything.",
      "Profiles carry a verified badge, a star rating, and running counts of items given and received. Around that sit favourites, in-app messaging, category preferences, and user reporting for moderation.",
    ],
    role:
      "Built the app with one other developer and now own it solo. My work covers the category-matched feed and distance ranking, the request-to-handover flow, ratings and reputation, item CRUD with image upload, phone-based password reset, the Top Impacts of the Month screen, and the guest browsing mode.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Category-matched feed",
      "Geolocation & distance ranking",
      "Ratings & reputation",
      "In-app messaging",
      "Image upload",
      "Guest mode",
      "Phone verification",
    ],
    context: "Astapor",
    year: "2025",
    screenshots: [
      { src: "/projects/pay-it-forward/01-splash.webp", alt: "Kindr splash screen with the Pay it forward tagline" },
      { src: "/projects/pay-it-forward/02-sign-in.webp", alt: "Sign-in screen with email or phone login and a Continue as Guest option" },
      { src: "/projects/pay-it-forward/03-create-account.webp", alt: "Account creation form with name, phone, password and location fields" },
      { src: "/projects/pay-it-forward/04-reset-password.webp", alt: "Password reset by phone number with an SMS reset code" },
      { src: "/projects/pay-it-forward/05-feed-and-top-impacts.webp", alt: "Home feed showing Top Impacts of the Month podium above nearby donated items with category and condition labels" },
      { src: "/projects/pay-it-forward/06-my-posts.webp", alt: "My Posts screen listing the items this user has offered, with location and time posted" },
      { src: "/projects/pay-it-forward/07-my-requests.webp", alt: "My Requests screen showing a pickup request marked Completed with its category and expiry date" },
      { src: "/projects/pay-it-forward/08-profile.webp", alt: "Profile screen with verified badge, star rating, items given and received, and menu for favourites, messages, categories and reported users" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "lantis",
    name: "Lantis — Private Messenger",
    pitch:
      "Encrypted messaging, video calling and an off-device vault — in an app that disguises itself as a utility folder.",
    description: [
      "An encrypted communications and storage app for people who need a conversation to leave nothing behind. Texts are end-to-end encrypted with auto-delete timers the user sets themselves, video calls happen inside the app rather than through the phone's own call log, and reminders prompt the user to clear sensitive media before they forget it's there.",
      "The design decision that shapes the whole build is that nothing sensitive is kept on the device. Photos, videos and documents go to a cloud vault instead of the camera roll, so losing or unlocking the phone doesn't expose anything. That inverts the usual mobile assumption — the local filesystem is the one place the app deliberately does not use — and it puts real weight on the auth path, which is biometric: Face ID or fingerprint, or you don't get in.",
      "It also ships a disguise: the app presents itself as an ordinary tools-and-utilities folder, so its presence on a home screen doesn't announce what it is.",
      "Most recently I added Refer & Earn — a referral link that rewards the sender once the person they invited joins, which is the same install-attribution problem I'd solved before: the code has to survive the trip out to the store and back into a fresh install.",
      "Live on both stores under Silant Comms and in customers' hands. Core development is done; work now comes in as new features and fixes rather than as a build-out.",
    ],
    role:
      "On this from the UI phase through to functionality — I built the interface and then the behaviour behind it: the encrypted messaging and video calling screens, the auto-delete timers, the off-device vault, biometric login, the disguised utility-folder shell, the content reminders, the Refer & Earn referral flow, and in-app purchases.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "End-to-end encryption",
      "In-app video calling",
      "Auto-deleting messages",
      "Off-device cloud vault",
      "Biometric authentication",
      "Referral attribution",
      "In-App Purchases",
    ],
    context: "Astapor",
    year: "2025 – Present",
    /**
     * Deliberately empty. The app blocks screen capture, so there are no
     * screenshots and never will be — see `screenshotNote` below, which
     * replaces the default "coming soon" text on the empty frame.
     */
    screenshots: [],
    screenshotNote: "Screen capture disabled in-app",
    video: null,
    /**
     * Region-neutral App Store URL (no country segment): Apple redirects each
     * visitor to their own storefront.
     */
    links: {
      playStore: "https://play.google.com/store/apps/details?id=lantis.silant.app",
      appStore: "https://apps.apple.com/app/lantis-private-messenger/id1544064910",
    },
  },
  {
    slug: "while-you-slept",
    name: "While You Slept",
    pitch:
      "An overnight tech-news briefing you can read in ninety seconds, narrated in one consistent voice.",
    description: [
      "A recap app for people who hate feeling out of the loop but have no time for the firehose. Overnight the world moves; by morning there's a short stack of cards waiting, written in the voice of a single recurring narrator — declarative, unhurried, faintly smug. Read it over a coffee and you're caught up.",
      "The engineering that matters is the content pipeline, and it runs on a schedule rather than on demand. Articles are pulled every twenty minutes from RSS feeds, the Hacker News API and a news API. A cheap model then clusters duplicate coverage of the same story, tags a category and scores significance — a high-volume pass over everything. Only the stories that survive that cut reach the stronger model, which writes the briefing. Two model tiers doing what each is good at, instead of one expensive model reading everything.",
      "The decision the whole architecture rests on: a briefing is generated once, server-side, and served to every reader. Audio is synthesised once per story and cached, so every listener streams the same file. Personalisation is a filter over the pre-generated pool rather than a separate generation per user — which means the cost of a briefing is the same whether a hundred people read it or a million. Because generation moved server-side into Supabase Edge Functions, the provider keys stopped shipping inside the app bundle too, where a determined user can extract them.",
      "For a news product, provenance is a correctness requirement rather than a nicety: the narration may only use facts from supplied sources, every story carries its source URL, and a story that loses its source doesn't ship. One invented headline would be the end of the product. Around that sit onboarding for interests and drop time, the swipeable card reader, per-story audio, an archive of past briefings, breaking alerts for subscribers, and branded share exports.",
    ],
    role:
      "Built from scratch — the Expo client and the Supabase Edge Function pipeline behind it: scheduled ingestion from RSS, Hacker News and a news API, the two-tier scoring and narration passes, cached audio, scheduled and breaking push delivery, onboarding, the card-stack reader, story detail with audio, the archive, share exports, and the subscription and ad tiers.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native (Expo)",
      "Supabase Edge Functions (Deno)",
      "Scheduled jobs (pg_cron)",
      "Anthropic Claude API",
      "RSS & Hacker News ingestion",
      "Text-to-speech with caching",
      "Expo Push Notifications",
      "RevenueCat",
      "Google AdMob",
    ],
    context: "Raytech Labs",
    year: "2026",
    screenshots: [
      { src: "/projects/while-you-slept/01-cold-open.webp", alt: "Cold open — the wordmark over a single line, You've been missing things" },
      { src: "/projects/while-you-slept/02-interests.webp", alt: "Onboarding step one, choosing interest categories with AI locked on by default" },
      { src: "/projects/while-you-slept/03-cadence.webp", alt: "Onboarding step two, picking daily or weekly cadence and the drop time" },
      { src: "/projects/while-you-slept/04-notifications.webp", alt: "Notification priming screen showing a sample push written in the narrator's voice" },
      { src: "/projects/while-you-slept/05-briefing.webp", alt: "The briefing cover card with the While you slept line typing on, over the card stack" },
      { src: "/projects/while-you-slept/06-story-card.webp", alt: "A story card in the stack with headline, narration, source and a listen action" },
      { src: "/projects/while-you-slept/07-story-detail.webp", alt: "Story detail with the fuller narration, the plain factual basis, an audio scrubber and the source link" },
      { src: "/projects/while-you-slept/08-share.webp", alt: "Share sheet offering story card, front page and video export formats" },
      { src: "/projects/while-you-slept/09-archive.webp", alt: "Archive of past briefings with older entries locked behind premium" },
      { src: "/projects/while-you-slept/10-settings.webp", alt: "Settings with plan, interest toggles, cadence, drop time and timezone" },
      { src: "/projects/while-you-slept/11-paywall.webp", alt: "Premium paywall listing breaking alerts, full archive and ad-free reading" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "settle-it",
    name: "Settle It",
    pitch:
      "Two people submit their side of an argument and a courtroom persona returns a verdict — with a public feed where strangers vote first.",
    description: [
      "A social courtroom app. Two people type or dictate their side of a disagreement, and a recurring judge character delivers a ruling: a winner, an opening statement, the verdict itself, and a severity score for how harshly the case deserved to be treated. It's built to be watched as much as used — the reveal is staged, not just rendered.",
      "The character was the hard constraint. The judge has to read as a persona rather than an assistant: it always picks a side, it never says both parties have a point, and the word \"AI\" appears nowhere in the product. Holding a model to that reliably meant not accepting prose back from it — the verdict comes back as a strict JSON contract with named fields, so the app renders a structured ruling it can animate, score and lay out, instead of parsing a paragraph and hoping.",
      "The half that makes it a habit rather than a toy is the Courthouse: a public feed of submitted cases, sorted by heat, recency or severity. Voting is gated deliberately — you pick a side before the ruling is revealed, which turns a passive scroll into a guess you're invested in. Pull to refresh, paginated infinite scroll.",
      "Around that: speech-to-text so arguments can be dictated rather than typed, a generated voice reading the verdict aloud on reveal, a typewriter reveal and animated severity meter, and capture-to-image share cards styled as an official court document. Free tier is capped and ad-supported; unlimited verdicts and history sit behind a subscription.",
    ],
    role:
      "Built from scratch — the whole Expo app: the two-sided argument entry with speech-to-text, the verdict request and its JSON contract, the animated reveal with voice playback, the Courthouse feed with gated jury voting and pagination, the shareable verdict cards, the Supabase schema behind it all, and the subscription and ad tiers.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native (Expo)",
      "Expo Router",
      "NativeWind",
      "Supabase (Postgres, Auth, Realtime)",
      "Anthropic Claude API",
      "Structured JSON responses",
      "Speech-to-text",
      "Text-to-speech",
      "Reanimated",
      "RevenueCat",
      "Google AdMob",
    ],
    context: "Raytech Labs",
    year: "2026",
    screenshots: [
      { src: "/projects/settle-it/01-splash.webp", alt: "Settle It splash screen with the Let The Judge Decide line" },
      { src: "/projects/settle-it/02-submit-case.webp", alt: "Submit case screen with Side A and Side B argument fields, dictation buttons and the remaining daily verdict count" },
      { src: "/projects/settle-it/03-verdict.webp", alt: "The verdict screen with the winner, the ruling, an animated savage meter and a shareable court-document card" },
      { src: "/projects/settle-it/04-courthouse.webp", alt: "The Courthouse feed sorted by hottest, with vote buttons gating each ruling behind a vote" },
      { src: "/projects/settle-it/05-history.webp", alt: "History screen locked behind premium, listing unlimited verdicts and custom judge modes" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "can-dogs-eat-it",
    name: "Can Dogs Eat It",
    pitch:
      "Look up whether a food is safe for your dog — and get the answer filtered through your own dog's breed, weight and allergies.",
    description: [
      "Every dog owner has stood in a kitchen wondering whether they can hand over the thing in their hand. This app answers that: search a food and get whether it's safe, what it does for a dog, and what to watch out for, drawn from a library of vet-oriented articles organised by category — fruit and vegetables, human food, meat and offal, diets and recipes.",
      "The content lives in WordPress and the app is a native client on top of it, pulling articles through the WordPress REST API rather than shipping a bundled database. That's what lets the editorial team publish without a release: new articles appear in the app the moment they go live on the site.",
      "What makes it more than a searchable article index is the dog profile. An owner enters their dog's name, breed, date of birth, weight, activity level and allergies, and the app filters and ranks its recommendations against that — so the answer for a small dog with a known allergy is not the same generic answer everyone else gets.",
      "The Care section turns the profile into something that reaches out rather than waiting to be opened: articles matched to that specific dog, seasonal advice keyed to local weather (cooling mats surfaced on a 38° day), and dated reminders including the dog's birthday. Notifications are opt-in, with the value spelled out on the request screen instead of a bare system prompt.",
    ],
    role:
      "Built the app: email authentication with password recovery, the onboarding carousel and dog-profile intake, the WordPress REST API content layer, food search with category filtering, the article reader with sharing, the dog-aware recommendation surfaces, the Care feed with weather-driven and date-driven notifications, multi-dog management, and account settings.",
    track: "Product Work",
    platforms: ["Android"],
    tech: [
      "React Native",
      "Headless WordPress (REST API)",
      "Email authentication",
      "Profile-based personalisation",
      "Push notifications",
      "Weather API",
      "Search & category filtering",
    ],
    context: "Balawal IT House",
    year: "2025",
    screenshots: [
      { src: "/projects/can-dogs-eat-it/01-splash.webp", alt: "Can Dogs Eat It splash screen" },
      { src: "/projects/can-dogs-eat-it/02-welcome.webp", alt: "Welcome screen with login and create account options" },
      { src: "/projects/can-dogs-eat-it/03-login.webp", alt: "Email and password login with password recovery and sign-up link" },
      { src: "/projects/can-dogs-eat-it/04-onboarding.webp", alt: "Onboarding carousel explaining that foods can be searched for safety" },
      { src: "/projects/can-dogs-eat-it/05-add-your-dog.webp", alt: "Dog profile intake form with photo, name, gender, date of birth, breed, weight and activity level" },
      { src: "/projects/can-dogs-eat-it/06-home.webp", alt: "Personalised home screen with food search, category tiles and the latest food articles" },
      { src: "/projects/can-dogs-eat-it/07-search.webp", alt: "Food search screen with category filter chips over the article library" },
      { src: "/projects/can-dogs-eat-it/08-article.webp", alt: "Article reader showing a vet-oriented piece on natural mosquito repellents with a share action" },
      { src: "/projects/can-dogs-eat-it/09-care-opt-in.webp", alt: "Notification opt-in screen listing profile-matched articles, care notifications and tailored deals" },
      { src: "/projects/can-dogs-eat-it/10-care.webp", alt: "Care feed with local weather, a seasonal recommendation and notifications including a new article and a dog birthday reminder" },
      { src: "/projects/can-dogs-eat-it/11-my-dogs.webp", alt: "My dogs screen prompting the owner to add a dog profile for tailored advice" },
      { src: "/projects/can-dogs-eat-it/12-profile.webp", alt: "Account settings with profile, password change, website, contact and FAQ links" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "insucalc",
    name: "Insucalc",
    pitch:
      "Point a camera at a meal and get its carbohydrate load — food recognition and nutrition lookup chained into one tap.",
    description: [
      "A carbohydrate tracker for people managing blood sugar. The input is a photo: the user shoots or picks an image of a meal and the app returns what it is and what's in it, rather than asking them to search a food database and guess at a portion.",
      "That single tap is two services chained together. Google Cloud Vision identifies the item from the image, and its label is then sent to an OpenAI model that returns structured nutrition data for that food. Neither service does the job alone — Vision knows it's a boiled egg but not what's in one, and the language model can describe an egg but can't see the photo. The engineering is in the handoff: passing a recognition label into a prompt, getting reliably parseable nutrition back, and handling the cases where the first step returns something the second can't use.",
      "The results feed the rest of the app rather than just being displayed once. Recognised items land in a recently-scanned list and a food log with quantities, and the dashboard tracks blood sugar trends and an HbA1c indicator alongside them. Settings hold the user's weight and height and a carbohydrate-to-insulin ratio, so logged carbs are read against the ratio that person actually uses.",
    ],
    role:
      "Built the app: the camera and gallery input, the Cloud Vision recognition call, the OpenAI nutrition lookup and response parsing, the scan history and food log, the dashboard, and the settings for user data and carb-to-insulin ratio.",
    track: "Product Work",
    platforms: ["Android"],
    tech: [
      "React Native",
      "Google Cloud Vision API",
      "OpenAI API",
      "Image recognition pipeline",
      "Camera & gallery input",
      "Structured response parsing",
    ],
    context: "Balawal IT House",
    year: "2025",
    screenshots: [
      { src: "/projects/insucalc/01-splash.webp", alt: "Insucalc splash screen" },
      { src: "/projects/insucalc/02-image-input.webp", alt: "Image input screen with camera and gallery scan action" },
      { src: "/projects/insucalc/03-scanned-photo.webp", alt: "A photographed plate of boiled eggs submitted for recognition" },
      { src: "/projects/insucalc/04-dashboard.webp", alt: "Dashboard with recently scanned foods, a food log with quantities, blood sugar trends and an HbA1c indicator" },
      { src: "/projects/insucalc/05-settings.webp", alt: "Settings with sync and notification toggles, weight and height, and a carbohydrate to insulin ratio" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "as-cqc",
    name: "A&S CQC — Exam Trainer",
    pitch:
      "Italian-language study app for the CQC professional driver qualification, built around a searchable question bank.",
    description: [
      "An exam preparation app for the Italian CQC (Certificato di Qualificazione del Conducente), the professional driver qualification, covering the freight transport syllabus. The whole interface is in Italian — not a translated shell, but the product's native language, including the question bank itself.",
      "Content is organised the way the syllabus is: chapters, each with stated learning objectives, then the true/false question bank belonging to that chapter. Answers are marked Vero or Falso so a learner can drill and self-check.",
      "The feature that shapes the app is search across the entire question bank rather than within one chapter — type a fragment and it returns every matching question with the matched substring highlighted in place and a live result count. For an exam where candidates half-remember a phrase and need to find the rule it belongs to, that's the difference between a usable trainer and a PDF.",
    ],
    role:
      "Built from scratch — the full application: Italian-language UI throughout, email authentication, the chapter and objectives structure, the true/false question bank, and the cross-chapter search with in-place match highlighting.",
    track: "Client Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Full-text search with highlighting",
      "Italian localisation",
      "Structured question bank",
      "Email authentication",
    ],
    context: "Freelance",
    year: "2025",
    screenshots: [
      { src: "/projects/as-cqc/01-splash.webp", alt: "A and S CQC splash screen" },
      { src: "/projects/as-cqc/02-login.webp", alt: "Italian-language login screen with an option to create an account" },
      { src: "/projects/as-cqc/03-register.webp", alt: "Italian-language registration screen with password confirmation" },
      { src: "/projects/as-cqc/04-chapter-list.webp", alt: "Chapter list for the freight transport syllabus with a search field across all chapters" },
      { src: "/projects/as-cqc/05-search-with-highlighting.webp", alt: "Search results across the whole question bank with matched text highlighted and a live result count" },
      { src: "/projects/as-cqc/06-chapter-objectives.webp", alt: "Chapter detail listing learning objectives and its true/false questions" },
      { src: "/projects/as-cqc/07-true-false-question-bank.webp", alt: "True/false question bank with each statement marked Vero or Falso" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "gaazer",
    name: "Gaazer",
    pitch:
      "A marketplace where photographers list work for bidding, then track approvals, sales and payouts.",
    description: [
      "A two-sided marketplace for photography and digital artwork. Creators upload from camera or gallery, their work goes through an approval step, and listings run as timed auctions — each item shows the current or final bid and a countdown. Buyers bid; creators watch the outcome in a feed of approval, rejection and sale notifications.",
      "The money side is the substantial part. An Earnings screen splits the balance into approved, pending and paid, applies the platform's revenue split, and drives a withdrawal request flow with a full payout history. That means the app has to keep a client-side view of financial state that stays consistent with the backend across bid closures, approvals and withdrawals — the kind of thing where a stale cache turns into a support ticket about missing money.",
      "Also includes Google and Apple sign-in, a Pro membership upsell during onboarding, in-app chat between users, and an account area covering photo management, withdrawals, rewards and account settings.",
    ],
    role:
      "Built from scratch — the full client application: onboarding and Google/Apple sign-in, the upload and approval flow, the timed bidding listings, the earnings and withdrawal screens, in-app chat, notifications, and the account area.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Timed bidding / auctions",
      "Payouts & withdrawals",
      "In-app chat",
      "Push notifications",
      "Google Sign-In",
      "Apple Sign-In",
    ],
    context: "Balawal IT House",
    year: "2024",
    screenshots: [
      { src: "/projects/gaazer/01-splash.webp", alt: "Gaazer splash screen" },
      { src: "/projects/gaazer/02-welcome-social-sign-in.webp", alt: "Welcome screen with account creation, login, and Google and Apple sign-in" },
      { src: "/projects/gaazer/03-onboarding.webp", alt: "Onboarding screen introducing the creator community" },
      { src: "/projects/gaazer/04-membership-welcome.webp", alt: "Post-signup screen offering Pro membership" },
      { src: "/projects/gaazer/05-marketplace-home.webp", alt: "Marketplace home with sold, upload and pending tabs over a grid of listings showing final bids" },
      { src: "/projects/gaazer/06-upload.webp", alt: "Upload sheet offering camera or gallery as the source" },
      { src: "/projects/gaazer/07-earnings-and-withdrawal.webp", alt: "Earnings screen splitting the balance into approved, pending and paid, with a payout list" },
      { src: "/projects/gaazer/08-creator-profile.webp", alt: "Creator profile with photo and video tabs and listings showing bids and countdown timers" },
      { src: "/projects/gaazer/09-account-menu.webp", alt: "Account menu covering photo management, money withdrawal, rewards and settings" },
      { src: "/projects/gaazer/10-notifications.webp", alt: "Notification feed of photo approvals, rejections and sales" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "isfit",
    name: "IsFit",
    pitch:
      "Fitness app pairing AI-personalised workout routines with a community feed and video leaderboard.",
    description: [
      "A workout app built around two ideas that usually live in separate products: structured training and social competition. Users build or generate routines, run them with a live session timer, and can resume or discard a workout left in progress — a small piece of state that has to survive the app being backgrounded or killed mid-set.",
      "Routines are generated from a short preference questionnaire rather than picked off a static list, so the onboarding feeds an AI-assisted recommendation step that produces the initial plan.",
      "The social half is a feed of member-posted workout clips with up and down voting, and a leaderboard that ranks members by upvotes across Overall and per-Exercise views with weekly, monthly, yearly and all-time windows. Members enter by uploading a video — so the ranking is driven by peer voting on real submissions rather than self-reported numbers.",
      "Auth covers email signup with profile creation plus Google and Apple sign-in.",
    ],
    role:
      "Built from scratch — the full client application: onboarding and Google/Apple sign-in, account creation, the routine builder and live workout session with resumable state, the AI-assisted personalisation step, the community feed with voting, the video leaderboard, and profiles.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "AI-assisted routine generation",
      "Video upload",
      "Voting & leaderboards",
      "Session state persistence",
      "Google Sign-In",
      "Apple Sign-In",
    ],
    context: "Balawal IT House",
    year: "2024",
    screenshots: [
      { src: "/projects/isfit/01-splash.webp", alt: "IsFit splash screen" },
      { src: "/projects/isfit/02-welcome-social-sign-in.webp", alt: "Welcome screen with account creation, login, and Google and Apple sign-in" },
      { src: "/projects/isfit/03-onboarding-discover-workouts.webp", alt: "Onboarding carousel introducing the workout library" },
      { src: "/projects/isfit/04-create-account.webp", alt: "Account creation form with photo upload, name, email, phone and country" },
      { src: "/projects/isfit/05-secure-account-and-personalise.webp", alt: "Password step followed by the prompt to personalise the workout routine" },
      { src: "/projects/isfit/06-workout-routines.webp", alt: "Workout tab listing saved routines with a resume-or-discard prompt for a session in progress" },
      { src: "/projects/isfit/07-community-feed.webp", alt: "Community feed of member workout posts with up and down voting" },
      { src: "/projects/isfit/08-leaderboard.webp", alt: "Leaderboard ranking members by upvotes with overall and per-exercise views and time filters" },
      { src: "/projects/isfit/09-profile.webp", alt: "Member profile with workout count, followers, leaderboard placing and a media grid" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "my-order",
    name: "My Order — Sales Staff App",
    pitch:
      "Field-sales companion app: reps sign restaurants onto the platform and track their commission.",
    description: [
      "The internal half of a restaurant ordering platform. Where the client app serves restaurants, this one serves the sales team that recruits them: a rep signs up a venue on the spot, capturing name, type, location, phone and email, and it appears in their roster immediately.",
      "Earnings are the centre of the app. A dashboard reports total commission, commission rate, lifetime commission count and restaurants recruited, with a weekly bar breakdown and a period selector — so a rep can see which days are actually converting rather than waiting for a monthly statement.",
      "A deliberately narrow app. Two tabs, one job: sign venues up and see what you earned. That constraint is the point — field staff use it standing in a restaurant doorway, not at a desk.",
    ],
    role:
      "Built from scratch — the full sales-rep application: authentication, the restaurant sign-up flow with location capture, the commission dashboard and its weekly breakdown chart, and the recruited-restaurant roster.",
    track: "Product Work",
    platforms: ["iOS", "Android"],
    tech: [
      "React Native",
      "Charts & data visualisation",
      "Location capture",
      "Commission tracking",
      "Form validation",
    ],
    context: "Balawal IT House",
    year: "2023",
    screenshots: [
      { src: "/projects/my-order/01-splash.webp", alt: "My Order sales staff app splash screen" },
      { src: "/projects/my-order/02-login.webp", alt: "Login screen with remember me and password recovery" },
      { src: "/projects/my-order/03-signup.webp", alt: "Signup screen with password confirmation and terms acceptance" },
      { src: "/projects/my-order/04-companion-client-app.webp", alt: "Onboarding screen introducing the companion client app used by restaurants" },
      { src: "/projects/my-order/05-commission-dashboard.webp", alt: "Commission dashboard with totals, commission rate, restaurants recruited and a weekly bar breakdown" },
      { src: "/projects/my-order/06-restaurant-list.webp", alt: "List of restaurants the rep has signed up, with dates" },
      { src: "/projects/my-order/07-add-restaurant.webp", alt: "Add restaurant form capturing name, type, location, phone and email" },
    ],
    video: null,
    links: {},
  },
  {
    slug: "restaurant-pos",
    name: "Restaurant POS System",
    pitch:
      "Full-stack point-of-sale — React Native apps for phone and tablet, Laravel API, and a web admin dashboard.",
    description: [
      "A point-of-sale system for restaurants covering the whole operation: taking orders on phone or tablet, tracking inventory as items sell, and managing menu, stock and staff from a web dashboard.",
      "I was the only developer on it, which meant designing the data model before writing a line of UI. The MySQL schema covers orders, line items, menu items, inventory and staff accounts, with migrations and Eloquent models on top. The Laravel side exposes the REST API the apps consume and holds the business logic — order state transitions, stock decrements, totals. Auth is role-based, separating what waiting staff, managers and admins can each reach, because a POS where anyone can void a bill or edit prices is a liability.",
      "The client-side had to work on two very different form factors from one codebase: a phone for table-side ordering and a tablet for the counter. Both are React Native, built from Figma designs.",
    ],
    role:
      "Sole developer, full stack. Designed the MySQL schema and migrations, built the Laravel REST API and business logic, implemented role-based auth and permissions, built the web admin dashboard, and built the React Native phone and tablet apps.",
    track: "Product Work",
    platforms: ["iOS", "Android", "Tablet", "Web"],
    tech: [
      "React Native",
      "PHP",
      "Laravel",
      "MySQL",
      "REST API design",
      "Role-based auth",
      "Figma",
    ],
    context: "Astapor Technologies",
    year: "2025",
    screenshots: [],
    video: null,
    links: {},
  },

];

/* --------------------------------------------------------------------------
 *  SPLITTING THE SECTION INTO GROUPS
 * --------------------------------------------------------------------------
 *  Right now every project renders in one grid. To break it into "Product Work"
 *  and "Client Work" headings, group by `track` in
 *  src/components/sections/projects.tsx — the data already carries it:
 *
 *    const tracks: WorkTrack[] = ["Product Work", "Client Work", "Personal"];
 *    tracks
 *      .map((tr) => ({ tr, items: projects.filter((p) => p.track === tr) }))
 *      .filter((g) => g.items.length > 0)
 *      .map((g) => ( <><h3>{g.tr}</h3><Grid items={g.items} /></> ));
 *
 *  Worth doing once there are two or three projects in each track — with one
 *  freelance project it just makes the page look thin.
 * ------------------------------------------------------------------------- */
