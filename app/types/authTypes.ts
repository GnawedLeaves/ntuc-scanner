import { User, AuthError, Session } from "@supabase/supabase-js";

export interface SignUpNewUserEmailProps {
  email: string;
  password: string;
}

export interface SignUpNewUserEmailRes {
  data: SignUpDataRes;
  error: AuthError | null;
}

export interface SignUpDataRes {
  user: User | null;
  session: Session | null;
}
