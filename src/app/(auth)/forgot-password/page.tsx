"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({ email: z.string().email() });

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", data);
      toast.success(res.data.message);
      if (res.data.data?.resetToken) {
        toast.info(`Dev reset token: ${res.data.data.resetToken}`, { duration: 10000 });
      }
    } catch {
      toast.error("Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <p className="text-sm text-zinc-400">We will send reset instructions to your email</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" type="email" {...register("email")} />
            <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
              Send Reset Link
            </Button>
          </form>
          <Link href="/reset-password" className="block text-center text-sm text-indigo-400 mt-4">
            Have a token? Reset password
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
