import Link from "next/link";
import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <GraduationCap className="h-7 w-7 text-indigo-400" />
              <span className="gradient-text">SkillForge Academy</span>
            </Link>
            <p className="text-sm text-zinc-400 max-w-md">
              Empowering learners worldwide with premium courses taught by industry experts.
              Build skills that matter for your career.
            </p>
            <div className="flex gap-4 mt-4">
              <Github className="h-5 w-5 text-zinc-500 hover:text-indigo-400 cursor-pointer" />
              <Twitter className="h-5 w-5 text-zinc-500 hover:text-indigo-400 cursor-pointer" />
              <Linkedin className="h-5 w-5 text-zinc-500 hover:text-indigo-400 cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/courses" className="hover:text-indigo-400">Courses</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400">About</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-400">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li><Link href="/login" className="hover:text-indigo-400">Login</Link></li>
              <li><Link href="/register" className="hover:text-indigo-400">Register</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[var(--color-border)] text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} SkillForge Academy. Built for educational purposes.
        </div>
      </div>
    </footer>
  );
}
