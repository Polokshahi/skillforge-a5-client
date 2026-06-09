"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I enroll in a course?",
    a: "Browse our catalog, select a course, and complete checkout via secure Stripe payment. You'll get instant access to all lessons.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes! Complete all lessons and reach 100% progress to earn a certificate of completion for each course.",
  },
  {
    q: "Can I access courses on mobile?",
    a: "Absolutely. SkillForge is fully responsive and works on phones, tablets, and desktops.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 7-day money-back guarantee if you're not satisfied with your purchase.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[var(--color-card)]/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden"
            >
              <button
                className="flex w-full items-center justify-between p-4 text-left font-medium"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p className="px-4 pb-4 text-sm text-zinc-400">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
