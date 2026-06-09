"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We will get back to you soon.");
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <p className="text-sm text-zinc-400">Have questions? We would love to hear from you.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" required />
            <Input placeholder="Email" type="email" required />
            <textarea
              className="w-full min-h-[120px] rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm"
              placeholder="Message"
              required
            />
            <Button type="submit" variant="gradient" className="w-full">
              Send Message
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
