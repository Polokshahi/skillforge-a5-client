"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Emily Rodriguez",
    role: "Frontend Developer",
    content:
      "SkillForge transformed my career. The Next.js course gave me the confidence to land my dream job.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Data Analyst",
    content:
      "The Python Data Science bootcamp is incredibly practical. Real projects, not just theory.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "UX Designer",
    content:
      "Beautiful platform, expert instructors, and lifetime access. Best investment I've made in learning.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[var(--color-card)]/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl">What Students Say</h2>
          <p className="mt-4 text-zinc-400">Join thousands of satisfied learners</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-indigo-500/50 mb-4" />
                  <p className="text-zinc-300 mb-4">&ldquo;{t.content}&rdquo;</p>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-zinc-500">{t.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
