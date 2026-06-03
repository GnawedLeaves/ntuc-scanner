"use client";
import { useAuth } from "@/app/context/AuthContext";

const ProfileBanner = () => {
  const { user } = useAuth();
  return <div>User: {user?.id}</div>;
};

export default ProfileBanner;
