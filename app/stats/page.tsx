import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import CurrentStatsComponent from "./components/currentStats/currentStats";

const page = async () => {
  const cookieStore = await cookies();
  //use server one for server components and the client one for client components
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();
  console.log({ todos });

  return (
    <div className="contentLayout">
      <CurrentStatsComponent />
    </div>
  );
};

export default page;
