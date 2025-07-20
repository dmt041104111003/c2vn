"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  roles: string[];
  isAdmin: boolean;
  profile?: any;
}

export function useUser() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "loading") return;
      
      if (!session?.user?.email) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status]);

  return {
    user,
    loading,
    isAuthenticated: !!session,
    isAdmin: user?.isAdmin || false,
  };
} 