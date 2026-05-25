"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  CONTACT_EMAIL,
  initialContactForm,
  inquiryOptions,
  testimonials,
} from "@/data/contact";
import { deliverContactMessage } from "@/lib/contact";
import { container, item, sectionViewport } from "@/lib/motion";
import {
  inputClassName,
  sectionClassName,
  sectionEyebrowClassName,
  sectionTitleClassName,
} from "@/lib/styles";
import type { ContactFormData, Testimonial } from "@/types/portfolio";

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5`} role="img">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1 w-1 rounded-full bg-accent/70"
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ entry }: { entry: Testimonial }) {
  return (
    <motion.blockquote
      variants={item}
      initial={false}
      className="group rounded-2xl border border-border bg-[var(--card)] p-5 transition-all duration-500 hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-24px_var(--accent-glow)] sm:p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--elevated)] text-xs font-semibold tracking-wide text-accent/90"
            aria-hidden
          >
            {entry.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {entry.name}
            </p>
            <p className="text-xs text-muted">
              {entry.role} · {entry.company}
            </p>
          </div>
        </div>
        <StarRating />
      </div>
      <p className="text-sm leading-relaxed text-muted">
        &ldquo;{entry.quote}&rdquo;
      </p>
    </motion.blockquote>
  );
}

function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialContactForm);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const updateField = <K extends keyof ContactFormData>(
    key: K,
    value: ContactFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage(null);
    }
  };

  const isValid =
    form.fullName.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.message.trim().length >= 10;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValid || status === "loading") return;

    setStatus("loading");
    setErrorMessage(null);

    try {
      await new Promise((r) => setTimeout(r, 600));
      await deliverContactMessage(form);
      setStatus("success");
      setForm(initialContactForm);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  };

  return (
    <motion.div
      variants={item}
      initial={false}
      className="relative overflow-hidden rounded-2xl border border-border bg-[var(--card)] p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_0%_0%,var(--accent-glow),transparent_55%)]"
        aria-hidden
      />

      <div className="mb-6 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-[var(--elevated)] text-accent/90">
          <Mail className="size-4" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            Send a message
          </h3>
          <p className="mt-1 text-sm text-muted">
            Submissions open your email client addressed to me—like writing
            directly, without a middle layer.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-[var(--accent-muted)] text-accent">
            <CheckCircle2 className="size-7" aria-hidden />
          </div>
          <p className="text-lg font-semibold text-foreground">Ready to send</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Your email app should open with the message pre-filled. If it
            didn&apos;t, you can reach me at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent/90 underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-6"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-name"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Full name <span className="text-accent/80">*</span>
              </label>
              <input
                id="contact-name"
                name="fullName"
                type="text"
                required
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                placeholder="Your name"
                className={inputClassName}
                disabled={status === "loading"}
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="contact-email"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Email <span className="text-accent/80">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@company.com"
                className={inputClassName}
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label
                htmlFor="contact-company"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Company / organization
              </label>
              <input
                id="contact-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="Optional"
                className={inputClassName}
                disabled={status === "loading"}
              />
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="contact-inquiry"
                className="text-xs font-medium tracking-wide text-muted"
              >
                Inquiry type
              </label>
              <select
                id="contact-inquiry"
                name="inquiryType"
                value={form.inquiryType}
                onChange={(e) => updateField("inquiryType", e.target.value)}
                className={`${inputClassName} cursor-pointer appearance-none bg-[var(--elevated)]`}
                disabled={status === "loading"}
              >
                {inquiryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-subject"
              className="text-xs font-medium tracking-wide text-muted"
            >
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(e) => updateField("subject", e.target.value)}
              placeholder="What would you like to discuss?"
              className={inputClassName}
              disabled={status === "loading"}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="contact-message"
              className="text-xs font-medium tracking-wide text-muted"
            >
              Message <span className="text-accent/80">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              placeholder="Share context about the role, project, or collaboration..."
              className={`${inputClassName} resize-y min-h-[120px]`}
              disabled={status === "loading"}
            />
          </div>

          {status === "error" && errorMessage && (
            <p className="text-sm text-red-400/90" role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={!isValid || status === "loading"}
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Sending...
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden />
                Send message
              </>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className={sectionClassName}
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,var(--accent-glow),transparent_55%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={container}
          initial={false}
          whileInView="show"
          viewport={sectionViewport}
          className="mb-12 max-w-2xl lg:mb-14"
        >
          <motion.p variants={item} className={sectionEyebrowClassName}>
            Contact
          </motion.p>
          <motion.h2
            id="contact-heading"
            variants={item}
            className={sectionTitleClassName}
          >
            Let&apos;s build something meaningful
          </motion.h2>
          <motion.p
            variants={item}
            className="text-base leading-relaxed text-muted md:text-lg"
          >
            Open to internships, collaborations, and thoughtful conversations
            with recruiters, teams, and clients. Reach out—I typically respond
            within a few business days.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <motion.div
            variants={container}
            initial={false}
            whileInView="show"
            viewport={sectionViewport}
          >
            <ContactForm />
            <motion.p
              variants={item}
              className="mt-4 text-center text-xs text-muted-deep sm:text-left"
            >
              Prefer email directly?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent/90 underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial={false}
            whileInView="show"
            viewport={sectionViewport}
            className="flex flex-col"
          >
            <motion.div variants={item} className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                What others say
              </h3>
              <p className="mt-1 text-sm text-muted">
                Impressions from collaboration, client work, and peer feedback.
              </p>
            </motion.div>
            <div className="flex flex-col gap-4">
              {testimonials.map((entry) => (
                <TestimonialCard key={entry.id} entry={entry} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
