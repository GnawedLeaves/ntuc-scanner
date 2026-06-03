"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // If true, redirects unauthenticated users to login
}

export const ProtectedRoute = ({
  children,
  requireAuth = false,
}: ProtectedRouteProps) => {
  const { isLoading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && requireAuth && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading, isLoggedIn, requireAuth, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
