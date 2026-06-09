"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, formatDuration } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/courses/${course.id}`}>
        <Card className="group overflow-hidden hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 h-full">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {course.featured && (
              <Badge className="absolute top-3 left-3">Featured</Badge>
            )}
            <Badge variant="secondary" className="absolute top-3 right-3">
              {course.level}
            </Badge>
          </div>
          <CardContent className="p-4 space-y-3">
            {course.category && (
              <span className="text-xs text-indigo-400">{course.category.name}</span>
            )}
            <h3 className="font-semibold line-clamp-2 group-hover:text-indigo-400 transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{course.description}</p>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {(course.averageRating ?? 0).toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(course.duration)}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {course._count?.enrollments ?? 0}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-indigo-400">
                {formatPrice(course.price)}
              </span>
              <span className="text-sm text-zinc-500">
                {course.instructor?.name}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
