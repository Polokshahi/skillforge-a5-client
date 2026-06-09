"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<{
    name: string;
    bio?: string;
    avatar?: string;
  }>();

  useEffect(() => {
    api.get("/auth/profile").then((res) => {
      reset(res.data.data);
      setUser(res.data.data);
    });
  }, [reset, setUser]);

  const onSubmit = async (data: { name: string; bio?: string; avatar?: string }) => {
    setLoading(true);
    try {
      const res = await api.patch("/auth/profile", data);
      setUser(res.data.data);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-2xl font-bold">Profile Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <p className="text-sm text-zinc-500">{user?.email}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Name" {...register("name")} />
            <Input placeholder="Bio" {...register("bio")} />
            <Input placeholder="Avatar URL" {...register("avatar")} />
            <Button type="submit" variant="gradient" disabled={loading}>
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
