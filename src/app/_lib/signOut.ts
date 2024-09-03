"use server";
import { createSupabaseServer } from "@/lib";

export async function signOut() {
  try {
    const { auth } = await createSupabaseServer();

    const { error } = await auth.signOut();
    console.log(error);
    if (error) {
      throw error;
    }

    return { errorMessage: null };
  } catch (err) {
    return { errorMessage: err };
  }
}
