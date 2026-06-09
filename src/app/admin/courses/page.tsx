"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { Course, Category } from "@/types";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    price: 49.99,
    level: "BEGINNER",
    duration: 600,
    categoryId: "",
    isPublished: true,
  });

  const load = () => {
    api.get("/courses", { params: { limit: 50 } }).then((res) => setCourses(res.data.data.courses));
    api.get("/categories").then((res) => setCategories(res.data.data));
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/courses", form);
      toast.success("Course created");
      setShowForm(false);
      load();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        "Failed";
      toast.error(msg);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <Button variant="gradient" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>
      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Input placeholder="Thumbnail URL" value={form.thumbnail} onChange={(e) => setForm({ ...form, thumbnail: e.target.value })} />
              <textarea
                className="sm:col-span-2 min-h-[80px] rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-sm"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
              <Input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} />
              <Input type="number" placeholder="Duration (min)" value={form.duration} onChange={(e) => setForm({ ...form, duration: +e.target.value })} />
              <select
                className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
                value={form.level}
                onChange={(e) => setForm({ ...form, level: e.target.value })}
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
                <option value="ADVANCED">Advanced</option>
              </select>
              <select
                className="h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-3 text-sm"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <Button type="submit" variant="gradient" className="sm:col-span-2">Create Course</Button>
            </form>
          </CardContent>
        </Card>
      )}
      <div className="space-y-3">
        {courses.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-sm text-zinc-500">{c.isPublished ? "Published" : "Draft"}</p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(c.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
