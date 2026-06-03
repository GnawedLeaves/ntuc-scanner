"use client";
import { withDelay } from "@/app/utils/common";
import { signOutAction } from "@/app/utils/login/authUtils";

const SignOutForm = () => {
  const handleSignOut = withDelay(async () => {
    signOutAction();
  });
  return (
    <div className="w-full bg-amber-950 flex flex-col">
      <button
        onClick={handleSignOut}
        className="standardButton bg-red-400! "
        type="submit"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutForm;
