# Muhammad Shaban — Portfolio

Dark-mode-first developer portfolio. Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · React Three Fiber.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm start    # production build
```

Node 20+ required.

> The first `npm run build` needs internet access — `next/font` downloads Inter and
> Space Grotesk from Google Fonts once, then self-hosts them in the build. No
> runtime request to Google, so no layout shift and no third-party dependency in
> production.

---

## Add a project — the only file you need to touch

Everything in the Projects section is driven by **`src/data/projects.ts`**.

**1. Add screenshots.** Drop raw phone screenshots (no need to frame them — the
app wraps each in an Android device mockup):

```
public/projects/my-app/01.png
public/projects/my-app/02.png
```

**2. Add the entry.** Copy the `TEMPLATE` comment block at the top of
`projects.ts` into the `projects` array and fill it in:

```ts
{
  slug: "my-app",
  name: "My App",
  pitch: "One line — what it does and who it's for.",
  description: ["What it is.", "The hard technical part."],
  role: "Built from scratch — architecture, all screens, Firebase, store release.",
  track: "Product Work",   // or "Client Work" / "Personal"
  platforms: ["iOS", "Android"],
  tech: ["React Native (Expo)", "Firebase", "RevenueCat"],
  context: "Astapor Technologies",
  year: "2025",
  screenshots: [
    { src: "/projects/my-app/01.png", alt: "Onboarding screen" },
    { src: "/projects/my-app/02.png", alt: "Home feed" },
  ],
  video: null,
  links: { playStore: "https://play.google.com/store/apps/details?id=..." },
  featured: true,
}
```

Anything left as `[ADD ...]` shows an amber **"Needs content"** badge on the card,
so unfinished entries are obvious in the page itself rather than shipping silently.

### Work tracks (no filter pills)

Each project carries a `track`: `"Product Work"` (built inside a company's
product team), `"Client Work"` (freelance, direct clients), or `"Personal"`.

It is **not** rendered as a badge. The old "From Scratch" / "Client Work" pills
were removed because every project was both — the labels split nothing, so they
were decoration a reader couldn't act on.

`track` exists so the section can be broken into headed groups later. The
grouping snippet is in a comment at the bottom of `projects.ts`; worth switching
on once there are two or three projects in each track, since one freelance entry
under its own heading just makes the page look thin.

### Demo videos

The player slot is already built and reserved, so adding footage later changes no
layout:

1. Put the file at `public/projects/my-app/demo.mp4`
2. Set `video: "/projects/my-app/demo.mp4"`

It uses `preload="none"`, so no bytes are fetched until a visitor hits play, and
the first screenshot becomes the poster frame.

**Cutting one long recording into per-project clips** — use exact timestamps
rather than eyeballing boundaries:

```bash
# 0:00–0:45 → project A
ffmpeg -ss 00:00:00 -to 00:00:45 -i all-demos.mp4 -c copy public/projects/app-a/demo.mp4
# 0:45–1:30 → project B
ffmpeg -ss 00:00:45 -to 00:01:30 -i all-demos.mp4 -c copy public/projects/app-b/demo.mp4
```

`-c copy` is instant (no re-encode) but cuts on keyframes. If a clip starts a
beat late, drop `-c copy` to re-encode precisely.

---

## Edit the rest of the content

| What | File |
|---|---|
| Name, headline, pitch, bio, stats, contact links, availability | `src/data/profile.ts` |
| Skill groups and which items are highlighted | `src/data/skills.ts` |
| Work history, education, certifications | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Colours, fonts, glass/gradient tokens | `src/app/globals.css` (`@theme` block) |

No content is hardcoded in components.

### Things worth filling in

- **`profile.stats`** has one `[ADD METRIC HERE]` — the number of apps you've
  shipped to stores. It renders in amber until you replace it. Use a real number
  or delete the entry.
- **`certifications`** in `experience.ts` is an empty array. Add entries and the
  cards appear automatically.
- **`profile.links.calendar`** is empty. Paste a Calendly/Cal.com URL and a
  "Book a call" card appears in Contact.
- **`SITE_URL`** in `src/app/layout.tsx` — set this to your real domain after
  deploying, or OG/social previews break.

### Replacing the CV

Overwrite `public/resume/Muhammad-Shaban-CV.pdf`, keeping the filename (or update
`profile.links.resume`).

The PDF in `public/resume/` and the site both say **3+ years** — keep them in sync
if you edit either, since a recruiter downloads that PDF from this page.

The editable master is the `.docx`; re-export the PDF from it rather than editing
the PDF directly.

---

## The contact form

It composes a `mailto:` link and hands off to the visitor's mail client.

That's deliberate: a form that shows "Message sent!" with no mail provider wired
up silently loses enquiries, which is the worst possible failure on a page whose
whole job is starting a conversation. This always works and needs no secrets.

**To make it submit in-page instead**, add [Resend](https://resend.com):

```bash
npm install resend
```

`src/app/api/contact/route.ts`:

```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  await resend.emails.send({
    from: "portfolio@yourdomain.com",   // must be a verified domain
    to: "shabanshabi79@gmail.com",
    replyTo: email,
    subject: `Portfolio enquiry from ${name}`,
    text: message,
  });
  return Response.json({ ok: true });
}
```

Then swap `onSubmit` in `src/components/sections/contact.tsx` to `fetch("/api/contact", …)`
and add success/error states. Add rate limiting before going live — an open mail
endpoint gets abused.

---

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new).
Zero config needed. Then:

1. Set `SITE_URL` in `src/app/layout.tsx` to the live domain and redeploy
2. Check the OG card at [opengraph.xyz](https://www.opengraph.xyz)

Favicon and the social share image are **generated at build time** from your data
(`src/app/icon.tsx`, `src/app/opengraph-image.tsx`) — no image assets to maintain,
and they can't drift out of date.

---

## Notes on how it's built

**One gradient, used everywhere.** Violet → cyan (`--color-violet-bright` →
`--color-cyan-accent`) on headline accents, buttons, borders, glows and the active
nav indicator. Emerald (`--color-signal`) is reserved for exactly three things:
the availability dot, "Live" badges, and outcome metrics. Adding a fourth accent
colour is what makes a dark portfolio look like a template.

**The hero WebGL layer is optional by design.** `HeroBackdrop` renders the
gradient mesh and grid unconditionally; the particle field only mounts when the
viewport is ≥768px, WebGL is actually available, the browser isn't reporting
data-saver, and the user hasn't asked for reduced motion. It's dynamically
imported (`ssr: false`) and deferred past first paint, so three.js never blocks
the headline. drei's `PerformanceMonitor` drops DPR if frames slip, and an
IntersectionObserver unmounts the whole canvas once the hero scrolls away.

A scrim sits between the canvas and the copy — dark on the left, clear on the
right. Without it the particles wash over the body text.

**Motion is restrained on purpose.** Reveals travel 18px over 0.55s. Card tilt
caps at 7°. Magnetic buttons drift at most 12px. Every motion component checks
`useReducedMotion()` and returns a static node, and `globals.css` kills animation
under `prefers-reduced-motion` as a backstop.

**Phone frames are pure CSS** (`src/components/projects/phone-mockup.tsx`) —
aluminium rail, thin symmetric bezel, centred punch-hole camera, side buttons,
ambient glow, floor reflection. No device-frame library, no PNG overlays. One
`size` prop drives all geometry, so every gallery across every project matches.

The frame is **Android**, not iPhone, and that's deliberate: the screenshots are
Android captures at 1080x2412. An iPhone frame drew a wide Dynamic Island pill
across the top of each image, landing on the screenshot's own status bar — two
status bars fighting, clock and signal icons half-covered. The Android punch-hole
sits in the empty middle of the status bar where the real cutout falls. The frame
aspect ratio is 2412/1080, taken from the source files, so images fit with no crop.

If you ever add iOS screenshots, give `PhoneMockup` a `platform` prop rather than
swapping the shape globally — a gallery mixing both frame styles looks broken.

**Accessibility.** Skip link, visible cyan focus rings, `aria-current` on the
active nav item, labelled form fields, `aria-label` on every icon-only control,
decorative layers marked `aria-hidden`, and Radix handling focus trap and Escape
in the project dialog. The screenshot carousel uses native CSS scroll-snap, so
keyboard and touch scrolling work without JS.

### A Tailwind 4 gotcha worth knowing

Don't name a colour token after a font-size step. A token called `--color-base`
makes `text-base` resolve as a *colour* utility, which silently overrode
`text-amber-300/90` to near-black on a near-black background. The background
tokens are named `--color-night*` for that reason. Same trap applies to `sm`,
`lg`, `xl`.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx            # metadata, fonts, JSON-LD Person schema
│   ├── page.tsx              # section order
│   ├── globals.css           # design tokens + utilities
│   ├── icon.tsx              # generated favicon
│   └── opengraph-image.tsx   # generated social card
├── components/
│   ├── hero/                 # backdrop gating + R3F particle field
│   ├── layout/               # nav (active-section observer), footer
│   ├── projects/             # phone mockup, carousel, card, dialog, video slot
│   ├── sections/             # one file per page section
│   ├── shared/               # reveal, spotlight, tilt, magnetic, section shell
│   └── ui/                   # re-skinned shadcn primitives + brand icons
├── data/                     # all content lives here
└── lib/utils.ts
```

Brand icons (GitHub, LinkedIn, App Store, Google Play) are local inline SVGs in
`src/components/ui/brand-icons.tsx` — lucide-react v1 removed its brand set, and
its `Apple` export is the fruit, not the logo.
