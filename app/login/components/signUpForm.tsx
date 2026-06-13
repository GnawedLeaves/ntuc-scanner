"use client";

import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { signUpAction, signUpAsGuestAction } from "@/app/utils/login/authUtils";
import { withDelay } from "@/app/utils/common";
import { useAuth } from "@/app/context/AuthContext";

interface LoginFormError {
  message: string;
  code?: string;
  status?: number;
}

const SignUpForm = ({}: {}) => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [error, setError] = useState<LoginFormError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();
  const { refreshUser } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    if (inputUsername === "") {
      setError({
        message: "User name cannot be blank",
      });
      return;
    }

    const { data, error } = await signUpAction({
      email: inputEmail,
      password: inputPassword,
      username: inputUsername,
    });
    if (error) {
      setError(error);
      setSuccess(false);
    } else {
      setSuccess(true);
      setInputEmail("");
      setInputPassword("");
      await refreshUser();
      router.push("/");
    }
  };

  const handleGuestSignUp = withDelay(async () => {
    const { data, error } = await signUpAsGuestAction();
    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      await refreshUser();
      router.push("/");
    }
  });

  return (
    <div>
      Sign up
      <form onSubmit={handleSubmit}>
        <div className="flex gap-5 flex-col">
          <input
            className={styles.signUpFormField}
            type="email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className={styles.signUpFormField}
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="User name"
          />
          <input
            className={styles.signUpFormField}
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <div style={{ color: "red" }}>{error.message}</div>}
          {success && <div style={{ color: "green" }}>Sign up successful!</div>}
          <button className="standardButton bg-amber-400!" type="submit">
            Sign Up
          </button>
          <button
            className="standardButton bg-amber-400!"
            type="button"
            onClick={handleGuestSignUp}
          >
            Continue as guest
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
