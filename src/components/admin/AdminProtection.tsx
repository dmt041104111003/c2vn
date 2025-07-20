"use client";

import { useUser } from "~/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AdminProtectionProps {
  children: React.ReactNode;
}

export default function AdminProtection({ children }: AdminProtectionProps) {
  const { isAdmin, loading, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      router.push("/");
    }
  }, [isAdmin, loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return <>{children}</>;
} 