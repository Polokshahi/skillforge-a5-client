"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Star, Clock, BookOpen, Play } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice, formatDuration } from "@/lib/utils";
import type { Course } from "@/types";

export default function CourseDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (!id) return;
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data.data))
      .catch(() => toast.error("Course not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setPurchasing(true);
    try {
      const res = await api.post("/payments/checkout", { courseId: id });
      const url = res.data.data.url;
      if (url) window.location.href = url;
      else toast.error("Could not start checkout");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Checkout failed";
      toast.error(msg);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <Skeleton className="aspect-video w-full max-w-4xl" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-zinc-500">Course not found</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
          </div>
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge>{course.level}</Badge>
              {course.category && <Badge variant="secondary">{course.category.name}</Badge>}
            </div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-4 text-zinc-400 leading-relaxed">{course.description}</p>
          </div>
          {course.lessons && course.lessons.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Curriculum ({course.lessons.length} lessons)
                </h2>
                <ul className="space-y-2">
                  {course.lessons.map((lesson, i) => (
                    <li
                      key={lesson.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-[var(--color-secondary)]"
                    >
                      <span className="text-sm">
                        {i + 1}. {lesson.title}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {Math.floor(lesson.duration / 60)} min
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <p className="text-3xl font-bold text-indigo-400">{formatPrice(course.price)}</p>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {(course.averageRating ?? 0).toFixed(1)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatDuration(course.duration)}
                </span>
              </div>
              {course.instructor && (
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <p className="text-sm text-zinc-500">Instructor</p>
                  <p className="font-medium">{course.instructor.name}</p>
                </div>
              )}
              <Button
                variant="gradient"
                className="w-full"
                size="lg"
                onClick={handlePurchase}
                disabled={purchasing}
              >
                <Play className="h-5 w-5" />
                {purchasing ? "Processing..." : "Enroll Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
