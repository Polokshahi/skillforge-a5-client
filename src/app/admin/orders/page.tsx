"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  course: { title: string };
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get("/payments/orders").then((res) => setOrders(res.data.data.payments));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Manage Orders</h1>
      {orders.length === 0 ? (
        <p className="text-zinc-500">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardContent className="p-4 flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-medium">{o.course.title}</p>
                  <p className="text-sm text-zinc-500">{o.user.name} — {o.user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{o.status}</Badge>
                  <span className="font-bold">{formatPrice(o.amount)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
