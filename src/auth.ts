"use client";
import { supabase } from "./lib";

//
export const token = async () => {
  const user = await supabase.auth.getUser();

  console.log(user);
};
