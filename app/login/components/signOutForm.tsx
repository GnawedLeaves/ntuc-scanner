"use client";
import { withDelay } from "@/app/utils/common";
import { signOutAction } from "@/app/utils/login/authUtils";

const SignOutForm = () => {
  const handleSignOut = withDelay(async () => {
    signOutAction();
  });
  return (
    <div>
      <button
        onClick={handleSignOut}
        className="standardButton bg-amber-400! "
        type="submit"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOutForm;
