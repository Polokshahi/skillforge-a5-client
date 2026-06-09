"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <Sparkles className="h-4 w-4" />
            New courses added weekly
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Master In-Demand Skills with{" "}
            <span className="gradient-text">SkillForge Academy</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl">
            Learn from industry experts. Build real projects. Advance your career with
            premium courses in web development, data science, design, and more.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/courses">
              <Button variant="gradient" size="lg">
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                <Play className="h-5 w-5" />
                Start Free Today
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 text-sm text-zinc-500">
            <div>
              <span className="block text-2xl font-bold text-white">50+</span>
              Premium Courses
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">12k+</span>
              Active Students
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">4.9</span>
              Average Rating
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
