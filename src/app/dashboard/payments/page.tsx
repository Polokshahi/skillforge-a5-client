"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Payment } from "@/types";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    api.get("/payments/my-payments").then((res) => setPayments(res.data.data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-zinc-500">No payments yet.</p>
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <Card key={p.id}>
              <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{p.course.title}</p>
                  <p className="text-sm text-zinc-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={p.status === "COMPLETED" ? "default" : "secondary"}>
                    {p.status}
                  </Badge>
                  <span className="font-bold text-indigo-400">{formatPrice(p.amount)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
