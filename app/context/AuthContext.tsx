"use client";

import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserContext } from "@/app/utils/login/authUtils";
import { ExtendedUser, UserContext } from "../types/authTypes";

interface AuthContextType {
  user: UserContext;
  isLoggedIn: boolean;
  isLoading: boolean;
  isAnonymous: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserContext>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const user = await getUserContext();
        setUser(user);
        setIsLoggedIn(isLoggedIn);
        setIsAnonymous(user?.is_anonymous ?? false);
      } catch (error) {
        console.error("Error initializing auth:", error);
        setUser(undefined);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshUser = async () => {
    try {
      const user = await getUserContext();
      setUser(user);
      setIsLoggedIn(isLoggedIn);
      setIsAnonymous(user?.is_anonymous ?? false);
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        isAnonymous,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
