"use server";
import { createClient } from "@/app/utils/supabase/server";
import ScanForm from "./components/scanForm";
import { cookies } from "next/headers";
import { handleFileUpload } from "../utils/supabase/scanAction";

const ScanPage = async () => {
  const cookieStore = await cookies();

  return (
    <div className="contentLayout">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="text-3xl font-bold">New Entry</div>
        <ScanForm handleFileUpload={handleFileUpload} />
      </div>
    </div>
  );
};

export default ScanPage;
