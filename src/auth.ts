// "use client";
import { supabase } from "./lib";

//
export const auth = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  console.log(session, "getSession");

  return session?.data;
};
