"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data.data.users));
  }, []);

  const updateRole = async (id: string, role: string) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      toast.success("Role updated");
      const res = await api.get("/users");
      setUsers(res.data.data.users);
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4 flex flex-wrap justify-between items-center gap-2">
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-zinc-500">{u.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge>{u.role}</Badge>
                {u.role === "USER" && (
                  <button
                    className="text-xs text-indigo-400 hover:underline"
                    onClick={() => updateRole(u.id, "ADMIN")}
                  >
                    Make Admin
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
