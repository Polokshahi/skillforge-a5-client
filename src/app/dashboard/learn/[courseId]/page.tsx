"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Course, Lesson } from "@/types";

export default function LearnPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!courseId) return;
    api.get(`/courses/${courseId}`).then((res) => {
      const c = res.data.data;
      setCourse(c);
      if (c.lessons?.length) setActiveLesson(c.lessons[0]);
    });
  }, [courseId]);

  const markComplete = async () => {
    if (!activeLesson || !courseId) return;
    try {
      await api.patch("/enrollments/progress", {
        courseId,
        lessonId: activeLesson.id,
      });
      toast.success("Progress saved!");
    } catch {
      toast.error("Failed to update progress");
    }
  };

  const videoId = activeLesson?.videoUrl.includes("embed")
    ? activeLesson.videoUrl.split("/embed/")[1]?.split("?")[0]
    : null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{course?.title}</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeLesson && (
            <div className="aspect-video rounded-xl overflow-hidden bg-black">
              {videoId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                  title={activeLesson.title}
                />
              ) : (
                <iframe
                  className="w-full h-full"
                  src={activeLesson.videoUrl}
                  allowFullScreen
                  title={activeLesson.title}
                />
              )}
            </div>
          )}
          {activeLesson && (
            <div className="mt-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{activeLesson.title}</h2>
              <Button onClick={markComplete} variant="gradient">
                Mark Complete
              </Button>
            </div>
          )}
        </div>
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Lessons</h3>
            <ul className="space-y-2 max-h-[400px] overflow-y-auto">
              {course?.lessons?.map((lesson) => (
                <li key={lesson.id}>
                  <button
                    className={`w-full text-left text-sm p-2 rounded-lg transition-colors ${
                      activeLesson?.id === lesson.id
                        ? "bg-indigo-500/20 text-indigo-400"
                        : "hover:bg-[var(--color-secondary)]"
                    }`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    {lesson.order + 1}. {lesson.title}
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
