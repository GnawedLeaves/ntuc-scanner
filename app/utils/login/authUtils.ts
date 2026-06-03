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

export const loginActionWithEmail = async (email: string, password: string) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  // then login info will be store in cookies

  if (error) {
    return {
      data: null,
      error: { message: error.message, code: error.code, status: error.status },
    };
  }

  console.log("login data", { data });
  return {
    data,
    error: null,
  };
};

export const getUserContext = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      user: null,
      isLoggedIn: false,
    };
  }

  console.log("user data", { user });

  return {
    user,
    isLoggedIn: true,
  };
};

export const signOutAction = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  console.log("signing out");
  await supabase.auth.signOut();
  // await supabase.auth.signOut({ scope: 'local' })
};

export const signUpAsGuestAction = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error("Error signing in as guest");
    return {
      data: null,
      error: { message: error.message, code: error.code, status: error.status },
    };
  }
  return {
    data,
    error: null,
  };
};
