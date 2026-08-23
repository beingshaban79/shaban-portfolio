import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { navItems, profile } from "@/data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: LinkedinIcon, href: profile.links.linkedin, label: "LinkedIn" },
    { icon: GithubIcon, href: profile.links.github, label: "GitHub" },
    { icon: Mail, href: `mailto:${profile.links.email}`, label: "Email" },
  ];

  return (
    <footer className="relative border-t border-edge">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-px accent-gradient opacity-40"
      />

      <div className="section-shell py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a
              href="#home"
              className="flex items-center gap-2.5 font-display text-base font-semibold"
            >
              <span className="grid size-8 place-items-center rounded-lg accent-gradient text-xs font-bold text-white">
                MS
              </span>
              {profile.name}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-faint">
              {profile.role} · {profile.specialism}
              <br />
              {profile.location}
            </p>
          </div>

          <nav aria-label="Footer" className="min-w-40">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Navigate
            </h2>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-6 md:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Elsewhere
            </h2>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-edge text-ink-muted transition-all duration-300 hover:border-violet-bright/50 hover:text-ink"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-edge pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-faint">
            © {year} {profile.name}. Built with Next.js, Tailwind CSS and Framer
            Motion.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-ink"
          >
            Back to top
            <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
