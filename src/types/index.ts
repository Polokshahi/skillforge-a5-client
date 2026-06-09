export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string | null;
  bio?: string | null;
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: { courses: number };
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  previewVideo?: string | null;
  price: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: number;
  isPublished?: boolean;
  featured?: boolean;
  averageRating?: number;
  category?: Category;
  instructor?: { id: string; name: string; avatar?: string | null; bio?: string | null };
  lessons?: Lesson[];
  reviews?: Review[];
  _count?: { lessons: number; reviews: number; enrollments: number };
}

export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface Enrollment {
  id: string;
  progress: number;
  completedLessons: string[];
  enrolledAt: string;
  course: Course;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  user: { id: string; name: string; avatar?: string | null };
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  course: { id: string; title: string; thumbnail: string; slug: string };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedMeta {
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
}
