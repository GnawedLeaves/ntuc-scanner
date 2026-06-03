"use client";

import { AuthError } from "@supabase/supabase-js";
import { useState } from "react";
import styles from "./styles.module.css";
import {
  loginActionWithEmail,
  signUpAction,
} from "@/app/utils/login/authUtils";

interface LoginFormError {
  message: string;
  code?: string;
  status?: number;
}

const SignInForm = ({}: {}) => {
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");
  const [error, setError] = useState<LoginFormError | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    console.log("signing in");
    e.preventDefault();
    setError(null);

    const { data, error } = await loginActionWithEmail(
      inputEmail,
      inputPassword,
    );
    if (error) {
      setError(error);
      setSuccess(false);
    } else {
      setSuccess(true);
      setInputEmail("");
      setInputPassword("");
    }

    console.log("signing in", { data, error });
  };
  return (
    <div>
      Sign In
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
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Password"
          />
          {error && <div style={{ color: "red" }}>{error.message}</div>}
          {success && <div style={{ color: "green" }}>Sign in successful!</div>}
          <button className="standardButton bg-amber-400!" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
