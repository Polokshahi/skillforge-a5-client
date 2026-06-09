"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, BookOpen, DollarSign, GraduationCap } from "lucide-react";
import api from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface Analytics {
  stats: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    completedPayments: number;
    totalRevenue: number;
  };
  topCourses: Array<{ id: string; title: string; _count: { enrollments: number } }>;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<Analytics | null>(null);

  useEffect(() => {
    api.get("/analytics/dashboard").then((res) => setData(res.data.data));
  }, []);

  const stats = [
    { label: "Users", value: data?.stats.totalUsers ?? 0, icon: Users },
    { label: "Courses", value: data?.stats.totalCourses ?? 0, icon: BookOpen },
    { label: "Enrollments", value: data?.stats.totalEnrollments ?? 0, icon: GraduationCap },
    { label: "Revenue", value: formatPrice(data?.stats.totalRevenue ?? 0), icon: DollarSign },
  ];

  const chartData =
    data?.topCourses.map((c) => ({
      name: c.title.slice(0, 20),
      enrollments: c._count.enrollments,
    })) ?? [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-zinc-400">{s.label}</CardTitle>
                <Icon className="h-4 w-4 text-indigo-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Courses by Enrollments</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" tick={{ fill: "#a1a1aa", fontSize: 12 }} />
                <YAxis tick={{ fill: "#a1a1aa" }} />
                <Tooltip
                  contentStyle={{
                    background: "#12121a",
                    border: "1px solid #27272a",
                  }}
                />
                <Bar dataKey="enrollments" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-zinc-500 text-center py-20">No data yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
