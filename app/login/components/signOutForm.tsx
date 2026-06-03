"use client";
import { withDelay } from "@/app/utils/common";
import { signOutAction } from "@/app/utils/login/authUtils";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const SignOutForm = () => {
  const { refreshUser } = useAuth();
  const router = useRouter();

  const handleSignOut = withDelay(async () => {
    await signOutAction();
    await refreshUser();
    router.push("/login");
  });

  return (
    <div className="w-full flex flex-col">
      <button
        onClick={handleSignOut}
        className="standardButton bg-red-400!"
        type="button"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutForm;
