"use client";

import * as React from "react";
import { ArrowUpRight, Calendar, Check, Copy, Mail, Phone, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Magnetic } from "@/components/shared/magnetic";
import { profile } from "@/data/profile";

/**
 * The form composes a mailto: link and hands off to the visitor's mail client.
 *
 * Why not POST to an API route: a form that shows "Message sent!" without a
 * mail provider configured is a form that silently loses enquiries — the worst
 * possible bug on a page whose entire job is starting a conversation. This
 * always works, needs no secrets, and the visitor sees their own message leave.
 * README.md documents swapping in Resend when you want a true in-page submit.
 */
export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", message: "" });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.links.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the mailto link below still works */
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name || "someone"}`;
    const body = `${form.message}\n\n—\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${profile.links.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: profile.links.email,
      href: `mailto:${profile.links.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.links.phone,
      href: profile.links.phoneHref,
    },
    {
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: "muhammad-shaban",
      href: profile.links.linkedin,
    },
    {
      icon: GithubIcon,
      label: "GitHub",
      value: "beingshaban79",
      href: profile.links.github,
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build"
        accent="something"
        description="Hiring, contracting, or just want to compare notes on React Native — either way, the fastest route is email."
      />

      {/* [&>*]:min-w-0 — grid items are min-width:auto by default, which stopped
          the nowrap email address from shrinking and overflowed the page at 320px. */}
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] [&>*]:min-w-0">
        {/* Form */}
        <Reveal>
          <SpotlightCard className="p-6 md:p-8">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="What are you building?"
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Button type="submit" variant="gradient" size="lg">
                    <Send className="size-4" />
                    Send message
                  </Button>
                </Magnetic>
                <p className="text-xs text-ink-faint">
                  Opens your email app with the message ready to send.
                </p>
              </div>
            </form>
          </SpotlightCard>
        </Reveal>

        {/* Direct channels */}
        <Reveal delay={0.08}>
          <div className="flex h-full flex-col gap-4">
            <SpotlightCard className="p-6">
              <p className="mb-5 text-sm text-ink-muted">
                Or reach me directly:
              </p>
              <ul className="space-y-1">
                {channels.map(({ icon: Icon, label, value, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                      className="group flex items-center gap-3.5 rounded-xl px-2 py-3 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-edge bg-white/[0.04]">
                        <Icon className="size-4 text-ink-muted" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs uppercase tracking-[0.14em] text-ink-faint">
                          {label}
                        </span>
                        <span className="block truncate text-[0.9375rem] text-ink">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                    </a>
                  </li>
                ))}
              </ul>

              <Button
                type="button"
                onClick={copyEmail}
                variant="glass"
                size="sm"
                className="mt-5 w-full"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-signal" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy email address
                  </>
                )}
              </Button>
            </SpotlightCard>

            {profile.links.calendar && (
              <SpotlightCard className="p-6">
                <h3 className="font-display text-base font-semibold text-ink">
                  Prefer to talk?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Grab a slot that suits you.
                </p>
                <ButtonLink
                  href={profile.links.calendar}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  <Calendar className="size-4" />
                  Book a call
                </ButtonLink>
              </SpotlightCard>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
