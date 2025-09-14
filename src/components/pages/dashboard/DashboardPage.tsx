"use client"

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { WelcomeCard } from "@/components/WelcomeCard";

export function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <WelcomeCard />
      </div>
    </ProtectedRoute>
  );
}