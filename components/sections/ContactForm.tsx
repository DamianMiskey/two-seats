"use client";

import { useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const interestOptions = [
  "Website Audit & Recommendation Packages",
  "Website Care & Security Packages",
  "Website Improvements & Enhancements",
  "Cybersecurity for Small Businesses",
  "General Website Advice & Support",
];

const inputClasses =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink/40 transition focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/40";

type ContactFormProps = {
  contactEmail: string;
};

export function ContactForm({ contactEmail }: ContactFormProps) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleInterest(option: string) {
    setInterests((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = `Website enquiry from ${name || "your website"}`;
    const bodyLines = [
      business ? `Business: ${business}` : null,
      email ? `Email: ${email}` : null,
      phone ? `Phone: ${phone}` : null,
      interests.length ? `Interested in: ${interests.join(", ")}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines)}`;
    window.location.href = mailto;
  }

  return (
    <Card tone="light" className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-ink">Your name</span>
            <input
              required
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClasses}
              placeholder="Jane Smith"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-ink">Business name</span>
            <input
              type="text"
              value={business}
              onChange={(event) => setBusiness(event.target.value)}
              className={inputClasses}
              placeholder="Your business"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClasses}
              placeholder="you@business.co.za"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-ink">
              Phone <span className="font-normal text-ink/50">(optional)</span>
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={inputClasses}
              placeholder="082 000 0000"
            />
          </label>
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="text-sm font-semibold text-ink">
            How can we help?
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {interestOptions.map((option) => (
              <label
                key={option}
                className="flex items-start gap-2.5 text-sm leading-6 text-ink/80"
              >
                <input
                  type="checkbox"
                  checked={interests.includes(option)}
                  onChange={() => toggleInterest(option)}
                  className="mt-1 h-4 w-4 shrink-0 accent-emerald"
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-ink">
            Tell us a little about your business
          </span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={5}
            className={`${inputClasses} resize-none`}
            placeholder="You don't need a detailed brief or all the answers — just a starting point."
          />
        </label>

        <Button type="submit" variant="primary" className="w-fit">
          Send enquiry
        </Button>
      </form>
    </Card>
  );
}
