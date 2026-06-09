"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Enrollment } from "@/types";

export default function MyCoursesPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    api.get("/enrollments/my-enrollments").then((res) => setEnrollments(res.data.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Courses</h1>
      {enrollments.length === 0 ? (
        <p className="text-zinc-500">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid gap-4">
          {enrollments.map((e) => (
            <Card key={e.id}>
              <CardContent className="p-4 flex gap-4 flex-col sm:flex-row sm:items-center">
                <div className="relative w-full sm:w-32 aspect-video rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={e.course.thumbnail}
                    alt={e.course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{e.course.title}</h3>
                  <div className="mt-2 h-2 rounded-full bg-[var(--color-secondary)] max-w-xs">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${e.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-zinc-500 mt-1">{e.progress.toFixed(0)}% complete</p>
                </div>
                <Link href={`/dashboard/learn/${e.course.id}`}>
                  <Button variant="gradient">Watch</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
