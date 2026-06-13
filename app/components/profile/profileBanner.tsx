"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect } from "react";

const ProfileBanner = () => {
  const { user, refreshUser } = useAuth();
  useEffect(() => {
    refreshUser();
  }, []);
  console.log({ user });
  return (
    <div>
      User: {user?.id} <br />
      Username: {user?.profile?.username}
    </div>
  );
};

export default ProfileBanner;
