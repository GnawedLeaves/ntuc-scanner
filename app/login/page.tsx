import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import SignUpForm from "./components/signUpForm";

const LoginPage = async () => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  return (
    <div className="contentLayout">
      Login page
      <div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default LoginPage;
