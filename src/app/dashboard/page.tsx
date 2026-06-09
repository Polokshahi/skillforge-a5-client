"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, TrendingUp } from "lucide-react";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Enrollment } from "@/types";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    api.get("/enrollments/my-enrollments").then((res) => setEnrollments(res.data.data));
  }, []);

  const avgProgress =
    enrollments.length > 0
      ? enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length
      : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-zinc-400">Continue your learning journey</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{enrollments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" /> Avg Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgProgress.toFixed(0)}%</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
        {enrollments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-zinc-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No courses yet</p>
              <Link href="/courses">
                <Button variant="gradient" className="mt-4">
                  Browse Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {enrollments.slice(0, 4).map((e) => (
              <Card key={e.id}>
                <CardContent className="p-4">
                  <h3 className="font-medium line-clamp-1">{e.course.title}</h3>
                  <div className="mt-2 h-2 rounded-full bg-[var(--color-secondary)]">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-1">{e.progress.toFixed(0)}% complete</p>
                  <Link href={`/dashboard/learn/${e.course.id}`}>
                    <Button size="sm" className="mt-3" variant="outline">
                      Continue
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
