"use server";
import { cookies } from "next/headers";
import { createClient } from "../supabase/server";
import { AuthError, Session, User } from "@supabase/supabase-js";
import {
  ExtendedUser,
  UserContext,
  UserProfile,
  UserSignUpNewEmailProps,
  UserSignUpNewEmailRes,
} from "@/app/types/authTypes";

export const signUpAction = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
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

  if (data.user?.id) {
    const profileResult = await createUserProfile(data.user.id, username);

    if (profileResult.error) {
      return {
        data: null,
        error: profileResult.error,
      };
    }
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

const getUserProfile = async (user: User): Promise<UserProfile | undefined> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile as UserProfile | undefined;
};

export const getUserContext = async (): Promise<UserContext> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      isLoggedIn: false,
    };
  }

  const profile = await getUserProfile(user);

  return {
    profile: profile,
    ...user,
    isLoggedIn: true,
  };
};

export const createUserProfile = async (
  userId: string,
  username: string,
  // displayName: string,
) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("profiles").insert([
    {
      id: userId,
      username,
      // display_name: displayName,
    },
  ]);

  if (error) {
    return {
      data: null,
      error: {
        message: error.message,
        code: error.code,
      },
    };
  }

  return { data, error: null };
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
