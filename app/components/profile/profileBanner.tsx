"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

const ProfileBanner = () => {
  const { user, refreshUser } = useAuth();
  useEffect(() => {
    refreshUser();
  }, []);
  return <div>User: {user?.id}</div>;
};

export default ProfileBanner;
