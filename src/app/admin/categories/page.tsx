"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  const load = () => api.get("/categories").then((res) => setCategories(res.data.data));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/categories", { name });
      toast.success("Category created");
      setName("");
      load();
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>
      <form onSubmit={handleCreate} className="flex gap-2 max-w-md">
        <Input placeholder="Category name" value={name} onChange={(e) => setName(e.target.value)} required />
        <Button type="submit" variant="gradient">Add</Button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2">
        {categories.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-zinc-500">{c._count?.courses ?? 0} courses</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
