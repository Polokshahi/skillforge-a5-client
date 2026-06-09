"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    api
      .get(`/payments/verify/${sessionId}`)
      .then(() => setVerified(true))
      .catch(() => setVerified(false));
  }, [sessionId]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">
            {verified ? "Payment Successful!" : "Processing Payment..."}
          </h1>
          <p className="text-zinc-400 mb-6">
            {verified
              ? "You are now enrolled. Start learning from your dashboard."
              : "Please wait while we confirm your payment."}
          </p>
          <div className="flex flex-col gap-2">
            <Button variant="gradient" onClick={() => router.push("/dashboard/courses")}>
              Go to My Courses
            </Button>
            <Link href="/courses">
              <Button variant="outline" className="w-full">
                Browse More Courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
