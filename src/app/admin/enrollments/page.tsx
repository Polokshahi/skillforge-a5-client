"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

interface EnrollmentRow {
  id: string;
  progress: number;
  enrolledAt: string;
  user: { name: string; email: string };
  course: { title: string };
}

export default function AdminEnrollmentsPage() {
  const [rows, setRows] = useState<EnrollmentRow[]>([]);

  useEffect(() => {
    api.get("/enrollments").then((res) => setRows(res.data.data.enrollments));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Enrollments</h1>
      <div className="space-y-3">
        {rows.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4 flex justify-between">
              <div>
                <p className="font-medium">{r.user.name}</p>
                <p className="text-sm text-zinc-500">{r.course.title}</p>
              </div>
              <p className="text-indigo-400">{r.progress.toFixed(0)}%</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
