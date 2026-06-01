"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { AuthError, Session, User } from "@supabase/supabase-js";
import {
  SignUpNewUserEmailProps,
  SignUpNewUserEmailRes,
} from "@/app/types/authTypes";

export const signUpAction = async (email: string, password: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // convert error to plain object (Error objects can't be serialized will cause error in console)
  if (error) {
    return {
      data: null,
      error: {
        message: error.message,
        code: error.code,
        status: error.status,
      },
    };
  }

  return { data, error: null };
};
